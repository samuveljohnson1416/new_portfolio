import express from 'express';
import cors from 'cors';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import type { PortfolioData, AdminUser, AuthResponse, ApiResponse } from '../src/types/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Change this in production!

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.vercel.app'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// File paths
const DATA_FILE = path.join(__dirname, '../data/portfolio-data.json');
const USERS_FILE = path.join(__dirname, '../data/users.json');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Utility functions
async function readJsonFile<T>(filePath: string, defaultValue: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log(`File not found or invalid JSON, using default: ${filePath}`);
    await writeJsonFile(filePath, defaultValue);
    return defaultValue;
  }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Initialize admin user if not exists
async function initializeAdmin() {
  const defaultUsers: AdminUser[] = [{
    id: 'admin-1',
    username: 'admin',
    email: 'samuveljohnson1417@gmail.com',
    passwordHash: await bcryptjs.hash(ADMIN_PASSWORD, 10),
    role: 'admin',
    createdAt: new Date().toISOString()
  }];
  
  await readJsonFile(USERS_FILE, defaultUsers);
}

// Auth middleware
function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// API Routes

// Authentication
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    const users = await readJsonFile<AdminUser[]>(USERS_FILE, []);
    const user = users.find(u => u.username === username);

    if (!user || !(await bcryptjs.compare(password, user.passwordHash))) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    await writeJsonFile(USERS_FILE, users);

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const response: AuthResponse = {
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get portfolio data
app.get('/api/data', async (req, res) => {
  try {
    const data = await readJsonFile<PortfolioData>(DATA_FILE, {
      certificates: [],
      skills: [],
      experiences: [],
      lastUpdated: new Date().toISOString()
    });
    
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ success: false, message: 'Failed to read data' });
  }
});

// Protected routes (require authentication)

// Add certificate
app.post('/api/admin/certificates', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, issuer, date, link, description, category } = req.body;
    
    if (!title || !issuer || !date) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title, issuer, and date are required' 
      });
    }

    const data = await readJsonFile<PortfolioData>(DATA_FILE, {
      certificates: [],
      skills: [],
      experiences: [],
      lastUpdated: new Date().toISOString()
    });

    const newCertificate = {
      id: `cert_${Date.now()}`,
      title,
      issuer,
      date,
      link: link || '',
      image: req.file ? `/uploads/${req.file.filename}` : '',
      description: description || '',
      category: category || 'General'
    };

    data.certificates.push(newCertificate);
    data.lastUpdated = new Date().toISOString();
    
    await writeJsonFile(DATA_FILE, data);
    
    res.json({ success: true, data: newCertificate });
  } catch (error) {
    console.error('Error adding certificate:', error);
    res.status(500).json({ success: false, message: 'Failed to add certificate' });
  }
});

// Add skill
app.post('/api/admin/skills', authenticateToken, async (req, res) => {
  try {
    const { name, category, level, description } = req.body;
    
    if (!name || !category || level === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, category, and level are required' 
      });
    }

    const data = await readJsonFile<PortfolioData>(DATA_FILE, {
      certificates: [],
      skills: [],
      experiences: [],
      lastUpdated: new Date().toISOString()
    });

    const newSkill = {
      id: `skill_${Date.now()}`,
      name,
      category,
      level: Math.min(100, Math.max(0, parseInt(level))),
      description: description || '',
      dateAdded: new Date().toISOString()
    };

    data.skills.push(newSkill);
    data.lastUpdated = new Date().toISOString();
    
    await writeJsonFile(DATA_FILE, data);
    
    res.json({ success: true, data: newSkill });
  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).json({ success: false, message: 'Failed to add skill' });
  }
});

// Add experience
app.post('/api/admin/experiences', authenticateToken, async (req, res) => {
  try {
    const { role, company, duration, description, technologies, link, type } = req.body;
    
    if (!role || !company || !duration || !description) {
      return res.status(400).json({ 
        success: false, 
        message: 'Role, company, duration, and description are required' 
      });
    }

    const data = await readJsonFile<PortfolioData>(DATA_FILE, {
      certificates: [],
      skills: [],
      experiences: [],
      lastUpdated: new Date().toISOString()
    });

    const newExperience = {
      id: `exp_${Date.now()}`,
      role,
      company,
      duration,
      description,
      technologies: Array.isArray(technologies) ? technologies : technologies.split(',').map((t: string) => t.trim()),
      link: link || '',
      type: type || 'project'
    };

    data.experiences.push(newExperience);
    data.lastUpdated = new Date().toISOString();
    
    await writeJsonFile(DATA_FILE, data);
    
    res.json({ success: true, data: newExperience });
  } catch (error) {
    console.error('Error adding experience:', error);
    res.status(500).json({ success: false, message: 'Failed to add experience' });
  }
});

// Delete items
app.delete('/api/admin/:type/:id', authenticateToken, async (req, res) => {
  try {
    const { type, id } = req.params;
    
    if (!['certificates', 'skills', 'experiences'].includes(type)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid data type' 
      });
    }

    const data = await readJsonFile<PortfolioData>(DATA_FILE, {
      certificates: [],
      skills: [],
      experiences: [],
      lastUpdated: new Date().toISOString()
    });

    const items = data[type as keyof PortfolioData] as any[];
    const index = items.findIndex((item: any) => item.id === id);
    
    if (index === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
      });
    }

    items.splice(index, 1);
    data.lastUpdated = new Date().toISOString();
    
    await writeJsonFile(DATA_FILE, data);
    
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ success: false, message: 'Failed to delete item' });
  }
});

// Start server
async function startServer() {
  await initializeAdmin();
  
  app.listen(PORT, () => {
    console.log(`🚀 Admin server running on http://localhost:${PORT}`);
    console.log(`📊 Admin panel available at http://localhost:5173/admin`);
    console.log(`🔑 Default credentials: admin / ${ADMIN_PASSWORD}`);
  });
}

startServer().catch(console.error);
