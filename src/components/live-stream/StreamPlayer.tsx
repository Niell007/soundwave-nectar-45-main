import React from 'react';
import StreamStats from './StreamStats';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Radio, Waves } from 'lucide-react';
import { cn } from "@/lib/utils";

interface StreamPlayerProps {
  username?: string;
}

const StreamPlayer: React.FC<StreamPlayerProps> = ({ username = 'soundmasterlive' }) => {
  const handleStreamClick = () => {
    window.open(`https://kick.com/${username}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4 space-y-4">
      <Card 
        className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-[#20FF86]/10"
        onClick={handleStreamClick}
      >
        <div className="relative w-full aspect-video">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent animate-pulse" />
            
            {/* Corner Accents */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute w-24 h-24",
                  i === 0 && "top-0 left-0 bg-gradient-to-br",
                  i === 1 && "top-0 right-0 bg-gradient-to-bl",
                  i === 2 && "bottom-0 left-0 bg-gradient-to-tr",
                  i === 3 && "bottom-0 right-0 bg-gradient-to-tl",
                  "from-[#20FF86]/20 via-transparent to-transparent"
                )}
              />
            ))}
          </div>
          
          {/* Scan Lines */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute h-px w-full bg-gradient-to-r from-transparent via-[#20FF86] to-transparent",
                  "animate-[scan_4s_cubic-bezier(0.4,_0,_0.6,_1)_infinite]",
                  i === 0 && "top-[12.5%] delay-[0ms]",
                  i === 1 && "top-[25%] delay-[500ms]",
                  i === 2 && "top-[37.5%] delay-[1000ms]",
                  i === 3 && "top-[50%] delay-[1500ms]",
                  i === 4 && "top-[62.5%] delay-[2000ms]",
                  i === 5 && "top-[75%] delay-[2500ms]",
                  i === 6 && "top-[87.5%] delay-[3000ms]",
                  i === 7 && "top-[95%] delay-[3500ms]"
                )}
              />
            ))}
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-black/40 backdrop-blur-sm">
            {/* Play Button with Glow */}
            <div className="relative group">
              <div className="absolute inset-0 rounded-full opacity-75 blur-2xl bg-[#20FF86]/30 group-hover:bg-[#20FF86]/50 transition-all duration-500" />
              <div className="absolute -inset-1 rounded-full opacity-75 blur-md bg-gradient-to-r from-[#20FF86]/50 to-green-500/50 group-hover:from-[#20FF86]/70 group-hover:to-green-500/70 animate-pulse transition-all duration-500" />
              <PlayCircle className="relative w-24 h-24 text-[#20FF86] z-10 group-hover:scale-110 group-hover:text-white transition-all duration-500" />
            </div>
            
            {/* Title with Wave Effect */}
            <div className="mt-8 mb-2 flex items-center justify-center space-x-3">
              <Radio className="w-5 h-5 text-[#20FF86] animate-pulse" />
              <h3 className="text-2xl font-bold text-white tracking-wide">LIVE STREAM</h3>
              <Waves className="w-5 h-5 text-[#20FF86] animate-[pulse_2s_ease-in-out_infinite]" />
            </div>
            
            <p className="text-sm text-gray-300/90 mb-8 max-w-md backdrop-blur-lg bg-black/20 px-4 py-2 rounded-full">
              Experience the stream with chat and interactive features on Kick.com
            </p>
            
            {/* Watch Button */}
            <Button 
              size="lg"
              className="relative overflow-hidden bg-[#20FF86] hover:bg-[#20FF86]/90 text-black font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-[#20FF86]/25 hover:scale-105 transition-all duration-300 group/btn pointer-events-none"
            >
              <div className="flex items-center space-x-3">
                <PlayCircle className="w-6 h-6 group-hover/btn:rotate-12 transition-transform duration-300" strokeWidth={2.5} />
                <span className="text-lg relative">
                  <span className="relative z-10">Watch on Kick.com</span>
                  <span className="absolute inset-0 bg-black/0 group-hover/btn:bg-black/10 transition-colors duration-300" />
                </span>
              </div>
            </Button>
          </div>
        </div>
      </Card>
      <div className="w-full max-w-[400px]">
        <StreamStats username={username} />
      </div>
    </div>
  );
};

export default StreamPlayer;
