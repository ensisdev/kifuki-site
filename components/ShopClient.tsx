'use client';
import ProductCard from '@/components/ProductCard';
import Localized from '@/components/Localized';
import Reveal from '@/components/Reveal';
import {ShoppingBag,Sparkles} from 'lucide-react';
import {StaggerChildren,StaggerItem} from '@/components/Motion';
import {useState} from 'react';
import type {Product} from '@/lib/types';

export default function ShopClient({products}:{products:Product[]}){
  const cats=['All',...Array.from(new Set(products.map(p=>p.category)))];
  const[active,setActive]=useState('All');
  const filtered=active==='All'?products:products.filter(p=>p.category===active);
  return <>
    <Reveal variant="slide-left">
      <div className="flex items-center gap-3">
        <Sparkles size={16} className="text-pink"/>
        <span className="scribble text-xs text-black/50">KIFUKI / SHOP</span>
      </div>
      <h1 className="mt-5 text-6xl font-bold tracking-tight sm:text-8xl"><Localized path="nav.shop"/></h1>
      <p className="mt-5 max-w-xl text-black/60">Küçük şeyler, büyük enerji. Satın alma işlemi Shopier üzerinden tamamlanır.</p>
    </Reveal>
    <Reveal variant="slide-left" delay={.1}>
      <div className="mt-10 flex flex-wrap gap-2">
        {cats.map((c)=>
          <button key={c} onClick={()=>setActive(c)}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 btn-press ${active===c?'bg-black text-white border-black':'border border-black/20 hover:bg-black hover:text-white hover:border-black'}`}>
            {c}
          </button>
        )}
      </div>
    </Reveal>
    <StaggerChildren className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4" stagger={.08}>
      {filtered.map((p)=><StaggerItem key={p.id}><ProductCard p={p}/></StaggerItem>)}
    </StaggerChildren>
    {filtered.length===0&&(
      <Reveal variant="blur">
        <div className="mt-20 text-center">
          <ShoppingBag size={48} className="mx-auto text-black/20 mb-4"/>
          <p className="text-lg text-black/40">Bu kategoride ürün bulunamadı.</p>
        </div>
      </Reveal>
    )}
  </>;
}
