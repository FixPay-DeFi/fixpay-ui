import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  DollarSign, 
  MessageCircle,
  Star,
  Vote,
  Settings,
  Trash2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'payment' | 'message' | 'rating' | 'system' | 'governance';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'payment',
    title: 'Payment Released',
    description: 'Customer has approved payment for iPhone screen repair - $85 USDC',
    timestamp: '2024-01-15T10:30:00Z',
    read: false,
    actionUrl: '/wallet'
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    description: 'Sarah Johnson sent you a message about the repair status',
    timestamp: '2024-01-15T09:15:00Z',
    read: false,
    actionUrl: '/chat/1'
  },
  {
    id: '3',
    type: 'rating',
    title: 'New Review',
    description: 'Mike Chen left you a 5-star review for laptop keyboard repair',
    timestamp: '2024-01-14T16:45:00Z',
    read: true,
    actionUrl: '/provider/profile'
  },
  {
    id: '4',
    type: 'governance',
    title: 'Governance Proposal',
    description: 'New proposal: Reduce Platform Fees for Electronics Repairs',
    timestamp: '2024-01-14T14:20:00Z',
    read: true,
    actionUrl: '/wallet?tab=governance'
  },
  {
    id: '5',
    type: 'system',
    title: 'Staking Rewards',
    description: 'Monthly staking rewards of 15.75 FXP have been distributed',
    timestamp: '2024-01-12T12:00:00Z',
    read: true,
    actionUrl: '/wallet?tab=staking'
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    paymentAlerts: true,
    messageAlerts: true,
    governanceAlerts: false,
    marketingEmails: false
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: `${unreadCount} notifications marked as read.`,
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="w-5 h-5 text-accent" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-primary" />;
      case 'rating':
        return <Star className="w-5 h-5 text-warning" />;
      case 'governance':
        return <Vote className="w-5 h-5 text-secondary" />;
      case 'system':
        return <Bell className="w-5 h-5 text-muted-foreground" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Notifications</h1>
              <p className="text-muted-foreground">
                {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'All caught up!'}
              </p>
            </div>
            
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline">
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Notifications List */}
            <div className="lg:col-span-2 space-y-4">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300 cursor-pointer ${
                    !notification.read ? 'border-primary/30 bg-primary/5' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground">
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-2">
                          {notification.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          
                          <Badge variant="outline" className="text-xs">
                            {notification.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {notifications.length === 0 && (
                <Card className="bg-gradient-card border-border/50">
                  <CardContent className="p-8 text-center">
                    <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Notifications</h3>
                    <p className="text-muted-foreground">
                      You're all caught up! New notifications will appear here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Notification Settings */}
            <div>
              <Card className="bg-gradient-card border-border/50 sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-primary" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push" className="text-sm font-medium">
                        Push Notifications
                      </Label>
                      <Switch
                        id="push"
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Notifications
                      </Label>
                      <Switch
                        id="email"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="payment" className="text-sm font-medium">
                        Payment Alerts
                      </Label>
                      <Switch
                        id="payment"
                        checked={settings.paymentAlerts}
                        onCheckedChange={(checked) => updateSetting('paymentAlerts', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="message" className="text-sm font-medium">
                        Message Alerts
                      </Label>
                      <Switch
                        id="message"
                        checked={settings.messageAlerts}
                        onCheckedChange={(checked) => updateSetting('messageAlerts', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="governance" className="text-sm font-medium">
                        Governance Proposals
                      </Label>
                      <Switch
                        id="governance"
                        checked={settings.governanceAlerts}
                        onCheckedChange={(checked) => updateSetting('governanceAlerts', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="marketing" className="text-sm font-medium">
                        Marketing Emails
                      </Label>
                      <Switch
                        id="marketing"
                        checked={settings.marketingEmails}
                        onCheckedChange={(checked) => updateSetting('marketingEmails', checked)}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      You can update these preferences anytime. Some notifications are required for security and cannot be disabled.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}