'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {motion} from 'framer-motion';
import {Lock,User,ArrowRight} from 'lucide-react';

export default function AdminLogin(){
  const[u,setU]=useState('');
  const[p,setP]=useState('');
  const[e,setE]=useState('');
  const[loading,setLoading]=useState(false);
  const router=useRouter();

  async function submit(ev:React.FormEvent){
    ev.preventDefault();setLoading(true);setE('');
    const r=await fetch('/api/admin/login',{
      method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:u,password:p})
    });
    if(r.ok)router.push('/admin');
    else{const j=await r.json();setE(j.error||'Giriş başarısız')}
    setLoading(false);
  }

  return <motion.main className="grid min-h-screen place-items-center px-5 bg-gray-50"
    initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}}>
    <motion.form onSubmit={submit}
      className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
      initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.1,type:'spring',stiffness:100}}>
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet to-pink flex items-center justify-center mx-auto mb-4">
          <Lock size={24} className="text-white"/>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Studio Control</h1>
        <p className="text-sm text-gray-500 mt-1">Devam etmek için giriş yapın</p>
      </div>
      <div className="space-y-3">
        <div className="relative">
          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input value={u} onChange={e=>setU(e.target.value)} placeholder="Kullanıcı adı"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 pl-11 text-sm outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet transition-all"/>
        </div>
        <div className="relative">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input value={p} onChange={e=>setP(e.target.value)} type="password" placeholder="Şifre"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 pl-11 text-sm outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet transition-all"/>
        </div>
      </div>
      {e&&<motion.p initial={{opacity:0,y:-5}} animate={{opacity:1,y:0}} className="mt-3 text-sm font-semibold text-red-500 text-center">{e}</motion.p>}
      <button disabled={loading} className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 p-4 text-sm font-bold text-white hover:bg-gray-800 disabled:opacity-50 transition-all">
        {loading?'Giriş yapılıyor…':<><span>Giriş yap</span><ArrowRight size={16}/></>}
      </button>
    </motion.form>
  </motion.main>;
}
