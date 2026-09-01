'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {PerspectiveCamera} from '@react-three/drei';
import {useRef,useMemo,useState,useEffect,Component,ReactNode} from 'react';
import * as THREE from 'three';
import Image from 'next/image';
import {motion,useMotionValue,useSpring,useScroll,useTransform} from 'framer-motion';

class WebGLErrorBoundary extends Component<{children:ReactNode},{hasError:boolean}>{
  state={hasError:false};
  static getDerivedStateFromError(){return{hasError:true}}
  render(){return this.state.hasError?null:this.props.children}
}

function Stars({count=300}:{count?:number}){
  const ref=useRef<THREE.Points>(null!);
  const [positions,sizes,colors]=useMemo(()=>{
    const pos=new Float32Array(count*3);const sz=new Float32Array(count);const col=new Float32Array(count*3);
    const palette=[[1,.5,.65],[.45,.65,.83],[.33,.84,.82],[1,.85,.24]];
    for(let i=0;i<count;i++){
      pos[i*3]=(Math.random()-.5)*40;pos[i*3+1]=(Math.random()-.5)*40;pos[i*3+2]=(Math.random()-.5)*20-5;
      sz[i]=Math.random()*2.5+.3;
      const c=palette[Math.floor(Math.random()*palette.length)];col[i*3]=c[0];col[i*3+1]=c[1];col[i*3+2]=c[2];
    }
    return[pos,sz,col] as const;
  },[count]);
  useFrame((s)=>{if(ref.current){ref.current.rotation.y=s.clock.elapsedTime*.008;ref.current.rotation.x=Math.sin(s.clock.elapsedTime*.004)*.08}});
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]}/><bufferAttribute attach="attributes-size" args={[sizes,3]}/><bufferAttribute attach="attributes-color" args={[colors,3]}/></bufferGeometry><pointsMaterial size={.05} vertexColors transparent opacity={.8} sizeAttenuation depthWrite={false}/></points>;
}

function FloatingRing({radius=2.5,speed=.3,color='#ff6b9a',tilt=Math.PI/3}){
  const ref=useRef<THREE.Mesh>(null!);
  useFrame((s)=>{if(ref.current){ref.current.rotation.z=s.clock.elapsedTime*speed;ref.current.rotation.x=tilt}});
  return <mesh ref={ref}><torusGeometry args={[radius,.012,16,100]}/><meshBasicMaterial color={color} transparent opacity={.3}/></mesh>;
}

function GlowOrb({position,delay=0,color='#7568c9',size=.08}:{position:[number,number,number];delay?:number;color?:string;size?:number}){
  const ref=useRef<THREE.Mesh>(null!);
  useFrame((s)=>{if(ref.current){const t=s.clock.elapsedTime+delay;ref.current.position.y=position[1]+Math.sin(t*.5)*.4;ref.current.position.x=position[0]+Math.cos(t*.3)*.2;ref.current.scale.setScalar(1+Math.sin(t*1.5)*.2)}});
  return <mesh ref={ref} position={position}><sphereGeometry args={[size,16,16]}/><meshBasicMaterial color={color} transparent opacity={.5}/></mesh>;
}

function ShootingStar(){
  const ref=useRef<THREE.Mesh>(null!);
  const startPos=useMemo(()=>new THREE.Vector3((Math.random()-.5)*20,Math.random()*8+5,-5),[]);
  const speed=useMemo(()=>Math.random()*.3+.2,[]);
  const delay=useMemo(()=>Math.random()*10,[]);
  useFrame((s)=>{
    if(!ref.current)return;
    const t=(s.clock.elapsedTime+delay)*speed;
    const loop=t%8;
    if(loop<2){
      ref.current.position.x=startPos.x+loop*12;
      ref.current.position.y=startPos.y-loop*4;
      ref.current.position.z=startPos.z;
      ref.current.scale.setScalar(Math.min(loop,.5)*2);
      (ref.current.material as THREE.MeshBasicMaterial).opacity=Math.min(1,loop*2);
    }else{
      (ref.current.material as THREE.MeshBasicMaterial).opacity=0;
      ref.current.scale.setScalar(0);
    }
  });
  return <mesh ref={ref}><sphereGeometry args={[.04,8,8]}/><meshBasicMaterial color="#ffffff" transparent opacity={0}/></mesh>;
}

function NebulaCloud({position,color,scale=1}:{position:[number,number,number];color:string;scale?:number}){
  const ref=useRef<THREE.Mesh>(null!);
  useFrame((s)=>{if(ref.current){const t=s.clock.elapsedTime;ref.current.rotation.z=t*.05;ref.current.scale.setScalar(scale*(1+Math.sin(t*.3)*.1))}});
  return <mesh ref={ref} position={position}><planeGeometry args={[3,3]}/><meshBasicMaterial color={color} transparent opacity={.06} side={THREE.DoubleSide} depthWrite={false}/></mesh>;
}

function SpaceScene(){
  return <>
    <PerspectiveCamera makeDefault position={[0,0,7]}/>
    <ambientLight intensity={1.2}/>
    <directionalLight position={[5,5,5]} intensity={.7}/>
    <pointLight position={[-4,3,5]} intensity={.8} color="#ff6b9a" distance={15}/>
    <pointLight position={[4,-2,5]} intensity={.7} color="#53d7d1" distance={15}/>
    <Stars count={350}/>
    <FloatingRing radius={3} speed={.12} color="#ff6b9a" tilt={Math.PI/3}/>
    <FloatingRing radius={3.6} speed={-.08} color="#53d7d1" tilt={Math.PI/2.5}/>
    <FloatingRing radius={4.2} speed={.06} color="#7568c9" tilt={Math.PI/4}/>
    <FloatingRing radius={4.8} speed={-.04} color="#ffd83d" tilt={Math.PI/3.5}/>
    <GlowOrb position={[-2.5,1.5,-1]} delay={0} color="#ff6b9a" size={.06}/>
    <GlowOrb position={[2.5,-1,-1]} delay={1.5} color="#53d7d1" size={.07}/>
    <GlowOrb position={[-1,-2,-1]} delay={3} color="#7568c9" size={.05}/>
    <GlowOrb position={[1.5,2,-1]} delay={4.5} color="#ffd83d" size={.06}/>
    <GlowOrb position={[-3,0,-2]} delay={2} color="#ff6b9a" size={.04}/>
    <GlowOrb position={[3,1,-2]} delay={5} color="#53d7d1" size={.04}/>
    <ShootingStar/><ShootingStar/><ShootingStar/>
    <NebulaCloud position={[-5,3,-8]} color="#7568c9" scale={1.5}/>
    <NebulaCloud position={[5,-2,-8]} color="#ff6b9a" scale={1.2}/>
    <NebulaCloud position={[0,5,-10]} color="#53d7d1" scale={1.8}/>
  </>;
}

export default function ThreeCharacter(){
  const[supportsWebGL,setSupportsWebGL]=useState<boolean|null>(null);
  useEffect(()=>{try{const c=document.createElement('canvas');const gl=c.getContext('webgl')||c.getContext('experimental-webgl');setSupportsWebGL(!!gl)}catch{setSupportsWebGL(false)}},[]);

  // Mouse parallax
  const mouseX=useMotionValue(0);const mouseY=useMotionValue(0);
  const springX=useSpring(mouseX,{stiffness:50,damping:20});
  const springY=useSpring(mouseY,{stiffness:50,damping:20});

  // Scroll transforms
  const containerRef=useRef<HTMLDivElement>(null);
  const{scrollYProgress}=useScroll({target:containerRef,offset:['start end','end start']});
  const scrollRotateX=useTransform(scrollYProgress,[0,1],[8,-8]);
  const scrollRotateY=useTransform(scrollYProgress,[0,1],[-5,5]);
  const scrollScale=useTransform(scrollYProgress,[0,.5,1],[.92,1,.95]);
  const scrollY=useTransform(scrollYProgress,[0,1],[40,-40]);
  const glowOpacity=useTransform(scrollYProgress,[0,.5,1],[.3,.8,.4]);

  function handleMouse(e:React.MouseEvent){
    const rect=(e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set((e.clientX-rect.left-rect.width/2)/rect.width*12);
    mouseY.set((e.clientY-rect.top-rect.height/2)/rect.height*8);
  }
  function handleLeave(){mouseX.set(0);mouseY.set(0)}

  return (
    <div ref={containerRef} className="relative h-[520px] w-full sm:h-[680px]" onMouseMove={handleMouse} onMouseLeave={handleLeave}>
      {/* Space background with gradients */}
      <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060612] via-[#0c0c24] to-[#141432]"/>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(117,104,201,.12)_0%,transparent_50%)]"/>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(255,107,154,.08)_0%,transparent_50%)]"/>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(83,215,209,.06)_0%,transparent_60%)]"/>
      </div>

      {/* Three.js star field and effects - with WebGL fallback */}
      {supportsWebGL!==false && (
        <WebGLErrorBoundary>
          <Canvas dpr={[1,1.7]} gl={{alpha:true,antialias:true}} className="absolute inset-0">
            <SpaceScene/>
          </Canvas>
        </WebGLErrorBoundary>
      )}

      {/* Character image - with mouse parallax + scroll transforms */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        style={{rotateX:scrollRotateX,rotateY:scrollRotateY,scale:scrollScale,y:scrollY,perspective:800}}
      >
        <motion.div
          className="relative"
          style={{x:springX,y:springY,filter:'drop-shadow(0 0 30px rgba(117,104,201,.4)) drop-shadow(0 0 60px rgba(255,107,154,.2))'}}
          animate={{y:[0,-14,0]}}
          transition={{duration:6,ease:'easeInOut',repeat:Infinity}}
        >
          <Image
            src="/character/karakter.png"
            alt="Kifuki Character"
            width={420}
            height={560}
            className="w-auto h-auto max-h-[500px] sm:max-h-[600px]"
            style={{objectFit:'contain'}}
            priority
          />
          {/* Glow ring behind character */}
          <motion.div className="absolute inset-0 -m-8 rounded-full border border-white/10 animate-spin-slow" style={{opacity:glowOpacity}}/>
          <motion.div className="absolute inset-0 -m-16 rounded-full border border-violet/10 animate-spin-reverse" style={{opacity:glowOpacity}}/>
        </motion.div>
      </motion.div>

      {/* Bottom gradient overlay - below character */}
      <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-gradient-to-t from-[#060612]/70 via-transparent to-[#060612]/20 z-[5]"/>
      <div className="pointer-events-none absolute inset-0 rounded-[3rem] animate-glow-pulse z-[5]"/>
    </div>
  );
}
