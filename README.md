# Provider Dashboard Package

This is a complete provider dashboard package for the Mediva AI healthcare platform. It includes all the necessary components and pages for a healthcare provider portal with dark theme UI, AI integration, and comprehensive patient management features.

## 📁 Package Contents

```
PROVIDER_DASHBOARD_PACKAGE/
├── layout.tsx                 # Provider layout with header and navigation
├── page.tsx                   # Main provider dashboard
├── analytics/
│   └── page.tsx              # Practice analytics and AI insights
├── ai-chat/
│   └── page.tsx              # AI clinical assistant
├── patients/
│   └── page.tsx              # Patient management interface
└── README.md                 # This file
```

## 🚀 Installation Instructions

### Option 1: Copy to Existing Project

1. **Copy the entire folder structure** to your destination project
2. **Update import paths** if needed (especially for `@/lib/utils` and `@/app/providers`)
3. **Install required dependencies** (if not already installed):

```bash
npm install @heroicons/react
```

### Option 2: Move to New Directory

1. **Cut and paste** this entire `PROVIDER_DASHBOARD_PACKAGE` folder to your desired location
2. **Rename the folder** if needed (e.g., to `provider` or `healthcare-dashboard`)
3. **Update any absolute import paths** in the files

## 🔧 Required Dependencies

Make sure your project has these dependencies installed:

```json
{
  "@heroicons/react": "^2.0.0",
  "next": "^14.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "tailwindcss": "^3.0.0"
}
```

## 🎨 CSS Classes Required

This package uses custom CSS classes that should be defined in your global CSS file:

```css
/* Essential classes used in the components */
.heading-large { /* Large heading styles */ }
.heading-small { /* Small heading styles */ }
.body-text { /* Body text styles */ }
.body-large { /* Large body text styles */ }
.mono-text { /* Monospace text styles */ }
.card { /* Card container styles */ }
.card-hover { /* Hoverable card styles */ }
.card-interactive { /* Interactive card styles */ }
.glass { /* Glass morphism effect */ }
.btn-primary { /* Primary button styles */ }
.btn-secondary { /* Secondary button styles */ }
.btn-outline { /* Outline button styles */ }
.input { /* Input field styles */ }
.badge-success { /* Success badge styles */ }
.badge-info { /* Info badge styles */ }
.badge-neutral { /* Neutral badge styles */ }
.badge-danger { /* Danger badge styles */ }
.mediva-gradient { /* Primary gradient background */ }
.ai-text { /* AI-specific text styling */ }
.ai-glow { /* AI glow effect */ }
.animate-slide-up { /* Slide up animation */ }
.animate-fade-in { /* Fade in animation */ }
.bg-mesh { /* Mesh background pattern */ }
.dark-elevated { /* Dark elevated surface */ }
```

## 🔗 Integration Steps

### 1. Update Import Paths

Replace these imports in the files if your project structure is different:

```typescript
// Update these paths as needed:
import { useAuth } from '@/app/providers';  // Your auth context
import { formatTime, formatDateTime } from '@/lib/utils';  // Your utility functions
```

### 2. Add Route Configuration

If using Next.js 13+ with app router, place the files in your app directory:

```
app/
├── provider/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── analytics/
│   │   └── page.tsx
│   ├── ai-chat/
│   │   └── page.tsx
│   └── patients/
│       └── page.tsx
```

### 3. Configure Authentication

The components expect a `useAuth` hook that provides:

```typescript
interface AuthContext {
  user: {
    full_name?: string;
    role: string;
  };
}
```

### 4. Add Navigation Links

Update your global navigation to include provider routes:

```typescript
const providerRoutes = [
  { name: 'Dashboard', href: '/provider' },
  { name: 'Patients', href: '/provider/patients' },
  { name: 'AI Assistant', href: '/provider/ai-chat' },
  { name: 'Analytics', href: '/provider/analytics' },
];
```

## 🌟 Features Included

### 📊 Main Dashboard (`page.tsx`)
- **Practice metrics** with trend indicators
- **Today's appointments** with patient details
- **Patient alerts** with urgency levels
- **AI clinical insights** with recommendations
- **Quick action buttons** for common tasks

### 📈 Analytics (`analytics/page.tsx`)
- **Practice performance metrics**
- **AI-powered predictive insights**
- **Treatment outcome tracking**
- **Revenue analysis**
- **Common condition analytics**
- **Interactive charts and data visualization**

### 🤖 AI Assistant (`ai-chat/page.tsx`)
- **Multiple chat modes** (Diagnosis, Pharmacology, Guidelines, Research)
- **Clinical decision support**
- **Drug interaction checking**
- **Treatment guideline queries**
- **Patient context integration**
- **Confidence scoring**
- **Source citations**

### 👥 Patient Management (`patients/page.tsx`)
- **Patient roster with search and filtering**
- **Risk level assessment**
- **Vital signs tracking**
- **Alert management**
- **Quick actions** (call, video chat, messaging)
- **Patient status tracking**

## 🎨 Design System

The package uses a **dark theme** with:
- **Glass morphism effects**
- **Gradient accents**
- **AI-themed styling**
- **Professional medical UI**
- **Responsive design**
- **Accessibility considerations**

## 🔧 Customization

### Colors
Update the color scheme by modifying the CSS custom properties:

```css
:root {
  --primary-from: 316 70% 58%;  /* Pink */
  --primary-via: 280 100% 70%;  /* Purple */
  --primary-to: 240 100% 70%;   /* Indigo */
}
```

### Data Integration
Replace the mock data with your API calls:

```typescript
// Replace mock data with your API endpoints
const fetchPatients = async () => {
  const response = await fetch('/api/patients');
  return response.json();
};
```

## 📝 Notes

- All components are **client-side** (`'use client'`) for interactivity
- **TypeScript interfaces** are included for type safety
- **Responsive design** works on mobile and desktop
- **Mock data** is provided for demonstration
- **Error handling** can be added as needed
- **Loading states** are implemented

## 🆘 Support

If you encounter any issues:

1. **Check import paths** are correct for your project structure
2. **Verify CSS classes** are defined in your global styles
3. **Install missing dependencies**
4. **Update TypeScript interfaces** to match your data structure

## 📄 License

This package is part of the Mediva AI project. Use according to your project's license terms.

---

**Happy coding! 🚀** 