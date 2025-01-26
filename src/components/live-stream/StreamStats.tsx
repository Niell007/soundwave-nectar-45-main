import React from 'react';
import { Activity, ExternalLink } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface StreamStatsProps {
  username?: string;
}

const StreamStats: React.FC<StreamStatsProps> = ({ username = 'soundmasterlive' }) => {
  return (
    <Card className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2 text-lg font-bold">
          <Activity className="w-5 h-5 text-primary" />
          <span>Stream Info</span>
        </CardTitle>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
          asChild
        >
          <a 
            href={`https://kick.com/${username}`}
            target="_blank" 
            rel="noopener noreferrer"
          >
            <span>Watch on Kick.com</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default StreamStats;