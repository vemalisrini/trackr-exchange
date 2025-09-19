import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Send, CheckCircle2, AlertTriangle, RotateCcw, Eye } from 'lucide-react';

const OutwardFiles = () => {
  const sampleFiles = [
    {
      id: 1,
      fileName: 'FINANCE_EXPORT_20241219.xlsx',
      destination: 'External Auditor',
      status: 'sent',
      queuedAt: '2024-12-19 08:00:00',
      sentAt: '2024-12-19 08:05:00',
      slaDeadline: '2024-12-19 10:00:00',
      retryAttempts: 0,
      fileSize: '2.4MB',
      department: 'Finance'
    },
    {
      id: 2,
      fileName: 'AWB_EXPORT_20241219.xml',
      destination: 'Customs Authority',
      status: 'acknowledged',
      queuedAt: '2024-12-19 07:30:00',
      sentAt: '2024-12-19 07:35:00',
      slaDeadline: '2024-12-19 09:00:00',
      retryAttempts: 0,
      fileSize: '5.1MB',
      department: 'Cargo'
    },
    {
      id: 3,
      fileName: 'CREW_SCHEDULE_20241219.json',
      destination: 'Crew Management',
      status: 'queued',
      queuedAt: '2024-12-19 09:00:00',
      sentAt: null,
      slaDeadline: '2024-12-19 11:00:00',
      retryAttempts: 0,
      fileSize: '876KB',
      department: 'Operations'
    },
    {
      id: 4,
      fileName: 'LOYALTY_EXPORT_20241219.csv',
      destination: 'Partner System',
      status: 'failed',
      queuedAt: '2024-12-19 06:45:00',
      sentAt: '2024-12-19 06:50:00',
      slaDeadline: '2024-12-19 08:45:00',
      retryAttempts: 2,
      fileSize: '3.2MB',
      department: 'Loyalty'
    }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      queued: <Badge className="bg-warning/10 text-warning border-warning/20">Queued</Badge>,
      sent: <Badge className="bg-primary/10 text-primary border-primary/20">Sent</Badge>,
      acknowledged: <Badge className="bg-success/10 text-success border-success/20">Acknowledged</Badge>,
      failed: <Badge className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>
    };
    return badges[status as keyof typeof badges] || <Badge variant="outline">{status}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'queued':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'sent':
        return <Send className="h-4 w-4 text-primary" />;
      case 'acknowledged':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getSLACountdown = (deadline: string, status: string) => {
    if (status === 'acknowledged') return null;
    
    const now = new Date();
    const slaTime = new Date(deadline);
    const diff = slaTime.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 0) {
      return <span className="text-destructive font-medium">Overdue by {Math.abs(minutes)}m</span>;
    } else if (minutes < 30) {
      return <span className="text-warning font-medium">{minutes}m remaining</span>;
    } else {
      return <span className="text-muted-foreground">{minutes}m remaining</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Outward Files</h1>
          <p className="text-muted-foreground mt-1">
            Monitor outbound file transfers and delivery status
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{sampleFiles.length} Files</Badge>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="kpi-card">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Queued</p>
                <p className="text-2xl font-heading font-bold">1</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="kpi-card">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sent</p>
                <p className="text-2xl font-heading font-bold">1</p>
              </div>
              <Send className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="kpi-card">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Acknowledged</p>
                <p className="text-2xl font-heading font-bold">1</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="kpi-card">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-heading font-bold">1</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Files Table */}
      <Card className="card-swiss">
        <CardHeader>
          <CardTitle>Outward File Queue</CardTitle>
          <CardDescription>Current status of outbound file transfers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="table-swiss">
            <table className="w-full">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Destination</th>
                  <th>Status</th>
                  <th>Queued Time</th>
                  <th>SLA Countdown</th>
                  <th>Size</th>
                  <th>Retries</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sampleFiles.map((file) => (
                  <tr key={file.id}>
                    <td>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(file.status)}
                        <div>
                          <div className="font-medium">{file.fileName}</div>
                          <div className="text-xs text-muted-foreground">{file.department}</div>
                        </div>
                      </div>
                    </td>
                    <td>{file.destination}</td>
                    <td>{getStatusBadge(file.status)}</td>
                    <td>
                      <div className="text-sm">
                        {new Date(file.queuedAt).toLocaleString()}
                      </div>
                    </td>
                    <td>
                      {getSLACountdown(file.slaDeadline, file.status)}
                    </td>
                    <td className="text-sm">{file.fileSize}</td>
                    <td>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm">{file.retryAttempts}</span>
                        {file.retryAttempts > 0 && (
                          <RotateCcw className="h-3 w-3 text-warning" />
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-1">
                        <Button size="sm" variant="outline" className="button-swiss p-2">
                          <Eye className="h-3 w-3" />
                        </Button>
                        {file.status === 'failed' && (
                          <Button size="sm" variant="outline" className="button-swiss p-2">
                            <RotateCcw className="h-3 w-3" />
                          </Button>
                        )}
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

export default OutwardFiles;