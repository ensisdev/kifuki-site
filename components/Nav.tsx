'use client';
import Link from 'next/link';
import Image from 'next/image';
import {Menu,X,ArrowUpRight,ShoppingBag,Home,Store,Palette,Image as ImageIcon,Mail} from 'lucide-react';
import {useState,useEffect} from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import LanguageToggle from './LanguageToggle';
import Localized from './Localized';
import {usePathname} from 'next/navigation';

const mobileNavItems=[
  {href:'/',icon:Home,label:'nav.home'},
  {href:'/shop',icon:Store,label:'nav.shop'},
  {href:'/studio',icon:Palette,label:'nav.studio'},
  {href:'/gallery',icon:ImageIcon,label:'nav.gallery'},
  {href:'/contact',icon:Mail,label:'nav.contact'},
] as const;

export default function Nav(){
  const[open,setOpen]=useState(false);
  const[scrolled,setScrolled]=useState(false);
  const pathname=usePathname();
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>20);window.addEventListener('scroll',h,{passive:true});return()=>window.removeEventListener('scroll',h)},[]);
  const links=[['/','nav.home'],['/shop','nav.shop'],['/studio','nav.studio'],['/gallery','nav.gallery'],['/contact','nav.contact']] as const;
  return <>
    {/* Desktop header */}
    <motion.header
      initial={{y:-100,opacity:0}}
      animate={{y:0,opacity:1}}
      transition={{type:'spring',stiffness:80,damping:20,mass:.8,delay:.1}}
      className={`fixed top-0 z-40 w-full px-4 py-4 sm:px-7 transition-all duration-500 ${scrolled?'py-2 sm:px-10':''} hidden md:block`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-black/15 px-4 py-3 backdrop-blur-xl transition-all duration-500 ${scrolled?'bg-paper/95 shadow-lg shadow-black/5 border-black/10':'bg-paper/85'}`}>
        <Link href="/" className="relative h-9 w-28 group">
          <Image src="/brand/logo.png" alt="Kifuki" fill className="object-contain object-left transition-transform duration-300 group-hover:scale-105"/>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([href,key])=>
            <Link key={href} href={href}
              className={`group relative text-sm font-semibold py-1 transition-colors ${pathname===href?'text-pink':''}`}>
              <Localized path={key}/>
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-pink transition-all duration-300 ${pathname===href?'w-full':'w-0 group-hover:w-full'}`}/>
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle/>
          <Link href="/shop" className="hidden rounded-full border border-black bg-black px-4 py-2 text-xs font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 sm:flex btn-press">
            <Localized path="nav.shop"/>
            <ShoppingBag size={14} className="ml-2"/>
          </Link>
        </div>
      </div>
    </motion.header>

    {/* Mobile top bar */}
    <motion.header
      initial={{y:-100,opacity:0}}
      animate={{y:0,opacity:1}}
      transition={{type:'spring',stiffness:80,damping:20,mass:.8,delay:.1}}
      className={`fixed top-0 z-40 w-full px-4 py-3 transition-all duration-500 md:hidden ${scrolled?'bg-paper/95 shadow-lg shadow-black/5 backdrop-blur-xl':''}`}
    >
      <div className="flex items-center justify-between">
        <Link href="/" className="relative h-8 w-24">
          <Image src="/brand/logo.png" alt="Kifuki" fill className="object-contain object-left"/>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageToggle/>
          <button onClick={()=>setOpen(!open)} className="relative rounded-full border border-black/20 p-2 transition-transform duration-200 active:scale-95">
            <AnimatePresence mode="wait">
              {open
                ?<motion.div key="close" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:.2}}><X size={17}/></motion.div>
                :<motion.div key="menu" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:.2}}><Menu size={17}/></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.header>

    {/* Mobile dropdown menu */}
    <AnimatePresence>
      {open&&<motion.div
        initial={{opacity:0,y:-10,scale:.95,filter:'blur(4px)'}}
        animate={{opacity:1,y:0,scale:1,filter:'blur(0px)'}}
        exit={{opacity:0,y:-10,scale:.95,filter:'blur(4px)'}}
        transition={{duration:.25,ease:[.2,.8,.2,1]}}
        className="fixed inset-x-4 top-16 z-30 rounded-2xl border border-black bg-paper p-5 shadow-2xl md:hidden"
      >
        {links.map(([href,key],i)=>
          <motion.div key={href} initial={{opacity:0,x:-20,filter:'blur(4px)'}} animate={{opacity:1,x:0,filter:'blur(0px)'}} transition={{delay:i*.06,ease:[.2,.8,.2,1]}}>
            <Link onClick={()=>setOpen(false)} className="flex items-center justify-between border-b border-black/10 py-4 text-lg font-semibold hover:text-pink transition-colors" href={href}>
              <Localized path={key}/>
              <ArrowUpRight size={17} className="text-black/30"/>
            </Link>
          </motion.div>
        )}
      </motion.div>}
    </AnimatePresence>

    {/* Mobile bottom nav - icon bar */}
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/10 bg-paper/95 backdrop-blur-xl safe-area-bottom md:hidden">
      <nav className="flex items-center justify-around px-2 py-2">
        {mobileNavItems.map(({href,icon:Icon,label})=>{
          const active=pathname===href;
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors">
              <div className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${active?'bg-pink text-white scale-110':'text-black/40'}`}>
                <Icon size={18}/>
                {active && <motion.div layoutId="mobileNav" className="absolute inset-0 rounded-full bg-pink" style={{zIndex:-1}} transition={{type:'spring',stiffness:300,damping:25}}/>}
              </div>
              <span className={`text-[9px] font-bold ${active?'text-pink':'text-black/40'}`}>
                <Localized path={label}/>
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  </>;
}
