import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Send,
  Verified,
  Clock,
  DollarSign,
  Calendar,
  ThumbsUp,
  Award,
  TrendingUp
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
  verified: boolean;
}

const mockProvider = {
  id: '1',
  name: 'TechFix Pro',
  avatar: '',
  location: 'New York, NY',
  joinDate: '2022-03-15',
  verified: true,
  reputationScore: 92,
  rating: 4.9,
  reviewCount: 127,
  completedJobs: 156,
  responseTime: '< 2 hours',
  categories: ['Electronics', 'Computer Repair', 'Mobile Devices'],
  priceRange: '$40-80',
  about: 'Professional electronics repair specialist with over 8 years of experience. Specialized in mobile devices, laptops, and consumer electronics. Fast, reliable service with warranty on all repairs.',
  skills: ['iPhone Repair', 'Android Repair', 'Laptop Repair', 'Data Recovery', 'Screen Replacement'],
  workingHours: 'Mon-Sat: 9AM-7PM',
  languages: ['English', 'Spanish']
};

const mockReviews: Review[] = [
  {
    id: '1',
    customerName: 'Sarah M.',
    rating: 5,
    comment: 'Excellent service! Fixed my iPhone screen quickly and professionally. Highly recommend!',
    date: '2024-01-15',
    service: 'iPhone Screen Repair',
    verified: true
  },
  {
    id: '2',
    customerName: 'Mike D.',
    rating: 5,
    comment: 'Great communication and fast turnaround. My laptop is working perfectly now.',
    date: '2024-01-10',
    service: 'Laptop Repair',
    verified: true
  },
  {
    id: '3',
    customerName: 'Jennifer K.',
    rating: 4,
    comment: 'Professional and knowledgeable. Fair pricing and quality work.',
    date: '2024-01-05',
    service: 'Data Recovery',
    verified: true
  }
];

const ratingBreakdown = [
  { stars: 5, count: 89, percentage: 70 },
  { stars: 4, count: 25, percentage: 20 },
  { stars: 3, count: 8, percentage: 6 },
  { stars: 2, count: 3, percentage: 2 },
  { stars: 1, count: 2, percentage: 2 }
];

export default function ProviderProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleSendRequest = () => {
    toast({
      title: "Request Sent!",
      description: "Your service request has been sent to the provider.",
    });
  };

  const handleContact = () => {
    toast({
      title: "Opening Chat",
      description: "Starting conversation with the provider.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <Card className="bg-gradient-card border-border/50 mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="flex items-center space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={mockProvider.avatar} />
                    <AvatarFallback className="text-2xl bg-gradient-primary text-primary-foreground">
                      {mockProvider.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold">{mockProvider.name}</h1>
                      {mockProvider.verified && (
                        <Badge className="bg-accent/10 text-accent border-accent/20">
                          <Verified className="w-4 h-4 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-warning fill-current" />
                        <span className="ml-1 text-lg font-semibold">{mockProvider.rating}</span>
                        <span className="text-muted-foreground ml-1">
                          ({mockProvider.reviewCount} reviews)
                        </span>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{mockProvider.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {mockProvider.categories.map((category) => (
                        <Badge key={category} variant="outline">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:ml-auto space-y-3">
                  <Button
                    onClick={handleSendRequest}
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    size="lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Request
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={handleContact}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">{mockProvider.reputationScore}</div>
                <p className="text-sm text-muted-foreground">Reputation Score</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mx-auto mb-3">
                  <ThumbsUp className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl font-bold text-accent">{mockProvider.completedJobs}</div>
                <p className="text-sm text-muted-foreground">Jobs Completed</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-full mx-auto mb-3">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-2xl font-bold text-secondary">{mockProvider.responseTime}</div>
                <p className="text-sm text-muted-foreground">Response Time</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-full mx-auto mb-3">
                  <DollarSign className="w-6 h-6 text-warning" />
                </div>
                <div className="text-2xl font-bold text-warning">{mockProvider.priceRange}</div>
                <p className="text-sm text-muted-foreground">Price Range</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-gradient-card border-border/50">
                    <CardHeader>
                      <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {mockProvider.about}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card border-border/50">
                    <CardHeader>
                      <CardTitle>Skills & Specializations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {mockProvider.skills.map((skill) => (
                          <Badge key={skill} className="bg-primary/10 text-primary border-primary/30">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="bg-gradient-card border-border/50">
                    <CardHeader>
                      <CardTitle>Provider Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Member since:</span>
                        <span>{new Date(mockProvider.joinDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Working hours:</span>
                        <span>{mockProvider.workingHours}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Languages:</span>
                        <span>{mockProvider.languages.join(', ')}</span>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-2">Reputation Score</p>
                        <Progress value={mockProvider.reputationScore} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {mockProvider.reputationScore}/100 - Excellent
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="bg-gradient-card border-border/50">
                  <CardHeader>
                    <CardTitle>Rating Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ratingBreakdown.map((rating) => (
                      <div key={rating.stars} className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 w-12">
                          <span className="text-sm">{rating.stars}</span>
                          <Star className="w-3 h-3 text-warning fill-current" />
                        </div>
                        <Progress value={rating.percentage} className="flex-1 h-2" />
                        <span className="text-sm text-muted-foreground w-8">
                          {rating.count}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    {mockReviews.map((review) => (
                      <Card key={review.id} className="bg-gradient-card border-border/50">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium">{review.customerName}</span>
                                {review.verified && (
                                  <Badge variant="outline" className="text-xs">
                                    <Verified className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? 'text-warning fill-current'
                                          : 'text-muted-foreground'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {review.service}
                                </Badge>
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="portfolio">
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-8 text-center">
                  <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Portfolio Coming Soon</h3>
                  <p className="text-muted-foreground">
                    The provider's portfolio of completed work will be displayed here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}