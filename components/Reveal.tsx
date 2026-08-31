'use client';
import {motion,useMotionValue,useSpring,useTransform} from 'framer-motion';
import {useRef} from 'react';

type Variant='default'|'scale'|'slide-left'|'slide-right'|'blur'|'rotate';

const variants:{
  [k in Variant]:{initial:Record<string,any>;whileInView:Record<string,any>}
}={
  default:{initial:{opacity:0,y:35},whileInView:{opacity:1,y:0}},
  scale:{initial:{opacity:0,scale:.85},whileInView:{opacity:1,scale:1}},
  'slide-left':{initial:{opacity:0,x:-40},whileInView:{opacity:1,x:0}},
  'slide-right':{initial:{opacity:0,x:40},whileInView:{opacity:1,x:0}},
  blur:{initial:{opacity:0,filter:'blur(8px)',y:20},whileInView:{opacity:1,filter:'blur(0px)',y:0}},
  rotate:{initial:{opacity:0,rotate:-8,scale:.9},whileInView:{opacity:1,rotate:0,scale:1}}
};

export default function Reveal({
  children,
  className='',
  delay=0,
  variant='default',
  once=true,
  amount=.15,
  duration=.7,
  spring=false
}:{children:React.ReactNode;className?:string;delay?:number;variant?:Variant;once?:boolean;amount?:number;duration?:number;spring?:boolean}){
  const v=variants[variant]||variants.default;
  const springConfig={type:'spring' as const,stiffness:100,damping:20,mass:.8};
  return <motion.div
    className={className}
    initial={v.initial}
    whileInView={v.whileInView}
    viewport={{once,amount}}
    transition={spring?{...springConfig,delay}:{duration,delay,ease:[.2,.8,.2,1]}}
  >{children}</motion.div>;
}

export function ParallaxReveal({children,className='',speed=.5}:{children:React.ReactNode;className?:string;speed?:number}){
  const ref=useRef<HTMLDivElement>(null);
  const y=useMotionValue(0);
  const springY=useSpring(y,{stiffness:60,damping:20});
  const offset=useTransform(springY,[-1,1],[-30*speed,30*speed]);
  return <motion.div ref={ref} style={{y:offset}} className={className} initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true,amount:.2}} transition={{duration:.6}}>{children}</motion.div>;
}
