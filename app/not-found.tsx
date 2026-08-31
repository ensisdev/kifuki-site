'use client';
import Link from 'next/link';
import {ArrowLeft,Home} from 'lucide-react';

export default function NotFound(){
  return <main className="grid min-h-screen place-items-center px-5 pt-20">
    <div className="text-center">
      <div className="scribble text-xs">404 / OOPS</div>
      <h1 className="mt-4 text-7xl font-bold animate-bounce-in">Kaybolduk.</h1>
      <p className="mt-4 text-black/50">Aradığın sayfa burada değil gibi görünüyor.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1" href="/">
          <Home size={16}/>Ana sayfaya dön
        </Link>
        <button onClick={()=>history.back()} className="inline-flex items-center gap-2 rounded-full border border-black px-6 py-3 text-sm font-bold transition-all duration-300 hover:bg-black hover:text-white">
          <ArrowLeft size={16}/>- Geri dön
        </button>
      </div>
    </div>
  </main>;
}
