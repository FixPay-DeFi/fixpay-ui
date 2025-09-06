import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Wallet, Shield, Zap } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const wallets = [
    {
      name: 'MetaMask',
      description: 'Connect using MetaMask wallet',
      icon: '🦊',
      popular: true
    },
    {
      name: 'WalletConnect',
      description: 'Scan with any compatible wallet',
      icon: '📱',
      popular: false
    }
  ];

  const handleConnect = (walletName: string) => {
    // Placeholder for wallet connection logic
    console.log(`Connecting to ${walletName}...`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-card border-primary/10">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Connect Your Wallet
          </DialogTitle>
          <p className="text-center text-muted-foreground text-sm">
            Choose your preferred wallet to connect to FixPay
          </p>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {wallets.map((wallet) => (
            <Button
              key={wallet.name}
              variant="outline"
              className="w-full justify-start h-auto p-4 border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              onClick={() => handleConnect(wallet.name)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{wallet.icon}</span>
                <div className="text-left">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{wallet.name}</span>
                    {wallet.popular && (
                      <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">{wallet.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-6 pt-4 border-t border-border/50">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span className="text-xs">Secure</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Zap className="w-4 h-4" />
            <span className="text-xs">Fast</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Wallet className="w-4 h-4" />
            <span className="text-xs">Decentralized</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}