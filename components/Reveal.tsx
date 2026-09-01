'use client';
import {motion,useMotionValue,useSpring,useTransform} from 'framer-motion';
import {useRef} from 'react';

type Variant='default'|'scale'|'slide-left'|'slide-right'|'blur'|'rotate'|'clip-up'|'clip-down'|'zoom-rotate'|'flip'|'glitch';

const variants:{
  [k in Variant]:{initial:Record<string,any>;whileInView:Record<string,any>}
}={
  default:{initial:{opacity:0,y:35},whileInView:{opacity:1,y:0}},
  scale:{initial:{opacity:0,scale:.85},whileInView:{opacity:1,scale:1}},
  'slide-left':{initial:{opacity:0,x:-40},whileInView:{opacity:1,x:0}},
  'slide-right':{initial:{opacity:0,x:40},whileInView:{opacity:1,x:0}},
  blur:{initial:{opacity:0,filter:'blur(8px)',y:20},whileInView:{opacity:1,filter:'blur(0px)',y:0}},
  rotate:{initial:{opacity:0,rotate:-8,scale:.9},whileInView:{opacity:1,rotate:0,scale:1}},
  'clip-up':{initial:{clipPath:'inset(100% 0 0 0)',opacity:0},whileInView:{clipPath:'inset(0% 0 0 0)',opacity:1}},
  'clip-down':{initial:{clipPath:'inset(0 0 100% 0)',opacity:0},whileInView:{clipPath:'inset(0 0 0% 0)',opacity:1}},
  'zoom-rotate':{initial:{opacity:0,scale:.6,rotate:-12},whileInView:{opacity:1,scale:1,rotate:0}},
  flip:{initial:{opacity:0,rotateY:-90},whileInView:{opacity:1,rotateY:0}},
  glitch:{initial:{opacity:0,x:-3,skewX:-2},whileInView:{opacity:1,x:0,skewX:0}}
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
    style={variant==='flip'?{transformPerspective:800}:undefined}
  >{children}</motion.div>;
}

export function ParallaxReveal({children,className='',speed=.5}:{children:React.ReactNode;className?:string;speed?:number}){
  const ref=useRef<HTMLDivElement>(null);
  const y=useMotionValue(0);
  const springY=useSpring(y,{stiffness:60,damping:20});
  const offset=useTransform(springY,[-1,1],[-30*speed,30*speed]);
  return <motion.div ref={ref} style={{y:offset}} className={className} initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true,amount:.2}} transition={{duration:.6}}>{children}</motion.div>;
}

export function SplitReveal({children,className='',direction='left'}:{children:React.ReactNode;className?:string;direction?:'left'|'right'|'up'|'down'}){
  const dirs={left:{x:-50,clip:'inset(0 100% 0 0)'},right:{x:50,clip:'inset(0 0 0 100%)'},up:{y:-40,clip:'inset(100% 0 0 0)'},down:{y:40,clip:'inset(0 0 100% 0)'}};
  const d=dirs[direction];
  return <motion.div className={className}
    initial={{opacity:0,clipPath:d.clip,...('x' in d?{x:d.x}:{y:d.y})}}
    whileInView={{opacity:1,clipPath:'inset(0 0 0 0)',x:0,y:0}}
    viewport={{once:true,amount:.2}} transition={{duration:.8,ease:[.16,1,.3,1]}}>{children}</motion.div>;
}

export function CountUpReveal({target,duration=2,delay=0,className=''}:{target:number;duration?:number;delay?:number;className?:string}){
  return <motion.span className={className} initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
    transition={{delay}}>
    <motion.span initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:delay+.1}}>
      {target}
    </motion.span>
  </motion.span>;
}
