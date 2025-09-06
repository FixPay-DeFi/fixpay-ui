import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Menu, X } from 'lucide-react';
import { WalletModal } from './WalletModal';

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FixPay
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </a>
            <a href="/find-providers" className="text-muted-foreground hover:text-foreground transition-colors">
              Find Providers
            </a>
            <a href="/service-requests" className="text-muted-foreground hover:text-foreground transition-colors">
              Requests
            </a>
            <a href="/wallet" className="text-muted-foreground hover:text-foreground transition-colors">
              Wallet
            </a>
            {/* ✅ Add the toggle button here */}
                            <ThemeToggle />
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setIsWalletModalOpen(true)}
              className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
            <Button 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              onClick={() => window.location.href = '/dashboard'}
            >
              Dashboard
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="flex flex-col p-4 space-y-4">
              <a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </a>
              <a href="/find-providers" className="text-muted-foreground hover:text-foreground transition-colors">
                Find Providers
              </a>
              <a href="/service-requests" className="text-muted-foreground hover:text-foreground transition-colors">
                Requests
              </a>
              <a href="/wallet" className="text-muted-foreground hover:text-foreground transition-colors">
                Wallet
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button 
                  variant="outline" 
                  onClick={() => setIsWalletModalOpen(true)}
                  className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
                <Button 
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  Dashboard
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
      />
    </>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </Button>
  );
}