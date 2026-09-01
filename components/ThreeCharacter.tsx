'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {PerspectiveCamera} from '@react-three/drei';
import {useRef,useMemo} from 'react';
import * as THREE from 'three';
import Image from 'next/image';

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
  return (
    <div className="relative h-[520px] w-full sm:h-[680px]">
      {/* Space background with gradients */}
      <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060612] via-[#0c0c24] to-[#141432]"/>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(117,104,201,.12)_0%,transparent_50%)]"/>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(255,107,154,.08)_0%,transparent_50%)]"/>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(83,215,209,.06)_0%,transparent_60%)]"/>
      </div>

      {/* Three.js star field and effects */}
      <Canvas dpr={[1,1.7]} gl={{alpha:true,antialias:true}} className="absolute inset-0">
        <SpaceScene/>
      </Canvas>

      {/* Character image - HTML overlay with CSS animations */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="relative animate-float" style={{filter:'drop-shadow(0 0 30px rgba(117,104,201,.4)) drop-shadow(0 0 60px rgba(255,107,154,.2))'}}>
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
          <div className="absolute inset-0 -m-8 rounded-full border border-white/10 animate-spin-slow"/>
          <div className="absolute inset-0 -m-16 rounded-full border border-violet/10 animate-spin-reverse"/>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-gradient-to-t from-[#060612]/70 via-transparent to-[#060612]/20 z-20"/>
      <div className="pointer-events-none absolute inset-0 rounded-[3rem] animate-glow-pulse z-20"/>
    </div>
  );
}
