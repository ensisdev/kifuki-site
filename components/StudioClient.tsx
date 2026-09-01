'use client';
import Localized from '@/components/Localized';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import {Sparkles} from 'lucide-react';
import {StaggerChildren,StaggerItem} from '@/components/Motion';
import type {Artwork} from '@/lib/types';

export default function StudioClient({artworks}:{artworks:Artwork[]}){
  return <>
    <Reveal variant="slide-left">
      <div className="flex items-center gap-3">
        <Sparkles size={16} className="text-pink"/>
        <span className="scribble text-xs text-black/50">KIFUKI / STUDIO</span>
      </div>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_.8fr]">
        <h1 className="text-6xl font-bold leading-none sm:text-8xl"><Localized path="studioTitle"/></h1>
        <p className="max-w-lg text-lg leading-8 text-black/60"><Localized path="studioText"/></p>
      </div>
    </Reveal>
    <StaggerChildren className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4" stagger={.08}>
      {artworks.map((a,i)=>
        <StaggerItem key={a.id}>
          <article className="group relative overflow-hidden rounded-[1.7rem] border border-black/15 transition-all duration-500 hover:shadow-[6px_6px_0_#161616] hover:-translate-y-1 hover:rotate-1">
            <div className={`${i%3===0?'aspect-[4/5]':'aspect-square'} overflow-hidden`}>
              <Image src={a.image} alt={a.title} width={400} height={400} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"/>
            </div>
            <div className="absolute inset-x-3 bottom-3 rounded-xl bg-paper/90 p-3 backdrop-blur-sm transition-all duration-300 group-hover:bg-pink group-hover:text-white">
              <b className="text-sm">{a.title}</b>
              <div className="text-[10px] text-black/50 group-hover:text-white/70">{a.year}</div>
            </div>
          </article>
        </StaggerItem>
      )}
    </StaggerChildren>
  </>;
}
