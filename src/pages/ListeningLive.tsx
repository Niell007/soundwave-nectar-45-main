import React, { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import StreamControls from "@/components/live-stream/StreamControls";
import StreamStats from "@/components/live-stream/StreamStats";
import InfoSection from "@/components/live-lesson/InfoSection";
import StreamPlayer from "@/components/live-stream/StreamPlayer";
import { toast } from "@/hooks/use-toast";
import { useStreamQuality } from "@/hooks/useStreamQuality";

// Kick.com username for the stream
const STREAMER_USERNAME = 'soundmasterlive';

export interface StreamMetrics {
  buffering: boolean;
  viewCount: number;
  bitrate: number;
  fps: number;
  dropped: number;
  latency: number;
}

const defaultMetrics: StreamMetrics = {
  buffering: false,
  viewCount: 0,
  bitrate: 0,
  fps: 0,
  dropped: 0,
  latency: 0
};

const ListeningLive = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState('auto');
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const { metrics = defaultMetrics } = useStreamQuality({
    updateInterval: 1000,
    minBitrate: 1500,
    targetFps: 30,
  });

  const handleQualityChange = (newQuality: string) => {
    setQuality(newQuality);
    toast({
      title: "Quality Changed",
      description: `Stream quality set to ${newQuality}`,
    });
  };

  const handleStreamLoad = () => {
    setIsLoading(false);
    setError(null);
    setRetryCount(0);
  };

  const handleStreamError = (errorMessage: string) => {
    setError(errorMessage);
    setIsLoading(false);
    
    if (retryCount < 3) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setIsLoading(true);
      }, 5000);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Listening Live</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className={`lg:col-span-${isChatOpen ? '2' : '3'} space-y-4`}>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Stream Error</AlertTitle>
              <AlertDescription>
                {error}
                {retryCount < 3 && " Retrying..."}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="relative aspect-video rounded-lg overflow-hidden bg-background">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}
            <StreamPlayer
              username={STREAMER_USERNAME}
              quality={quality}
              onLoad={handleStreamLoad}
              onError={handleStreamError}
              className="rounded-lg shadow-lg"
            />
          </div>

          <StreamControls
            quality={quality}
            onQualityChange={handleQualityChange}
            isChatOpen={isChatOpen}
            onToggleChat={toggleChat}
            metrics={metrics}
          />

          <StreamStats metrics={metrics} />
        </div>

        {isChatOpen && (
          <div className="lg:col-span-1 h-[600px] bg-background rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-center p-4">
              <p className="text-muted-foreground">
                Chat is currently not available through embedding. Please visit{' '}
                <a 
                  href={`https://kick.com/${STREAMER_USERNAME}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  kick.com/{STREAMER_USERNAME}
                </a>
                {' '}to participate in chat.
              </p>
            </div>
          </div>
        )}
      </div>

      <InfoSection />
    </div>
  );
};

export default ListeningLive;
