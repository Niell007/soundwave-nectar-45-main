import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Settings,
  MessageSquare,
  Maximize2,
  Volume2,
  MonitorPlay,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StreamControlsProps {
  quality: string;
  onQualityChange: (newQuality: string) => void;
  isChatOpen: boolean;
  onToggleChat: () => void;
  healthStatus: {
    buffering: boolean;
    viewCount: number;
  };
}

const StreamControls: React.FC<StreamControlsProps> = ({
  quality,
  onQualityChange,
  isChatOpen,
  onToggleChat,
  healthStatus,
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Volume2 className="h-5 w-5" />
          </Button>
          <Select value={quality} onValueChange={onQualityChange}>
            <SelectTrigger className="w-[100px]">
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

        <div className="flex items-center space-x-4">
          {healthStatus.buffering && (
            <span className="text-yellow-400 text-sm">Buffering...</span>
          )}
          <span className="text-white text-sm">
            {healthStatus.viewCount} viewers
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleChat}
            className={isChatOpen ? 'text-primary' : ''}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MonitorPlay className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Maximize2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StreamControls;