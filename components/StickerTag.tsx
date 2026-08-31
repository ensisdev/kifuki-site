'use client';
import {ArrowUpRight} from 'lucide-react';
import {motion} from 'framer-motion';

export default function StickerTag({href}:{href:string}){
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group absolute bottom-4 right-4 flex items-center overflow-hidden rounded-full border-2 border-black bg-yellow font-bold shadow-[3px_3px_0_#161616]"
      whileHover={{scale:1.05,rotate:-3}}
      whileTap={{scale:.95}}
      transition={{type:'spring',stiffness:400,damping:15}}
    >
      <span className="grid h-10 w-10 place-items-center transition-transform group-hover:rotate-12">↗</span>
      <span className="max-w-0 whitespace-nowrap pr-0 opacity-0 transition-all duration-300 group-hover:max-w-[110px] group-hover:pr-4 group-hover:opacity-100">Shopier</span>
    </motion.a>
  );
}
