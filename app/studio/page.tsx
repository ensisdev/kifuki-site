import Localized from '@/components/Localized';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import {getArtworks} from '@/lib/db';

export default async function Studio(){
  const arts=await getArtworks();
  return <main className="min-h-screen px-5 pb-28 pt-32 sm:px-10">
    <div className="mx-auto max-w-7xl">
      <Reveal variant="slide-left">
        <span className="scribble text-xs text-black/50">KIFUKI / STUDIO</span>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_.8fr]">
          <h1 className="text-6xl font-bold leading-none sm:text-8xl"><Localized path="studioTitle"/></h1>
          <p className="max-w-lg text-lg leading-8 text-black/60"><Localized path="studioText"/></p>
        </div>
      </Reveal>
      <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
        {arts.map((a,i)=>
          <Reveal key={a.id} delay={(i%4)*.08} variant={i%2===0?'scale':'rotate'}>
            <article className="group relative overflow-hidden rounded-[1.7rem] border border-black/15 transition-all duration-500 hover:shadow-[6px_6px_0_#161616] hover:-translate-y-1 hover:rotate-1">
              <div className={`${i%3===0?'aspect-[4/5]':'aspect-square'} overflow-hidden`}>
                <Image src={a.image} alt={a.title} width={400} height={400} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"/>
              </div>
              <div className="absolute inset-x-3 bottom-3 rounded-xl bg-paper/90 p-3 backdrop-blur-sm transition-all duration-300 group-hover:bg-pink group-hover:text-white">
                <b className="text-sm">{a.title}</b>
                <div className="text-[10px] text-black/50 group-hover:text-white/70">{a.year}</div>
              </div>
            </article>
          </Reveal>
        )}
      </div>
    </div>
  </main>;
}
