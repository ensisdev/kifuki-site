'use client';
import Link from 'next/link';
import Image from 'next/image';
import {Menu,X,ArrowUpRight,ShoppingBag} from 'lucide-react';
import {useState,useEffect} from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import LanguageToggle from './LanguageToggle';
import Localized from './Localized';

export default function Nav(){
  const[open,setOpen]=useState(false);
  const[scrolled,setScrolled]=useState(false);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>20);window.addEventListener('scroll',h,{passive:true});return()=>window.removeEventListener('scroll',h)},[]);
  const links=[['/','nav.home'],['/shop','nav.shop'],['/studio','nav.studio'],['/gallery','nav.gallery'],['/contact','nav.contact']] as const;
  return <>
    <motion.header
      initial={{y:-100}}
      animate={{y:0}}
      transition={{type:'spring',stiffness:80,damping:20,mass:.8}}
      className={`fixed top-0 z-40 w-full px-4 py-4 sm:px-7 transition-all duration-500 ${scrolled?'py-2 sm:px-10':''}`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-black/15 px-4 py-3 backdrop-blur-xl transition-all duration-500 ${scrolled?'bg-paper/95 shadow-lg shadow-black/5 border-black/10':'bg-paper/85'}`}>
        <Link href="/" className="relative h-9 w-28 group">
          <Image src="/brand/logo.png" alt="Kifuki" fill className="object-contain object-left transition-transform duration-300 group-hover:scale-105"/>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([href,key])=>
            <Link key={href} href={href} className="group relative text-sm font-semibold py-1">
              <Localized path={key}/>
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-pink transition-all duration-300 group-hover:w-full"/>
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle/>
          <Link href="/shop" className="hidden rounded-full border border-black bg-black px-4 py-2 text-xs font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 sm:flex">
            <Localized path="nav.shop"/>
            <ShoppingBag size={14} className="ml-2"/>
          </Link>
          <button onClick={()=>setOpen(!open)} className="rounded-full border border-black/20 p-2 md:hidden transition-transform duration-200 active:scale-95">
            {open?<X size={17}/>:<Menu size={17}/>}
          </button>
        </div>
      </div>
    </motion.header>
    <AnimatePresence>
      {open&&<motion.div
        initial={{opacity:0,y:-10,scale:.95}}
        animate={{opacity:1,y:0,scale:1}}
        exit={{opacity:0,y:-10,scale:.95}}
        transition={{duration:.2,ease:[.2,.8,.2,1]}}
        className="fixed inset-x-4 top-20 z-30 rounded-2xl border border-black bg-paper p-5 shadow-2xl md:hidden"
      >
        {links.map(([href,key],i)=>
          <motion.div key={href} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*.05}}>
            <Link onClick={()=>setOpen(false)} className="flex items-center justify-between border-b border-black/10 py-4 text-lg font-semibold hover:text-pink transition-colors" href={href}>
              <Localized path={key}/>
              <ArrowUpRight size={17} className="text-black/30"/>
            </Link>
          </motion.div>
        )}
      </motion.div>}
    </AnimatePresence>
    <div className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 rounded-full border border-black bg-black px-2 py-2 text-white shadow-xl md:hidden">
      {links.slice(0,4).map(([href,key])=>
        <Link key={href} href={href} className="px-4 py-2 text-[10px] font-bold transition-colors hover:text-pink">
          <Localized path={key}/>
        </Link>
      )}
    </div>
  </>;
}
