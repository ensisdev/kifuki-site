'use client';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import {Float,PerspectiveCamera,Image as DreiImage} from '@react-three/drei';
import {useRef,useMemo} from 'react';
import * as THREE from 'three';

function Stars({count=200}:{count?:number}){
  const ref=useRef<THREE.Points>(null!);
  const positions=useMemo(()=>{const arr=new Float32Array(count*3);for(let i=0;i<count;i++){arr[i*3]=(Math.random()-.5)*30;arr[i*3+1]=(Math.random()-.5)*30;arr[i*3+2]=(Math.random()-.5)*15-5}return arr},[count]);
  const sizes=useMemo(()=>{const arr=new Float32Array(count);for(let i=0;i<count;i++) arr[i]=Math.random()*2+.5;return arr},[count]);
  useFrame((s)=>{if(ref.current){ref.current.rotation.y=s.clock.elapsedTime*.01;ref.current.rotation.x=Math.sin(s.clock.elapsedTime*.005)*.1}});
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]}/><bufferAttribute attach="attributes-size" args={[sizes,3]}/></bufferGeometry><pointsMaterial size={.04} color="#ffffff" transparent opacity={.7} sizeAttenuation depthWrite={false}/></points>;
}

function FloatingRing({radius=2.5,speed=.3,color='#ff6b9a'}:{radius?:number;speed?:number;color?:string}){
  const ref=useRef<THREE.Mesh>(null!);
  useFrame((s)=>{if(ref.current){ref.current.rotation.z=s.clock.elapsedTime*speed;ref.current.rotation.x=Math.PI/3+.2}});
  return <mesh ref={ref}><torusGeometry args={[radius,.015,16,100]}/><meshBasicMaterial color={color} transparent opacity={.35}/></mesh>;
}

function GlowOrb({position,delay=0}:{position:[number,number,number];delay?:number}){
  const ref=useRef<THREE.Mesh>(null!);
  useFrame((s)=>{if(ref.current){const t=s.clock.elapsedTime+delay;ref.current.position.y=position[1]+Math.sin(t*.5)*.3;ref.current.scale.setScalar(1+Math.sin(t*1.5)*.15)}});
  return <mesh ref={ref} position={position}><sphereGeometry args={[.08,16,16]}/><meshBasicMaterial color="#7568c9" transparent opacity={.5}/></mesh>;
}

function Character(){
  const ref=useRef<THREE.Group>(null!);
  const glowRef=useRef<THREE.Mesh>(null!);
  useFrame((s)=>{
    if(ref.current){
      ref.current.rotation.y=THREE.MathUtils.lerp(ref.current.rotation.y,s.pointer.x*.15,.04);
      ref.current.rotation.x=THREE.MathUtils.lerp(ref.current.rotation.x,-s.pointer.y*.08,.04);
    }
    if(glowRef.current){
      const t=s.clock.elapsedTime;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity=.15+Math.sin(t*2)*.08;
      glowRef.current.scale.setScalar(1+Math.sin(t*1.5)*.05);
    }
  });
  return (
    <Float speed={.8} rotationIntensity={.12} floatIntensity={.35}>
      <group ref={ref}>
        <DreiImage url="/character/karakter.png" transparent scale={[3.5,4.6]}/>
        <mesh ref={glowRef} position={[0,0,-.1]}>
          <circleGeometry args={[2.8,32]}/>
          <meshBasicMaterial color="#7568c9" transparent opacity={.15} side={THREE.DoubleSide}/>
        </mesh>
      </group>
    </Float>
  );
}

function Scene(){
  const {gl}=useThree();
  return <>
    <PerspectiveCamera makeDefault position={[0,0,7]}/>
    <ambientLight intensity={1.5}/>
    <directionalLight position={[5,5,5]} intensity={.8}/>
    <pointLight position={[-3,2,4]} intensity={.6} color="#ff6b9a"/>
    <pointLight position={[3,-2,4]} intensity={.6} color="#53d7d1"/>
    <Stars count={250}/>
    <FloatingRing radius={3.2} speed={.15} color="#ff6b9a"/>
    <FloatingRing radius={3.8} speed={-.1} color="#53d7d1"/>
    <FloatingRing radius={4.4} speed={.08} color="#7568c9"/>
    <GlowOrb position={[-2.5,1.5,-1]} delay={0}/>
    <GlowOrb position={[2.5,-1,-1]} delay={1.5}/>
    <GlowOrb position={[-1,-2,-1]} delay={3}/>
    <GlowOrb position={[1.5,2,-1]} delay={4.5}/>
    <Character/>
  </>;
}

export default function ThreeCharacter(){
  return (
    <div className="relative h-[520px] w-full sm:h-[680px]">
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-[#0a0a1a] via-[#12122a] to-[#1a1a3a] opacity-90"/>
      <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(117,104,201,0.15)_0%,transparent_70%)]"/>
      <Canvas dpr={[1,1.7]} gl={{alpha:true,antialias:true}}>
        <Scene/>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-gradient-to-t from-[#0a0a1a]/60 via-transparent to-transparent"/>
    </div>
  );
}
