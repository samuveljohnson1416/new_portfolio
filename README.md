# 🚀 Portfolio Website - Samuvel Johnson

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS featuring a sleek dark theme with neon accents.

## ✨ Features

- **Modern Design**: Dark theme with neon green, blue, and pink accents
- **Fully Responsive**: Optimized for all device sizes
- **Interactive Animations**: Smooth transitions using Framer Motion
- **Contact Form**: Functional email integration with EmailJS
- **Project Showcase**: Dynamic project filtering and detailed views
- **Resume Section**: Downloadable resume with detailed experience
- **SEO Optimized**: Meta tags and proper semantic structure

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Email Service**: EmailJS
- **Deployment**: Ready for Vercel, Netlify, or GitHub Pages

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/samuveljohnson1416/new_portfolio.git
cd new_portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Configure EmailJS (for contact form)**
   - Sign up at [EmailJS.com](https://www.emailjs.com/)
   - Create an email service and template
   - Update `.env.local` with your credentials:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

5. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:5173` to view the portfolio.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── About.tsx       # About section
│   ├── Contact.tsx     # Contact form
│   ├── Home.tsx        # Landing page
│   ├── Navigation.tsx  # Navigation menu
│   ├── Projects.tsx    # Projects showcase
│   └── Resume.tsx      # Resume/CV section
├── config/             # Configuration files
│   └── emailjs.ts      # EmailJS setup
├── assets/             # Images and files
└── App.tsx            # Main app component
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Netlify
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure environment variables
4. Set up continuous deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Push `dist` folder to `gh-pages` branch
3. Enable GitHub Pages in repository settings

## 🔒 Security

- Environment variables are properly secured
- No sensitive data committed to repository
- Dependencies regularly updated
- Security audit with `npm audit`

## 📱 Features Overview

### Home Page
- Animated terminal interface
- Typewriter effect
- Quick stats and tech stack showcase
- Call-to-action buttons

### About Section
- Personal introduction
- Skills and technologies
- Statistics and achievements
- Professional photo

### Projects Portfolio
- Filterable project grid
- Detailed project information
- Technology tags
- Live demo and GitHub links

### Resume/CV
- Professional experience
- Education details
- Certifications and achievements
- Downloadable PDF resume
- Skills categorization

### Contact Form
- Functional email integration
- Form validation
- Success/error feedback
- Social media links

## 🎨 Customization

### Colors
Update colors in `tailwind.config.js`:
```js
colors: {
  'neon-green': '#00FF88',
  'neon-blue': '#00D4FF', 
  'neon-pink': '#FF6B9D',
  // ... other colors
}
```

### Content
- Update personal information in each component
- Replace project data in `Projects.tsx`
- Modify resume content in `Resume.tsx`
- Change contact details in `Contact.tsx`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Contact

- **Email**: samuveljohnson.cv@gmail.com
- **LinkedIn**: [linkedin.com/in/samuvel-johnson](https://www.linkedin.com/in/samuvel-johnson)
- **GitHub**: [github.com/samuveljohnson1416](https://github.com/samuveljohnson1416)

---

⭐ **If you like this portfolio, please give it a star!** ⭐
