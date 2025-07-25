import React, { useState } from 'react';
import Artwork3DPreview from '../ui/Artwork3DPreview';
import BoxArtCustomizer from '../3d/BoxArtCustomizer';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { ThemeToggle } from '../ui/ThemeToggle';
import { 
  Upload, 
  Sparkles, 
  Palette, 
  Play,
  MousePointer2,
  Scroll,
  Box,
  Layers3,
  Smartphone,
  Edit3
} from 'lucide-react';

// Define the platform type
type Platform = 'xbox' | 'playstation' | 'pc' | 'standard';

// Define the sample image type
interface SampleImage {
  front: string;
  back: string;
  spine: string;
  platform: Platform;
  title: string;
}

const BoxArt3DPreviewDemo: React.FC = () => {
  // Sample game box art URLs from the codebase
  const sampleImages: SampleImage[] = [
    {
      front: 'https://corsproxy.io/?' + encodeURIComponent('https://cdn.mobygames.com/covers/1873671-tomb-raider-xbox-360-front-cover.jpg'),
      back: 'https://corsproxy.io/?' + encodeURIComponent('https://cdn.mobygames.com/covers/1874069-tomb-raider-xbox-360-back-cover.jpg'),
      spine: 'https://corsproxy.io/?' + encodeURIComponent('https://cdn.mobygames.com/covers/1873455-tomb-raider-xbox-360-spinesides.jpg'),
      platform: 'xbox',
      title: 'Tomb Raider (Xbox 360)'
    },
    {
      front: 'https://corsproxy.io/?' + encodeURIComponent('https://cdn.mobygames.com/covers/10573524-tomb-raider-playstation-3-front-cover.jpg'),
      back: 'https://corsproxy.io/?' + encodeURIComponent('https://cdn.mobygames.com/covers/10573527-tomb-raider-playstation-3-back-cover.jpg'),
      spine: 'https://corsproxy.io/?' + encodeURIComponent('https://cdn.mobygames.com/covers/10573518-tomb-raider-playstation-3-spinesides.jpg'),
      platform: 'playstation',
      title: 'Tomb Raider (PlayStation 3)'
    },
    {
      front: 'https://corsproxy.io/?' + encodeURIComponent('https://cdn.mobygames.com/covers/8226997-tomb-raider-windows-front-cover.jpg'),
      back: 'https://corsproxy.io/?' + encodeURIComponent('https://cdn.mobygames.com/covers/8227000-tomb-raider-windows-back-cover.jpg'),
      spine: 'https://corsproxy.io/?' + encodeURIComponent('https://cdn.mobygames.com/covers/8226994-tomb-raider-windows-spinesides.jpg'),
      platform: 'pc',
      title: 'Tomb Raider (PC)'
    }
  ];

  const [showCustomizer, setShowCustomizer] = useState(false);
  const [selectedSample, setSelectedSample] = useState<SampleImage | null>(null);
  
  return (
    <div className="min-h-screen bg-background relative">
      {/* Header with Theme Toggle */}
      <header className="relative z-10 border-b border-border/40 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Box className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">3D Viewer</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto space-y-8">
              {/* Hero Badge */}
              <div className="animate-fade-in">
                <Badge variant="secondary" className="px-4 py-2">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Interactive 3D Game Box Viewer
                </Badge>
              </div>
              
              {/* Main Title */}
              <div className="animate-slide-up animate-delay-100">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                  Interactive 3D
                  <span className="block text-primary">Game Box Viewer</span>
                </h1>
              </div>
              
              {/* Description */}
              <div className="animate-slide-up animate-delay-200">
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Experience your game collection like never before with realistic 3D box art that you can rotate, customize, and interact with.
                </p>
              </div>
              
              {/* Feature highlights */}
              <div className="animate-slide-up animate-delay-300">
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MousePointer2 className="h-4 w-4" />
                    <span>Drag to rotate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scroll className="h-4 w-4" />
                    <span>Scroll to zoom</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    <span>Customize colors</span>
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons - Removed as per request */}
            </div>
          </div>
        </section>
      
        {/* Demo Section */}
        <section id="demo-section" className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline">
                <Box className="h-4 w-4 mr-2" />
                Interactive Demo
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Try It Yourself
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Interact with these 3D game boxes. Each platform has its unique design and feel.
              </p>
            </div>
            
            {/* Demo Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {sampleImages.map((imageSet, index) => (
                <div key={index} className="group">
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    {/* Platform badge and title */}
                    <div className="flex items-center justify-between p-6 pb-4">
                      <h3 className="font-semibold text-foreground truncate">
                        {imageSet.title}
                      </h3>
                      <Badge 
                        variant={
                          imageSet.platform === 'xbox' ? 'success' :
                          imageSet.platform === 'playstation' ? 'default' :
                          imageSet.platform === 'pc' ? 'secondary' : 'outline'
                        }
                        className="uppercase text-xs"
                      >
                        {imageSet.platform}
                      </Badge>
                    </div>
                    
                    {/* 3D Viewer Container */}
                    <div className="relative px-6 pb-4">
                      <div className="h-96 rounded-lg overflow-hidden bg-muted/50 relative">
                        <Artwork3DPreview
                          frontImageUrl={imageSet.front}
                          backImageUrl={imageSet.back}
                          spineImageUrl={imageSet.spine}
                          className="w-full h-full"
                          platform={imageSet.platform}
                        />
                        
                        {/* Interaction hints */}
                        <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm rounded-md px-2 py-1 border">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MousePointer2 className="h-3 w-3" />
                            <span>Drag • Scroll</span>
                          </div>
                        </div>
                        
                        {/* Customize button overlay */}
                        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button
                            onClick={() => {
                              setSelectedSample(imageSet);
                              setShowCustomizer(true);
                            }}
                            className="shadow-lg"
                          >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Customize
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div className="px-6 pb-6 space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Layers3 className="h-4 w-4" />
                        <span>Realistic 3D rendering</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Palette className="h-4 w-4" />
                        <span>Customizable materials</span>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge variant="outline">
                <Sparkles className="h-4 w-4 mr-2" />
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
                Everything You Need
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A complete 3D viewing solution with modern web technologies
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                  <Box className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">3D Rendering</h4>
                <p className="text-sm text-muted-foreground">WebGL-powered realistic game box rendering</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                  <Edit3 className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Full Customization</h4>
                <p className="text-sm text-muted-foreground">Colors, materials, images, and effects</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Local Storage</h4>
                <p className="text-sm text-muted-foreground">Save and load your custom creations</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Responsive</h4>
                <p className="text-sm text-muted-foreground">Perfect experience on all devices</p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Box Art Customizer Modal */}
      {showCustomizer && selectedSample && (
        <BoxArtCustomizer
          isOpen={showCustomizer}
          onClose={() => {
            setShowCustomizer(false);
            setSelectedSample(null);
          }}
          initialData={{
            frontImageUrl: selectedSample.front,
            backImageUrl: selectedSample.back,
            spineImageUrl: selectedSample.spine,
            platform: selectedSample.platform,
            title: selectedSample.title
          }}
        />
      )}
    </div>
  );
};

export default BoxArt3DPreviewDemo;