"use client";
import React, { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  async function startGeneration() {
    if (!prompt) return alert("Kuch likhiye!");
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setVideoUrl(data.videoUrl);
    } catch (e) {
      alert("Error!");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen text-white p-5 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-400 mb-8">NEO-GEN AI APP</h1>
      
      <div className="w-full max-w-2xl bg-slate-800 p-6 rounded-2xl shadow-2xl">
        <textarea 
          className="w-full p-4 bg-slate-900 rounded-lg mb-4 border border-slate-700"
          placeholder="Describe your video..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        <button 
          onClick={startGeneration}
          className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-lg font-bold transition"
          disabled={loading}
        >
          {loading ? "AI is Working..." : "Generate Now"}
        </button>

        {videoUrl && (
          <div className="mt-8 border-2 border-slate-700 rounded-xl overflow-hidden">
            <video src={videoUrl} controls autoPlay className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
}
