'use client';
import Image from 'next/image';
import Link from 'next/link';
import StickerTag from './StickerTag';
import type {Product} from '@/lib/types';
import {motion} from 'framer-motion';

export default function ProductCard({p}:{p:Product}){
  return (
    <motion.article
      className="group relative"
      whileHover={{y:-6,rotate:1}}
      transition={{type:'spring',stiffness:300,damping:20}}
    >
      <Link href={`/shop/${p.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-black/15 bg-white transition-all duration-500 group-hover:shadow-[6px_8px_0_#161616] group-hover:border-black/30">
          <Image src={p.image} alt={p.name} fill className="object-cover transition-all duration-700 group-hover:scale-110" sizes="(max-width:768px) 50vw, 25vw"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"/>
          <div className="absolute left-4 top-4 rounded-full border border-black bg-paper px-3 py-1 text-[10px] font-bold uppercase transition-all duration-300 group-hover:bg-pink group-hover:text-white group-hover:border-pink group-hover:scale-105">
            {p.category}
          </div>
          <StickerTag href={p.shopierUrl}/>
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold transition-colors group-hover:text-pink">{p.name}</h3>
            <p className="mt-1 text-xs text-black/55 line-clamp-2">{p.description}</p>
          </div>
          <span className="whitespace-nowrap text-sm font-bold text-violet">{p.price} {p.currency}</span>
        </div>
      </Link>
    </motion.article>
  );
}
