import type { Metadata } from 'next';
import '@fontsource/cormorant-garamond/cyrillic-500.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/cyrillic-500-italic.css';
import '@fontsource/cormorant-garamond/latin-500-italic.css';
import '@fontsource/manrope/cyrillic-400.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/cyrillic-500.css';
import '@fontsource/manrope/latin-500.css';
import './globals.css';
import { site, asset } from '@/data/site';
const origin=process.env.NEXT_PUBLIC_SITE_URL;
export const metadata:Metadata={
 title:'Солнечная Заимка — отдых на берегу Ии в Тулуне',description:site.description,icons:{icon:asset('/icon.svg')},
 ...(origin?{metadataBase:new URL(origin.endsWith('/')?origin:origin+'/'),alternates:{canonical:origin}}:{}),
 openGraph:{title:'Солнечная Заимка — время для себя, место для близких',description:site.description,locale:'ru_RU',type:'website',siteName:site.name,...(origin?{url:origin,images:[{url:new URL('images/river.webp',origin.endsWith('/')?origin:origin+'/').toString(),width:1195,height:896,alt:'Река Ия — Солнечная Заимка'}]}:{})},
 robots: process.env.NEXT_PUBLIC_INDEXABLE==='true'?{index:true,follow:true}:{index:false,follow:false},
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="ru"><body>{children}</body></html>;}
