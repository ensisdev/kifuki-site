import {cookies} from 'next/headers';import crypto from 'node:crypto';
const name='kifuki_admin';
function sign(v:string){return crypto.createHmac('sha256',process.env.ADMIN_SESSION_SECRET||'dev-secret').update(v).digest('hex')}
export function makeToken(username:string){const payload=Buffer.from(JSON.stringify({u:username,exp:Date.now()+1000*60*60*12})).toString('base64url');return `${payload}.${sign(payload)}`}
export function validToken(token:string|undefined){if(!token)return false;const [p,s]=token.split('.');if(!p||!s||sign(p)!==s)return false;try{const x=JSON.parse(Buffer.from(p,'base64url').toString());return x.u===process.env.ADMIN_USERNAME&&x.exp>Date.now()}catch{return false}}
export async function isAdmin(){return validToken((await cookies()).get(name)?.value)}export const cookieName=name;
