import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { Group } from 'three';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { Label } from '../ui/Label';
import { Slider } from '../ui/Slider';
import { 
  Upload, 
  Palette, 
  Image as ImageIcon, 
  Settings, 
  RotateCcw, 
  Save,
  FolderOpen,
  Trash2,
  Sparkles,
  Camera
} from 'lucide-react';
import './BoxArtCustomizer.css';

interface BoxArtCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    frontImageUrl: string;
    backImageUrl?: string;
    spineImageUrl?: string;
    platform: 'xbox' | 'playstation' | 'pc' | 'standard';
    title?: string;
  };
}

interface CustomizationData {
  frontImage: string;
  backImage: string;
  spineImage: string;
  frameColor: string;
  platform: 'xbox' | 'playstation' | 'pc' | 'standard';
  title: string;
  brightness: number;
  contrast: number;
  saturation: number;
  lastModified: number;
}

// Enhanced platform configs with customizable colors
const PLATFORM_CONFIGS = {
  xbox: { baseColor: '#107C10', name: 'Xbox' },
  playstation: { baseColor: '#0070D1', name: 'PlayStation' },
  pc: { baseColor: '#606060', name: 'PC' },
  standard: { baseColor: '#707070', name: 'Standard' }
};

// Color presets for quick selection
const COLOR_PRESETS = [
  { name: 'Classic Green', color: '#107C10' },
  { name: 'PlayStation Blue', color: '#0070D1' },
  { name: 'Nintendo Red', color: '#E60012' },
  { name: 'Gold', color: '#FFD700' },
  { name: 'Silver', color: '#C0C0C0' },
  { name: 'Black', color: '#000000' },
  { name: 'White', color: '#FFFFFF' },
  { name: 'Purple', color: '#8B00FF' },
  { name: 'Orange', color: '#FF8C00' },
  { name: 'Pink', color: '#FF1493' }
];

const STORAGE_KEY = 'boxart_customizations';

// Enhanced 3D Box Model with customizable materials
const CustomizableBoxModel: React.FC<{
  frontImage: string;
  backImage: string;
  spineImage: string;
  frameColor: string;
  brightness: number;
  contrast: number;
  saturation: number;
  platform: string;
}> = ({ 
  frontImage, 
  backImage, 
  spineImage, 
  frameColor, 
  brightness,
  contrast,
  saturation
}) => {
  const groupRef = useRef<Group>(null!);
  const [hovered, setHovered] = useState(false);
  
  const width = 2.6;
  const height = 3.5;
  const depth = 0.3; // Increased depth to make top/bottom edges more visible
  
  // Load textures
  const frontTexture = useTexture(frontImage);
  const backTexture = useTexture(backImage);
  const spineTexture = useTexture(spineImage);

  // Apply image filters
  useEffect(() => {
    [frontTexture, backTexture, spineTexture].forEach(texture => {
      if (texture) {
        // Note: WebGL filters would need custom shaders, this is a simplified approach
        texture.needsUpdate = true;
      }
    });
  }, [brightness, contrast, saturation, frontTexture, backTexture, spineTexture]);

  useFrame(() => {
    if (groupRef.current) {
      if (hovered) {
        groupRef.current.scale.setScalar(1.05);
      } else {
        groupRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group 
      ref={groupRef}
      rotation={[-0.2, 0.4, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Create a cube with proper face materials, using frame color for most faces but spine texture for left face */}
      <mesh>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial attach="material-0" color={frameColor} /> {/* Right face - frame color */}
        <meshStandardMaterial attach="material-1" map={spineTexture} /> {/* Left face - spine texture */}
        <meshStandardMaterial attach="material-2" color={frameColor} /> {/* Top face - frame color */}
        <meshStandardMaterial attach="material-3" color={frameColor} /> {/* Bottom face - frame color */}
        <meshStandardMaterial attach="material-4" map={frontTexture} /> {/* Front face - front art */}
        <meshStandardMaterial attach="material-5" map={backTexture} /> {/* Back face - back art */}
      </mesh>
    </group>
  );
};

const BoxArtCustomizer: React.FC<BoxArtCustomizerProps> = ({ isOpen, onClose, initialData }) => {
  const [customization, setCustomization] = useState<CustomizationData>({
    frontImage: initialData?.frontImageUrl || '',
    backImage: initialData?.backImageUrl || initialData?.frontImageUrl || '',
    spineImage: initialData?.spineImageUrl || initialData?.frontImageUrl || '',
    frameColor: PLATFORM_CONFIGS[initialData?.platform || 'standard'].baseColor,
    platform: initialData?.platform || 'standard',
    title: initialData?.title || 'Custom Box Art',
    brightness: 1.0,
    contrast: 1.0,
    saturation: 1.0,
    lastModified: Date.now()
  });

  const [savedCustomizations, setSavedCustomizations] = useState<CustomizationData[]>([]);
  const [activeTab, setActiveTab] = useState('viewer');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load saved customizations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSavedCustomizations(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load saved customizations:', error);
      }
    }
  }, []);

  // Save customization to localStorage
  const saveCustomization = useCallback(() => {
    const newCustomization = { ...customization, lastModified: Date.now() };
    const updated = [...savedCustomizations.filter(c => c.title !== newCustomization.title), newCustomization];
    setSavedCustomizations(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    alert(`Saved "${customization.title}"`);
  }, [customization, savedCustomizations]);

  // Load customization
  const loadCustomization = useCallback((data: CustomizationData) => {
    setCustomization(data);
    alert(`Loaded "${data.title}"`);
  }, []);

  // Delete customization
  const deleteCustomization = useCallback((title: string) => {
    const updated = savedCustomizations.filter(c => c.title !== title);
    setSavedCustomizations(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    alert(`Deleted "${title}"`);
  }, [savedCustomizations]);

  // Handle file upload
  const handleImageUpload = useCallback((file: File, type: 'front' | 'back' | 'spine') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCustomization(prev => ({
        ...prev,
        [`${type}Image`]: result,
        lastModified: Date.now()
      }));
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} image uploaded`);
    };
    reader.readAsDataURL(file);
  }, []);

  // Reset to defaults
  const resetCustomization = useCallback(() => {
    setCustomization({
      frontImage: initialData?.frontImageUrl || '',
      backImage: initialData?.backImageUrl || initialData?.frontImageUrl || '',
      spineImage: initialData?.spineImageUrl || initialData?.frontImageUrl || '',
      frameColor: PLATFORM_CONFIGS[initialData?.platform || 'standard'].baseColor,
      platform: initialData?.platform || 'standard',
      title: initialData?.title || 'Custom Box Art',
      brightness: 1.0,
      contrast: 1.0,
      saturation: 1.0,
      lastModified: Date.now()
    });
    alert('Reset to defaults');
  }, [initialData]);

  // Export as image (simplified - would need proper canvas capture)
  const exportImage = useCallback(() => {
    alert('Export feature coming soon!');
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-xl border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">3D Box Art Customizer</h2>
              <p className="text-sm text-muted-foreground">Customize your game box art</p>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Sparkles className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* 3D Viewer */}
          <div className="flex-1 p-6">
            <div className="relative h-full rounded-lg overflow-hidden bg-muted/50 border">
              <Canvas
                ref={canvasRef}
                camera={{ position: [4, 3, 6], fov: 45 }}
                style={{ width: '100%', height: '100%' }}
                gl={{ preserveDrawingBuffer: true, antialias: true }}
              >
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.2} />
                <directionalLight position={[-5, 5, -5]} intensity={0.8} />
                
                <CustomizableBoxModel
                  frontImage={customization.frontImage}
                  backImage={customization.backImage}
                  spineImage={customization.spineImage}
                  frameColor={customization.frameColor}
                  brightness={customization.brightness}
                  contrast={customization.contrast}
                  saturation={customization.saturation}
                  platform={customization.platform}
                />
                
                <OrbitControls
                  enableZoom={true}
                  enablePan={false}
                  enableRotate={true}
                  rotateSpeed={1.2}
                  zoomSpeed={1.5}
                  enableDamping={true}
                  dampingFactor={0.05}
                  minDistance={3}
                  maxDistance={12}
                  makeDefault
                />
              </Canvas>
              
              {/* Viewer Controls */}
              <div className="absolute top-3 right-3 flex gap-2">
                <Button
                  onClick={exportImage}
                  size="sm"
                  variant="secondary"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              {/* Platform indicator */}
              <div className="absolute bottom-3 left-3">
                <Badge variant="secondary">
                  {PLATFORM_CONFIGS[customization.platform].name}
                </Badge>
              </div>
            </div>
          </div>

          {/* Customization Panel */}
          <div className="w-80 border-l bg-background">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid w-full grid-cols-4 m-4">
                <TabsTrigger value="viewer">
                  <Settings className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="images">
                  <ImageIcon className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="colors">
                  <Palette className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="saved">
                  <Save className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>

              <div className="px-4 pb-4 h-[calc(100%-80px)] overflow-y-auto">
                <TabsContent value="viewer" className="space-y-4 mt-0">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Box Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <input
                          type="text"
                          value={customization.title}
                          onChange={(e) => setCustomization(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="Enter title..."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Platform</Label>
                        <select
                          value={customization.platform}
                          onChange={(e) => setCustomization(prev => ({ 
                            ...prev, 
                            platform: e.target.value as 'xbox' | 'playstation' | 'pc' | 'standard',
                            frameColor: PLATFORM_CONFIGS[e.target.value as keyof typeof PLATFORM_CONFIGS].baseColor
                          }))}
                          className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
                        >
                          {Object.entries(PLATFORM_CONFIGS).map(([key, config]) => (
                            <option key={key} value={key}>{config.name}</option>
                          ))}
                        </select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="images" className="space-y-4 mt-0">
                  {(['front', 'back', 'spine'] as const).map((type) => (
                    <Card key={type}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base capitalize">{type} Image</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div
                          className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/50"
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                              if (file) handleImageUpload(file, type);
                            };
                            input.click();
                          }}
                        >
                          <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-foreground">Click to upload {type} image</p>
                          <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                        </div>
                        
                        {customization[`${type}Image` as keyof CustomizationData] && (
                          <div className="mt-3">
                            <img
                              src={customization[`${type}Image` as keyof CustomizationData] as string}
                              alt={`${type} preview`}
                              className="w-full h-20 object-cover rounded-md border"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="colors" className="space-y-4 mt-0">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Frame Color</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Custom Color</Label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={customization.frameColor}
                              onChange={(e) => setCustomization(prev => ({ ...prev, frameColor: e.target.value }))}
                              className="w-10 h-9 rounded-md border border-input cursor-pointer"
                            />
                            <input
                              type="text"
                              value={customization.frameColor}
                              onChange={(e) => setCustomization(prev => ({ ...prev, frameColor: e.target.value }))}
                              className="flex-1 px-3 py-2 text-sm border border-input rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
                              placeholder="#000000"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Presets</Label>
                          <div className="grid grid-cols-5 gap-2">
                            {COLOR_PRESETS.map((preset) => (
                              <button
                                key={preset.name}
                                onClick={() => setCustomization(prev => ({ ...prev, frameColor: preset.color }))}
                                className={`w-8 h-8 rounded-md border-2 transition-all ${
                                  customization.frameColor === preset.color 
                                    ? "border-primary shadow-sm scale-110" 
                                    : "border-border hover:border-primary/50"
                                }`}
                                style={{ backgroundColor: preset.color }}
                                title={preset.name}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Image Filters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Brightness ({customization.brightness.toFixed(2)})</Label>
                        <Slider
                          value={[customization.brightness]}
                          onValueChange={([value]) => setCustomization(prev => ({ ...prev, brightness: value }))}
                          max={2}
                          min={0.5}
                          step={0.01}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Contrast ({customization.contrast.toFixed(2)})</Label>
                        <Slider
                          value={[customization.contrast]}
                          onValueChange={([value]) => setCustomization(prev => ({ ...prev, contrast: value }))}
                          max={2}
                          min={0.5}
                          step={0.01}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Saturation ({customization.saturation.toFixed(2)})</Label>
                        <Slider
                          value={[customization.saturation]}
                          onValueChange={([value]) => setCustomization(prev => ({ ...prev, saturation: value }))}
                          max={2}
                          min={0}
                          step={0.01}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="saved" className="space-y-4 mt-0">
                  <div className="flex gap-2">
                    <Button onClick={saveCustomization} className="flex-1" size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save Current
                    </Button>
                    <Button onClick={resetCustomization} variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {savedCustomizations.map((saved, index) => (
                      <Card key={index} className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{saved.title}</h4>
                            <p className="text-xs text-muted-foreground">
                              {new Date(saved.lastModified).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-1 ml-2">
                            <Button
                              onClick={() => loadCustomization(saved)}
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7"
                            >
                              <FolderOpen className="h-3 w-3" />
                            </Button>
                            <Button
                              onClick={() => deleteCustomization(saved.title)}
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                    
                    {savedCustomizations.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Save className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No saved customizations yet</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxArtCustomizer;