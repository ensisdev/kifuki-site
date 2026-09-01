import {getArtworks} from '@/lib/db';
import GalleryClient from '@/components/GalleryClient';

export default async function Gallery(){
  const arts=await getArtworks();
  return <main className="min-h-screen px-5 pb-28 pt-32 sm:px-10">
    <div className="mx-auto max-w-7xl">
      <GalleryClient artworks={arts}/>
    </div>
  </main>;
}
