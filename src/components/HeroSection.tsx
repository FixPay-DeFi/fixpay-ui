import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';
import { useState } from 'react';
import { WalletModal } from './WalletModal';
import heroImage from '@/assets/hero-image.jpg';

export function HeroSection() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  Powered by Lisk Blockchain
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    FixPay
                  </span>
                  <br />
                  A DeFi System for{' '}
                  <span className="text-secondary">Repairs</span> &{' '}
                  <span className="text-accent">Fixing Payments</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                  The first decentralized platform for secure repair services with escrow payments, 
                  reputation systems, and FXP token rewards on Lisk blockchain.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300 group"
                  onClick={() => setIsWalletModalOpen(true)}
                >
                  Connect Wallet
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-secondary/30 text-secondary hover:bg-secondary/10 hover:border-secondary/50"
                >
                  Request a Service
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50"
                >
                  Become a Provider
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 pt-8 border-t border-border/50">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-sm text-muted-foreground">Secure Escrow</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-muted-foreground">Verified Providers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Instant Payments</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-slide-up">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-3xl"></div>
              <img 
                src={heroImage}
                alt="FixPay - Decentralized Repair Services"
                className="relative w-full h-auto rounded-2xl shadow-card hover:shadow-glow transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"></div>
      </section>

      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
      />
    </>
  );
}