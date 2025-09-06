import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Upload, 
  Calendar as CalendarIcon, 
  DollarSign, 
  Shield, 
  Clock,
  Smartphone,
  Home,
  Car,
  Laptop,
  Wrench
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const serviceCategories = [
  { id: 'electronics', name: 'Electronics', icon: Smartphone, description: 'Phones, laptops, tablets' },
  { id: 'home', name: 'Home Maintenance', icon: Home, description: 'Plumbing, electrical, repairs' },
  { id: 'automotive', name: 'Automotive', icon: Car, description: 'Car repairs, maintenance' },
  { id: 'appliances', name: 'Appliances', icon: Wrench, description: 'Kitchen, laundry appliances' },
  { id: 'computer', name: 'Computer Repair', icon: Laptop, description: 'Hardware, software issues' }
];

export default function RequestService() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState([100]);
  const [timeline, setTimeline] = useState<Date>();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory || !description || !timeline || !paymentMethod) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create service request
    const requestData = {
      category: selectedCategory,
      description,
      budget: budget[0],
      timeline,
      paymentMethod,
      images
    };

    console.log('Creating service request:', requestData);
    
    toast({
      title: "Service Request Created!",
      description: "Your request has been submitted and escrow has been initialized.",
    });

    // Navigate to request management
    navigate('/my-requests');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Request a Service</h1>
            <p className="text-muted-foreground">
              Describe your repair needs and connect with trusted service providers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Service Category */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wrench className="w-5 h-5 mr-2 text-primary" />
                  Service Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <div
                        key={category.id}
                        className={cn(
                          "p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-card",
                          selectedCategory === category.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        )}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent className="w-6 h-6 text-primary" />
                          <div>
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Issue Description */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Issue Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="description">Describe the problem in detail *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe what needs to be repaired, any symptoms, and relevant details..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px] mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="images">Upload Images (Optional)</Label>
                  <div className="mt-2 flex items-center justify-center w-full">
                    <label
                      htmlFor="images"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center py-6">
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                      </div>
                      <input
                        id="images"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  {images.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {images.map((file, index) => (
                        <Badge key={index} variant="secondary">
                          {file.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Budget & Timeline */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-primary" />
                  Budget & Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Budget Range: ${budget[0]}</Label>
                  <div className="mt-2 px-2">
                    <Slider
                      value={budget}
                      onValueChange={setBudget}
                      max={1000}
                      min={10}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>$10</span>
                      <span>$1000+</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Preferred Timeline *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-2",
                          !timeline && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {timeline ? format(timeline, "PPP") : "Select completion date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={timeline}
                        onSelect={setTimeline}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  Payment & Escrow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label>Payment Method *</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usdc">
                        USDC (Stablecoin)
                        <Badge variant="outline" className="ml-2">Most Popular</Badge>
                      </SelectItem>
                      <SelectItem value="fxp">
                        FXP Token
                        <Badge className="ml-2 bg-gradient-primary">5% Discount</Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="w-4 h-4 text-accent" />
                    <span className="font-medium">Escrow Protection</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your payment will be securely held in escrow until the service is completed to your satisfaction.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  size="lg"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Submit Request & Initialize Escrow
                </Button>
                
                <p className="text-center text-sm text-muted-foreground mt-4">
                  By submitting, you agree to our terms and the funds will be locked in escrow
                </p>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}