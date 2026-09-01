'use client';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import {Sparkles} from 'lucide-react';
import {StaggerChildren,StaggerItem} from '@/components/Motion';
import type {Artwork} from '@/lib/types';

export default function GalleryClient({artworks}:{artworks:Artwork[]}){
  return <>
    <Reveal variant="slide-left">
      <div className="flex items-center gap-3">
        <Sparkles size={16} className="text-violet"/>
        <span className="scribble text-xs text-black/50">KIFUKI / GALLERY</span>
      </div>
      <h1 className="mt-5 text-6xl font-bold tracking-tight sm:text-8xl">Gallery<span className="text-gradient-violet">.</span></h1>
    </Reveal>
    <StaggerChildren className="mt-12 columns-2 gap-4 md:columns-3" stagger={.08}>
      {artworks.map((a,i)=>
        <StaggerItem key={a.id}>
          <figure className="mb-4 break-inside-avoid group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-black/15 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(117,104,201,.15)]">
              <Image src={a.image} alt={a.title} fill className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1" sizes="33vw"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"/>
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-sm font-bold text-white drop-shadow-lg">{a.title}</span>
              </div>
            </div>
            <figcaption className="px-2 py-3">
              <div className="text-sm font-bold group-hover:text-violet transition-colors">{a.title}</div>
              <span className="float-right text-black/40 text-xs">{a.year}</span>
            </figcaption>
          </figure>
        </StaggerItem>
      )}
    </StaggerChildren>
  </>;
}
