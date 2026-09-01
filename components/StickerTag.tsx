'use client';
import {motion,useMotionValue,useSpring,useTransform} from 'framer-motion';
import {useRef} from 'react';

export default function StickerTag({href}:{href:string}){
  const stickerRef=useRef<HTMLDivElement>(null);
  const rotate=useMotionValue(-12);
  const springRotate=useSpring(rotate,{stiffness:200,damping:15});
  const y=useMotionValue(0);
  const springY=useSpring(y,{stiffness:300,damping:20});
  const scale=useMotionValue(1);
  const springScale=useSpring(scale,{stiffness:300,damping:20});

  function handleEnter(){
    rotate.set(-4);
    y.set(-8);
    scale.set(1.12);
  }
  function handleLeave(){
    rotate.set(-12);
    y.set(0);
    scale.set(1);
  }

  return (
    <motion.div
      ref={stickerRef}
      className="absolute -bottom-3 -right-3 z-20 origin-bottom-right"
      style={{rotate:springRotate,y:springY,scale:springScale}}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center gap-0 overflow-hidden rounded-lg border-2 border-black bg-yellow px-3 py-2 font-bold shadow-[3px_3px_0_#161616] transition-colors hover:bg-yellow/90"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={(e)=>e.stopPropagation()}
      >
        {/* Tape effect on top */}
        <div className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 rotate-2 bg-white/70 backdrop-blur-sm border border-black/10"/>
        <span className="text-xs font-bold text-black whitespace-nowrap">Shopier'de incele</span>
        <svg className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10"/>
        </svg>
      </a>
    </motion.div>
  );
}
