'use client';
import Link from 'next/link';
import {ArrowLeft,Home,Sparkles} from 'lucide-react';
import {motion} from 'framer-motion';
import {MagneticButton} from '@/components/Motion';

export default function NotFound(){
  return <main className="grid min-h-screen place-items-center px-5 pt-20">
    <div className="text-center">
      <motion.div initial={{opacity:0,scale:.5}} animate={{opacity:1,scale:1}} transition={{type:'spring',stiffness:200,damping:15}}>
        <div className="scribble text-xs flex items-center justify-center gap-2">
          <Sparkles size={12} className="text-pink"/>
          404 / OOPS
        </div>
      </motion.div>
      <motion.h1 className="mt-4 text-7xl font-bold"
        initial={{opacity:0,y:20,filter:'blur(8px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} transition={{delay:.15,duration:.7}}>
        Kaybolduk.
      </motion.h1>
      <motion.p className="mt-4 text-black/50" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.3}}>
        Aradığın sayfa burada değil gibi görünüyor.
      </motion.p>
      <motion.div className="mt-8 flex justify-center gap-3" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.45}}>
        <MagneticButton strength={.1}>
          <Link className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 btn-press" href="/">
            <Home size={16}/>Ana sayfaya dön
          </Link>
        </MagneticButton>
        <MagneticButton strength={.1}>
          <button onClick={()=>history.back()} className="inline-flex items-center gap-2 rounded-full border border-black px-6 py-3 text-sm font-bold transition-all duration-300 hover:bg-black hover:text-white btn-press">
            <ArrowLeft size={16}/>- Geri dön
          </button>
        </MagneticButton>
      </motion.div>
    </div>
  </main>;
}
