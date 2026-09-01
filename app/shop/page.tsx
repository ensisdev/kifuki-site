import {getProducts} from '@/lib/db';
import ShopClient from '@/components/ShopClient';

export default async function Shop(){
  const ps=await getProducts();
  return <main className="min-h-screen px-5 pb-28 pt-32 sm:px-10">
    <div className="mx-auto max-w-7xl">
      <ShopClient products={ps}/>
    </div>
  </main>;
}
