'use client';
import {ArrowUpRight} from 'lucide-react';
import {motion} from 'framer-motion';

export default function StickerTag({href}:{href:string}){
  return (
    <motion.div
      className="absolute bottom-4 right-4 z-10"
      whileHover={{scale:1.08,rotate:-4}}
      whileTap={{scale:.92}}
      transition={{type:'spring',stiffness:400,damping:15}}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center overflow-hidden rounded-full border-2 border-black bg-yellow font-bold shadow-[3px_3px_0_#161616]"
        onClick={(e)=>e.stopPropagation()}
      >
        <span className="grid h-10 w-10 place-items-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">↗</span>
        <span className="max-w-0 whitespace-nowrap pr-0 opacity-0 transition-all duration-300 group-hover:max-w-[110px] group-hover:pr-4 group-hover:opacity-100">Shopier</span>
      </a>
    </motion.div>
  );
}
