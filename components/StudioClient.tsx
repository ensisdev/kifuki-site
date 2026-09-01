'use client';
import Localized from '@/components/Localized';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import {Sparkles,Pencil,Palette,Scissors} from 'lucide-react';
import {StaggerChildren,StaggerItem} from '@/components/Motion';
import type {Artwork} from '@/lib/types';
import {motion} from 'framer-motion';

function Tape({className='',rotate=0}:{className?:string;rotate?:number}){
  return <div className={`absolute h-5 w-20 bg-white/60 backdrop-blur-sm border border-black/5 ${className}`} style={{transform:`rotate(${rotate}deg)`}}/>;
}

function PenSticker({className='',label}:{className?:string;label:string}){
  return (
    <div className={`absolute inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-paper px-3 py-1.5 text-[10px] font-bold text-black/70 shadow-sm ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-pink"/>
      {label}
    </div>
  );
}

export default function StudioClient({artworks}:{artworks:Artwork[]}){
  return <>
    <Reveal variant="slide-left">
      <div className="flex items-center gap-3">
        <Sparkles size={16} className="text-pink"/>
        <span className="scribble text-xs text-black/50">KIFUKI / STUDIO</span>
      </div>
      <h1 className="mt-6 text-6xl font-bold leading-none sm:text-8xl"><Localized path="studioTitle"/></h1>
    </Reveal>

    {/* DESK SURFACE */}
    <div className="relative mt-16 rounded-[2rem] border border-black/15 bg-gradient-to-br from-[#f8f4ea] via-[#f4efe5] to-[#ede8dc] p-6 sm:p-10 shadow-[0_8px_40px_rgba(0,0,0,.08)]">
      {/* Desk texture overlay */}
      <div className="absolute inset-0 rounded-[2rem] opacity-[0.03] pointer-events-none" style={{backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'.5\'/%3E%3C/svg%3E")'}}/>

      {/* Tape corners on desk */}
      <Tape className="top-3 left-8 -rotate-6" />
      <Tape className="top-3 right-8 rotate-6" />
      <Tape className="bottom-3 left-12 rotate-3" />
      <Tape className="bottom-3 right-12 -rotate-3" />

      {/* Pen / tool stickers */}
      <PenSticker className="top-8 right-16 rotate-6" label="sketch pen"/>
      <PenSticker className="bottom-12 left-10 -rotate-3" label="fineliner"/>
      <PenSticker className="top-1/2 right-4 -rotate-90 hidden sm:inline-flex" label="marker"/>

      {/* Artwork scattered on desk */}
      <StaggerChildren className="relative z-10 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4" stagger={.1}>
        {artworks.map((a,i)=>{
          const rotations=[-3,2,-1.5,3,-2,1,-2.5,2.5];
          const rot=rotations[i%rotations.length];
          const offsets=['translate-y-2','translate-y-0','-translate-y-1','translate-y-3','-translate-y-2','translate-y-1','translate-y-0','-translate-y-1'];
          const off=offsets[i%offsets.length];
          return (
            <StaggerItem key={a.id}>
              <motion.article
                className={`group relative ${off}`}
                whileHover={{rotate:0,scale:1.05,y:-8,transition:{type:'spring',stiffness:300,damping:20}}}
                style={{rotate:rot}}
              >
                {/* Photo print effect */}
                <div className="relative overflow-hidden rounded-sm border border-black/10 bg-white p-2 pb-10 shadow-[2px_3px_8px_rgba(0,0,0,.1)]">
                  <div className={`${i%3===0?'aspect-[4/5]':'aspect-square'} overflow-hidden`}>
                    <Image src={a.image} alt={a.title} width={400} height={400} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"/>
                  </div>
                  {/* Handwritten caption */}
                  <div className="absolute bottom-2 left-3 right-3">
                    <span className="scribble text-[10px] text-black/50">{a.title}</span>
                    <span className="float-right scribble text-[9px] text-black/30">{a.year}</span>
                  </div>
                </div>
                {/* Washi tape accent */}
                <div className={`absolute -top-2 ${i%2===0?'left-4':'right-4'} h-4 w-14 bg-violet/30 backdrop-blur-sm border border-violet/10 ${i%2===0?'rotate-2':'-rotate-3'}`}/>
              </motion.article>
            </StaggerItem>
          );
        })}
      </StaggerChildren>

      {/* Made by hand stamp */}
      <div className="relative z-10 mt-10 flex items-center justify-center gap-3">
        <div className="h-px flex-1 bg-black/10"/>
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-black/20 px-5 py-2">
          <Pencil size={14} className="text-black/40"/>
          <span className="scribble text-xs text-black/40">made by hand</span>
          <Scissors size={14} className="text-black/40 -rotate-90"/>
        </div>
        <div className="h-px flex-1 bg-black/10"/>
      </div>

      {/* Desk tools decoration */}
      <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2 opacity-20">
        <Palette size={20}/>
        <div className="h-1 w-16 rounded-full bg-gradient-to-r from-pink via-violet to-cyan"/>
      </div>
    </div>
  </>;
}
