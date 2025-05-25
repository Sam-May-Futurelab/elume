# ✨ Elume – Premium Skincare Landing Page

Elume is a sophisticated, scroll-driven skincare landing page built with **Next.js 15** and **Framer Motion**. Featuring modern aesthetics, liquid morphing effects, and immersive animations, it's designed to showcase premium beauty brands with unparalleled elegance.

## 🌿 Live Demo

[🔗 View Live Demo](https://elume-skincare.vercel.app) *(Coming Soon)*

## 📸 Preview

![Elume Hero Section](./public/images/elume-hero.png)

*Experience the future of skincare with bold visuals and smooth animations*

---

## ✨ Key Features

### 🎨 **Visual Excellence**
- **Split Hero Layout** with bold product imagery
- **Liquid Morphing Effects** and glassmorphism design
- **Iridescent Text** with dynamic gradient animations
- **3D Transform Effects** and magnetic field interactions
- **Floating Particles** and quantum flicker animations

### 📱 **User Experience**
- **Smooth Scroll Animations** powered by Framer Motion
- **Responsive Mobile-First** design
- **Interactive Elements** with hover states and micro-interactions
- **Optimized Performance** with Next.js 15 App Router

### 🧴 **Content Sections**
- **Hero Section** with compelling tagline and dual CTAs
- **Before & After Comparison** with customer testimonials
- **Social Proof Stats** (50K+ customers, 5⭐ rating)
- **Product Showcase** with animated cards
- **Customer Testimonials** with staggered reveal animations
- **Premium Footer** with brand links

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS + Custom CSS animations
- **Animations**: Framer Motion
- **Typography**: Playfair Display + Inter fonts
- **Icons**: Lucide React
- **Language**: TypeScript
- **Package Manager**: npm/yarn/pnpm

---

## 📁 Project Structure

```
elume/
├── public/
│   ├── images/
│   │   ├── elume-hero.png        # Main hero image
│   │   ├── before-skin.png       # Before comparison
│   │   └── after-skin.png        # After comparison
│   └── *.svg                     # Next.js default icons
├── src/
│   ├── app/
│   │   ├── globals.css           # Global styles & animations
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Main landing page
│   ├── components/
│   │   └── effects.tsx           # Reusable animation components
│   └── lib/
│       └── utils.ts              # Utility functions
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Sam-May-Futurelab/elume.git
cd elume
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🎨 Customization

### **Colors & Branding**
Edit the color palette in `src/app/globals.css`:
```css
:root {
  --background: #FAF9F6;    /* Pearl */
  --gold: #E4CFA4;          /* Gold accent */
  --lilac: #DAD7F0;         /* Lilac accent */
  --charcoal: #2E2E2E;      /* Primary text */
}
```

### **Content & Copy**
Update text content in `src/app/page.tsx`:
- Hero headlines and taglines
- Product descriptions
- Customer testimonials
- Call-to-action buttons

### **Images**
Replace images in `public/images/`:
- `elume-hero.png` - Main hero image (1536x1024 recommended)
- `before-skin.png` / `after-skin.png` - Comparison images

### **Animations**
Customize animations in `src/components/effects.tsx`:
- Particle systems
- Liquid morphing effects
- Text reveal animations
- Magnetic interactions

---

## 🌟 Animation Highlights

- **TextReveal**: 3D word-by-word text animations
- **LiquidCard**: Morphing container effects
- **MagneticElement**: Mouse-following magnetic interactions
- **FloatingParticles**: Dynamic particle system
- **ShimmerCard**: Subtle shimmer overlay effects
- **Holographic**: Multi-layer gradient animations

---

## 📦 Deployment

### **Vercel (Recommended)**
```bash
npm install -g vercel
vercel
```

### **Netlify**
```bash
npm run build
# Upload the 'out' folder to Netlify
```

### **Custom Server**
```bash
npm run build
npm start
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Framer Motion** for incredible animation capabilities
- **TailwindCSS** for utility-first styling
- **Next.js** for the powerful React framework
- **Lucide** for beautiful iconography

---

## 📧 Contact

**Sam May** - [@Sam-May-Futurelab](https://github.com/Sam-May-Futurelab)

Project Link: [https://github.com/Sam-May-Futurelab/elume](https://github.com/Sam-May-Futurelab/elume)

---

*Built with ❤️ for the beauty industry*
