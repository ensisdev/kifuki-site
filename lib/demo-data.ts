import type {Artwork,Product} from './types';
export const products:Product[]=[
{id:'p1',slug:'kifuki-sticker-sheet',name:'Kifuki Sticker Sheet',description:'Kifuki dünyasından seçilmiş mini sticker seti.',price:149,currency:'TRY',image:'https://images.unsplash.com/photo-1583845112203-454c8f4b7d7a?auto=format&fit=crop&w=900&q=80',category:'Sticker',featured:true,shopierUrl:'https://www.shopier.com/kifuki',createdAt:'2026-09-01'},
{id:'p2',slug:'dreamy-cat',name:'Dreamy Cat Sticker',description:'Tatlı, hafif yaramaz ve her yere yapışmaya hazır.',price:79,currency:'TRY',image:'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80',category:'Sticker',featured:true,shopierUrl:'https://www.shopier.com/kifuki',createdAt:'2026-09-01'},
{id:'p3',slug:'tiny-art-print',name:'Tiny Art Print',description:'Masa üstüne küçük bir renk patlaması.',price:189,currency:'TRY',image:'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=80',category:'Print',featured:false,shopierUrl:'https://www.shopier.com/kifuki',createdAt:'2026-09-01'}];
export const artworks:Artwork[]=[
{id:'a1',title:'Kifuki Character Study',image:'https://kifuki.com/images/karakter.png',description:'Kifuki karakterinin renkli çalışma sayfası.',year:2026,featured:true},
{id:'a2',title:'Sticker Universe',image:'https://images.unsplash.com/photo-1561214115-7c2c3c8b8b4d?auto=format&fit=crop&w=1200&q=80',description:'Sticker ve çizim dünyası.',year:2026,featured:true},
{id:'a3',title:'Sketchbook Notes',image:'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',description:'Atölyeden karalamalar.',year:2025,featured:false},
{id:'a4',title:'Color Play',image:'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=80',description:'Renk, kağıt ve küçük fikirler.',year:2025,featured:false}];
