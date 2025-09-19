import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, FileText, Clock, TrendingUp } from 'lucide-react';

const Departments = () => {
  const { user } = useAuth();

  const departmentData = {
    Finance: {
      description: 'Financial reporting, BSP data, and interline billing',
      fileExchanges: [
        { name: 'BSP Daily Reports', frequency: 'Daily', source: 'IATA BSP', critical: true },
        { name: 'Interline Billing', frequency: 'Weekly', source: 'Partner Airlines', critical: true },
        { name: 'Revenue Reports', frequency: 'Monthly', source: 'Revenue System', critical: false },
        { name: 'Cost Center Data', frequency: 'Monthly', source: 'ERP System', critical: false }
      ],
      metrics: {
        filesProcessed: 1247,
        successRate: 98.2,
        avgProcessingTime: '45s',
        criticalExchanges: 2
      }
    },
    Cargo: {
      description: 'Air cargo operations, AWB processing, and manifest management',
      fileExchanges: [
        { name: 'AWB Manifests', frequency: 'Real-time', source: 'Cargo System', critical: true },
        { name: 'Customs Declarations', frequency: 'Real-time', source: 'Customs Authority', critical: true },
        { name: 'Billing Reports', frequency: 'Daily', source: 'Billing System', critical: false },
        { name: 'Capacity Reports', frequency: 'Weekly', source: 'Operations', critical: false }
      ],
      metrics: {
        filesProcessed: 2156,
        successRate: 97.8,
        avgProcessingTime: '32s',
        criticalExchanges: 2
      }
    },
    Operations: {
      description: 'Flight operations, crew management, and movement messages',
      fileExchanges: [
        { name: 'Crew Rosters', frequency: 'Hourly', source: 'Crew Planning', critical: true },
        { name: 'Flight Plans', frequency: 'Real-time', source: 'Flight Planning', critical: true },
        { name: 'Movement Messages', frequency: 'Real-time', source: 'ACARS', critical: true },
        { name: 'Weather Data', frequency: 'Hourly', source: 'Met Office', critical: false }
      ],
      metrics: {
        filesProcessed: 3421,
        successRate: 99.1,
        avgProcessingTime: '28s',
        criticalExchanges: 3
      }
    },
    Loyalty: {
      description: 'Loyalty program management, partner settlements, and tier evaluations',
      fileExchanges: [
        { name: 'Point Accruals', frequency: 'Daily', source: 'Partner APIs', critical: true },
        { name: 'Redemption Data', frequency: 'Daily', source: 'Booking System', critical: true },
        { name: 'Partner Settlements', frequency: 'Weekly', source: 'Partner Systems', critical: false },
        { name: 'Tier Evaluations', frequency: 'Monthly', source: 'CRM System', critical: false }
      ],
      metrics: {
        filesProcessed: 892,
        successRate: 98.9,
        avgProcessingTime: '52s',
        criticalExchanges: 2
      }
    },
    Commercial: {
      description: 'Sales data, fare management, and market analysis',
      fileExchanges: [
        { name: 'Agency Sales', frequency: 'Daily', source: 'GDS Systems', critical: false },
        { name: 'Fare Updates', frequency: 'Daily', source: 'Revenue Management', critical: false },
        { name: 'Market Reports', frequency: 'Weekly', source: 'Analytics Platform', critical: false },
        { name: 'Competition Data', frequency: 'Weekly', source: 'External Sources', critical: false }
      ],
      metrics: {
        filesProcessed: 1345,
        successRate: 92.7,
        avgProcessingTime: '1m 15s',
        criticalExchanges: 0
      }
    },
    'Customer Experience': {
      description: 'Customer feedback, surveys, and service quality data',
      fileExchanges: [
        { name: 'Survey Responses', frequency: 'Daily', source: 'Survey Platform', critical: false },
        { name: 'Complaint Logs', frequency: 'Real-time', source: 'CRM System', critical: false },
        { name: 'Social Media Data', frequency: 'Hourly', source: 'Social Platforms', critical: false },
        { name: 'NPS Scores', frequency: 'Weekly', source: 'Analytics', critical: false }
      ],
      metrics: {
        filesProcessed: 678,
        successRate: 95.4,
        avgProcessingTime: '38s',
        criticalExchanges: 0
      }
    },
    Engineering: {
      description: 'Aircraft maintenance, health monitoring, and compliance reporting',
      fileExchanges: [
        { name: 'Health Monitoring', frequency: 'Real-time', source: 'Aircraft Systems', critical: true },
        { name: 'Maintenance Logs', frequency: 'Daily', source: 'MRO System', critical: true },
        { name: 'Compliance Reports', frequency: 'Monthly', source: 'Regulatory Systems', critical: true },
        { name: 'Parts Inventory', frequency: 'Daily', source: 'Supply Chain', critical: false }
      ],
      metrics: {
        filesProcessed: 542,
        successRate: 99.3,
        avgProcessingTime: '1m 2s',
        criticalExchanges: 3
      }
    },
    'HR/Admin': {
      description: 'Human resources, payroll, and administrative functions',
      fileExchanges: [
        { name: 'Payroll Data', frequency: 'Monthly', source: 'Payroll System', critical: false },
        { name: 'Training Records', frequency: 'Weekly', source: 'LMS', critical: false },
        { name: 'Medical Records', frequency: 'As needed', source: 'Medical System', critical: true },
        { name: 'Compliance Training', frequency: 'Monthly', source: 'Training Platform', critical: false }
      ],
      metrics: {
        filesProcessed: 234,
        successRate: 96.8,
        avgProcessingTime: '1m 45s',
        criticalExchanges: 1
      }
    }
  };

  const departments = Object.keys(departmentData);
  const currentDept = user?.currentDepartment || 'Finance';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Departments & File Exchanges</h1>
          <p className="text-muted-foreground mt-1">
            Department-specific file exchange configurations and performance metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            {user?.role === 'admin' ? 'All Departments' : currentDept}
          </Badge>
        </div>
      </div>

      {/* Department Overview */}
      {user?.role === 'admin' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map((dept) => {
            const data = departmentData[dept as keyof typeof departmentData];
            return (
              <Card key={dept} className="kpi-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <Building2 className="h-4 w-4" />
                    <span>{dept}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Files</span>
                      <span className="font-medium">{data.metrics.filesProcessed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Success</span>
                      <span className="font-medium text-success">{data.metrics.successRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Critical</span>
                      <Badge variant="outline" className="text-xs">
                        {data.metrics.criticalExchanges}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="card-swiss">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>{currentDept} Department</span>
            </CardTitle>
            <CardDescription>
              {departmentData[currentDept as keyof typeof departmentData]?.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-heading font-bold">
                  {departmentData[currentDept as keyof typeof departmentData]?.metrics.filesProcessed}
                </p>
                <p className="text-sm text-muted-foreground">Files Processed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-success">
                  {departmentData[currentDept as keyof typeof departmentData]?.metrics.successRate}%
                </p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-heading font-bold">
                  {departmentData[currentDept as keyof typeof departmentData]?.metrics.avgProcessingTime}
                </p>
                <p className="text-sm text-muted-foreground">Avg Processing</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-warning">
                  {departmentData[currentDept as keyof typeof departmentData]?.metrics.criticalExchanges}
                </p>
                <p className="text-sm text-muted-foreground">Critical Exchanges</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Department Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(user?.role === 'admin' ? departments : [currentDept]).map((dept) => {
          const data = departmentData[dept as keyof typeof departmentData];
          return (
            <Card key={dept} className="card-swiss">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>{dept}</span>
                </CardTitle>
                <CardDescription>{data.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Files Processed:</span>
                      <span className="font-medium ml-2">{data.metrics.filesProcessed}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Success Rate:</span>
                      <span className="font-medium ml-2 text-success">{data.metrics.successRate}%</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">File Exchanges</h4>
                    <div className="space-y-2">
                      {data.fileExchanges.map((exchange, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 border border-border rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-sm">{exchange.name}</p>
                              <p className="text-xs text-muted-foreground">{exchange.source}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {exchange.frequency}
                            </Badge>
                            {exchange.critical && (
                              <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                                Critical
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Performance Summary */}
      <Card className="card-swiss">
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>
            Key performance indicators across all departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="table-swiss">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Files Processed</th>
                  <th>Success Rate</th>
                  <th>Avg Processing Time</th>
                  <th>Critical Exchanges</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => {
                  const data = departmentData[dept as keyof typeof departmentData];
                  return (
                    <tr key={dept}>
                      <td>
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{dept}</span>
                        </div>
                      </td>
                      <td>{data.metrics.filesProcessed.toLocaleString()}</td>
                      <td>
                        <span className={data.metrics.successRate >= 95 ? 'text-success' : 'text-warning'}>
                          {data.metrics.successRate}%
                        </span>
                      </td>
                      <td>{data.metrics.avgProcessingTime}</td>
                      <td>
                        <Badge variant="outline">
                          {data.metrics.criticalExchanges}
                        </Badge>
                      </td>
                      <td>
                        {data.metrics.successRate >= 95 ? (
                          <Badge className="bg-success/10 text-success border-success/20">Healthy</Badge>
                        ) : (
                          <Badge className="bg-warning/10 text-warning border-warning/20">Attention</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Departments;