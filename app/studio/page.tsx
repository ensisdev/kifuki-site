import {getArtworks} from '@/lib/db';
import StudioClient from '@/components/StudioClient';

export default async function Studio(){
  const arts=await getArtworks();
  return <main className="min-h-screen px-5 pb-28 pt-32 sm:px-10">
    <div className="mx-auto max-w-7xl">
      <StudioClient artworks={arts}/>
    </div>
  </main>;
}
