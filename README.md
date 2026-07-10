<div align="center">

# ANI STREAM

### *Nonton Anime Gratis — Tanpa Ribet*

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

---

![Hero Preview](src/assets/hero.png)

</div>

## Overview

**AniStream** adalah platform streaming anime modern yang dibangun dengan React 19 & Vite 8. Dirancang dengan UI/UX premium, performa tinggi, dan pengalaman menonton yang mulus di semua perangkat.

## Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| **Hero Carousel** | Tampilan anime unggulan dengan efek parallax, partikel, dan animasi transisi |
| **Anime Catalog** | Katalog lengkap dengan filter genre, status, sorting, dan pagination |
| **Video Player** | Player dengan multi-server switching, kontrol custom, dan info episode |
| **Weekly Schedule** | Jadwal rilis anime per hari dalam seminggu |
| **Anime Detail** | Banner hero, info lengkap, karakter, episode list, dan komentar |
| **User Profile** | Watch history, wishlist, dan aktivitas terkini |
| **Auth System** | Login, register, dan Google OAuth |
| **Dark / Light Theme** | Toggle tema dengan transisi halus |
| **Search** | Pencarian anime dengan history |
| **Toast Notification** | Notifikasi interaktif untuk feedback pengguna |
| **Skeleton Loading** | Loading placeholder untuk setiap halaman |
| **Responsive Design** | Mobile-first, tampil optimal di semua ukuran layar |

## Tech Stack

```
├── Framework     → React 19
├── Build Tool    → Vite 8
├── Styling       → Tailwind CSS 4
├── Routing       → React Router 7
├── HTTP Client   → Axios
├── Animation     → Motion (Framer Motion)
├── Icons         → Lucide React + FontAwesome
├── Auth          → Google OAuth (@react-oauth/google)
├── Testing       → Vitest + Testing Library
└── Linting       → ESLint + Tailwind ESLint Plugin
```

## Project Structure

```
src/
├── api/              # Axios instance & API auth
├── assets/           # Static assets (images, icons)
├── components/
│   ├── Auth/         # Auth modal (login/register)
│   ├── Home/         # Hero carousel & anime sections
│   ├── animeDetail/  # Detail page (banner, sidebar, tabs, comments)
│   ├── headerActions/ # Header action hooks & components
│   ├── jadwal/       # Schedule cards & day selector
│   ├── katalog/      # Catalog cards, filters, control deck
│   ├── profile/      # Profile header, wishlist, history
│   ├── searchModal/  # Search modal & search history
│   ├── serverNonton/ # Video player, server selector, download
│   ├── ui/           # Shared UI (Toast, ThemeToggle, WatchButton)
│   └── ProtectedRoute.jsx
├── context/          # React Context (Auth, Theme, Toast, Wishlist, Modal)
├── hooks/            # Custom hooks (20+ hooks)
├── layout/           # Header & Footer layout
├── mappers/          # Data mappers
├── pages/            # Page components
├── services/         # Auth service
├── skeletons/        # Skeleton loading components
├── styles/           # CSS (variables, base, animations, utilities)
├── utils/            # Utility functions
└── validations/      # Form validation
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) (recommended) or npm

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/anistream-fe.git

# Navigate to project
cd anistream-fe

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env

# Start development server
pnpm dev
```

### Environment Variables

```env
VITE_API=your_backend_api_url
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run tests with Vitest |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:ui` | Run tests with Vitest UI |

## Halaman

| Route | Halaman | Auth Required |
|-------|---------|:---:|
| `/` | Beranda (Hero + Anime Sections) | - |
| `/catalog` | Katalog Anime | Yes |
| `/schedule` | Jadwal Rilis Mingguan | Yes |
| `/anime/detail/:slug` | Detail Anime | Yes |
| `/episode/:episodeId` | Video Player | Yes |
| `/profile` | Profil Pengguna | Yes |
| `/unauthorized` | Halaman 403 | - |

## Architecture Highlights

- **Custom Hooks** — 20+ custom hooks untuk setiap fitur (search, comments, wishlist, history, schedule, dll)
- **Context Providers** — State management via React Context (Auth, Theme, Toast, Wishlist, AuthModal)
- **Component-Based Skeleton** — Loading state yang konsisten di setiap halaman
- **Responsive Breakpoints** — Mobile-first approach dengan breakpoint yang terdefinisi
- **Dark Mode** — Sistem tema yang terintegrasi di seluruh komponen
- **API Layer** — Axios instance terpusat dengan interceptors

## License

MIT

---

<div align="center">

**Made with care for the anime community**

</div>
