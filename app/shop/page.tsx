import {getProducts} from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import Localized from '@/components/Localized';
import Reveal from '@/components/Reveal';
import {ShoppingBag} from 'lucide-react';

export default async function Shop(){
  const ps=await getProducts();
  const cats=['All',...Array.from(new Set(ps.map(p=>p.category)))];
  return <main className="min-h-screen px-5 pb-28 pt-32 sm:px-10">
    <div className="mx-auto max-w-7xl">
      <Reveal variant="slide-left">
        <span className="scribble text-xs text-black/50">KIFUKI / SHOP</span>
        <h1 className="mt-5 text-6xl font-bold tracking-tight sm:text-8xl"><Localized path="nav.shop"/></h1>
        <p className="mt-5 max-w-xl text-black/60">Küçük şeyler, büyük enerji. Satın alma işlemi Shopier üzerinden tamamlanır.</p>
      </Reveal>
      <Reveal variant="slide-left" delay={.1}>
        <div className="mt-10 flex flex-wrap gap-2">
          {cats.map((c,i)=>
            <span key={c} className="rounded-full border border-black/20 px-4 py-2 text-xs font-bold transition-all duration-300 hover:bg-black hover:text-white hover:border-black cursor-default">
              {c}
            </span>
          )}
        </div>
      </Reveal>
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {ps.map((p,i)=><Reveal key={p.id} delay={i*.08} variant="scale"><ProductCard p={p}/></Reveal>)}
      </div>
      {ps.length===0&&(
        <Reveal variant="blur">
          <div className="mt-20 text-center">
            <ShoppingBag size={48} className="mx-auto text-black/20 mb-4"/>
            <p className="text-lg text-black/40">Henüz ürün eklenmemiş.</p>
          </div>
        </Reveal>
      )}
    </div>
  </main>;
}
