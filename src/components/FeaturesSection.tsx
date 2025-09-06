import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, 
  Home, 
  Car, 
  Laptop, 
  Shield, 
  MapPin, 
  MessageSquare, 
  Vote,
  TrendingUp,
  Clock
} from 'lucide-react';

export function FeaturesSection() {
  const categories = [
    { name: 'Electronics', icon: Smartphone, jobs: '2.4k+' },
    { name: 'Home Repair', icon: Home, jobs: '1.8k+' },
    { name: 'Automotive', icon: Car, jobs: '950+' },
    { name: 'Computers', icon: Laptop, jobs: '1.2k+' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Smart Contract Escrow',
      description: 'Funds secured in blockchain escrow until service completion',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: MapPin,
      title: 'Location-Based Matching',
      description: 'Find nearby verified service providers instantly',
      color: 'text-secondary', 
      bgColor: 'bg-secondary/10'
    },
    {
      icon: MessageSquare,
      title: 'In-App Communication',
      description: 'Secure messaging between customers and providers',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: Vote,
      title: 'Decentralized Governance',
      description: 'FXP token holders vote on platform improvements',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      icon: TrendingUp,
      title: 'Reputation Scoring',
      description: 'Transparent rating system for quality assurance',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Clock,
      title: 'Dispute Resolution',
      description: 'Fair community-driven dispute handling system',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        {/* Popular Categories */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Popular <span className="text-secondary">Service Categories</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your devices and items fixed by verified professionals in your area
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-card hover:border-primary/20 transition-all duration-300 cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="inline-flex p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.jobs} active jobs</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Platform Features */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Platform <span className="bg-gradient-primary bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built on Lisk blockchain with advanced DeFi capabilities for secure transactions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="bg-gradient-card border-border/50 hover:shadow-soft hover:border-primary/10 transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className={`inline-flex p-3 rounded-lg ${feature.bgColor} group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-card rounded-2xl p-8 md:p-12 border border-primary/10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to get started with <span className="text-primary">FixPay</span>?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Join the future of decentralized repair services. Connect your wallet and start earning or requesting services today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              Start as Customer
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-secondary/30 text-secondary hover:bg-secondary/10 hover:border-secondary/50"
            >
              Join as Provider
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}