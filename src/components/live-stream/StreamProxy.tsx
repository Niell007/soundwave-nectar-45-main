import React, { useEffect, useRef } from 'react';

interface StreamProxyProps {
  url: string;
  quality?: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

const StreamProxy: React.FC<StreamProxyProps> = ({
  url,
  quality = 'auto',
  onLoad,
  onError,
  className = ''
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleLoad = () => {
      onLoad?.();
    };

    const handleError = () => {
      onError?.('Failed to load stream. Please try again later.');
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
      }
    };
  }, [onLoad, onError]);

  // Extract username from URL
  const username = 'soundmasterlive'; // Hardcoded for now, could be made dynamic

  return (
    <iframe
      ref={iframeRef}
      src={`https://player.kick.com/${username}`}
      className={`w-full h-full ${className}`}
      style={{ aspectRatio: '16/9' }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default StreamProxy;
