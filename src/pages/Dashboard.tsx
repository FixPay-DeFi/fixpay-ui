import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Wallet, 
  Bell, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  DollarSign,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'customer' | 'provider';

export default function Dashboard() {
  const [userRole] = useState<UserRole>('customer'); // This would come from user context
  const navigate = useNavigate();

  const mockStats = {
    balance: {
      usdc: 250.50,
      fxp: 1250.75
    },
    stakingRewards: 45.32,
    notifications: 3,
    activeRequests: 2,
    completedJobs: 18,
    rating: 4.8
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {userRole === 'customer' ? 'Customer' : 'Provider'}! 👋
            </h1>
            <p className="text-muted-foreground">
              {userRole === 'customer' 
                ? 'Ready to get your repairs done securely?' 
                : 'Ready to help customers with their repair needs?'
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="relative"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="w-4 h-4" />
              {mockStats.notifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
                >
                  {mockStats.notifications}
                </Badge>
              )}
            </Button>
            
            <Button
              onClick={() => navigate('/wallet')}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Wallet
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">USDC Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockStats.balance.usdc}</div>
              <p className="text-xs text-muted-foreground">Available for payments</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">FXP Tokens</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.balance.fxp}</div>
              <p className="text-xs text-muted-foreground">Governance & discounts</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staking Rewards</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockStats.stakingRewards}</div>
              <p className="text-xs text-accent">+12% this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {userRole === 'customer' ? 'Active Requests' : 'Completed Jobs'}
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userRole === 'customer' ? mockStats.activeRequests : mockStats.completedJobs}
              </div>
              <p className="text-xs text-muted-foreground">
                {userRole === 'customer' ? 'In progress' : 'Total completed'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Actions */}
          {userRole === 'customer' && (
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => navigate('/request-service')}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  size="lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Request a Service
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => navigate('/find-providers')}
                  className="w-full border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                  size="lg"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Find Service Providers
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Provider Actions */}
          {userRole === 'provider' && (
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="w-5 h-5 mr-2 text-primary" />
                  Provider Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => navigate('/service-requests')}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  size="lg"
                >
                  <Search className="w-5 h-5 mr-2" />
                  View Service Requests
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => navigate('/my-jobs')}
                  className="w-full border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                  size="lg"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Manage My Jobs
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Service request completed</p>
                      <p className="text-xs text-muted-foreground">iPhone screen repair</p>
                    </div>
                  </div>
                  <Badge variant="secondary">$85 USDC</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Payment released</p>
                      <p className="text-xs text-muted-foreground">Laptop keyboard fix</p>
                    </div>
                  </div>
                  <Badge variant="outline">$45 USDC</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">FXP rewards earned</p>
                      <p className="text-xs text-muted-foreground">Monthly staking</p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-primary">+15 FXP</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}