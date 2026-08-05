const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Certificate = require('../models/Certificate');
const Blog = require('../models/Blog');
const Visitor = require('../models/Visitor');

dotenv.config({ path: '../.env' });
if (!process.env.MONGO_URI) {
  dotenv.config();
}

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ashu_portfolio';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Skill.deleteMany();
    await Experience.deleteMany();
    await Certificate.deleteMany();
    await Blog.deleteMany();
    await Visitor.deleteMany();

    // Create Admin User
    const adminUser = await User.create({
      name: 'Ashutosh Banke',
      email: 'admin@portfolio.com',
      password: 'admin123', // will be hashed by pre-save hook
      role: 'admin',
      bio: 'Full Stack MERN Developer passionate about modern UI/UX and scalable architectures with 1 year of experience.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    });
    console.log('Admin User Created: admin@portfolio.com / admin123');

    // Create Visitor Count
    await Visitor.create({ count: 1248 });

    // Seed Skills
    const skills = [
      // Frontend
      { name: 'React 19 & Next.js', category: 'Frontend', proficiency: 95, icon: 'SiReact', order: 1 },
      { name: 'JavaScript (ES6+) & TypeScript', category: 'Frontend', proficiency: 92, icon: 'SiTypescript', order: 2 },
      { name: 'Tailwind CSS v4 & Styling', category: 'Frontend', proficiency: 98, icon: 'SiTailwindcss', order: 3 },
      { name: 'Framer Motion & Animations', category: 'Frontend', proficiency: 88, icon: 'SiFramer', order: 4 },
      { name: 'HTML5 & CSS3 / SASS', category: 'Frontend', proficiency: 96, icon: 'SiHtml5', order: 5 },

      // Backend
      { name: 'Node.js & Express.js', category: 'Backend', proficiency: 92, icon: 'SiNodedotjs', order: 1 },
      { name: 'RESTful API & GraphQL', category: 'Backend', proficiency: 90, icon: 'SiExpress', order: 2 },
      { name: 'JWT Authentication & Security', category: 'Backend', proficiency: 88, icon: 'SiJsonwebtokens', order: 3 },
      { name: 'Socket.io (Realtime Apps)', category: 'Backend', proficiency: 82, icon: 'SiSocketdotio', order: 4 },

      // Database
      { name: 'MongoDB & Mongoose', category: 'Database', proficiency: 90, icon: 'SiMongodb', order: 1 },
      { name: 'PostgreSQL & Prisma', category: 'Database', proficiency: 85, icon: 'SiPostgresql', order: 2 },
      { name: 'Redis Caching', category: 'Database', proficiency: 80, icon: 'SiRedis', order: 3 },

      // DevOps
      { name: 'Docker & Containerization', category: 'DevOps', proficiency: 82, icon: 'SiDocker', order: 1 },
      { name: 'AWS (S3, EC2, Lambda)', category: 'DevOps', proficiency: 78, icon: 'FaAws', order: 2 },
      { name: 'CI/CD Pipelines & GitHub Actions', category: 'DevOps', proficiency: 85, icon: 'SiGithubactions', order: 3 },
      { name: 'Vercel / Render Deployment', category: 'DevOps', proficiency: 95, icon: 'SiVercel', order: 4 },

      // Tools
      { name: 'Git & GitHub', category: 'Tools', proficiency: 95, icon: 'SiGit', order: 1 },
      { name: 'Postman & Swagger', category: 'Tools', proficiency: 92, icon: 'SiPostman', order: 2 },
      { name: 'Vite & Webpack', category: 'Tools', proficiency: 90, icon: 'SiVite', order: 3 },
      { name: 'Figma & UI Design', category: 'Tools', proficiency: 84, icon: 'SiFigma', order: 4 },
    ];
    await Skill.insertMany(skills);
    console.log('Skills Seeded.');

    // Seed Projects
    const projects = [
      {
        title: 'Wapixo Salon Management Platform',
        description: 'Multi-Tenant Salon Management SaaS Platform supporting independent salon operations on shared infrastructure with RBAC (7 roles), Razorpay, WhatsApp Cloud API, Node-Cron, and real-time Recharts analytics.',
        category: 'Full Stack',
        technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Razorpay', 'WhatsApp API', 'Node-Cron', 'Recharts'],
        githubLink: 'https://github.com/ashutosh3110/Salon_crm123.git',
        liveLink: 'https://wapixo.com',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
        featured: true,
        order: 1,
      },
      {
        title: 'Dintask Customer Management System',
        description: 'Enterprise CRM, Sales & Service Management System supporting 100+ RESTful APIs, RBAC for 6 roles, Socket.IO real-time chat, Razorpay subscriptions, and automated Node-Cron reminders.',
        category: 'Full Stack',
        technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Socket.IO', 'Razorpay', 'Node-Cron', 'React'],
        githubLink: 'https://github.com/example/dintask-crm',
        liveLink: 'https://dintask.com',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
        featured: true,
        order: 2,
      },
      {
        title: 'Sootit Driver Management System',
        description: 'Sootit is a scalable full-stack MERN (MongoDB, Express.js, React 19, Node.js) on-demand automotive and transport service ecosystem designed to connect vehicle owners with verified service providers such as mechanics, drivers, RTO consultants, towing services, and legal advisors. Built with modern micro-animations (Framer Motion & Lenis) and a mobile-first UI, the platform features a 4-tier architecture (User, Vendor, Vehicle Owner, and Admin) complete with real-time job notifications via WebSockets (Socket.io), secure online payments & in-app wallet management using Razorpay, automated multi-step vendor KYC verification, and a dynamic admin control panel for platform configuration.',
        category: 'Full Stack',
        technologies: ['React 19', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Razorpay', 'Framer Motion', 'Tailwind CSS', 'Cloudinary'],
        githubLink: 'https://github.com/ashutosh3110/sotit.git',
        liveLink: 'https://sootit.com',
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200&auto=format&fit=crop',
        featured: true,
        order: 3,
      },
      {
        title: 'EzOfLife On-Demand Laundry & Logistics Platform',
        description: 'Ezoflife (Loondry) – Multi-Persona On-Demand Laundry & Logistics Platform. Built an enterprise-grade, multi-persona on-demand laundry logistics ecosystem using the MERN stack (React 19, Vite, Tailwind CSS v4, Node.js, Express, MongoDB, Zustand, Framer Motion). The platform seamlessly integrates 5 dedicated portals—Customer, Vendor (Laundry Shops), Rider (Delivery Fleet), B2B Supplier, and Admin Mission Control—into a unified workflow. Key technical achievements include a proprietary 4-step secure logistics handshake protocol with dual-OTP verification for order handovers, dynamic express pricing surcharges, a real-time notification engine with 12 operational event triggers, vendor yield calculators, and an executive Admin dashboard providing real-time GMV tracking, vendor scoring, operational health metrics, and B2B lead management.',
        category: 'Full Stack',
        technologies: ['React 19', 'Vite', 'Tailwind CSS v4', 'Node.js', 'Express.js', 'MongoDB', 'Zustand', 'Framer Motion'],
        githubLink: 'https://github.com/ashutosh3110/Ezoflife123.git',
        liveLink: 'https://ezoflife123.vercel.app/',
        image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=1200&auto=format&fit=crop',
        featured: true,
        order: 4,
      },
    ];
    await Project.insertMany(projects);
    console.log('Projects Seeded.');

    // Seed Experience & Education
    const experiences = [
      {
        title: 'Backend / Full Stack Developer',
        company: 'Appzeto Private Limited',
        location: 'On-Site',
        type: 'Full-Time',
        startDate: 'July 2025',
        endDate: 'July 2026',
        current: false,
        description: 'Developed and maintained scalable backend applications using Node.js, Express.js, and MongoDB for production SaaS products.',
        highlights: [
          'Designed and implemented secure RESTful APIs, JWT authentication, authorization middleware, and Role-Based Access Control (RBAC).',
          'Built and maintained multi-tenant SaaS architecture supporting multiple businesses on a shared infrastructure.',
          'Integrated third-party services including Razorpay Payment Gateway, WhatsApp Cloud API, SMS APIs, OTP verification, and Cloudinary.',
        ],
        order: 1,
      },
      {
        title: 'Master of Computer Applications (MCA)',
        company: 'Medi-Caps University',
        location: 'Indore, MP',
        type: 'Education',
        startDate: '2024',
        endDate: '2026',
        current: true,
        description: 'Specializing in Advanced Software Engineering, Cloud Architecture, Distributed Databases, and Enterprise Application Design.',
        highlights: [
          'Advanced Cloud Computing & Microservices Architecture',
          'Full Stack Web Development & System Design',
        ],
        order: 2,
      },
      {
        title: 'Bachelor of Computer Applications (BCA)',
        company: 'Career College',
        location: 'Bhopal, MP',
        type: 'Education',
        startDate: '2021',
        endDate: '2024',
        current: false,
        description: 'Graduated with strong foundation in Computer Science, Data Structures & Algorithms, Object-Oriented Programming, and Web Technologies.',
        highlights: [
          'Core Programming in C++, Java & Web Technologies',
          'Database Management Systems & Web Development Projects',
        ],
        order: 3,
      },
    ];
    await Experience.insertMany(experiences);
    console.log('Experience & Education Seeded.');

    // Seed Certificates
    const certificates = [
      {
        title: 'Cloud Computing Certification',
        issuer: 'NPTEL (IIT Kharagpur / MoE)',
        issueDate: '2024',
        credentialUrl: 'https://nptel.ac.in/noc',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
        order: 1,
      },
    ];
    await Certificate.insertMany(certificates);
    console.log('Certificates Seeded.');

    // Seed Blogs
    const blogs = [
      {
        title: 'Mastering React 19: Actions, Optimistic UI & Server Components',
        slug: 'mastering-react-19-actions-and-optimistic-ui',
        excerpt: 'Explore the latest features in React 19 including native async transition hooks, useOptimistic, useFormStatus, and seamless state integration.',
        content: `React 19 brings powerful new primitives that eliminate boilerplate code when dealing with asynchronous operations, form submission state, and optimistic updates.
        
### 1. Simplified Form Actions
With React 19, form handling is dramatically cleaner. You no longer need manual state handlers for pending status or form validation.

### 2. The useOptimistic Hook
Optimistic updates allow your web app to reflect UI changes instantly before server confirmation, resulting in a snappy, app-like experience.

### 3. Automatic Asset Loading
Scripts, stylesheets, and fonts are now automatically hoisted and deduplicated by React during rendering!`,
        category: 'React & Frontend',
        tags: ['React 19', 'JavaScript', 'Frontend', 'Web Dev'],
        readTime: '6 min read',
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop',
        isPublished: true,
      },
      {
        title: 'Building Scalable RESTful APIs with Node.js, Express & MongoDB',
        slug: 'building-scalable-rest-apis-node-express-mongodb',
        excerpt: 'A comprehensive guide to designing clean MVC architectures, indexing MongoDB collections, using JWT middleware, and handling errors gracefully.',
        content: `Designing backend systems for production requires structure, security, and maintainability.

### Key Pillars of Production APIs:
- **Clean Folder Hierarchy**: Controller-Route-Service separation.
- **Robust Error Handling**: Global error boundary middleware preventing server crashes.
- **Security Best Practices**: Rate limiting, CORS policies, environment variable isolation, and password hashing using bcrypt.`,
        category: 'Backend & Node',
        tags: ['Node.js', 'Express', 'MongoDB', 'Security'],
        readTime: '8 min read',
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
        isPublished: true,
      },
      {
        title: 'Tailwind CSS v4: What Developers Need to Know',
        slug: 'tailwind-css-v4-features-and-performance',
        excerpt: 'Discover the new Rust-based Oxide engine, zero-config CSS configuration, native CSS variables, and blistering fast build speeds.',
        content: `Tailwind CSS v4 introduces the Oxide engine built from the ground up to give developers instant build times and clean CSS syntax.

### Highlights:
- **10x Faster Build Speeds**: Lightning CSS integration.
- **Pure CSS Configuration**: Configure themes right in your CSS using standard \`@theme\` blocks.
- **Dynamic Container Queries**: Built-in support without extra plugins.`,
        category: 'CSS & Design',
        tags: ['Tailwind CSS', 'CSS', 'UI Design'],
        readTime: '4 min read',
        coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
        isPublished: true,
      },
    ];
    await Blog.insertMany(blogs);
    console.log('Blogs Seeded.');

    console.log('--- SEEDING COMPLETED SUCCESSFULLY ---');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedData();
