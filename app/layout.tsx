import './globals.css';
import Nav from '@/components/Nav';
import {CursorGlow} from '@/components/Motion';
export const metadata={title:'Kifuki — Art Studio',description:'Kifuki art studio, stickers and tiny things.'};
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="tr"><body className="selection grain pb-16 md:pb-0"><CursorGlow/><Nav/>{children}</body></html>;
}
