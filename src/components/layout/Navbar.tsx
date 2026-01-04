import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Coins, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <span className="text-lg font-bold text-primary-foreground">N</span>
          </div>
          <span className="text-xl font-bold text-foreground">Nexus AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {!user && navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Auth Section */}
        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5">
                <Coins className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-foreground">
                  {profile?.credits ?? 0} Credits
                </span>
              </div>
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Avatar className="h-8 w-8 cursor-pointer" onClick={() => navigate("/dashboard")}>
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {profile?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </>
          ) : (
            <Button variant="outline" onClick={() => navigate("/auth")}>
              Login / Sign Up
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {!user && navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {user ? (
              <>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 w-fit">
                  <Coins className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">
                    {profile?.credits ?? 0} Credits
                  </span>
                </div>
                <Button variant="ghost" className="w-full justify-start" onClick={() => { navigate("/dashboard"); setMobileMenuOpen(false); }}>
                  Dashboard
                </Button>
              </>
            ) : (
              <Button variant="outline" className="w-full" onClick={() => { navigate("/auth"); setMobileMenuOpen(false); }}>
                Login / Sign Up
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
