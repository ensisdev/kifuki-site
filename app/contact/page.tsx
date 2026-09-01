import Localized from '@/components/Localized';
import Reveal from '@/components/Reveal';
import {Mail,ExternalLink,MapPin,Clock,Sparkles} from 'lucide-react';
import {StaggerChildren,StaggerItem,FloatingParticles} from '@/components/Motion';

export default function Contact(){
  return <main className="min-h-screen px-5 pb-28 pt-32 sm:px-10">
    <div className="mx-auto max-w-5xl">
      <Reveal variant="slide-left">
        <div className="flex items-center gap-3">
          <Sparkles size={16} className="text-cyan"/>
          <span className="scribble text-xs text-black/50">KIFUKI / CONTACT</span>
        </div>
        <h1 className="mt-5 text-6xl font-bold tracking-tight sm:text-8xl"><Localized path="contactTitle"/></h1>
      </Reveal>
      <Reveal variant="blur" delay={.1}>
        <p className="mt-6 max-w-xl text-lg text-black/60"><Localized path="contactText"/></p>
      </Reveal>

      <StaggerChildren className="mt-12 grid gap-4 sm:grid-cols-2" stagger={.12}>
        <StaggerItem>
          <a href="mailto:hello@kifuki.com" className="group flex items-center gap-4 rounded-2xl border border-black bg-white p-6 transition-all duration-500 hover:shadow-[6px_6px_0_#161616] hover:-translate-y-1 hover:bg-pink hover:text-white hover:border-pink">
            <div className="w-12 h-12 rounded-xl bg-pink/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:rotate-6">
              <Mail size={20} className="text-pink group-hover:text-white"/>
            </div>
            <div>
              <div className="font-bold text-lg">E-posta</div>
              <div className="text-sm text-black/50 group-hover:text-white/70">hello@kifuki.com</div>
            </div>
            <ExternalLink size={16} className="ml-auto opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
          </a>
        </StaggerItem>
        <StaggerItem>
          <a href="https://www.shopier.com/kifuki" target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-black bg-black p-6 text-white transition-all duration-500 hover:shadow-[6px_6px_0_#161616] hover:-translate-y-1 hover:bg-violet hover:border-violet">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <ExternalLink size={20}/>
            </div>
            <div>
              <div className="font-bold text-lg">Shopier</div>
              <div className="text-sm text-white/60">Mağazamızı ziyaret et</div>
            </div>
            <ExternalLink size={16} className="ml-auto opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
          </a>
        </StaggerItem>
      </StaggerChildren>

      <StaggerChildren className="mt-12 grid gap-4 sm:grid-cols-3" stagger={.1}>
        {[
          {icon:MapPin,title:'Konum',text:'İstanbul, Türkiye',color:'text-violet',bg:'bg-violet/10'},
          {icon:Clock,title:'Yanıt Süresi',text:'24 saat içinde',color:'text-pink',bg:'bg-pink/10'},
          {icon:Mail,title:'Diller',text:'Türkçe, English',color:'text-cyan',bg:'bg-cyan/10'}
        ].map((c,i)=>
          <StaggerItem key={i}>
            <div className="group rounded-2xl border border-black/10 bg-white p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                <c.icon size={18} className={c.color}/>
              </div>
              <div className="text-sm font-bold">{c.title}</div>
              <div className="text-xs text-black/50 mt-1">{c.text}</div>
            </div>
          </StaggerItem>
        )}
      </StaggerChildren>
    </div>
  </main>;
}
