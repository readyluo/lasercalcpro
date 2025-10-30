# LaserCalc Pro

Professional manufacturing cost calculators for laser cutting, CNC machining, and equipment ROI analysis.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-orange)

## 🚀 Features

### 🔧 Calculators
- **Laser Cutting Calculator** - Material, power, labor, and gas cost estimation
- **CNC Machining Calculator** - Multi-process cost calculation with batch pricing
- **ROI Calculator** - Investment return analysis with NPV and IRR
- **Energy Cost Calculator** - Power consumption and carbon emission tracking
- **Material Utilization Calculator** - Nesting optimization and scrap analysis

### 📊 Core Functionality
- Real-time calculations (<500ms)
- Professional PDF report export
- Interactive data visualizations (Chart.js)
- Email subscription system
- Calculation history tracking

### 🎨 User Experience
- Responsive design (mobile-first)
- Dual-language architecture (EN frontend / ZH backend)
- Form validation (Zod)
- Error handling with custom pages
- Accessibility compliant (WCAG 2.1 AA)

### 🔍 SEO & Analytics
- Dynamic meta tags and Open Graph
- Schema.org structured data
- XML sitemap generation
- Google Analytics 4 integration
- Custom event tracking
- Google AdSense ready

### 🛡️ Security & Performance
- Cloudflare Pages hosting
- D1 database (SQLite at edge)
- SSL/TLS encryption
- Security headers configured
- Core Web Vitals optimized
- Service Worker caching

---

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Cloudflare D1 (SQLite)
- **Hosting**: Cloudflare Pages
- **Validation**: Zod
- **Charts**: Chart.js
- **PDF**: jsPDF
- **Analytics**: Google Analytics 4
- **Ads**: Google AdSense

---

## 🏁 Quick Start

### Prerequisites
- Node.js 18+
- Cloudflare account
- Google Analytics account

### Installation

```bash
# Clone the repository
git clone https://github.com/readyluo/lasercalcpro.git
cd lasercalcpro

# Install dependencies
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://lasercalcpro.com
```

---

## 🚀 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deploy to Cloudflare Pages

```bash
# Build for production
npm run build

# Deploy with Wrangler
npm run deploy
```

---

## 📁 Project Structure

```
lasercalcpro/
├── app/                      # Next.js app router
│   ├── calculators/          # Calculator pages
│   ├── api/                  # API routes
│   ├── admin/                # Admin dashboard (Chinese)
│   └── (pages)/              # Static pages
├── components/               # React components
│   ├── calculators/          # Calculator-specific components
│   ├── ui/                   # Reusable UI components
│   ├── layout/               # Layout components
│   ├── seo/                  # SEO components
│   ├── analytics/            # Analytics components
│   └── ads/                  # AdSense components
├── lib/                      # Utility libraries
│   ├── calculators/          # Calculation engines
│   ├── validations/          # Zod schemas
│   ├── db/                   # Database utilities
│   ├── seo/                  # SEO utilities
│   ├── analytics/            # Analytics utilities
│   └── pdf/                  # PDF generation
├── public/                   # Static assets
└── docs/                     # Documentation
```

---

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type check
npm run type-check

# Build check
npm run build
```

---

## 📊 Performance

Target metrics:
- **Lighthouse Score**: >90
- **LCP**: <2.5s
- **FID**: <100ms
- **CLS**: <0.1
- **Bundle Size**: <500KB initial

---

## 🔒 Security

- HTTPS enforced
- Security headers configured
- CSRF protection
- Input validation
- Rate limiting (Cloudflare)
- DDoS protection (Cloudflare)

---

## 📝 Documentation

- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Production Checklist](./PRODUCTION_CHECKLIST.md)
- [Implementation Plan](./IMPLEMENTATION_PLAN.md)
- [Architecture Overview](./ARCHITECTURE.md)

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Cloudflare for edge computing platform
- Chart.js for visualization library
- All contributors and users

---

## 📧 Contact

- **Website**: https://lasercalcpro.com
- **Email**: support@lasercalcpro.com
- **Issues**: [GitHub Issues](https://github.com/readyluo/lasercalcpro/issues)

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=readyluo/lasercalcpro&type=Date)](https://star-history.com/#readyluo/lasercalcpro&Date)

---

Made with ❤️ by the LaserCalc Pro Team
# lasercalcpro
