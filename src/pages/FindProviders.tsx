import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  MapPin, 
  Star, 
  Filter, 
  Search,
  Phone,
  MessageCircle,
  Verified,
  Clock,
  DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Provider {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  category: string;
  distance: number;
  priceRange: string;
  verified: boolean;
  completedJobs: number;
  responseTime: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'TechFix Pro',
    rating: 4.9,
    reviewCount: 127,
    category: 'Electronics',
    distance: 0.8,
    priceRange: '$40-80',
    verified: true,
    completedJobs: 156,
    responseTime: '< 2 hours',
    location: { lat: 40.7128, lng: -74.0060, address: '123 Tech Street' }
  },
  {
    id: '2',
    name: 'Home Repair Heroes',
    rating: 4.7,
    reviewCount: 89,
    category: 'Home Maintenance',
    distance: 1.2,
    priceRange: '$60-120',
    verified: true,
    completedJobs: 203,
    responseTime: '< 4 hours',
    location: { lat: 40.7589, lng: -73.9851, address: '456 Repair Ave' }
  },
  {
    id: '3',
    name: 'Quick Phone Fix',
    rating: 4.6,
    reviewCount: 234,
    category: 'Electronics',
    distance: 2.1,
    priceRange: '$25-60',
    verified: false,
    completedJobs: 89,
    responseTime: '< 1 hour',
    location: { lat: 40.7282, lng: -73.7949, address: '789 Mobile Lane' }
  }
];

export default function FindProviders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxDistance, setMaxDistance] = useState([10]);
  const [minRating, setMinRating] = useState([4]);
  const [filteredProviders, setFilteredProviders] = useState(mockProviders);
  const navigate = useNavigate();

  const categories = ['Electronics', 'Home Maintenance', 'Automotive', 'Appliances', 'Computer Repair'];

  const handleSearch = () => {
    let filtered = mockProviders;

    if (searchQuery) {
      filtered = filtered.filter(provider => 
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(provider => provider.category === selectedCategory);
    }

    filtered = filtered.filter(provider => 
      provider.distance <= maxDistance[0] && provider.rating >= minRating[0]
    );

    setFilteredProviders(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Find Service Providers</h1>
          <p className="text-muted-foreground">
            Connect with verified professionals in your area
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-card border-border/50 sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-primary" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Service or provider..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="plumber">Plumber</SelectItem>
                  <SelectItem value="electrician">Electrician</SelectItem>
                  <SelectItem value="carpenter">Carpenter</SelectItem>
                </SelectContent>
              </Select>

                </div>

                {/* Distance */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Max Distance: {maxDistance[0]} miles
                  </label>
                  <Slider
                    value={maxDistance}
                    onValueChange={setMaxDistance}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Min Rating: {minRating[0]}+
                  </label>
                  <Slider
                    value={minRating}
                    onValueChange={setMinRating}
                    max={5}
                    min={1}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <Button 
                  onClick={handleSearch}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Map Placeholder */}
            <Card className="bg-gradient-card border-border/50 mb-8">
              <CardContent className="p-0">
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Interactive map will show provider locations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Provider Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {filteredProviders.length} providers found
                </h2>
                <Select defaultValue="rating">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="distance">Nearest</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{provider.name}</h3>
                          {provider.verified && (
                            <Badge className="bg-accent/10 text-accent border-accent/20">
                              <Verified className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-warning fill-current" />
                            <span className="ml-1 font-medium">{provider.rating}</span>
                            <span className="text-muted-foreground ml-1">
                              ({provider.reviewCount} reviews)
                            </span>
                          </div>
                          
                          <Badge variant="outline">{provider.category}</Badge>
                          
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{provider.distance} miles away</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span>{provider.priceRange}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>Responds {provider.responseTime}</span>
                          </div>
                          <span>{provider.completedJobs} jobs completed</span>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 mt-4 md:mt-0 md:ml-6">
                        <Button
                          onClick={() => navigate(`/provider/${provider.id}`)}
                          className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                        >
                          View Profile
                        </Button>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="w-4 h-4 mr-1" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}