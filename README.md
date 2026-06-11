# Tanvir Rahman — Portfolio

Clean monochrome (white / gray / black) portfolio for an AI Engineer, with a full admin panel: profile, skills (with logo upload), projects (add / edit / delete), markdown blog (draft + publish, categories + tags), education timeline, certifications, contact inbox, GitHub stats, dark mode toggle, and smooth animations.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma · PostgreSQL (Supabase) · NextAuth · Framer Motion

---

## 🚀 Setup (local)

### 1. Install
```bash
npm install
```

### 2. Database (Supabase)
1. [supabase.com](https://supabase.com) → New project banan (free tier enough)
2. **Project Settings → Database → Connection string → URI** copy korun
3. Root e `.env` file banan (`.env.example` copy kore):

```bash
cp .env.example .env
```

`.env` e bosান:
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="tanvirrahmanaz@gmail.com"
ADMIN_PASSWORD="apnar-password"
IMGBB_API_KEY="api.imgbb.com theke free key"
```

### 3. Push schema + seed
```bash
npm run db:push   # tables create kore
npm run db:seed   # admin user + demo data dey
```

### 4. Run
```bash
npm run dev
```
- Site: http://localhost:3000
- Admin: http://localhost:3000/admin (login: `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

> ⚠️ Login korar por **Settings** theke password change kore nin.

---

## ☁️ Deploy (Vercel)

1. Code GitHub e push korun
2. [vercel.com](https://vercel.com) → **Import** repo
3. Environment Variables add korun (`.env` er shob value, kintu `NEXTAUTH_URL` hobe apnar live URL, jemon `https://tanvirrahmanaz.vercel.app`)
4. **Supabase e Vercel er jonno:** connection string e **Transaction pooler** (port `6543`) use korun `DATABASE_URL` hishebe, ar `DIRECT_URL` e direct connection (port `5432`) rakhun — Supabase dashboard ei duita URL e dey
5. Repo-te already `vercel.json` ache, tai Vercel deploy-er somoy `npm run vercel-build` cholbe:
```bash
prisma generate && prisma migrate deploy && next build
```
Eta production DB-te pending Prisma migration apply kore, tai `P2021` / `table does not exist` error ar hobe na.
6. First production deploy-er por ekbar seed korun jate admin user ar demo content create hoy:
```bash
npm run db:seed
```
7. Deploy 🎉

Custom domain (`tanvirrahmanaz.ai`) Vercel → Settings → Domains theke add korte parben.

---

## 🖼️ Images

- **Upload button:** imgbb te upload hoy (server-side, key secure thake)
- **URL paste:** je kono image URL kaj kore
- **Google Drive:** Drive share link paste korlei auto direct-link e convert hoye jay (file ta "Anyone with the link" public hote hobe)

## 📄 Resume / CV

Admin → Profile e Resume URL ar CV URL bosান (Google Drive public PDF link best). Navbar ar hero — dui jaygay button ashbe.

---

## 📁 Structure

```
prisma/
  schema.prisma        # DB models
  seed.ts              # admin user + demo data
src/
  middleware.ts        # /admin route protection
  lib/                 # prisma, auth, crud factory, utils
  types/               # shared TS types
  app/
    (site)/            # public pages: home, projects, blog
    admin/             # admin panel (login, dashboard, CRUD pages)
    api/               # REST endpoints (auth, CRUD, upload, password)
  components/
    sections/          # homepage sections
    admin/             # admin form components (markdown editor, image input…)
```
