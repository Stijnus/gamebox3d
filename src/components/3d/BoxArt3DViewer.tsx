import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { Group } from 'three';

interface BoxArt3DViewerProps {
  frontImageUrl: string;
  backImageUrl?: string;
  spineImageUrl?: string;
  width?: number;
  height?: number;
  depth?: number;
  platform?: 'xbox' | 'xbox360' | 'playstation' | 'pc' | 'standard';
}

// Enhanced platform configs with better visibility
const PLATFORM_CONFIGS = {
  xbox: {
    width: 2.6,
    height: 3.5,
    depth: 0.2, // Increased depth for better visibility
    color: '#107C10', // Xbox green
    transparency: 0.15, // Much more opaque
    metalness: 0.7,
    roughness: 0.3
  },
  xbox360: {
    width: 2.6,
    height: 3.5,
    depth: 0.2,
    color: '#9ACD32', // Xbox 360 lime green
    transparency: 0.15,
    metalness: 0.7,
    roughness: 0.3
  },
  playstation: {
    width: 2.75,
    height: 3.75,
    depth: 0.2,
    color: '#0070D1', // Brighter PlayStation blue
    transparency: 0.15,
    metalness: 0.7,
    roughness: 0.3
  },
  pc: {
    width: 2.75,
    height: 3.75,
    depth: 0.22,
    color: '#606060', // Medium gray instead of black
    transparency: 0.2,
    metalness: 0.8,
    roughness: 0.2
  },
  standard: {
    width: 2.6,
    height: 3.5,
    depth: 0.2,
    color: '#707070', // Lighter gray
    transparency: 0.2,
    metalness: 0.6,
    roughness: 0.4
  }
};

const BoxArtModel: React.FC<BoxArt3DViewerProps> = ({
  frontImageUrl,
  backImageUrl,
  spineImageUrl,
  width: propWidth,
  height: propHeight,
  depth: propDepth,
  platform = 'standard'
}) => {
  const config = PLATFORM_CONFIGS[platform];
  const width = propWidth || config.width;
  const height = propHeight || config.height;
  const depth = propDepth || config.depth;
  
  const groupRef = useRef<Group>(null!);
  const [hovered, setHovered] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  
  // Load textures
  const frontTexture = useTexture(frontImageUrl);
  const backTexture = useTexture(backImageUrl || frontImageUrl);
  const spineTexture = useTexture(spineImageUrl || frontImageUrl);
  
  // Auto-rotation effect - rotate around multiple axes to show all faces
  useFrame((state) => {
    if (groupRef.current && autoRotate) {
      // Rotate around Y axis (vertical)
      groupRef.current.rotation.y += 0.01;
      // Rotate around X axis (horizontal) to show top/bottom - increase range
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.5;
      // Small rotation around Z axis for a more dynamic view
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
    
    // Only hover scale effect
    if (hovered && !autoRotate) {
      groupRef.current.scale.setScalar(1.05);
    } else if (!autoRotate) {
      groupRef.current.scale.setScalar(1);
    }
  });

  // Toggle auto-rotation on click
  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  return (
    <group 
      ref={groupRef}
      rotation={[-0.1, 0.3, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={toggleAutoRotate}
    >
      {/* Create a cube with proper face materials, using platform color for most faces but spine texture for left face */}
      <mesh>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial attach="material-0" color={config.color} /> {/* Right face - platform color */}
        <meshStandardMaterial attach="material-1" map={spineTexture} /> {/* Left face - spine texture */}
        <meshStandardMaterial attach="material-2" color={config.color} /> {/* Top face - platform color */}
        <meshStandardMaterial attach="material-3" color={config.color} /> {/* Bottom face - platform color */}
        <meshStandardMaterial attach="material-4" map={frontTexture} /> {/* Front face - front art */}
        <meshStandardMaterial attach="material-5" map={backTexture} /> {/* Back face - back art */}
      </mesh>
    </group>
  );
};

const BoxArt3DViewer: React.FC<BoxArt3DViewerProps> = ({
  frontImageUrl,
  backImageUrl,
  spineImageUrl,
  width,
  height,
  depth,
  platform = 'standard'
}) => {
  return (
    <div 
      className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl"
      style={{
        cursor: 'grab',
        touchAction: 'none'
      }}
    >
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="text-center p-8 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700">
            <div className="text-muted-foreground mb-4 text-lg">Loading 3D model...</div>
            <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      }>
        <Canvas
          camera={{ position: [5, 4, 8], fov: 50 }} // Much more obvious camera position
          style={{ 
            width: '100%',
            height: '100%',
            touchAction: 'none'
          }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: false,
            stencil: false,
            depth: true
          }}
          dpr={[1, 2]}
          onPointerMissed={() => {}}
        >
          {/* Enhanced lighting setup */}
          <ambientLight intensity={0.4} color="#ffffff" />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.2} 
            color="#ffffff"
            castShadow={false}
          />
          <directionalLight 
            position={[-3, 3, -3]} 
            intensity={0.6} 
            color="#ffffff"
          />
          {/* Key light from top-right to highlight colored edges */}
          <directionalLight 
            position={[8, 8, 2]} 
            intensity={0.8} 
            color="#ffffff"
          />
          
          <BoxArtModel
            frontImageUrl={frontImageUrl}
            backImageUrl={backImageUrl}
            spineImageUrl={spineImageUrl}
            width={width}
            height={height}
            depth={depth}
            platform={platform}
          />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            rotateSpeed={1.0}
            zoomSpeed={1.2}
            enableDamping={true}
            dampingFactor={0.05}
            target={[0, 0, 0]}
            minDistance={2}
            maxDistance={10}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            minAzimuthAngle={-Math.PI}
            maxAzimuthAngle={Math.PI}
            makeDefault
          />
        </Canvas>
      </Suspense>
      
      {/* Enhanced platform indicator */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {platform}
      </div>
    </div>
  );
};

export default BoxArt3DViewer;