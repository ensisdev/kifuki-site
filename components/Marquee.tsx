'use client';
import {motion} from 'framer-motion';

const words='STICKERS ✦ ART STUDIO ✦ KIFUKI ✦ DRAW SOMETHING NICE ✦ CREATE ✦ DREAM ✦ ';

export default function Marquee(){
  return (
    <div className="relative overflow-hidden border-y border-black py-4 bg-gradient-to-r from-transparent via-pink/5 to-transparent">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-paper to-transparent z-10"/>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-paper to-transparent z-10"/>
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap text-xs font-bold uppercase tracking-[.3em]"
        animate={{x:['0%','-50%']}}
        transition={{repeat:Infinity,duration:20,ease:'linear'}}
      >
        {Array.from({length:16}).map((_,i)=>
          <span key={i} className="inline-flex items-center gap-10">
            <span className="transition-colors hover:text-pink cursor-default">{words.replace(/ ✦ /g,' ')}</span>
          </span>
        )}
      </motion.div>
    </div>
  );
}
