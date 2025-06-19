# Avidya Photo - Professional Photography Website

A modern, responsive Vue.js website for Avidya Photo photography business featuring clean design, service portfolios, and booking functionality.

## 🌟 Features

### Design & UX
- **Clean, minimalist design** with whitish background and elegant typography
- **Mobile-first responsive** layout that works perfectly on all devices
- **Script/handwritten font** for brand name using Google Fonts (Dancing Script)
- **Smooth transitions** and hover effects throughout
- **Professional color scheme** with warm accent tones

### Services Section
- **Three service categories**: Portraits, Events, and Farms
- **Interactive service cards** with hover effects and active states
- **Dynamic content display** - only one service section visible at a time
- **Service-specific imagery** with 3 sample photos per service
- **Compelling service descriptions** that highlight expertise

### Portfolio
- **3x3 grid layout** on desktop for optimal visual impact
- **Single column layout** on mobile for better scrolling experience
- **Mixed orientations** - square, landscape, and portrait images
- **Responsive image sizing** with proper aspect ratio handling
- **Hover effects** for enhanced interactivity

### Booking System
- **Comprehensive booking form** with validation
- **Required fields**: Name, Email, Phone, Service Type, Date, Time
- **Smart validation** with real-time error messages
- **Date picker** with minimum date restrictions
- **Time slot selection** including special "Golden Hour" option
- **Success confirmation** with professional messaging

### Technical Excellence
- **Vue.js 3** with Composition API and TypeScript
- **Vue Router** for seamless navigation
- **Form validation** with custom error handling
- **Accessibility features** including focus management
- **SEO optimized** with proper meta tags
- **Performance optimized** with efficient image handling

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd avidya-photo-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` to view the website

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
avidya-photo-website/
├── public/
│   ├── photos/
│   │   ├── portraits/     # Portrait sample images
│   │   ├── events/        # Event sample images
│   │   ├── farms/         # Farm sample images
│   │   └── portfolio/     # Main portfolio images
│   └── favicon.ico
├── src/
│   ├── components/        # Reusable Vue components
│   ├── views/
│   │   ├── HomeView.vue   # Main homepage
│   │   └── BookingView.vue # Booking form page
│   ├── router/
│   │   └── index.ts       # Vue Router configuration
│   ├── stores/            # Pinia stores (for future state management)
│   ├── assets/            # Static assets
│   ├── App.vue            # Root component
│   └── main.ts            # Application entry point
├── index.html             # HTML template
└── package.json           # Project configuration
```

## 🖼️ Images & Content

### Placeholder Images
The project includes SVG placeholder images organized by category:
- **Portraits**: 3 sample images in various orientations
- **Events**: 3 sample images showcasing event photography
- **Farms**: 3 sample images highlighting agricultural photography
- **Portfolio**: 9 images in a 3x3 grid with mixed orientations

### Replacing Placeholders
To replace with actual photos:
1. Replace SVG files in `public/photos/` directories
2. Update file extensions in component image references if needed
3. Maintain similar aspect ratios for optimal display

### Service Content
Pre-written, professional copy for each service:
- **Portraits**: Focuses on authentic personality capture
- **Events**: Emphasizes moment preservation and energy
- **Farms**: Celebrates agricultural heritage and rural beauty

## 🎨 Design System

### Color Palette
- **Primary Background**: `#fafafa` (soft white)
- **Secondary Background**: `#ffffff` (pure white)
- **Text Primary**: `#2c2c2c` (dark gray)
- **Text Secondary**: `#666666` (medium gray)
- **Accent Colors**: 
  - `#c7b299` (warm beige)
  - `#b5a081` (darker beige)
  - `#d4c5b9` (light beige)

### Typography
- **Brand Font**: Dancing Script (Google Fonts)
- **Body Font**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700

### Responsive Breakpoints
- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 768px

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking

# Testing
npm run test:unit    # Run unit tests
```

## 🌐 Browser Support

- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **Mobile browsers** (iOS Safari, Chrome Mobile)
- **ES6+ features** required
- **CSS Grid & Flexbox** support required

## 📱 Mobile Optimization

- **Touch-friendly** interface elements
- **Optimized images** for mobile bandwidth
- **Simplified navigation** for small screens
- **Fast loading** with efficient code splitting

## 🔒 Form Security & Validation

- **Client-side validation** with real-time feedback
- **Email format validation**
- **Phone number validation**
- **Date restrictions** (future dates only)
- **Required field validation**
- **Input sanitization** ready for backend integration

## 🚀 Deployment

The project is ready for deployment to:
- **Netlify** (recommended for static sites)
- **Vercel** (excellent Vue.js support)
- **GitHub Pages** (with proper build configuration)
- **Traditional web hosting** (upload dist/ folder)

### Environment Variables
For production deployment, consider adding:
- `VITE_API_URL` for backend API endpoints
- `VITE_CONTACT_EMAIL` for form submissions
- `VITE_ANALYTICS_ID` for tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- **Image gallery** with lightbox functionality
- **Blog section** for photography tips and client features
- **Client testimonials** section
- **Admin dashboard** for content management
- **Email integration** for form submissions
- **Payment processing** for booking deposits
- **Social media integration**
- **SEO optimization** with structured data

## 📞 Support

For questions or support, please contact the development team or create an issue in the repository.

---

**Built with ❤️ using Vue.js 3, TypeScript, and modern web technologies.**
