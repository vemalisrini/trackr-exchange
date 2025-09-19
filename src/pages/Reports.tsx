import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, DollarSign, Clock, Download, Calendar, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Reports = () => {
  const slaData = [
    { partner: 'IATA BSP', target: 95, actual: 98.2, files: 1247 },
    { partner: 'Cargo System', target: 95, actual: 97.8, files: 2156 },
    { partner: 'Loyalty Partners', target: 98, actual: 99.1, files: 743 },
    { partner: 'OPS Planning', target: 96, actual: 94.2, files: 892 },
    { partner: 'Commercial System', target: 94, actual: 92.7, files: 1345 }
  ];

  const volumeData = [
    { month: 'Jul', inward: 15420, outward: 12340 },
    { month: 'Aug', inward: 16230, outward: 13120 },
    { month: 'Sep', inward: 15890, outward: 12890 },
    { month: 'Oct', inward: 17230, outward: 14210 },
    { month: 'Nov', inward: 18120, outward: 15340 },
    { month: 'Dec', inward: 19450, outward: 16120 }
  ];

  const failureData = [
    { reason: 'Network Timeout', count: 45, percentage: 35 },
    { reason: 'Format Validation', count: 32, percentage: 25 },
    { reason: 'File Corruption', count: 28, percentage: 22 },
    { reason: 'Authentication', count: 15, percentage: 12 },
    { reason: 'Other', count: 8, percentage: 6 }
  ];

  const costData = [
    { category: 'SLA Penalties', amount: 12500, impact: 'high' },
    { category: 'Manual Processing', amount: 8900, impact: 'medium' },
    { category: 'System Downtime', amount: 15600, impact: 'high' },
    { category: 'Data Recovery', amount: 4200, impact: 'low' },
    { category: 'Compliance Fines', amount: 25000, impact: 'critical' }
  ];

  const scheduledReports = [
    {
      id: 1,
      name: 'Daily Operations Summary',
      frequency: 'Daily at 6:00 AM',
      recipients: 'ops-team@airline.com',
      format: 'PDF + Excel',
      status: 'active'
    },
    {
      id: 2,
      name: 'Weekly SLA Performance',
      frequency: 'Every Monday at 8:00 AM',
      recipients: 'management@airline.com',
      format: 'PDF',
      status: 'active'
    },
    {
      id: 3,
      name: 'Monthly Compliance Report',
      frequency: '1st of every month',
      recipients: 'compliance@airline.com',
      format: 'PDF + CSV',
      status: 'active'
    },
    {
      id: 4,
      name: 'Quarterly Business Review',
      frequency: 'End of quarter',
      recipients: 'executives@airline.com',
      format: 'PowerPoint',
      status: 'paused'
    }
  ];

  const COLORS = ['#2563EB', '#DC2626', '#F59E0B', '#16A34A', '#8B5CF6'];

  const getImpactBadge = (impact: string) => {
    const badges = {
      critical: <Badge className="bg-destructive/10 text-destructive border-destructive/20">Critical</Badge>,
      high: <Badge className="bg-destructive/10 text-destructive border-destructive/20">High</Badge>,
      medium: <Badge className="bg-warning/10 text-warning border-warning/20">Medium</Badge>,
      low: <Badge className="bg-success/10 text-success border-success/20">Low</Badge>
    };
    return badges[impact as keyof typeof badges] || <Badge variant="outline">{impact}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: <Badge className="bg-success/10 text-success border-success/20">Active</Badge>,
      paused: <Badge className="bg-warning/10 text-warning border-warning/20">Paused</Badge>
    };
    return badges[status as keyof typeof badges] || <Badge variant="outline">{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive reporting and business intelligence for file exchange operations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="button-swiss">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
          <Button className="button-swiss">
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Reports Tabs */}
      <Card className="card-swiss">
        <CardContent className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sla">SLA Performance</TabsTrigger>
              <TabsTrigger value="failures">Failure Analysis</TabsTrigger>
              <TabsTrigger value="trends">Volume Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* KPI Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="kpi-card">
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Files</p>
                        <p className="text-2xl font-heading font-bold">19,450</p>
                        <p className="text-xs text-success">+12% vs last month</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="kpi-card">
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                        <p className="text-2xl font-heading font-bold">97.8%</p>
                        <p className="text-xs text-success">+0.5% vs last month</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-success" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="kpi-card">
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Processing</p>
                        <p className="text-2xl font-heading font-bold">1.2min</p>
                        <p className="text-xs text-success">-15s vs last month</p>
                      </div>
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="kpi-card">
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Cost Impact</p>
                        <p className="text-2xl font-heading font-bold">$66.2K</p>
                        <p className="text-xs text-destructive">+8% vs last month</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-warning" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Volume Trends Chart */}
              <Card className="card-swiss">
                <CardHeader>
                  <CardTitle>File Volume Trends (6 Months)</CardTitle>
                  <CardDescription>Inward vs Outward file processing volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={volumeData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="month" className="text-xs" />
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
                          dataKey="inward" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          name="Inward Files"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="outward" 
                          stroke="hsl(var(--success))" 
                          strokeWidth={3}
                          name="Outward Files"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sla" className="space-y-6 mt-6">
              <Card className="card-swiss">
                <CardHeader>
                  <CardTitle>Partner SLA Scorecards</CardTitle>
                  <CardDescription>Service level agreement performance by partner system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="table-swiss">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th>Partner/System</th>
                          <th>SLA Target</th>
                          <th>Actual Performance</th>
                          <th>Files Processed</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {slaData.map((partner, index) => (
                          <tr key={index}>
                            <td className="font-medium">{partner.partner}</td>
                            <td>{partner.target}%</td>
                            <td>
                              <span className={partner.actual >= partner.target ? 'text-success font-medium' : 'text-destructive font-medium'}>
                                {partner.actual}%
                              </span>
                            </td>
                            <td>{partner.files.toLocaleString()}</td>
                            <td>
                              {partner.actual >= partner.target ? (
                                <Badge className="bg-success/10 text-success border-success/20">Meeting SLA</Badge>
                              ) : (
                                <Badge className="bg-destructive/10 text-destructive border-destructive/20">Below SLA</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="failures" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Failure Reasons Chart */}
                <Card className="card-swiss">
                  <CardHeader>
                    <CardTitle>Failure Reasons Distribution</CardTitle>
                    <CardDescription>Breakdown of file processing failures</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={failureData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                            label={({ name, percentage }) => `${name}: ${percentage}%`}
                          >
                            {failureData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Cost of Failure */}
                <Card className="card-swiss">
                  <CardHeader>
                    <CardTitle>Cost of Failure Analysis</CardTitle>
                    <CardDescription>Financial impact of processing failures</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {costData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div>
                            <p className="font-medium">{item.category}</p>
                            <p className="text-2xl font-heading font-bold">${item.amount.toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            {getImpactBadge(item.impact)}
                          </div>
                        </div>
                      ))}
                      <div className="border-t border-border pt-4">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Total Cost Impact</span>
                          <span className="text-2xl font-heading font-bold text-destructive">
                            ${costData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6 mt-6">
              <Card className="card-swiss">
                <CardHeader>
                  <CardTitle>AI Trend Forecast</CardTitle>
                  <CardDescription>Predictive analysis of file volume trends and capacity planning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border border-border rounded-lg">
                        <p className="text-sm text-muted-foreground">Predicted Next Month</p>
                        <p className="text-2xl font-heading font-bold text-primary">21,200 files</p>
                        <p className="text-xs text-success">+9% growth expected</p>
                      </div>
                      
                      <div className="text-center p-4 border border-border rounded-lg">
                        <p className="text-sm text-muted-foreground">Capacity Utilization</p>
                        <p className="text-2xl font-heading font-bold text-warning">78%</p>
                        <p className="text-xs text-muted-foreground">Within normal range</p>
                      </div>
                      
                      <div className="text-center p-4 border border-border rounded-lg">
                        <p className="text-sm text-muted-foreground">Risk Assessment</p>
                        <p className="text-2xl font-heading font-bold text-success">Low</p>
                        <p className="text-xs text-muted-foreground">No capacity issues expected</p>
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-2">AI Insights & Recommendations</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Peak processing times: 8-10 AM and 2-4 PM</li>
                        <li>• Finance department shows highest growth trend (+15% monthly)</li>
                        <li>• Consider scaling processing capacity for Q1 2025</li>
                        <li>• Network timeout issues increasing - review infrastructure</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card className="card-swiss">
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>Automated report generation and distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="table-swiss">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Frequency</th>
                  <th>Recipients</th>
                  <th>Format</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {scheduledReports.map((report) => (
                  <tr key={report.id}>
                    <td className="font-medium">{report.name}</td>
                    <td className="text-sm">{report.frequency}</td>
                    <td className="text-sm">{report.recipients}</td>
                    <td className="text-sm">{report.format}</td>
                    <td>{getStatusBadge(report.status)}</td>
                    <td>
                      <div className="flex items-center space-x-1">
                        <Button size="sm" variant="outline" className="button-swiss p-2">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="button-swiss p-2">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;