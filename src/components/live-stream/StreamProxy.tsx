import React, { useEffect, useRef } from 'react';
import { useStore } from '@/lib/state/store';

interface StreamProxyProps {
  streamUrl: string;
  title: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const StreamProxy: React.FC<StreamProxyProps> = ({
  streamUrl,
  title,
  className = '',
  onLoad,
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setStreamData } = useStore();

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      video.addEventListener('loadeddata', () => {
        setStreamData({
          id: streamUrl,
          title,
          status: 'live',
          viewerCount: 0,
          startedAt: new Date().toISOString(),
        });
        onLoad?.();
      });

      video.addEventListener('error', () => {
        setStreamData(null);
        onError?.();
      });

      return () => {
        video.removeEventListener('loadeddata', onLoad ?? (() => {}));
        video.removeEventListener('error', onError ?? (() => {}));
      };
    }
  }, [streamUrl, title, onLoad, onError, setStreamData]);

  return (
    <video
      ref={videoRef}
      className={className}
      controls
      autoPlay
      playsInline
      src={streamUrl}
    >
      <source src={streamUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default StreamProxy;
