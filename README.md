# Luxe Store - Premium E-Commerce Platform

A modern, responsive e-commerce website built with **TypeScript**, **React**, **Tailwind CSS**, and **Commerce.js**. Perfect for showcasing in your freelance portfolio!

## Features

- **Modern UI/UX** - Beautiful, responsive design with smooth animations
- **Shopping Cart** - Full cart functionality with real-time updates
- **Product Search & Filtering** - Advanced search and category filtering
- **Mobile Responsive** - Optimized for all devices
- **Fast Performance** - Built with Vite and optimized for speed
- **TypeScript** - Type-safe development with full TypeScript support
- **Commerce.js Integration** - Headless commerce for product management
- **Framer Motion Animations** - Smooth, professional animations

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Commerce**: Commerce.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Commerce.js account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Commerce.js**
   - Sign up for a free account at [Commerce.js](https://commercejs.com/)
   - Get your public API key from the dashboard
   - Copy `.env.example` to `.env`
   - Add your Commerce.js public key:
     ```
     VITE_CHEC_PUBLIC_KEY=your_commerce_js_public_key_here
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── CartDrawer.tsx
│   └── ...
├── pages/              # Route components
│   ├── Home.tsx
│   ├── Products.tsx
│   └── ProductDetail.tsx
├── store/              # Zustand store
│   └── useStore.ts
├── types/              # TypeScript types
│   └── index.ts
└── ...
```

## Key Components

- **Header**: Responsive navigation with cart icon and mobile menu
- **Hero**: Eye-catching landing section with call-to-action
- **ProductCard**: Interactive product cards with hover effects
- **CartDrawer**: Slide-out cart with quantity management
- **ProductDetail**: Detailed product view with image gallery

## Commerce.js Setup

1. Create products in your Commerce.js dashboard
2. Set up categories (optional)
3. Configure shipping zones and tax rates
4. The app will automatically fetch and display your products

## Portfolio Features

This project demonstrates:

- **Modern React Patterns**: Hooks, TypeScript, component composition
- **State Management**: Global state with Zustand
- **API Integration**: RESTful API calls with Commerce.js
- **Responsive Design**: Mobile-first approach with Tailwind
- **Performance Optimization**: Code splitting, image optimization
- **User Experience**: Smooth animations, loading states, error handling
- **E-commerce Features**: Cart, checkout flow, product management

## Customization

- **Colors**: Update the color palette in `tailwind.config.js`
- **Typography**: Modify font settings in the Tailwind config
- **Layout**: Adjust component layouts in individual components
- **Animation**: Customize Framer Motion animations in components

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Deployment

This project can be deployed to:

- **Vercel** (Recommended)
- **Netlify**
- **AWS S3 + CloudFront**
- **Firebase Hosting**

Simply run `npm run build` and deploy the `dist` folder.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Perfect for your freelance portfolio!** This project showcases modern web development skills, e-commerce expertise, and attention to design details.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# E-commerce
