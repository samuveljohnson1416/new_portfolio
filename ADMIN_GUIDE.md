# 🔐 Portfolio Admin System

A comprehensive admin panel for managing your portfolio content dynamically. This system allows you to add certificates, skills, and experiences through a secure web interface without manually editing code files.

## 🏗️ System Architecture

```
Frontend (React + Vite)
├── Admin Panel (React Components)
├── Dynamic Data Components
└── Authentication System

Backend (Express + TypeScript)
├── RESTful API
├── JWT Authentication
├── File Upload Handling
└── Data Validation

Data Storage
├── JSON Files (Version Controlled)
├── Image Uploads (Local/CDN)
└── User Management
```

## 🚀 Quick Start

### 1. Environment Setup

Copy the environment example file:
```bash
cp .env.example .env.local
```

Fill in your configuration:
```bash
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here

# Admin API Configuration
VITE_API_URL=http://localhost:3001

# Admin Authentication (Server-side)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
ADMIN_PASSWORD=admin123
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Servers

**Option 1: Start both frontend and backend together**
```bash
npm run dev:full
```

**Option 2: Start separately**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run admin-server
```

### 4. Access Admin Panel

- **Frontend**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin/login
- **API Server**: http://localhost:3001

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

## 📊 Data Management

### Data Structure

All portfolio data is stored in `data/portfolio-data.json`:

```json
{
  "certificates": [
    {
      "id": "cert_1",
      "title": "Certificate Name",
      "issuer": "Issuing Organization",
      "date": "2024-01-15",
      "link": "https://certificate-link.com",
      "image": "/uploads/cert-image.png",
      "description": "Certificate description",
      "category": "Programming"
    }
  ],
  "skills": [
    {
      "id": "skill_1",
      "name": "React",
      "category": "Frontend",
      "level": 85,
      "description": "Modern React development",
      "dateAdded": "2024-01-01"
    }
  ],
  "experiences": [
    {
      "id": "exp_1",
      "role": "Frontend Developer",
      "company": "Tech Solutions Inc.",
      "duration": "Jan 2024 - Present",
      "description": "Developing modern web applications",
      "technologies": ["React", "TypeScript", "Tailwind CSS"],
      "link": "https://github.com/username/project",
      "type": "work"
    }
  ],
  "lastUpdated": "2024-09-05T12:00:00Z"
}
```

### Data Categories

**Certificates:**
- Programming, Web Development, Design, Management, etc.

**Skills:**
- Frontend, Backend, Programming, Database, DevOps, Design

**Experience Types:**
- Work, Project, Volunteer

## 🔒 Security Features

### Authentication
- JWT-based session management
- Secure password hashing with bcrypt
- Session expiration handling
- Protected API routes

### Data Security
- Input validation and sanitization
- File upload restrictions (images only, 5MB limit)
- SQL injection prevention
- XSS protection

### Deployment Security
- Environment variable protection
- HTTPS enforcement in production
- CORS configuration
- Rate limiting (recommended for production)

## 📱 Admin Panel Features

### Dashboard Overview
- Summary statistics
- Recent additions
- Quick actions

### Certificate Management
- Add/edit/delete certificates
- Image upload support
- Category organization
- Link validation

### Skills Management
- Skill level tracking (0-100%)
- Category grouping
- Progress visualization
- Bulk operations

### Experience Management
- Work/project/volunteer classification
- Technology tags
- Rich descriptions
- External links

## 🔧 API Endpoints

### Authentication
```
POST /api/auth/login
```

### Data Access (Public)
```
GET /api/data
```

### Admin Operations (Protected)
```
POST /api/admin/certificates
POST /api/admin/skills
POST /api/admin/experiences
DELETE /api/admin/{type}/{id}
```

## 🌐 Integration with Portfolio

### Dynamic Components

Use the pre-built components in your existing portfolio:

```tsx
import { 
  DynamicCertificates, 
  DynamicSkills, 
  DynamicExperience,
  PortfolioStats 
} from './components/DynamicData';

// In your Resume component
<DynamicCertificates />

// In your About component
<DynamicSkills category="Frontend" limit={6} />

// In your Projects component
<DynamicExperience type="project" />

// Dashboard stats
<PortfolioStats />
```

### Data Hooks

Access data programmatically:

```tsx
import { usePortfolioData, useCertificates, useSkills, useExperiences } from './hooks/usePortfolioData';

function MyComponent() {
  const { data, loading, error, refetch } = usePortfolioData();
  const { certificates } = useCertificates();
  const { skills, getTopSkills } = useSkills();
  const { experiences, getWorkExperience } = useExperiences();
  
  // Your component logic
}
```

## 🚀 Deployment

### Local Development
1. Start both servers with `npm run dev:full`
2. Access admin panel at `/admin/login`
3. Make changes through the interface
4. Data automatically syncs to JSON files

### Production Deployment

#### Vercel Deployment

1. **Set Environment Variables in Vercel:**
   ```
   VITE_EMAILJS_SERVICE_ID
   VITE_EMAILJS_TEMPLATE_ID
   VITE_EMAILJS_PUBLIC_KEY
   VITE_API_URL (your production API URL)
   JWT_SECRET
   ADMIN_PASSWORD
   ```

2. **Configure Vercel Functions:**
   Create `api/` folder in root with serverless functions:
   ```
   api/
   ├── auth/
   │   └── login.ts
   ├── data.ts
   └── admin/
       ├── certificates.ts
       ├── skills.ts
       └── experiences.ts
   ```

3. **Auto-deployment:**
   - GitHub Actions automatically deploy on push to main
   - Data changes trigger rebuilds
   - Environment variables sync from GitHub Secrets

#### Alternative: Separate Backend Hosting

Deploy backend to:
- Railway
- Heroku
- DigitalOcean App Platform
- AWS Elastic Beanstalk

Update `VITE_API_URL` to point to your backend URL.

### GitHub Actions Workflow

The included workflow handles:
- Automatic deployments on code changes
- Data synchronization
- Environment variable injection
- Build optimization

## 🔄 Data Synchronization

### Automatic Updates
- Admin changes immediately update JSON files
- GitHub commits trigger Vercel rebuilds
- Live site reflects changes within minutes

### Manual Sync
```bash
# Force data refresh
npm run sync-data

# Manual deploy trigger
npm run deploy
```

## 🛡️ Security Best Practices

### Production Checklist

1. **Change Default Credentials:**
   ```bash
   ADMIN_PASSWORD=your-secure-password-here
   ```

2. **Use Strong JWT Secret:**
   ```bash
   JWT_SECRET=your-256-bit-secret-key
   ```

3. **Enable HTTPS:**
   - Vercel provides automatic HTTPS
   - Configure custom domain with SSL

4. **Set up CORS:**
   - Configure allowed origins
   - Restrict to your domain only

5. **Regular Backups:**
   - JSON files are version-controlled
   - Set up automated backups for uploads

## 🔍 Troubleshooting

### Common Issues

**Admin panel won't load:**
- Check if backend server is running on port 3001
- Verify VITE_API_URL in .env.local
- Check browser console for errors

**Authentication fails:**
- Verify admin credentials
- Check JWT_SECRET configuration
- Clear browser localStorage

**Data doesn't update:**
- Check file permissions on data/ folder
- Verify JSON file syntax
- Check server logs for errors

**Build failures:**
- Check TypeScript errors
- Verify all dependencies installed
- Clear node_modules and reinstall

### Debug Mode

Enable debug logging:
```bash
DEBUG=portfolio:* npm run admin-server
```

## 📞 Support

For issues and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section
- Review server logs in development

## 🔮 Future Enhancements

Planned features:
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Image optimization and CDN
- [ ] Bulk import/export
- [ ] Role-based permissions
- [ ] Content versioning
- [ ] Rich text editor
- [ ] Analytics dashboard
- [ ] Mobile app for admin
- [ ] API rate limiting
- [ ] Automated testing

## 📄 License

This admin system is part of your portfolio project and follows the same MIT license.
