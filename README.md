# Tork Coach - Bodybuilding CRM Platform

A comprehensive bodybuilding coaching CRM platform built with React, TypeScript, and Firebase. Manage clients, design hypertrophy-focused programs, track progress, and leverage AI-driven insights for optimized coaching at scale.

## 🚀 Features

- **Firebase Authentication** - Secure email/password authentication with role-based access control
- **Client Management** - Comprehensive client profiles with progress tracking and analytics
- **Workout Programming** - Create and manage training programs with templates and exercise database
- **Nutrition Planning** - Meal plan templates, recipe library, and macro tracking
- **AI-Powered Insights** - Real-time check-in analysis with editable coaching recommendations
- **Activity Feed** - Monitor client activity and provide instant feedback
- **Messages & Communication** - Integrated messaging system for coach-client communication
- **Analytics Dashboard** - Performance metrics and adherence tracking

## 📋 Prerequisites

- Node.js 18+ and npm
- A Firebase account ([create one here](https://firebase.google.com))

## 🛠️ Setup

### 1. Clone and Install

```bash
npm install
```

### 2. Configure Firebase

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Email/Password authentication
3. Create a Firestore database
4. Copy `.env.example` to `.env` and fill in your Firebase configuration

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed setup instructions.

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🔐 Authentication

The app uses Firebase Authentication with role-based access control:

- **Coach Role**: Full access to all features (assigned by default on signup)
- **Admin Role**: Full access with additional administrative privileges
- **Client Role**: Limited access (future implementation)

All routes are protected and require authentication. Only users with the `coach` or `admin` role can access the platform.

## 📱 Application Structure

```
src/
├── components/
│   ├── auth/              # Authentication components
│   ├── pages/             # Main page components
│   │   ├── programs/      # Programs sub-pages
│   │   │   ├── WorkoutsPage.tsx
│   │   │   ├── NutritionPage.tsx
│   │   │   └── ExerciseDatabasePage.tsx
│   │   ├── ClientsPage.tsx
│   │   ├── CheckInsPage.tsx
│   │   ├── MessagesPage.tsx
│   │   └── AnalyticsPage.tsx
│   └── ui/                # Shadcn UI components
├── contexts/              # React contexts (Auth)
├── lib/                   # Utilities and helpers
│   ├── firebase.ts        # Firebase configuration
│   ├── types.ts           # TypeScript types
│   └── helpers.ts         # Helper functions
└── App.tsx               # Main application component
```

## 🎨 Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Icons**: Phosphor Icons
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Charts**: Recharts
- **State Management**: React Hooks + KV Store

## 🔒 Security

This application implements security best practices:

- Row-level security with Firestore rules
- Role-based access control
- No secrets in frontend code
- Encrypted data at rest
- HTTPS/TLS for all traffic
- Session management with automatic token refresh

See [SECURITY_REQUIREMENTS.md](./SECURITY_REQUIREMENTS.md) for full security documentation.

## 📖 Key Pages

### Dashboard
Main landing page with activity feed, client overview, and quick actions.

### Clients
Manage all clients with search, filtering, and detailed client profiles.

### Programs
Tabbed interface with three sub-pages:
- **Workouts**: Workout templates and program builder
- **Nutrition**: Meal plans and recipe library  
- **Exercise Database**: Searchable exercise library with custom exercise creation

### Check-ins
Review client check-ins with AI-generated insights that coaches can edit before sending.

### Messages
1:1 messaging with clients (future: voice notes and media).

### Analytics
Performance metrics, adherence tracking, and business insights.

## 🤖 AI Features

- **Check-in Analysis**: Automated analysis of client check-ins with editable insights
- **Progressive Overload Detection**: Identifies when clients break PRs
- **Coaching Recommendations**: Context-aware suggestions based on client data

## 🌐 Public Access

To create public access URLs for sharing programs or progress:

1. Generate a shareable link in the application
2. Configure Firestore rules for public read access
3. Share the generated URL

## 📝 Environment Variables

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_USE_FIREBASE_EMULATOR=false
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Firebase Hosting

```bash
firebase login
firebase init hosting
firebase deploy
```

## 🤝 Contributing

This is a private coaching platform. For internal development:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

## 📚 Additional Documentation

- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Detailed Firebase setup guide
- [PRD.md](./PRD.md) - Product requirements document
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture overview
- [SECURITY_REQUIREMENTS.md](./SECURITY_REQUIREMENTS.md) - Security guidelines

## 💡 Support

For issues or questions:
1. Check existing documentation
2. Review Firebase setup guide
3. Consult PRD for feature specifications

---

Built with ❤️ for fitness coaches who demand excellence.
