import {getArtworks} from '@/lib/db';
import Image from 'next/image';
import Reveal from '@/components/Reveal';

export default async function Gallery(){
  const arts=await getArtworks();
  return <main className="min-h-screen px-5 pb-28 pt-32 sm:px-10">
    <div className="mx-auto max-w-7xl">
      <Reveal variant="slide-left">
        <span className="scribble text-xs text-black/50">KIFUKI / GALLERY</span>
        <h1 className="mt-5 text-6xl font-bold tracking-tight sm:text-8xl">Gallery<span className="text-gradient-violet">.</span></h1>
      </Reveal>
      <div className="mt-12 columns-2 gap-4 md:columns-3">
        {arts.map((a,i)=>
          <Reveal key={a.id} delay={(i%3)*.08} variant={i%3===0?'scale':i%3===1?'rotate':'slide-left'}>
            <figure className="mb-4 break-inside-avoid group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-black/15">
                <Image src={a.image} alt={a.title} fill className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1" sizes="33vw"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"/>
              </div>
              <figcaption className="px-2 py-3">
                <div className="text-sm font-bold group-hover:text-violet transition-colors">{a.title}</div>
                <span className="float-right text-black/40 text-xs">{a.year}</span>
              </figcaption>
            </figure>
          </Reveal>
        )}
      </div>
    </div>
  </main>;
}
