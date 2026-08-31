'use client';
import Localized from '@/components/Localized';
import Reveal from '@/components/Reveal';
import {Mail,ExternalLink,MapPin,Clock} from 'lucide-react';

export default function Contact(){
  return <main className="min-h-screen px-5 pb-28 pt-32 sm:px-10">
    <div className="mx-auto max-w-5xl">
      <Reveal variant="slide-left">
        <span className="scribble text-xs text-black/50">KIFUKI / CONTACT</span>
        <h1 className="mt-5 text-6xl font-bold tracking-tight sm:text-8xl"><Localized path="contactTitle"/></h1>
      </Reveal>
      <Reveal variant="blur" delay={.1}>
        <p className="mt-6 max-w-xl text-lg text-black/60"><Localized path="contactText"/></p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Reveal variant="slide-left" delay={.15}>
          <a href="mailto:hello@kifuki.com" className="group flex items-center gap-4 rounded-2xl border border-black bg-white p-6 transition-all duration-300 hover:shadow-[6px_6px_0_#161616] hover:-translate-y-1 hover:bg-pink hover:text-white hover:border-pink">
            <div className="w-12 h-12 rounded-xl bg-pink/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Mail size={20} className="text-pink group-hover:text-white"/>
            </div>
            <div>
              <div className="font-bold text-lg">E-posta</div>
              <div className="text-sm text-black/50 group-hover:text-white/70">hello@kifuki.com</div>
            </div>
            <ExternalLink size={16} className="ml-auto opacity-30 group-hover:opacity-100 transition-opacity"/>
          </a>
        </Reveal>
        <Reveal variant="slide-right" delay={.2}>
          <a href="https://www.shopier.com/kifuki" target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-black bg-black p-6 text-white transition-all duration-300 hover:shadow-[6px_6px_0_#161616] hover:-translate-y-1 hover:bg-violet hover:border-violet">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <ExternalLink size={20}/>
            </div>
            <div>
              <div className="font-bold text-lg">Shopier</div>
              <div className="text-sm text-white/60">Mağazamızı ziyaret et</div>
            </div>
            <ExternalLink size={16} className="ml-auto opacity-30 group-hover:opacity-100 transition-opacity"/>
          </a>
        </Reveal>
      </div>

      <Reveal variant="scale" delay={.3}>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <MapPin size={18} className="text-violet mb-2"/>
            <div className="text-sm font-bold">Konum</div>
            <div className="text-xs text-black/50 mt-1">İstanbul, Türkiye</div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <Clock size={18} className="text-pink mb-2"/>
            <div className="text-sm font-bold">Yanıt Süresi</div>
            <div className="text-xs text-black/50 mt-1">24 saat içinde</div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <Mail size={18} className="text-cyan mb-2"/>
            <div className="text-sm font-bold">Diller</div>
            <div className="text-xs text-black/50 mt-1">Türkçe, English</div>
          </div>
        </div>
      </Reveal>
    </div>
  </main>;
}
