import React from 'react';
import { Settings, MessageCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StreamMetrics } from '@/pages/ListeningLive';

interface StreamControlsProps {
  quality: string;
  onQualityChange: (quality: string) => void;
  isChatOpen: boolean;
  onToggleChat: () => void;
  metrics: StreamMetrics;
}

const StreamControls: React.FC<StreamControlsProps> = ({
  quality,
  onQualityChange,
  isChatOpen,
  onToggleChat,
  metrics
}) => {
  const isHealthy = !metrics.buffering && metrics.fps > 0;

  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-lg">
      <div className="flex items-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className={`w-3 h-3 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Stream Status: {isHealthy ? 'Healthy' : 'Issues Detected'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Select value={quality} onValueChange={onQualityChange}>
          <SelectTrigger className="w-[120px]">
            <Settings className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Quality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Auto</SelectItem>
            <SelectItem value="1080p">1080p</SelectItem>
            <SelectItem value="720p">720p</SelectItem>
            <SelectItem value="480p">480p</SelectItem>
            <SelectItem value="360p">360p</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onToggleChat}
        className="flex items-center"
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        {isChatOpen ? 'Hide Chat' : 'Show Chat'}
      </Button>
    </div>
  );
};

export default StreamControls;