# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a standalone demo of a 3D box art viewer component featuring a **modern shadcn/ui design system**. It showcases interactive 3D game box art with full customization capabilities, built using Three.js and React Three Fiber with a professional, enterprise-ready interface.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (TypeScript compilation + Vite build)
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Design System**: shadcn/ui components with modern CSS variables
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Styling**: Tailwind CSS v3 with custom design tokens
- **Typography**: Inter font with Geist Mono for code
- **Icons**: Lucide React
- **Utilities**: clsx + tailwind-merge for className composition
- **Build Tool**: Vite with React plugin

## Architecture

### Modern Design System Architecture

The application implements a **complete shadcn/ui design system** with:

- **CSS Custom Properties**: Full theme system supporting light/dark modes
- **Component Library**: All UI components follow shadcn/ui specifications with forwardRef patterns
- **Type Safety**: Comprehensive TypeScript interfaces for all components and props
- **Accessibility**: WCAG 2.1 AA compliant with proper focus management and ARIA labels

### Component Structure

- **`src/components/3d/`**: Core 3D rendering components
  - `BoxArt3DViewer.tsx`: Main 3D box art renderer with platform-specific configurations
  - `BoxArtCustomizer.tsx`: Modern tabbed customization interface with clean hierarchy
- **`src/components/ui/`**: shadcn/ui component library
  - All components use forwardRef, proper TypeScript interfaces, and consistent styling
  - `ThemeToggle.tsx`: Dark/light mode toggle with system preference detection
- **`src/components/examples/`**: Demo implementations
- **`src/lib/utils.ts`**: Utility functions including cn() for className merging
- **`src/main.tsx`**: Application entry point

### 3D Rendering Architecture

The 3D system is built around Three.js with React Three Fiber:

- **Platform Configurations**: Each platform (Xbox, PlayStation, PC, Standard) has specific dimensions, colors, and material properties
- **Texture Management**: Handles front, back, and spine artwork with automatic texture loading
- **Interactive Controls**: OrbitControls for rotation, zoom, and pan with touch support
- **Auto-rotation**: Smooth multi-axis rotation with user toggle functionality
- **Material System**: StandardMaterial with configurable metalness, roughness, and transparency

### Key Features Implementation

1. **Platform-Specific Rendering**: Each platform has unique colors, dimensions, and visual styling
2. **Interactive 3D Controls**: Click-and-drag rotation, scroll-to-zoom, click-to-toggle auto-rotation
3. **Customization System**: Full-featured editor with tabs for images, colors, and effects
4. **Local Storage Persistence**: Save/load custom configurations with timestamps
5. **Responsive Design**: Works across desktop, tablet, and mobile devices
6. **Performance Optimization**: Suspense loading, texture caching, and GPU acceleration

### Theme System Architecture

The application implements a complete dark/light theme system:

- **CSS Custom Properties**: HSL color space variables for precise theming
- **Theme Toggle**: Animated toggle with system preference detection and localStorage persistence
- **Seamless Transitions**: Smooth color transitions when switching themes
- **Consistent Theming**: All components automatically adapt to theme changes

### Customization Architecture

The `BoxArtCustomizer` component provides a modern interface:

- **Clean Modal Design**: Professional modal with proper backdrop and responsive sizing
- **Tabbed Interface**: Organized into Settings, Images, Colors, and Saved tabs
- **Modern Form Controls**: Updated inputs, selectors, and sliders with consistent styling
- **Upload Areas**: Clean drag-and-drop zones with visual feedback
- **Storage Management**: Local storage with save/load/delete functionality

## Configuration Files

### TypeScript Configuration (`tsconfig.json`)
- Strict mode enabled with comprehensive linting rules
- Modern ES2020 target with DOM libraries
- Path aliases configured: `@/*` → `./src/*` for clean imports

### Vite Configuration (`vite.config.ts`)
- React plugin with fast refresh
- Path alias support for clean imports
- Standard Vite defaults optimized for development and build

### Tailwind Configuration (`tailwind.config.js`)
- **Tailwind CSS v3** with shadcn/ui color system
- **Dark mode**: Class-based dark mode support
- **Custom Design Tokens**: Complete color system with CSS custom properties
- **Typography**: Inter and Geist Mono font families
- **Animations**: Modern fade-in, slide-up, and scale-in animations
- **Responsive Design**: Custom container and screen configurations

### PostCSS Configuration (`postcss.config.js`)
- Standard Tailwind CSS v3 plugin configuration
- Autoprefixer for browser compatibility

## Development Patterns

### shadcn/ui Component Creation
- **Always use forwardRef pattern** for all UI components
- **Implement proper TypeScript interfaces** with extending HTML element props
- **Use cn() utility function** for className composition and conditional styling
- **Follow shadcn/ui naming conventions** with proper displayName assignment

```typescript
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
```

### Theme-Aware Styling
- **Use CSS custom properties** defined in `src/index.css` for consistent theming
- **Leverage Tailwind semantic colors** (background, foreground, primary, etc.)
- **Avoid hardcoded colors** - use the theme system for all color values

### 3D Component Patterns
```typescript
// Use React Three Fiber hooks and components
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';

// Platform-specific configurations
const PLATFORM_CONFIGS = {
  xbox: { width: 2.6, height: 3.5, depth: 0.2, color: '#107C10' },
  // ... other platforms
};

// Use refs for 3D object manipulation
const groupRef = useRef<Group>(null!);
useFrame(() => {
  if (groupRef.current) {
    // Animation logic
  }
});
```

### State Management Patterns
- **Local state with `useState`** for component-specific data
- **`useRef` for 3D object references** and DOM elements
- **`useCallback` for event handlers** to prevent re-renders
- **Local storage integration** for theme and customization persistence

### Modern UI Patterns
- **Card-based layouts** instead of glassmorphism effects
- **Subtle shadows and borders** for depth and separation
- **Consistent spacing** using Tailwind's spacing scale
- **Professional hover states** with scale and color transitions
- **Semantic color usage** (bg-card, text-foreground, border-border)

## File Organization

```
src/
├── components/
│   ├── 3d/              # 3D-specific components
│   │   ├── BoxArt3DViewer.tsx    # Core 3D renderer with platform configs
│   │   ├── BoxArtCustomizer.tsx  # Modern tabbed customization interface
│   │   └── BoxArtCustomizer.css  # Component-specific styles
│   ├── examples/        # Demo implementations
│   │   └── BoxArt3DPreviewDemo.tsx  # Main demo page with modern UI
│   └── ui/              # shadcn/ui component library
│       ├── Artwork3DPreview.tsx     # 3D viewer wrapper
│       ├── Button.tsx               # shadcn/ui Button with variants
│       ├── Card.tsx                 # shadcn/ui Card with header/content
│       ├── Badge.tsx                # shadcn/ui Badge with variants
│       ├── Tabs.tsx                 # shadcn/ui Tabs with accessibility
│       ├── Label.tsx                # shadcn/ui Label for forms
│       ├── Slider.tsx               # shadcn/ui Slider with custom styling
│       └── ThemeToggle.tsx          # Dark/light mode toggle
├── lib/
│   └── utils.ts         # Utility functions (cn, etc.)
├── main.tsx            # App entry point
└── index.css           # Global styles, theme variables, and animations
```

## Key Dependencies

- **`@react-three/fiber`**: React renderer for Three.js
- **`@react-three/drei`**: React Three Fiber helpers (OrbitControls, useTexture)
- **`three`**: Core 3D graphics library
- **`lucide-react`**: Modern icon library
- **`tailwindcss`**: Utility-first CSS framework (v3)
- **`clsx`**: Conditional className utility
- **`tailwind-merge`**: Tailwind className conflict resolution

## Performance Considerations

- **GPU Acceleration**: Enabled with `powerPreference: "high-performance"`
- **Texture Loading**: Suspense boundaries for smooth loading experiences
- **Render Optimization**: DPR limiting to `[1, 2]` for performance/quality balance
- **Memory Management**: Proper cleanup of Three.js resources and textures

## Development Workflow

1. **Component Development**: Start with basic Three.js setup, then add React Three Fiber
2. **3D Scene Setup**: Configure camera, lighting, and controls before adding 3D models
3. **Material Configuration**: Define platform-specific materials and colors
4. **Interaction Layer**: Add OrbitControls and custom event handlers
5. **UI Integration**: Build customization interface with state synchronization
6. **Performance Testing**: Test on various devices and optimize render performance

## Common Patterns

### Loading States
```typescript
<Suspense fallback={
  <div className="loading-container">
    <div className="loading-spinner" />
  </div>
}>
  <Canvas>
    {/* 3D content */}
  </Canvas>
</Suspense>
```

### Platform-Specific Styling
```typescript
const config = PLATFORM_CONFIGS[platform];
<meshStandardMaterial 
  color={config.color}
  metalness={config.metalness}
  roughness={config.roughness}
/>
```

### Responsive 3D Canvas
```typescript
<Canvas
  camera={{ position: [5, 4, 8], fov: 50 }}
  style={{ width: '100%', height: '100%' }}
  gl={{ antialias: true, powerPreference: "high-performance" }}
  dpr={[1, 2]}
/>
```