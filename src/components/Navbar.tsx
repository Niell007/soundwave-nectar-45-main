import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/admin" },
    { name: "Profile", path: "/profile", icon: <User className="h-4 w-4" /> },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLiveClick = () => {
    window.open('https://kick.com/soundmasterlive', '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <nav 
        className="container mx-auto px-4" 
        role="navigation" 
        aria-label="Main"
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors duration-200"
            onClick={closeMenu}
            aria-label="Soundmaster - Home"
          >
            Soundmaster
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2"
                aria-current={item.path === '/' ? 'page' : undefined}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <Button
              onClick={handleLiveClick}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Video className="h-4 w-4" />
              Listening Live
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={cn(
            "md:hidden",
            isOpen ? "block" : "hidden"
          )}
          role="region"
          aria-label="Mobile navigation"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-4 py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={closeMenu}
                aria-current={item.path === '/' ? 'page' : undefined}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Button
                onClick={() => {
                  handleLiveClick();
                  setIsOpen(false);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <Video className="h-4 w-4" />
                Listening Live
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;