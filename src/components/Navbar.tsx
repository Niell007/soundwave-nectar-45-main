import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/admin" },
    { name: "Profile", path: "/profile", icon: User, className: "h-4 w-4" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Desktop menu */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Video className="h-8 w-8 text-primary" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2"
                    aria-current={item.path === '/' ? 'page' : undefined}
                  >
                    {item.icon && <item.icon className={item.className} />}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Theme toggle */}
          <div className="hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-foreground hover:text-primary transition-colors duration-200",
                  "block px-3 py-2 rounded-md text-base font-medium",
                  "flex items-center gap-2"
                )}
                onClick={closeMenu}
                aria-current={item.path === '/' ? 'page' : undefined}
              >
                {item.icon && <item.icon className={item.className} />}
                {item.name}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                closeMenu();
              }}
              className="w-full justify-start px-3"
            >
              {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;