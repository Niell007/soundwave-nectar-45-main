import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Activity, ExternalLink, Users, Clock } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { cn } from "@/lib/utils";

interface StreamHealthStatus {
  bitrate: number;
  fps: number;
  latency: number;
}

interface StreamStatsData {
  duration: number;
  peakViewers: number;
  qualityChanges: number;
  bufferingEvents: number;
}

interface StreamStatsProps {
  healthStatus: StreamHealthStatus;
  streamStats: StreamStatsData;
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  isLoading?: boolean;
  pulseValue?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ 
  icon, 
  label, 
  value, 
  isLoading,
  pulseValue = false 
}) => (
  <div 
    className="flex flex-col items-center justify-center p-3 rounded-lg bg-black/20 backdrop-blur-sm"
    role="listitem"
  >
    <div aria-hidden="true">
      {icon}
    </div>
    <p 
      className="text-sm font-medium text-gray-300"
      id={`stat-label-${label.toLowerCase()}`}
    >
      {label}
    </p>
    <p 
      className={cn(
        "text-lg font-bold text-white",
        pulseValue && "animate-pulse"
      )}
      aria-labelledby={`stat-label-${label.toLowerCase()}`}
      aria-live={pulseValue ? "polite" : "off"}
    >
      {isLoading ? (
        <Skeleton width={60} height={24} />
      ) : (
        <span>{value}</span>
      )}
    </p>
  </div>
);

const StreamStats: React.FC<StreamStatsProps> = ({ healthStatus, streamStats }) => {
  const [stats, setStats] = useState({
    viewers: 'Live',
    duration: 'Now',
    status: 'Online',
  });

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const toggleInterval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 5000);

    return () => clearInterval(toggleInterval);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (!stats.viewers || !stats.duration) {
      interval = setInterval(() => {
        setStats(prev => ({
          ...prev,
          viewers: Math.floor(Math.random() * 1000 + 500).toLocaleString(),
          duration: `${Math.floor(Math.random() * 3 + 1)}h ${Math.floor(Math.random() * 60)}m`,
        }));
      }, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [stats.viewers, stats.duration]);

  if (!isVisible) {
    return null;
  }

  return (
    <Card 
      className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-200"
      role="region"
      aria-label="Stream Statistics"
    >
      <CardHeader className="pb-2">
        <CardTitle 
          className="flex items-center space-x-2 text-lg font-bold"
          aria-live="polite"
        >
          <Activity 
            className={cn(
              "w-5 h-5 text-primary",
              !stats.viewers && "animate-pulse"
            )}
            aria-hidden="true"
          />
          <span>Stream Stats</span>
        </CardTitle>
      </CardHeader>

      <Separator className="mb-4" role="presentation" />

      <CardContent>
        <div 
          className="grid grid-cols-3 gap-4"
          role="list"
          aria-label="Stream metrics"
        >
          <StatItem
            icon={<Users className="w-6 h-6 text-[#20FF86] mb-2" />}
            label="Viewers"
            value={stats.viewers}
            isLoading={!stats.viewers}
            pulseValue={true}
          />
          <StatItem
            icon={<Clock className="w-6 h-6 text-[#20FF86] mb-2" />}
            label="Uptime"
            value={stats.duration}
            isLoading={!stats.duration}
          />
          <StatItem
            icon={<Activity className="w-6 h-6 text-[#20FF86] mb-2" />}
            label="Status"
            value={stats.status}
            isLoading={!stats.status}
          />
        </div>

        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Stream Health</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p>Bitrate: {healthStatus.bitrate} kbps</p>
              <p>FPS: {healthStatus.fps}</p>
              <p>Latency: {healthStatus.latency}ms</p>
            </div>
            <div>
              <p>Duration: {streamStats.duration}s</p>
              <p>Peak Viewers: {streamStats.peakViewers}</p>
              <p>Quality Changes: {streamStats.qualityChanges}</p>
              <p>Buffer Events: {streamStats.bufferingEvents}</p>
            </div>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full mt-4 gap-2"
          onClick={() => window.open(`https://kick.com/soundmasterlive`, '_blank', 'noopener,noreferrer')}
          aria-label={`View soundmasterlive's full stream stats on Kick.com`}
        >
          View Full Stats
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default StreamStats;