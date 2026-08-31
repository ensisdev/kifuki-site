import fs from 'node:fs';
import path from 'node:path';
import type { Product, Artwork } from './types';

const dataDir = path.join(process.cwd(), 'data');
const productsFile = path.join(dataDir, 'products.json');
const artworksFile = path.join(dataDir, 'artworks.json');

function ensureDir() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
}

function readJson<T>(file: string, fallback: T[]): T[] {
  ensureDir();
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch {
    return [];
  }
}

function writeJson<T>(file: string, data: T[]) {
  ensureDir();
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getProducts(): Promise<Product[]> {
  if (process.env.DATABASE_PROVIDER === 'supabase') return supa('products');
  let rows = readJson<Product>(productsFile, []);
  if (!rows.length) {
    const { products } = await import('./demo-data');
    writeJson(productsFile, products);
    return products;
  }
  return rows;
}

export async function getProduct(slug: string) {
  return (await getProducts()).find(p => p.slug === slug);
}

export async function saveProduct(p: Product) {
  if (process.env.DATABASE_PROVIDER === 'supabase') return supaWrite('products', p);
  const rows = readJson<Product>(productsFile, []);
  const idx = rows.findIndex(r => r.id === p.id);
  if (idx >= 0) rows[idx] = p; else rows.push(p);
  writeJson(productsFile, rows);
  return p;
}

export async function deleteProduct(id: string) {
  if (process.env.DATABASE_PROVIDER === 'supabase') return supaDelete('products', id);
  const rows = readJson<Product>(productsFile, []);
  writeJson(productsFile, rows.filter(r => r.id !== id));
}

export async function getArtworks(): Promise<Artwork[]> {
  if (process.env.DATABASE_PROVIDER === 'supabase') return supa('artworks');
  let rows = readJson<Artwork>(artworksFile, []);
  if (!rows.length) {
    const { artworks } = await import('./demo-data');
    writeJson(artworksFile, artworks);
    return artworks;
  }
  return rows;
}

export async function saveArtwork(a: Artwork) {
  if (process.env.DATABASE_PROVIDER === 'supabase') return supaWrite('artworks', a);
  const rows = readJson<Artwork>(artworksFile, []);
  const idx = rows.findIndex(r => r.id === a.id);
  if (idx >= 0) rows[idx] = a; else rows.push(a);
  writeJson(artworksFile, rows);
  return a;
}

export async function deleteArtwork(id: string) {
  if (process.env.DATABASE_PROVIDER === 'supabase') return supaDelete('artworks', id);
  const rows = readJson<Artwork>(artworksFile, []);
  writeJson(artworksFile, rows.filter(r => r.id !== id));
}

async function supa(table: string) {
  const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${table}?select=*`, {
    headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}` },
    cache: 'no-store'
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

async function supaWrite(table: string, data: any) {
  const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates' },
    body: JSON.stringify(data)
  });
  if (!r.ok) throw new Error(await r.text());
  return data;
}

async function supaDelete(table: string, id: string) {
  const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}` }
  });
  if (!r.ok) throw new Error(await r.text());
}
