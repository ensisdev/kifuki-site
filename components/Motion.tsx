'use client';
import {motion,useMotionValue,useSpring,useTransform,useScroll,useTransform as useTransformScroll} from 'framer-motion';
import {useRef,useEffect,useState,ReactNode} from 'react';

export function MagneticButton({children,className='',strength=.3}:{children:ReactNode;className?:string;strength?:number}){
  const ref=useRef<HTMLDivElement>(null);
  const x=useMotionValue(0);const y=useMotionValue(0);
  const springX=useSpring(x,{stiffness:150,damping:15});
  const springY=useSpring(y,{stiffness:150,damping:15});
  function handleMouse(e:React.MouseEvent){if(!ref.current)return;const r=ref.current.getBoundingClientRect();x.set((e.clientX-r.left-r.width/2)*strength);y.set((e.clientY-r.top-r.height/2)*strength)}
  function handleLeave(){x.set(0);y.set(0)}
  return <motion.div ref={ref} style={{x:springX,y:springY}} onMouseMove={handleMouse} onMouseLeave={handleLeave} className={className}>{children}</motion.div>;
}

export function TiltCard({children,className='',intensity=8}:{children:ReactNode;className?:string;intensity?:number}){
  const ref=useRef<HTMLDivElement>(null);
  const rotateX=useMotionValue(0);const rotateY=useMotionValue(0);
  const springX=useSpring(rotateX,{stiffness:200,damping:20});
  const springY=useSpring(rotateY,{stiffness:200,damping:20});
  function handleMouse(e:React.MouseEvent){if(!ref.current)return;const r=ref.current.getBoundingClientRect();rotateX.set((e.clientY-r.top-r.height/2)/r.height*-intensity);rotateY.set((e.clientX-r.left-r.width/2)/r.width*intensity)}
  function handleLeave(){rotateX.set(0);rotateY.set(0)}
  return <motion.div ref={ref} style={{rotateX:springX,rotateY:springY,transformPerspective:800}} onMouseMove={handleMouse} onMouseLeave={handleLeave} className={className}>{children}</motion.div>;
}

export function FloatingParticles({count=15,color='var(--violet)'}:{count?:number;color?:string}){
  const[particles,setParticles]=useState<{id:number;x:number;y:number;size:number;duration:number;delay:number;opacity:number}[]>([]);
  useEffect(()=>{setParticles(Array.from({length:count},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,size:Math.random()*4+2,duration:Math.random()*10+8,delay:Math.random()*5,opacity:Math.random()*.3+.1})))},[count]);
  return <div className="pointer-events-none absolute inset-0 overflow-hidden">{particles.map(p=>
    <motion.div key={p.id} className="absolute rounded-full" style={{left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,backgroundColor:color}}
      animate={{y:[0,-30,0],x:[0,Math.random()*20-10,0],opacity:[p.opacity,p.opacity*2,p.opacity],scale:[1,1.3,1]}}
      transition={{duration:p.duration,delay:p.delay,repeat:Infinity,ease:'easeInOut'}}/>
  )}</div>;
}

export function ScrollProgress(){
  const{scrollYProgress}=useScroll();
  const scaleX=useTransformScroll(scrollYProgress,[0,1],[0,1]);
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet via-pink to-cyan z-50 origin-left" style={{scaleX}}/>;
}

export function StaggerChildren({children,className='',stagger=.06,delay=0}:{children:ReactNode;className?:string;stagger?:number;delay?:number}){
  return <motion.div className={className} initial="hidden" whileInView="visible" viewport={{once:true,amount:.1}}
    variants={{hidden:{},visible:{transition:{staggerChildren:stagger,delayChildren:delay}}}}>{children}</motion.div>;
}

export function StaggerItem({children,className=''}:{children:ReactNode;className?:string}){
  return <motion.div className={className} variants={{hidden:{opacity:0,y:25,filter:'blur(4px)'},visible:{opacity:1,y:0,filter:'blur(0px)',transition:{duration:.5,ease:[.2,.8,.2,1]}}}}>{children}</motion.div>;
}

export function ParallaxSection({children,className='',speed=.3}:{children:ReactNode;className?:string;speed?:number}){
  const ref=useRef<HTMLDivElement>(null);
  const{scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
  const y=useTransformScroll(scrollYProgress,[0,1],[-60*speed,60*speed]);
  return <motion.div ref={ref} style={{y}} className={className}>{children}</motion.div>;
}

export function TextReveal({text,className='',delay=0}:{text:string;className?:string;delay?:number}){
  const words=text.split(' ');
  return <span className={`text-reveal ${className}`}>{words.map((w,i)=>
    <span key={i} style={{animationDelay:`${delay+i*.06}s`}}>{w}{' '}</span>
  )}</span>;
}

export function CursorGlow(){
  const[hovering,setHovering]=useState(false);
  useEffect(()=>{const els=document.querySelectorAll('a,button,[data-hover]');const enter=()=>setHovering(true);const leave=()=>setHovering(false);
    els.forEach(el=>{el.addEventListener('mouseenter',enter);el.addEventListener('mouseleave',leave)});
    return()=>{els.forEach(el=>{el.removeEventListener('mouseenter',enter);el.removeEventListener('mouseleave',leave)})}},[]);
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{const move=(e:MouseEvent)=>{if(ref.current){ref.current.style.left=e.clientX+'px';ref.current.style.top=e.clientY+'px'}};window.addEventListener('mousemove',move);return()=>window.removeEventListener('mousemove',move)},[]);
  return <div ref={ref} className={`cursor-glow hidden md:block ${hovering?'hovering':''}`}/>;
}

export function MorphBlob({className='',color='var(--violet)'}:{className?:string;color?:string}){
  return <div className={`animate-morph ${className}`} style={{background:color,opacity:.15}}/>;
}

export function OrbitingElements({radius=80,count=4,speed=12,children}:{radius?:number;count?:number;speed?:number;children:ReactNode}){
  return <div className="relative" style={{width:radius*2,height:radius*2}}>
    <motion.div className="absolute inset-0" animate={{rotate:360}} transition={{duration:speed,repeat:Infinity,ease:'linear'}}>
      {Array.from({length:count}).map((_,i)=>{const angle=(360/count)*i;return <div key={i} className="absolute" style={{left:'50%',top:'50%',transform:`rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`}}>{children}</div>})}
    </motion.div>
  </div>;
}

export function GlowCard({children,className='',glowColor='rgba(117,104,201,.3)'}:{children:ReactNode;className?:string;glowColor?:string}){
  const[hovered,setHovered]=useState(false);
  return <motion.div className={`relative ${className}`} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
    whileHover={{y:-4,transition:{duration:.3,ease:[.2,.8,.2,1]}}}>
    <motion.div className="absolute inset-0 rounded-[inherit]" animate={hovered?{opacity:1}:{opacity:0}} transition={{duration:.3}}
      style={{background:`radial-gradient(400px circle at var(--mouse-x,50%) var(--mouse-y,50%),${glowColor},transparent 60%)`}}/>
    <div className="relative z-10">{children}</div>
  </motion.div>;
}
