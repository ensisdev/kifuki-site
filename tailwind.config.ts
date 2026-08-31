import type { Config } from 'tailwindcss';
export default {content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],theme:{extend:{fontFamily:{display:['var(--font-display)','sans-serif'],body:['var(--font-body)','sans-serif']},colors:{paper:'#f4efe5',ink:'#161616',violet:'#7568c9',pink:'#ff6b9a',cyan:'#53d7d1',yellow:'#ffd83d'}}},plugins:[]} satisfies Config;
