# GameBox3D - 3D Game Box Art Viewer

This is a standalone demo of the 3D box art viewer component from the Codexa game library application, now rebranded as GameBox3D. It showcases interactive 3D game box art with customizable materials, colors, and images.

## Features

- Interactive 3D game box rendering using Three.js and React Three Fiber
- Platform-specific designs (Xbox, PlayStation, PC)
- Customizable box art with color, material, and image options
- Drag to rotate and scroll to zoom controls
- Local storage for saving customizations
- Responsive design that works on all devices

## Feature Improvements & Enhancements

### Performance Optimizations
- Implemented efficient rendering with React Three Fiber best practices
- Added frustum culling to improve rendering performance
- Optimized texture loading and memory management
- Implemented lazy loading for large textures

### Enhanced Customization
- Added advanced material properties (roughness, metalness, emissiveness)
- Introduced texture scaling and positioning controls
- Added support for custom environment maps for realistic reflections
- Implemented real-time preview of all customization changes

### UI/UX Improvements
- Added intuitive color picker with preset color palettes
- Implemented undo/redo functionality for customization changes
- Added keyboard shortcuts for common actions
- Enhanced responsive design with improved mobile controls

### Technical Enhancements
- Added TypeScript type safety throughout the component
- Implemented comprehensive error handling for asset loading
- Added unit tests for core functionality
- Improved code modularity and reusability

### New Features
- Added animation controls for dynamic box art presentations
- Implemented export functionality for customized box art images
- Added support for multiple box art sides (front, back, sides, top, bottom)
- Integrated with game database APIs for automatic box art fetching

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

src/
├── components/
│   ├── 3d/              # 3D viewer components
│   ├── examples/        # Demo page component
│   └── ui/              # UI components
├── main.tsx            # Application entry point
└── index.css           # Global styles

## Component Overview

- `BoxArt3DViewer.tsx`: The core 3D viewer component that renders the game box
- `Artwork3DPreview.tsx`: Wrapper component for the 3D viewer
- `BoxArtCustomizer.tsx`: Full customization interface with material controls
- `BoxArt3DPreviewDemo.tsx`: Complete demo page showcasing the 3D viewer
