'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {motion,AnimatePresence} from 'framer-motion';
import {Lock,User,ArrowRight,Sparkles} from 'lucide-react';

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

  return <motion.main className="grid min-h-screen place-items-center px-5 bg-gradient-to-br from-gray-50 via-white to-violet/5"
    initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}}>
    <motion.form onSubmit={submit}
      className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl relative overflow-hidden"
      initial={{y:30,opacity:0,scale:.95}} animate={{y:0,opacity:1,scale:1}} transition={{delay:.15,type:'spring',stiffness:100,damping:20}}>
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink/5 blur-2xl"/>
      <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-violet/5 blur-2xl"/>
      <div className="text-center mb-8 relative">
        <motion.div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet to-pink flex items-center justify-center mx-auto mb-4"
          animate={{rotate:[0,5,-5,0]}} transition={{duration:4,repeat:Infinity,ease:'easeInOut'}}>
          <Lock size={24} className="text-white"/>
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-900">Studio Control</h1>
        <p className="text-sm text-gray-500 mt-1">Devam etmek için giriş yapın</p>
      </div>
      <div className="space-y-3 relative">
        <div className="relative group">
          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-violet"/>
          <input value={u} onChange={e=>setU(e.target.value)} placeholder="Kullanıcı adı"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 pl-11 text-sm outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet focus:bg-white transition-all duration-300"/>
        </div>
        <div className="relative group">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-violet"/>
          <input value={p} onChange={e=>setP(e.target.value)} type="password" placeholder="Şifre"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 pl-11 text-sm outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet focus:bg-white transition-all duration-300"/>
        </div>
      </div>
      <AnimatePresence>
        {e&&<motion.p initial={{opacity:0,y:-5,height:0}} animate={{opacity:1,y:0,height:'auto'}} exit={{opacity:0,y:-5,height:0}}
          className="mt-3 text-sm font-semibold text-red-500 text-center flex items-center justify-center gap-1">
          <Sparkles size={12}/>{e}
        </motion.p>}
      </AnimatePresence>
      <motion.button disabled={loading}
        whileHover={{scale:1.01}} whileTap={{scale:.98}}
        className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 p-4 text-sm font-bold text-white hover:bg-gray-800 disabled:opacity-50 transition-colors">
        {loading?<motion.div animate={{rotate:360}} transition={{duration:1,repeat:Infinity,ease:'linear'}} className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"/>:<><span>Giriş yap</span><ArrowRight size={16}/></>}
      </motion.button>
    </motion.form>
  </motion.main>;
}
