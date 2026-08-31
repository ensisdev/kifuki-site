'use client';
import {useEffect,useState} from 'react';
import type {Product,Artwork} from '@/lib/types';
import {Plus,Trash2,RefreshCw,LogOut,Save,ExternalLink,Package,Image,Gift,BarChart3,Menu,X,ArrowLeft,Sparkles} from 'lucide-react';
import {motion,AnimatePresence} from 'framer-motion';

const blankP={name:'',slug:'',description:'',price:0,currency:'TRY',image:'',category:'Sticker',featured:false,shopierUrl:'https://www.shopier.com/kifuki'};
const blankA={title:'',image:'',description:'',year:new Date().getFullYear(),featured:false};

type Tab='dashboard'|'products'|'gallery';

export default function AdminClient(){
  const[tab,setTab]=useState<Tab>('dashboard');
  const[sidebarOpen,setSidebarOpen]=useState(false);
  const[ps,setPs]=useState<Product[]>([]);
  const[as,setAs]=useState<Artwork[]>([]);
  const[p,setP]=useState<any>(blankP);
  const[a,setA]=useState<any>(blankA);
  const[msg,setMsg]=useState('');
  const[editing,setEditing]=useState<string|null>(null);

  async function load(){
    const[prods,arts]=await Promise.all([
      fetch('/api/admin/products').then(r=>r.json()),
      fetch('/api/admin/gallery').then(r=>r.json())
    ]);
    setPs(prods);setAs(arts);
  }
  useEffect(()=>{load()},[]);

  async function save(type:string,obj:any){
    const r=await fetch(type==='p'?'/api/admin/products':'/api/admin/gallery',{
      method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(obj)
    });
    if(r.ok){setMsg('Kaydedildi!');type==='p'?setP(blankP):setA(blankA);setEditing(null);load();setTimeout(()=>setMsg(''),3000)}
    else setMsg((await r.json()).error||'Hata');
  }
  async function del(type:string,id:string){
    if(!confirm('Silinsin mi?'))return;
    await fetch(type==='p'?'/api/admin/products':'/api/admin/gallery',{
      method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})
    });load();
  }
  async function sync(){
    setMsg('Shopier senkronizasyonu...');
    const r=await fetch('/api/shopier/sync',{method:'POST'});
    const j=await r.json();setMsg(j.error||`${j.count} ürün senkronlandı.`);load();
    setTimeout(()=>setMsg(''),3000);
  }
  async function logout(){
    await fetch('/api/admin/logout',{method:'POST'});location.href='/admin/login';
  }

  const navItems=[
    {id:'dashboard' as Tab,label:'Genel Bakış',icon:BarChart3},
    {id:'products' as Tab,label:'Ürünler',icon:Package},
    {id:'gallery' as Tab,label:'Galeri',icon:Image},
  ];

  const stats=[
    {label:'Toplam Ürün',value:ps.length,icon:Package,color:'bg-violet/10 text-violet'},
    {label:'Toplam Artwork',value:as.length,icon:Image,color:'bg-pink/10 text-pink'},
    {label:'Öne Çıkan',value:ps.filter(x=>x.featured).length+as.filter(x=>x.featured).length,icon:Gift,color:'bg-cyan/10 text-cyan'},
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen?'translate-x-0':'-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Kifuki</h2>
            <p className="text-xs text-gray-400 mt-1">Control Room</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map(item=>(
              <button key={item.id} onClick={()=>{setTab(item.id);setSidebarOpen(false)}}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${tab===item.id?'bg-gray-900 text-white shadow-lg':'text-gray-600 hover:bg-gray-100'}`}>
                <item.icon size={18}/>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-100 space-y-1">
            <button onClick={sync} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
              <RefreshCw size={18}/>Shopier Sync
            </button>
            <a href="/" target="_blank" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
              <ExternalLink size={18}/>Siteyi Gör
            </a>
            <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors">
              <LogOut size={18}/>Çıkış Yap
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen&&<div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={()=>setSidebarOpen(false)}/>}

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200">
          <div className="flex items-center gap-4 px-6 py-4">
            <button onClick={()=>setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              {sidebarOpen?<X size={20}/>:<Menu size={20}/>}
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 capitalize">{tab==='dashboard'?'Genel Bakış':tab==='products'?'Ürünler':'Galeri'}</h1>
            </div>
            {tab!=='dashboard'&&(
              <button onClick={()=>{editing?setEditing(null):setTab('dashboard')}} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
                <ArrowLeft size={16}/>Geri
              </button>
            )}
          </div>
        </header>

        <div className="p-6">
          {/* Message */}
          <AnimatePresence>
            {msg&&<motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
              className="mb-6 rounded-xl bg-gradient-to-r from-violet/10 to-pink/10 border border-violet/20 p-4 text-sm font-semibold text-violet flex items-center gap-2">
              <Sparkles size={16}/> {msg}
            </motion.div>}
          </AnimatePresence>

          {/* Dashboard */}
          {tab==='dashboard'&&(
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((s,i)=>(
                  <motion.div key={s.label} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*.1}}
                    className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">{s.label}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{s.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                        <s.icon size={22}/>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={()=>setTab('products')} className="bg-white rounded-2xl border border-gray-200 p-6 text-left hover:shadow-lg hover:border-violet/30 transition-all group">
                  <Package size={24} className="text-violet mb-3 group-hover:scale-110 transition-transform"/>
                  <h3 className="font-bold text-gray-900">Ürünleri Yönet</h3>
                  <p className="text-sm text-gray-500 mt-1">{ps.length} ürün mevcut</p>
                </button>
                <button onClick={()=>setTab('gallery')} className="bg-white rounded-2xl border border-gray-200 p-6 text-left hover:shadow-lg hover:border-pink/30 transition-all group">
                  <Image size={24} className="text-pink mb-3 group-hover:scale-110 transition-transform"/>
                  <h3 className="font-bold text-gray-900">Galeriyi Yönet</h3>
                  <p className="text-sm text-gray-500 mt-1">{as.length} artwork mevcut</p>
                </button>
              </div>
            </div>
          )}

          {/* Products */}
          {tab==='products'&&(
            <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900">{editing?'Ürün Düzenle':'Yeni Ürün Ekle'}</h2>
                <div className="mt-4 space-y-3">
                  {Object.keys(blankP).filter(k=>k!=='featured').map(k=>(
                    <label key={k} className="block">
                      <span className="text-xs font-semibold text-gray-500 uppercase">{k}</span>
                      <input type={k==='price'?'number':'text'} value={p[k]??''}
                        onChange={e=>setP({...p,[k]:k==='price'?Number(e.target.value):e.target.value})}
                        className="mt-1 w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet transition-all"/>
                    </label>
                  ))}
                  <label className="flex items-center gap-3 py-2">
                    <input type="checkbox" checked={p.featured} onChange={e=>setP({...p,featured:e.target.checked})}
                      className="w-4 h-4 rounded border-gray-300 text-violet focus:ring-violet"/>
                    <span className="text-sm font-semibold text-gray-700">Öne Çıkan</span>
                  </label>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={()=>save('p',p)} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gray-900 p-3 text-sm font-bold text-white hover:bg-gray-800 transition-colors">
                    <Save size={14}/>Kaydet
                  </button>
                  {editing&&<button onClick={()=>{setEditing(null);setP(blankP)}} className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition-colors">İptal</button>}
                </div>
              </div>
              <div className="space-y-3">
                {ps.map((x,i)=>(
                  <motion.div key={x.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*.03}}
                    className={`flex items-center justify-between rounded-2xl border p-4 transition-all hover:shadow-md ${editing===x.id?'border-violet bg-violet/5':'border-gray-200 bg-white'}`}>
                    <button onClick={()=>{setP(x);setEditing(x.id)}} className="text-left flex-1 min-w-0">
                      <b className="text-sm text-gray-900 truncate block">{x.name}</b>
                      <div className="text-xs text-gray-500 mt-0.5">{x.price} {x.currency} · {x.category}{x.featured?' · ⭐':''}</div>
                    </button>
                    <div className="flex items-center gap-2 ml-3">
                      <a href={x.shopierUrl} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                        <ExternalLink size={14}/>
                      </a>
                      <button onClick={()=>del('p',x.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {tab==='gallery'&&(
            <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900">Yeni Artwork Ekle</h2>
                <div className="mt-4 space-y-3">
                  {Object.keys(blankA).filter(k=>k!=='featured').map(k=>(
                    <label key={k} className="block">
                      <span className="text-xs font-semibold text-gray-500 uppercase">{k}</span>
                      <input type={k==='year'?'number':'text'} value={a[k]??''}
                        onChange={e=>setA({...a,[k]:k==='year'?Number(e.target.value):e.target.value})}
                        className="mt-1 w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink/30 focus:border-pink transition-all"/>
                    </label>
                  ))}
                  <label className="flex items-center gap-3 py-2">
                    <input type="checkbox" checked={a.featured} onChange={e=>setA({...a,featured:e.target.checked})}
                      className="w-4 h-4 rounded border-gray-300 text-pink focus:ring-pink"/>
                    <span className="text-sm font-semibold text-gray-700">Öne Çıkan</span>
                  </label>
                </div>
                <button onClick={()=>save('a',a)} className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 p-3 text-sm font-bold text-white hover:bg-gray-800 transition-colors">
                  <Save size={14}/>Kaydet
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {as.map((x,i)=>(
                  <motion.div key={x.id} initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{delay:i*.05}}
                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition-all">
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img src={x.image} alt={x.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                    </div>
                    <div className="flex items-center justify-between p-3">
                      <div className="min-w-0 flex-1">
                        <b className="text-xs text-gray-900 truncate block">{x.title}</b>
                        <span className="text-[10px] text-gray-400">{x.year}</span>
                      </div>
                      <button onClick={()=>del('a',x.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={13}/>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
