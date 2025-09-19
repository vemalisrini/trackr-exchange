import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileInput,
  FileOutput,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Eye
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Sample data based on department
const getDepartmentData = (department: string) => {
  const baseData = {
    Finance: {
      inwardFiles: 1247,
      outwardFiles: 892,
      successRate: 98.2,
      slaCompliance: 95.8,
      missingFiles: 3,
      trendData: [
        { day: 'Mon', files: 180 },
        { day: 'Tue', files: 165 },
        { day: 'Wed', files: 195 },
        { day: 'Thu', files: 210 },
        { day: 'Fri', files: 185 },
        { day: 'Sat', files: 95 },
        { day: 'Sun', files: 78 }
      ],
      failureReasons: [
        { reason: 'Network Timeout', count: 12 },
        { reason: 'File Format', count: 8 },
        { reason: 'Permission', count: 5 },
        { reason: 'Size Limit', count: 3 }
      ]
    },
    Cargo: {
      inwardFiles: 2156,
      outwardFiles: 1843,
      successRate: 97.8,
      slaCompliance: 94.2,
      missingFiles: 7,
      trendData: [
        { day: 'Mon', files: 320 },
        { day: 'Tue', files: 298 },
        { day: 'Wed', files: 342 },
        { day: 'Thu', files: 365 },
        { day: 'Fri', files: 387 },
        { day: 'Sat', files: 245 },
        { day: 'Sun', files: 198 }
      ],
      failureReasons: [
        { reason: 'AWB Validation', count: 18 },
        { reason: 'Customs Data', count: 14 },
        { reason: 'Network Timeout', count: 9 },
        { reason: 'File Corruption', count: 6 }
      ]
    },
    Operations: {
      inwardFiles: 3421,
      outwardFiles: 2987,
      successRate: 99.1,
      slaCompliance: 96.7,
      missingFiles: 2,
      trendData: [
        { day: 'Mon', files: 520 },
        { day: 'Tue', files: 487 },
        { day: 'Wed', files: 543 },
        { day: 'Thu', files: 578 },
        { day: 'Fri', files: 601 },
        { day: 'Sat', files: 334 },
        { day: 'Sun', files: 298 }
      ],
      failureReasons: [
        { reason: 'Flight Data', count: 8 },
        { reason: 'Crew Schedule', count: 6 },
        { reason: 'Network Issue', count: 4 },
        { reason: 'Format Error', count: 3 }
      ]
    },
    Loyalty: {
      inwardFiles: 892,
      outwardFiles: 743,
      successRate: 98.9,
      slaCompliance: 97.1,
      missingFiles: 1,
      trendData: [
        { day: 'Mon', files: 142 },
        { day: 'Tue', files: 138 },
        { day: 'Wed', files: 156 },
        { day: 'Thu', files: 163 },
        { day: 'Fri', files: 171 },
        { day: 'Sat', files: 89 },
        { day: 'Sun', files: 76 }
      ],
      failureReasons: [
        { reason: 'Point Calculation', count: 5 },
        { reason: 'Member Data', count: 4 },
        { reason: 'API Timeout', count: 2 },
        { reason: 'Data Format', count: 1 }
      ]
    }
  };

  return baseData[department as keyof typeof baseData] || baseData.Finance;
};

const alerts = [
  {
    id: 1,
    type: 'error',
    title: 'BSP Daily Report Missing',
    description: 'Expected file BSP_DAILY_20241219.csv not received',
    time: '2 mins ago',
    department: 'Finance'
  },
  {
    id: 2,
    type: 'warning',
    title: 'SLA Breach Warning',
    description: 'AWB manifest file delayed by 15 minutes',
    time: '8 mins ago',
    department: 'Cargo'
  },
  {
    id: 3,
    type: 'success',
    title: 'Loyalty Points Reconciliation Complete',
    description: 'Daily loyalty points file processed successfully',
    time: '1 hour ago',
    department: 'Loyalty'
  }
];

const fileSchedule = [
  {
    id: 1,
    fileName: 'BSP_DAILY_REPORT.csv',
    source: 'IATA BSP',
    expectedTime: '09:00',
    status: 'pending',
    slaMinutes: 30,
    department: 'Finance'
  },
  {
    id: 2,
    fileName: 'AWB_MANIFEST.xml',
    source: 'Cargo System',
    expectedTime: '08:30',
    status: 'received',
    slaMinutes: 15,
    department: 'Cargo'
  },
  {
    id: 3,
    fileName: 'CREW_ROSTER.json',
    source: 'OPS Planning',
    expectedTime: '07:00',
    status: 'processed',
    slaMinutes: 45,
    department: 'Operations'
  },
  {
    id: 4,
    fileName: 'LOYALTY_ACCRUAL.csv',
    source: 'Partner API',
    expectedTime: '10:30',
    status: 'pending',
    slaMinutes: 60,
    department: 'Loyalty'
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const department = user?.currentDepartment || 'Finance';
  const data = getDepartmentData(department);

  const kpiCards = [
    {
      title: 'Inward Files',
      value: data.inwardFiles.toLocaleString(),
      icon: FileInput,
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: 'Outward Files',
      value: data.outwardFiles.toLocaleString(),
      icon: FileOutput,
      change: '+8%',
      changeType: 'positive' as const
    },
    {
      title: 'Success Rate',
      value: `${data.successRate}%`,
      icon: CheckCircle2,
      change: '+0.3%',
      changeType: 'positive' as const
    },
    {
      title: 'SLA Compliance',
      value: `${data.slaCompliance}%`,
      icon: Clock,
      change: '-1.2%',
      changeType: 'negative' as const
    },
    {
      title: 'Missing Files',
      value: data.missingFiles.toString(),
      icon: AlertTriangle,
      change: '-2',
      changeType: 'positive' as const
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'received':
        return <Badge className="bg-success/10 text-success border-success/20">Received</Badge>;
      case 'processed':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Processed</Badge>;
      case 'pending':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'error':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Error</Badge>;
      case 'warning':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>;
      case 'success':
        return <Badge className="bg-success/10 text-success border-success/20">Success</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Department Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">{department} Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor file exchanges and system health for {department}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{user?.role === 'admin' ? 'Administrator' : 'Department User'}</Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {kpiCards.map((card) => (
          <Card key={card.title} className="kpi-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold">{card.value}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                {card.changeType === 'positive' ? (
                  <TrendingUp className="h-3 w-3 text-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                <span className={card.changeType === 'positive' ? 'text-success' : 'text-destructive'}>
                  {card.change}
                </span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Volume Trends */}
        <Card className="card-swiss">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>File Volume Trends</span>
            </CardTitle>
            <CardDescription>Daily file processing volume for this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.trendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.75rem'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="files" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Failure Reasons */}
        <Card className="card-swiss">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Failure Reasons</span>
            </CardTitle>
            <CardDescription>Most common reasons for file processing failures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.failureReasons}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="reason" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.75rem'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and File Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card className="card-swiss">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Recent Alerts</span>
              </div>
              <Button variant="outline" size="sm" className="button-swiss">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardTitle>
            <CardDescription>Latest system alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts
                .filter(alert => user?.role === 'admin' || alert.department === department)
                .slice(0, 3)
                .map((alert) => (
                <div key={alert.id} className="border border-border rounded-lg p-3 hover:bg-accent/20 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        {getAlertBadge(alert.type)}
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* File Schedule */}
        <Card className="card-swiss">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Today's File Schedule</span>
            </CardTitle>
            <CardDescription>Expected file deliveries and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fileSchedule
                .filter(file => user?.role === 'admin' || file.department === department)
                .map((file) => (
                <div key={file.id} className="border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-sm">{file.fileName}</div>
                    {getStatusBadge(file.status)}
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Source: {file.source}</div>
                    <div>Expected: {file.expectedTime} (SLA: {file.slaMinutes}min)</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;