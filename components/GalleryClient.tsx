'use client';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import {Sparkles,X,ArrowLeft,ArrowRight} from 'lucide-react';
import {StaggerChildren,StaggerItem} from '@/components/Motion';
import type {Artwork} from '@/lib/types';
import {motion,AnimatePresence} from 'framer-motion';
import {useState,useCallback,useEffect} from 'react';

function FullscreenViewer({artworks,index,onClose,onPrev,onNext}:{artworks:Artwork[];index:number;onClose:()=>void;onPrev:()=>void;onNext:()=>void}){
  const a=artworks[index];
  useEffect(()=>{
    function handleKey(e:KeyboardEvent){if(e.key==='Escape')onClose();if(e.key==='ArrowLeft')onPrev();if(e.key==='ArrowRight')onNext()}
    window.addEventListener('keydown',handleKey);return()=>window.removeEventListener('keydown',handleKey);
  },[onClose,onPrev,onNext]);

  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      transition={{duration:.3}}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        whileHover={{scale:1.1}} whileTap={{scale:.9}}
      >
        <X size={20}/>
      </motion.button>
      <button onClick={(e)=>{e.stopPropagation();onPrev()}} className="absolute left-4 z-10 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-sm hover:bg-white/20"><ArrowLeft size={20}/></button>
      <button onClick={(e)=>{e.stopPropagation();onNext()}} className="absolute right-4 z-10 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-sm hover:bg-white/20"><ArrowRight size={20}/></button>
      <motion.div
        key={a.id}
        initial={{scale:.85,opacity:0,rotate:-2}}
        animate={{scale:1,opacity:1,rotate:0}}
        exit={{scale:.85,opacity:0,rotate:2}}
        transition={{type:'spring',stiffness:200,damping:25}}
        className="relative max-h-[85vh] max-w-[85vw]"
        onClick={(e)=>e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_80px_rgba(117,104,201,.15)]">
          <Image src={a.image} alt={a.title} width={1200} height={900} className="max-h-[75vh] w-auto object-contain"/>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold text-white">{a.title}</h3>
          <span className="text-sm text-white/50">{a.year}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GalleryClient({artworks}:{artworks:Artwork[]}){
  const[viewerIndex,setViewerIndex]=useState<number|null>(null);
  const open=useCallback((i:number)=>setViewerIndex(i),[]);
  const close=useCallback(()=>setViewerIndex(null),[]);
  const prev=useCallback(()=>setViewerIndex(i=>i!==null?(i-1+artworks.length)%artworks.length:null),[artworks.length]);
  const next=useCallback(()=>setViewerIndex(i=>i!==null?(i+1)%artworks.length:null),[artworks.length]);

  return <>
    <Reveal variant="slide-left">
      <div className="flex items-center gap-3">
        <Sparkles size={16} className="text-violet"/>
        <span className="scribble text-xs text-black/50">KIFUKI / GALLERY</span>
      </div>
      <h1 className="mt-5 text-6xl font-bold tracking-tight sm:text-8xl">Gallery<span className="text-gradient-violet">.</span></h1>
    </Reveal>

    {/* Masonry grid */}
    <StaggerChildren className="mt-12 columns-2 gap-4 md:columns-3" stagger={.08}>
      {artworks.map((a,i)=>(
        <StaggerItem key={a.id}>
          <figure className="mb-4 break-inside-avoid group cursor-pointer" onClick={()=>open(i)}>
            <div className="relative overflow-hidden rounded-2xl border border-black/10 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(117,104,201,.2)]">
              {/* Distortion hover effect */}
              <div className={`${i%5===0?'aspect-[3/4]':i%3===0?'aspect-square':'aspect-[4/5]'} overflow-hidden`}>
                <Image
                  src={a.image} alt={a.title} fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  sizes="33vw"
                />
              </div>
              {/* Hover overlay with info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100"/>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-sm">Gözat ↗</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-sm font-bold text-white drop-shadow-lg">{a.title}</span>
                <span className="ml-2 text-xs text-white/60">{a.year}</span>
              </div>
            </div>
            <figcaption className="px-2 py-3">
              <div className="text-sm font-bold group-hover:text-violet transition-colors">{a.title}</div>
              <span className="float-right text-black/40 text-xs">{a.year}</span>
            </figcaption>
          </figure>
        </StaggerItem>
      ))}
    </StaggerChildren>

    {/* Fullscreen viewer */}
    <AnimatePresence>
      {viewerIndex!==null && (
        <FullscreenViewer artworks={artworks} index={viewerIndex} onClose={close} onPrev={prev} onNext={next}/>
      )}
    </AnimatePresence>
  </>;
}
