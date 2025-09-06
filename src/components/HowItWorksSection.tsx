import { Card, CardContent } from '@/components/ui/card';
import { Search, MessageSquare, CreditCard, Shield, Star, CheckCircle } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      icon: Search,
      title: 'Request Service',
      description: 'Post your repair need with details, images, and budget. Our smart matching finds qualified providers nearby.',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      step: '02', 
      icon: MessageSquare,
      title: 'Connect & Negotiate',
      description: 'Chat with verified providers, compare quotes, check reputation scores, and choose the best match.',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      step: '03',
      icon: Shield,
      title: 'Secure Escrow',
      description: 'Funds are locked in smart contract escrow on Lisk blockchain. Payment releases only when job is completed.',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      step: '04',
      icon: CheckCircle,
      title: 'Complete & Rate',
      description: 'Approve the work, release payment automatically, and rate the provider. Earn FXP tokens for participation.',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            How <span className="bg-gradient-primary bg-clip-text text-transparent">FixPay</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, secure, and transparent repair services powered by blockchain technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index} 
                className="relative bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  {/* Step Number */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-muted-foreground/50">
                      {step.step}
                    </span>
                    <div className={`p-3 rounded-lg ${step.bgColor} group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connection Line (except last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-border to-transparent"></div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-3">
            <div className="inline-flex p-4 bg-primary/10 rounded-full">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Escrow Protection</h3>
            <p className="text-muted-foreground text-sm">
              Smart contracts ensure payment security with automated release on completion
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="inline-flex p-4 bg-secondary/10 rounded-full">
              <Star className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold">Reputation System</h3>
            <p className="text-muted-foreground text-sm">
              Verified reviews and ratings help you choose the best service providers
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="inline-flex p-4 bg-accent/10 rounded-full">
              <CreditCard className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold">FXP Token Rewards</h3>
            <p className="text-muted-foreground text-sm">
              Earn governance tokens for successful transactions and platform participation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}