import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  Wallet as WalletIcon, 
  Plus, 
  Minus, 
  ArrowUpRight, 
  ArrowDownLeft,
  TrendingUp,
  Vote,
  Clock,
  DollarSign,
  Trophy,
  Coins
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'payment' | 'reward' | 'governance';
  amount: number;
  currency: 'USDC' | 'FXP';
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  votingEnds: string;
  totalVotes: number;
  userVoted: boolean;
  category: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'payment',
    amount: 85.50,
    currency: 'USDC',
    description: 'iPhone screen repair - Service completed',
    date: '2024-01-15',
    status: 'completed'
  },
  {
    id: '2',
    type: 'reward',
    amount: 15.75,
    currency: 'FXP',
    description: 'Monthly staking rewards',
    date: '2024-01-12',
    status: 'completed'
  },
  {
    id: '3',
    type: 'deposit',
    amount: 200.00,
    currency: 'USDC',
    description: 'Wallet deposit from bank',
    date: '2024-01-10',
    status: 'completed'
  }
];

const mockProposals: GovernanceProposal[] = [
  {
    id: '1',
    title: 'Reduce Platform Fees for Electronics Repairs',
    description: 'Proposal to reduce the platform fee from 3% to 2% for electronics repair services to attract more providers.',
    votingEnds: '2024-01-25',
    totalVotes: 1247,
    userVoted: false,
    category: 'Platform'
  },
  {
    id: '2',
    title: 'Add New Service Category: Garden Maintenance',
    description: 'Expand FixPay to include garden and outdoor maintenance services.',
    votingEnds: '2024-01-28',
    totalVotes: 892,
    userVoted: true,
    category: 'Services'
  }
];

export default function Wallet() {
  const [activeTab, setActiveTab] = useState('overview');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');

  const balances = {
    usdc: 250.50,
    fxp: 1250.75,
    stakedFxp: 800.25,
    stakingApr: 12.5,
    monthlyRewards: 45.32
  };

  const handleDeposit = () => {
    if (!depositAmount) return;
    
    toast({
      title: "Deposit Initiated",
      description: `Depositing $${depositAmount} USDC to your wallet.`,
    });
    setDepositAmount('');
  };

  const handleWithdraw = () => {
    if (!withdrawAmount) return;
    
    toast({
      title: "Withdrawal Initiated",
      description: `Withdrawing $${withdrawAmount} USDC from your wallet.`,
    });
    setWithdrawAmount('');
  };

  const handleStake = () => {
    if (!stakeAmount) return;
    
    toast({
      title: "Staking Initiated",
      description: `Staking ${stakeAmount} FXP tokens.`,
    });
    setStakeAmount('');
  };

  const handleVote = (proposalId: string, vote: 'yes' | 'no') => {
    toast({
      title: "Vote Submitted",
      description: `Your ${vote} vote has been recorded.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Wallet & Governance</h1>
            <p className="text-muted-foreground">
              Manage your funds, stake tokens, and participate in governance
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="staking">Staking</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Balance Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">USDC Balance</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${balances.usdc}</div>
                    <p className="text-xs text-muted-foreground">Available for payments</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">FXP Tokens</CardTitle>
                    <Coins className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{balances.fxp}</div>
                    <p className="text-xs text-muted-foreground">Governance & discounts</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Staked FXP</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{balances.stakedFxp}</div>
                    <p className="text-xs text-accent">+{balances.stakingApr}% APR</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Rewards</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${balances.monthlyRewards}</div>
                    <p className="text-xs text-accent">This month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-gradient-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <WalletIcon className="w-5 h-5 mr-2 text-primary" />
                      Deposit / Withdraw
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="deposit">Deposit USDC</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="deposit"
                          placeholder="Amount"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                        />
                        <Button onClick={handleDeposit} className="bg-gradient-primary">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="withdraw">Withdraw USDC</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="withdraw"
                          placeholder="Amount"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                        />
                        <Button onClick={handleWithdraw} variant="outline">
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-primary" />
                      Quick Stake
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="stake">Stake FXP Tokens</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="stake"
                          placeholder="Amount"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                        />
                        <Button onClick={handleStake} className="bg-gradient-primary">
                          Stake
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>Current APR:</span>
                        <span className="font-medium text-accent">{balances.stakingApr}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Est. Monthly Rewards:</span>
                        <span className="font-medium">${(parseFloat(stakeAmount || '0') * balances.stakingApr / 1200).toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                        <div className="flex items-center space-x-4">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            transaction.type === 'deposit' && "bg-accent/10",
                            transaction.type === 'withdrawal' && "bg-warning/10",
                            transaction.type === 'payment' && "bg-primary/10",
                            transaction.type === 'reward' && "bg-secondary/10"
                          )}>
                            {transaction.type === 'deposit' && <ArrowDownLeft className="w-5 h-5 text-accent" />}
                            {transaction.type === 'withdrawal' && <ArrowUpRight className="w-5 h-5 text-warning" />}
                            {transaction.type === 'payment' && <DollarSign className="w-5 h-5 text-primary" />}
                            {transaction.type === 'reward' && <Trophy className="w-5 h-5 text-secondary" />}
                          </div>
                          
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-medium">
                            {transaction.type === 'withdrawal' ? '-' : '+'}
                            {transaction.amount} {transaction.currency}
                          </p>
                          <Badge 
                            variant={transaction.status === 'completed' ? 'default' : 
                                   transaction.status === 'pending' ? 'secondary' : 'destructive'}
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="staking" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-gradient-card border-border/50">
                  <CardHeader>
                    <CardTitle>Staking Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {balances.stakedFxp} FXP
                      </div>
                      <p className="text-muted-foreground">Currently Staked</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>APR:</span>
                        <span className="font-medium text-accent">{balances.stakingApr}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Rewards:</span>
                        <span className="font-medium">${balances.monthlyRewards}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Earned:</span>
                        <span className="font-medium text-accent">$147.82</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Staking Progress</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Unlock period: 15 days remaining
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-border/50">
                  <CardHeader>
                    <CardTitle>Staking Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                      Claim Rewards
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      Stake More FXP
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      Unstake Tokens
                    </Button>

                    <div className="p-4 bg-muted/50 rounded-lg mt-4">
                      <h4 className="font-medium mb-2">Staking Benefits</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Earn {balances.stakingApr}% APR on staked FXP</li>
                        <li>• Participate in governance voting</li>
                        <li>• Higher reputation score</li>
                        <li>• Priority in dispute resolution</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="governance" className="space-y-6">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Vote className="w-5 h-5 mr-2 text-primary" />
                    Active Proposals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockProposals.map((proposal) => (
                      <div key={proposal.id} className="p-6 rounded-lg bg-muted/30 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold">{proposal.title}</h3>
                              <Badge variant="outline">{proposal.category}</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm mb-4">
                              {proposal.description}
                            </p>
                            
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>Ends {new Date(proposal.votingEnds).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center">
                                <Vote className="w-4 h-4 mr-1" />
                                <span>{proposal.totalVotes} votes</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {proposal.userVoted ? (
                          <Badge className="bg-accent/10 text-accent border-accent/20">
                            ✓ Already Voted
                          </Badge>
                        ) : (
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => handleVote(proposal.id, 'yes')}
                              className="bg-accent hover:bg-accent/90"
                            >
                              Vote Yes
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => handleVote(proposal.id, 'no')}
                            >
                              Vote No
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}