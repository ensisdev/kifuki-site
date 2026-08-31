import {getProduct} from '@/lib/db';
import {notFound} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowUpRight,ArrowLeft,ShoppingBag} from 'lucide-react';
import Reveal from '@/components/Reveal';

export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
  const p=await getProduct((await params).slug);
  if(!p)notFound();
  return <main className="min-h-screen px-5 pb-28 pt-32 sm:px-10">
    <div className="mx-auto max-w-6xl">
      <Reveal variant="slide-left">
        <Link href="/shop" className="group inline-flex items-center gap-2 text-xs font-bold uppercase transition-colors hover:text-pink">
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1"/>Back to shop
        </Link>
      </Reveal>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <Reveal variant="scale">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-black/15 bg-white">
            <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 hover:scale-105"/>
          </div>
        </Reveal>
        <Reveal variant="slide-right" delay={.1}>
          <div className="flex flex-col justify-center">
            <span className="scribble text-xs text-black/50">{p.category}</span>
            <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl">{p.name}</h1>
            <p className="mt-6 max-w-lg leading-7 text-black/60">{p.description}</p>
            <div className="mt-8 text-3xl font-bold text-violet">{p.price} {p.currency}</div>
            <a href={p.shopierUrl||'https://www.shopier.com/kifuki'} target="_blank" rel="noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1">
              <ShoppingBag size={16}/>Shopier'den satın al
              <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
            </a>
            <p className="mt-4 text-xs text-black/45">Ödeme ve sipariş süreci Shopier üzerinde gerçekleşir.</p>
          </div>
        </Reveal>
      </div>
    </div>
  </main>;
}
