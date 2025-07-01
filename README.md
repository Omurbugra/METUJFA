# Digital Exhibition

A modern, responsive digital art exhibition website built with React, TypeScript, and Tailwind CSS. This project showcases a collection of digital artworks, interactive installations, and video pieces in an immersive gallery experience.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Automatic system preference detection with manual toggle
- **Interactive Gallery**: Grid and list view modes with filtering and search
- **Modal Project Views**: Detailed project pages with rich media support
- **Smooth Animations**: CSS animations and transitions throughout
- **Modern UI**: Clean, professional design with glass-morphism effects
- **Accessibility**: Keyboard navigation and screen reader support

## Technologies Used

- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling
- **GitHub Pages** for deployment

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/digital-exhibition.git
cd digital-exhibition
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Navigation.tsx  # Header navigation
│   └── ProjectModal.tsx # Project detail modal
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Theme management
├── data/              # Static data and types
│   └── projects.ts    # Project data and utilities
├── pages/             # Page components
│   ├── Home.tsx       # Landing page
│   ├── Gallery.tsx    # Gallery with filtering
│   ├── About.tsx      # About page
│   └── Contact.tsx    # Contact page
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## Deployment to GitHub Pages

1. Update the `homepage` field in `package.json`:
```json
"homepage": "https://yourusername.github.io/your-repo-name"
```

2. Update the `base` field in `vite.config.ts`:
```typescript
base: '/your-repo-name/'
```

3. Update the `basename` prop in `src/main.tsx`:
```typescript
<BrowserRouter basename="/your-repo-name">
```

4. Build and deploy:
```bash
npm run build
npm run deploy
```

## Customization

### Adding New Projects

Edit `src/data/projects.ts` to add new artworks:

```typescript
{
  id: 'unique-id',
  title: 'Artwork Title',
  description: 'Short description',
  longDescription: 'Detailed description...',
  mediaType: 'image' | 'video' | 'interactive',
  mediaUrl: 'https://example.com/media.jpg',
  thumbnailUrl: 'https://example.com/thumb.jpg',
  aspectRatio: 'square' | 'portrait' | 'landscape',
  tags: ['tag1', 'tag2'],
  year: 2024,
  featured: true,
  externalLink: 'https://example.com',
  technologies: ['Tech1', 'Tech2']
}
```

### Customizing Colors

Update the color palette in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your color palette
  }
}
```

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route to `src/App.tsx`
3. Update navigation in `src/components/Navigation.tsx`

## Performance Optimizations

- Lazy loading for images
- Optimized bundle size with Vite
- Efficient re-renders with React hooks
- CSS animations for smooth interactions

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Images from [Pexels](https://pexels.com)
- Icons from [Lucide](https://lucide.dev)
- Fonts from [Google Fonts](https://fonts.google.com)