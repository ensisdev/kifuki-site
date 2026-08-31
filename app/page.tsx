import ThreeCharacter from '@/components/ThreeCharacter';
import Marquee from '@/components/Marquee';
import Reveal from '@/components/Reveal';
import ProductCard from '@/components/ProductCard';
import Localized from '@/components/Localized';
import {getProducts,getArtworks} from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import {ArrowDownRight,ArrowUpRight,Sparkles,Star} from 'lucide-react';

export default async function Home(){
  const ps=await getProducts();
  const arts=await getArtworks();
  return <main className="paper">
    {/* HERO - UZAY TEMALI */}
    <section className="relative min-h-screen overflow-hidden hero-space">
      {/* Dekoratif yıldız noktalar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({length:20}).map((_,i)=>(
          <div key={i} className="absolute rounded-full bg-white animate-star" style={{
            left:`${Math.random()*100}%`,top:`${Math.random()*70}%`,
            width:`${Math.random()*3+1}px`,height:`${Math.random()*3+1}px`,
            animationDelay:`${Math.random()*5}s`,animationDuration:`${Math.random()*3+2}s`
          }}/>
        ))}
      </div>

      <div className="relative z-10 mx-auto grid min-h-[88vh] max-w-7xl items-center gap-2 px-5 pt-28 sm:px-10 lg:grid-cols-[.95fr_1.05fr]">
        <div className="relative z-10 pb-8">
          <Reveal variant="slide-left" duration={.8}>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase text-white/80 backdrop-blur-sm">
              <Sparkles size={12} className="text-pink"/>
              <Localized path="heroKicker"/>
            </div>
          </Reveal>
          <Reveal variant="blur" delay={.1} duration={.9}>
            <h1 className="max-w-3xl text-[clamp(3.5rem,9vw,8.8rem)] font-bold leading-[.82] tracking-[-.075em] text-white">
              <span className="text-gradient-violet">Küçük</span><br/>
              <span className="outline-text">çizimler,</span><br/>
              <span className="text-gradient-pink">büyük karakter.</span>
            </h1>
          </Reveal>
          <Reveal variant="slide-left" delay={.3} duration={.7}>
            <p className="mt-8 max-w-lg text-base leading-7 text-white/60">
              <Localized path="heroText"/>
            </p>
          </Reveal>
          <Reveal variant="slide-left" delay={.45} duration={.7}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="group rounded-full bg-pink px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-pink/30 hover:-translate-y-1 flex items-center">
                <Localized path="shopNow"/>
                <ArrowUpRight size={16} className="ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
              </Link>
              <Link href="/gallery" className="group rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50 flex items-center">
                <Localized path="discover"/>
                <Star size={14} className="ml-2 transition-transform group-hover:rotate-12"/>
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="relative">
          <Reveal variant="scale" delay={.2} duration={1}>
            <ThreeCharacter/>
          </Reveal>
          <div className="absolute right-5 top-10 rotate-6 rounded-xl border border-white/20 bg-violet/80 px-4 py-3 text-xs font-bold text-white shadow-[4px_4px_0_rgba(0,0,0,.3)] backdrop-blur-sm animate-float">
            DRAW<br/>STICK<br/>REPEAT
          </div>
        </div>
      </div>
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <ArrowDownRight/>
      </div>
    </section>

    <Marquee/>

    {/* ÜRÜNLER */}
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-10">
      <Reveal variant="slide-left">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <span className="scribble text-xs text-black/50">01 / shop</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl"><Localized path="featured"/></h2>
          </div>
          <Link href="/shop" className="group text-sm font-bold underline underline-offset-4 transition-colors hover:text-pink">
            <Localized path="viewAll"/>
            <ArrowUpRight size={14} className="ml-1 inline transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
          </Link>
        </div>
      </Reveal>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {ps.slice(0,3).map((p,i)=><Reveal key={p.id} delay={i*.1} variant="scale"><ProductCard p={p}/></Reveal>)}
      </div>
    </section>

    {/* STÜDYO */}
    <section className="border-y border-black bg-black px-5 py-24 text-white sm:px-10">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal variant="slide-left">
          <span className="scribble text-xs text-white/50">02 / studio</span>
          <h2 className="mt-4 text-5xl font-bold leading-none tracking-tight sm:text-7xl"><Localized path="studioTitle"/></h2>
          <p className="mt-7 max-w-xl text-white/65"><Localized path="studioText"/></p>
          <Link href="/studio" className="mt-8 inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5">
            <Localized path="nav.studio"/>
            <ArrowUpRight size={15} className="ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
          </Link>
        </Reveal>
        <div className="grid grid-cols-2 gap-3">
          {arts.slice(0,4).map((a,i)=>
            <Reveal key={a.id} delay={i*.1} variant={i%2===0?'scale':'rotate'}>
              <div className={`group relative overflow-hidden rounded-2xl border border-white/20 ${i%3===0?'aspect-[4/5]':'aspect-square'}`}>
                <Image src={a.image} alt={a.title} fill className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1" sizes="25vw"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"/>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>

    {/* İLETİŞİM */}
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-10">
      <Reveal variant="scale">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-black bg-pink p-8 sm:p-14">
          <span className="scribble text-xs">03 / hello</span>
          <h2 className="mt-4 max-w-3xl text-5xl font-bold leading-none sm:text-7xl"><Localized path="contactTitle"/></h2>
          <p className="mt-6 max-w-xl text-black/65"><Localized path="contactText"/></p>
          <Link href="/contact" className="mt-8 inline-flex items-center rounded-full border border-black bg-paper px-5 py-3 text-sm font-bold transition-all duration-300 hover:shadow-[4px_4px_0_#161616] hover:-translate-y-1">
            Get in touch
            <ArrowUpRight size={16} className="ml-2"/>
          </Link>
          <div className="absolute -right-10 -top-10 hidden h-40 w-40 rotate-12 rounded-full border-2 border-black/20 sm:block animate-spin-slow"/>
          <div className="absolute -bottom-5 -right-5 hidden h-24 w-24 rounded-full border-2 border-black/20 sm:block animate-float"/>
        </div>
      </Reveal>
    </section>

    {/* FOOTER */}
    <footer className="border-t border-black px-5 py-8 text-xs sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 sm:flex-row">
        <span>© 2026 Kifuki</span>
        <span><Localized path="footer"/></span>
        <a href="https://www.shopier.com/kifuki" target="_blank" rel="noreferrer" className="transition-colors hover:text-pink">Shopier ↗</a>
      </div>
    </footer>
  </main>;
}
