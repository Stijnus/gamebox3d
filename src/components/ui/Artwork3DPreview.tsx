import React from 'react';
import BoxArt3DViewer from '../3d/BoxArt3DViewer';

interface Artwork3DPreviewProps {
  frontImageUrl: string;
  backImageUrl?: string;
  spineImageUrl?: string;
  className?: string;
  platform?: 'xbox' | 'playstation' | 'pc' | 'standard';
}

const Artwork3DPreview: React.FC<Artwork3DPreviewProps> = ({
  frontImageUrl,
  backImageUrl,
  spineImageUrl,
  className = '',
  platform
}) => {
  return (
    <div className={className} style={{ 
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      <BoxArt3DViewer
        frontImageUrl={frontImageUrl}
        backImageUrl={backImageUrl}
        spineImageUrl={spineImageUrl}
        platform={platform}
      />
    </div>
  );
};

export default Artwork3DPreview;