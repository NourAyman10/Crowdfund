# 🚀 Crowdfund - Angular Crowdfunding Platform

A modern, responsive crowdfunding platform built with Angular 18, featuring real-time updates, GraphQL integration, and a beautiful UI.

**🌐 Live Demo:** [https://crownfund1.netlify.app/campaigns](https://crownfund1.netlify.app/campaigns)

## ✨ Features

- **Campaign Management**: Browse and view crowdfunding campaigns
- **Real-time Updates**: Live donation notifications via WebSocket
- **Responsive Design**: Mobile-first approach with modern UI components
- **GraphQL Integration**: Efficient data fetching with Apollo Client
- **REST API Support**: Hybrid approach for different data requirements
- **Lazy Loading**: Optimized performance with route-based code splitting
- **Progress Tracking**: Visual progress bars for campaign goals
- **Donor Recognition**: Display donor information and amounts

## 🛠️ Tech Stack

- **Frontend Framework**: Angular 18
- **Styling**: SCSS with Angular Material
- **State Management**: Angular Signals
- **HTTP Client**: Angular HttpClient + Apollo Client (GraphQL)
- **Real-time**: WebSocket with RxJS
- **UI Components**: Custom component library
- **Build Tool**: Angular CLI
- **Hosting**: Netlify

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **Git**: Latest version

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/NourAyman10/Crowdfund.git
   cd Crowdfund
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/           # Reusable UI components
│   │   ├── button/          # Custom button component
│   │   ├── card/            # Campaign card component
│   │   ├── input/           # Form input component
│   │   ├── logo/            # Application logo
│   │   ├── newsletter-cta-section/  # Newsletter signup
│   │   ├── progress-bar/    # Progress indicator
│   │   └── skeleton/        # Loading skeleton
│   ├── directives/          # Custom directives
│   │   └── image-fallback/  # Image error handling
│   ├── graphql/             # GraphQL queries
│   │   └── campaign-details.query.ts
│   ├── interceptor/         # HTTP interceptors
│   │   └── error.interceptor.ts
│   ├── layout/              # Layout components
│   │   ├── components/
│   │   │   ├── footer/      # Site footer
│   │   │   └── header/      # Site header
│   │   └── main-layout/     # Main layout wrapper
│   ├── models/              # Data models
│   │   ├── campaigns.model.ts
│   │   └── messages/
│   │       └── donation-message.model.ts
│   ├── pages/               # Application pages
│   │   ├── campaigns/       # Campaigns listing page
│   │   ├── campaign-details/ # Individual campaign page
│   │   └── not-found/       # 404 error page
│   └── services/            # Business logic services
│       ├── campaigns/       # Campaign management
│       ├── campain-details/ # Campaign details (GraphQL)
│       ├── network/         # Network monitoring
│       └── realtime/        # WebSocket real-time updates
├── assets/                  # Static assets
│   ├── images/             # Images and icons
│   └── partners/           # Partner logos
└── environment/            # Environment configuration
```

## 📱 Pages & Components

### Main Pages

#### 1. **Campaigns Page** (`/campaigns`)
- **Route**: `/campaigns`
- **Component**: `CampaignsPage`
- **Features**:
  - Grid layout of campaign cards
  - Campaign filtering and search
  - Progress bars showing funding status
  - Responsive design for all devices

#### 2. **Campaign Details Page** (`/campaign-details/:id`)
- **Route**: `/campaign-details/:id`
- **Component**: `CampaignDetailsPage`
- **Features**:
  - Detailed campaign information
  - Donor list and amounts
  - Real-time donation updates
  - Progress tracking

#### 3. **Not Found Page** (`/not-found`)
- **Route**: `/not-found`
- **Component**: `NotFoundPage`
- **Features**:
  - User-friendly 404 error page
  - Navigation back to campaigns

### Reusable Components

#### **Button Component**
- Customizable button with different styles
- Loading states and disabled states
- Consistent design across the application

#### **Card Component**
- Campaign display cards
- Responsive grid layout
- Hover effects and animations

#### **Progress Bar Component**
- Visual representation of campaign progress
- Animated progress indicators
- Color-coded status indicators

#### **Skeleton Component**
- Loading placeholders
- Improves perceived performance
- Consistent with actual content layout

## 🔧 Services & Architecture

### Core Services

#### **CampaignsService**
- **Purpose**: Manages campaign data via REST API
- **Methods**:
  - `getCampaigns()`: Fetch all campaigns
- **Technology**: Angular HttpClient

#### **CampainDetailsService**
- **Purpose**: Handles individual campaign data via GraphQL
- **Methods**:
  - `load(id: string)`: Load campaign details
- **Features**:
  - Apollo Client integration
  - Error handling
  - Signal-based state management

#### **RealtimeService**
- **Purpose**: WebSocket connection for live updates
- **Features**:
  - Real-time donation notifications
  - Automatic reconnection
  - RxJS WebSocket integration

#### **NetworkService & NetworkMonitorService**
- **Purpose**: Network status monitoring
- **Features**:
  - Connection status detection
  - Offline/online handling
  - Service worker integration

### Data Models

#### **Campaign Interface**
```typescript
interface Campaign {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  goal: number;
  currentAmount: number;
  donors: Donors[];
}
```

#### **Donor Interface**
```typescript
interface Donors {
  name: string;
  amount: number;
}
```

#### **Donation Message**
```typescript
interface DonationMessage {
  campaignId: string;
  donorName: string;
  amount: number;
  timestamp: Date;
}
```

## 🌐 Deployment & Hosting

### Netlify Deployment

This project is configured for easy deployment on Netlify:

**🌐 Live Site**: [https://crownfund1.netlify.app/campaigns](https://crownfund1.netlify.app/campaigns)

#### **Deployment Configuration**
- **Build Command**: `npm run build`
- **Publish Directory**: `dist/crowdfund/browser`
- **Node Version**: 18
- **Base Directory**: Root of repository

#### **Netlify Features**
- **Automatic Deployments**: Deploy on every Git push
- **Custom Domain**: Configure your own domain
- **HTTPS**: Automatic SSL certificates
- **CDN**: Global content delivery network
- **Form Handling**: Built-in form processing

#### **Deployment Files**
- `netlify.toml` - Main configuration
- `public/_redirects` - Angular routing support
- `DEPLOYMENT_CHECKLIST.md` - Step-by-step guide

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Breakpoints**: Mobile, Tablet, Desktop
- **Grid System**: CSS Grid with Flexbox fallbacks
- **Touch Support**: Optimized for mobile devices
- **Performance**: Lazy loading and code splitting

## 🚀 Performance Features

- **Lazy Loading**: Route-based code splitting
- **Image Optimization**: WebP support and lazy loading
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Service worker and HTTP caching
- **CDN**: Global content delivery via Netlify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Made with ❤️ using Angular 18**

**Live Demo**: [https://crownfund1.netlify.app/campaigns](https://crownfund1.netlify.app/campaigns)
