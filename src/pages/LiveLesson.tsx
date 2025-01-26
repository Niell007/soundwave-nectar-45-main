import React, { useState, useCallback } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import StreamControls from "@/components/live-stream/StreamControls";
import StreamStats from "@/components/live-stream/StreamStats";
import InfoSection from "@/components/live-lesson/InfoSection";
import StreamProxy from "@/components/live-stream/StreamProxy";
import { toast } from "@/hooks/use-toast";
import { useStreamQuality } from "@/hooks/useStreamQuality";
import { useStore } from '@/lib/state/store';

// Use embed URLs
const STREAM_URL = "https://player.kick.com/soundmasterlive?allowfullscreen=true";
const CHAT_URL = "https://kick.com/soundmasterlive/chat-embed";

const LiveLesson: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState('auto');
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const { stream } = useStore();

  const { metrics } = useStreamQuality({
    updateInterval: 1000,
    minBitrate: 1500,
    targetFps: 30,
  });

  const handleQualityChange = useCallback((newQuality: string) => {
    setQuality(newQuality);
    toast({
      title: "Quality Changed",
      description: `Stream quality set to ${newQuality}`,
    });
  }, []);

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  const handleIframeLoad = () => {
    console.log("Stream iframe loaded successfully");
    setIsLoading(false);
    setError(null);
    toast({
      title: "Stream Connected",
      description: "Successfully connected to the live stream",
    });
  };

  const handleIframeError = () => {
    console.error("Failed to load stream iframe");
    setIsLoading(false);
    setError("Failed to load the live stream. Please try refreshing the page.");
    setRetryCount(prev => prev + 1);
    toast({
      variant: "destructive",
      title: "Stream Error",
      description: "Failed to connect to the live stream",
    });
  };

  const handleRetry = () => {
    console.log("Retrying stream connection");
    setIsLoading(true);
    setError(null);
    setRetryCount(0);
    toast({
      title: "Retrying Connection",
      description: "Attempting to reconnect to the stream...",
    });
  };

  const streamHealthStatus = {
    buffering: metrics.bufferingEvents > 0,
    viewCount: stream.data?.viewerCount ?? 0,
  };

  const streamStatsData = {
    duration: metrics.duration,
    peakViewers: metrics.peakViewers,
    qualityChanges: metrics.qualityChanges,
    bufferingEvents: metrics.bufferingEvents,
  };

  const streamHealthMetrics = {
    bitrate: metrics.bitrate,
    fps: metrics.fps,
    latency: metrics.latency,
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <StreamControls
        quality={quality}
        onQualityChange={handleQualityChange}
        isChatOpen={isChatOpen}
        onToggleChat={toggleChat}
        healthStatus={streamHealthStatus}
      />

      <div className="flex gap-4">
        <div className="flex-1">
          {isLoading && (
            <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="text-muted-foreground">Loading live stream...</p>
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Stream Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
              {retryCount < 3 && (
                <Button 
                  onClick={handleRetry}
                  className="mt-4"
                  variant="destructive"
                >
                  Retry Connection
                </Button>
              )}
            </Alert>
          )}

          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <StreamProxy
              key={retryCount}
              src={STREAM_URL}
              title="Live Stream"
              className={`absolute top-0 left-0 w-full h-full rounded-lg ${
                isLoading ? 'hidden' : 'block'
              }`}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          </div>

          <StreamStats
            healthStatus={streamHealthMetrics}
            streamStats={streamStatsData}
          />
        </div>

        {isChatOpen && (
          <div className="w-96">
            <div className="relative w-full h-[600px] bg-background rounded-lg border">
              <StreamProxy
                key={`chat-${retryCount}`}
                src={CHAT_URL}
                title="Stream Chat"
                className="w-full h-full rounded-lg"
              />
            </div>
          </div>
        )}
      </div>

      <InfoSection />
    </div>
  );
};

export default LiveLesson;