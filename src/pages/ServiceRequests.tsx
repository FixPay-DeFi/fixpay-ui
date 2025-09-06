import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Shield,
  User,
  Calendar,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface ServiceRequest {
  id: string;
  customerName: string;
  service: string;
  description: string;
  budget: number;
  timeline: string;
  location: string;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'disputed';
  escrowAmount: number;
  paymentMethod: 'USDC' | 'FXP';
  createdAt: string;
  images?: string[];
}

const mockRequests: ServiceRequest[] = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    service: 'iPhone Screen Repair',
    description: 'iPhone 13 Pro screen is cracked and not responding to touch in some areas. Need urgent repair.',
    budget: 85,
    timeline: '2024-01-20',
    location: 'Manhattan, NY',
    status: 'pending',
    escrowAmount: 85,
    paymentMethod: 'USDC',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    customerName: 'Mike Chen',
    service: 'Laptop Keyboard Replacement',
    description: 'MacBook Pro keyboard keys are sticking and some keys are not working properly.',
    budget: 120,
    timeline: '2024-01-22',
    location: 'Brooklyn, NY',
    status: 'accepted',
    escrowAmount: 120,
    paymentMethod: 'FXP',
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    customerName: 'Emily Davis',
    service: 'Phone Data Recovery',
    description: 'Accidentally deleted important photos and contacts. Need professional data recovery.',
    budget: 150,
    timeline: '2024-01-18',
    location: 'Queens, NY',
    status: 'in-progress',
    escrowAmount: 150,
    paymentMethod: 'USDC',
    createdAt: '2024-01-12'
  }
];

export default function ServiceRequests() {
  const [activeTab, setActiveTab] = useState('available');
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const navigate = useNavigate();

  const handleAcceptRequest = (requestId: string) => {
    toast({
      title: "Request Accepted!",
      description: "You have accepted this service request. The customer has been notified.",
    });
  };

  const handleStartWork = (requestId: string) => {
    toast({
      title: "Work Started",
      description: "Request status updated to 'In Progress'.",
    });
  };

  const handleCompleteWork = (requestId: string) => {
    toast({
      title: "Work Completed",
      description: "Customer will be notified to review and approve payment.",
    });
  };

  const getStatusColor = (status: ServiceRequest['status']) => {
    switch (status) {
      case 'pending':
        return 'text-warning';
      case 'accepted':
        return 'text-secondary';
      case 'in-progress':
        return 'text-primary';
      case 'completed':
        return 'text-accent';
      case 'disputed':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: ServiceRequest['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-warning text-warning">Pending</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="border-secondary text-secondary">Accepted</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="border-primary text-primary">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-accent/10 text-accent border-accent/20">Completed</Badge>;
      case 'disputed':
        return <Badge variant="destructive">Disputed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filteredRequests = mockRequests.filter(request => {
    if (activeTab === 'available') return request.status === 'pending';
    if (activeTab === 'accepted') return request.status === 'accepted';
    if (activeTab === 'active') return request.status === 'in-progress';
    if (activeTab === 'completed') return request.status === 'completed';
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Service Requests</h1>
            <p className="text-muted-foreground">
              Browse and manage service requests from customers
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="available">Available</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6">
              <div className="grid gap-6">
                {filteredRequests.map((request) => (
                  <Card key={request.id} className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-lg font-semibold">{request.service}</h3>
                            {getStatusBadge(request.status)}
                            <Badge className="bg-gradient-primary">
                              {request.budget} {request.paymentMethod}
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              <span>{request.customerName}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{request.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>Due: {new Date(request.timeline).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {request.description}
                          </p>

                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Shield className="w-4 h-4 text-accent" />
                              <span className="text-accent font-medium">
                                Escrow: ${request.escrowAmount}
                              </span>
                            </div>
                            <span className="text-muted-foreground">
                              Posted {new Date(request.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 lg:ml-6">
                          <Button
                            onClick={() => setSelectedRequest(request)}
                            variant="outline"
                            className="border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                          >
                            View Details
                          </Button>

                          {request.status === 'pending' && (
                            <Button
                              onClick={() => handleAcceptRequest(request.id)}
                              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                            >
                              Accept Request
                            </Button>
                          )}

                          {request.status === 'accepted' && (
                            <Button
                              onClick={() => handleStartWork(request.id)}
                              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                            >
                              Start Work
                            </Button>
                          )}

                          {request.status === 'in-progress' && (
                            <Button
                              onClick={() => handleCompleteWork(request.id)}
                              className="bg-accent hover:bg-accent/90 transition-all duration-300"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark Complete
                            </Button>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/chat/${request.id}`)}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredRequests.length === 0 && (
                  <Card className="bg-gradient-card border-border/50">
                    <CardContent className="p-8 text-center">
                      <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Requests Found</h3>
                      <p className="text-muted-foreground">
                        {activeTab === 'available' && "No new service requests available at the moment."}
                        {activeTab === 'accepted' && "You haven't accepted any requests yet."}
                        {activeTab === 'active' && "No active work in progress."}
                        {activeTab === 'completed' && "No completed jobs yet."}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Request Details Modal would go here */}
    </div>
  );
}