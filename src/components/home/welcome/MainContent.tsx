import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music, Headphones, Radio, Users, Star, Trophy } from 'lucide-react';
import { motion } from "framer-motion";
import HeaderSection from "./HeaderSection";
import Description from "./Description";
import DJMessageEnhanced from "./DJMessageEnhanced";
import FeaturesGrid from "./FeaturesGrid";
import ConsultationButton from "./ConsultationButton";
import { DJFeature } from "@/utils/features/djFeatures";

interface MainContentProps {
  currentMessage: string;
  isLoading: boolean;
  isProcessing: boolean;
  features: DJFeature[];
  activeFeature: string | null;
  onFeatureClick: (topic: string) => void;
}

const MainContent = ({
  currentMessage,
  isLoading,
  isProcessing,
  features,
  activeFeature,
  onFeatureClick
}: MainContentProps) => {
  const welcomeFeatures = [
    { icon: <Music className="w-6 h-6" />, title: "Professional DJ", description: "Expert music mixing and crowd engagement" },
    { icon: <Headphones className="w-6 h-6" />, title: "Live Streaming", description: "Interactive online music sessions" },
    { icon: <Radio className="w-6 h-6" />, title: "Music Production", description: "High-quality audio production services" },
    { icon: <Users className="w-6 h-6" />, title: "Events", description: "Memorable entertainment for any occasion" },
    { icon: <Star className="w-6 h-6" />, title: "Custom Playlists", description: "Personalized music selection" },
    { icon: <Trophy className="w-6 h-6" />, title: "Experience", description: "Years of professional expertise" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="space-y-6">
      <HeaderSection />
      
      <DJMessageEnhanced 
        message={currentMessage || ""} 
        isLoading={isLoading}
        isProcessing={isProcessing}
      />

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#20FF86]">
                Professional DJ Services
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Experience the perfect blend of music and entertainment for your events. Live streaming, music production, and professional DJ services.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Book Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Features Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {welcomeFeatures.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-6 bg-card hover:bg-accent transition-colors duration-300 flex flex-col items-center text-center space-y-4 h-full">
                    <div className="p-3 bg-primary/10 rounded-full">
                      {React.cloneElement(feature.icon, {
                        className: "w-6 h-6 text-primary"
                      })}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Description />
      
      <FeaturesGrid 
        features={features}
        activeFeature={activeFeature}
        onFeatureClick={onFeatureClick}
      />
      
      <ConsultationButton />
    </div>
  );
};

export default MainContent;