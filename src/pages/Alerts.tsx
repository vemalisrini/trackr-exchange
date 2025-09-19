import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  MessageSquare,
  User,
  Filter,
  Search,
  Mail,
  Send,
  Slack,
  Eye,
  MessageCircle
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const sampleAlerts = [
  {
    id: 1,
    type: 'error',
    title: 'BSP Daily Report Missing',
    description: 'Expected file BSP_DAILY_20241219.csv not received from IATA BSP system',
    source: 'IATA BSP',
    department: 'Finance',
    priority: 'high',
    timestamp: '2024-12-19 09:15:00',
    status: 'open',
    assignedTo: 'Sarah Johnson',
    escalationLevel: 1,
    slaDeadline: '2024-12-19 10:00:00',
    comments: 2
  },
  {
    id: 2,
    type: 'warning',
    title: 'SLA Breach Warning - AWB Manifest',
    description: 'AWB manifest file delayed by 15 minutes, approaching SLA breach threshold',
    source: 'Cargo System',
    department: 'Cargo',
    priority: 'medium',
    timestamp: '2024-12-19 08:45:00',
    status: 'acknowledged',
    assignedTo: 'Mike Chen',
    escalationLevel: 0,
    slaDeadline: '2024-12-19 09:30:00',
    comments: 1
  },
  {
    id: 3,
    type: 'duplicate',
    title: 'Duplicate File Detected',
    description: 'Loyalty accrual file LOYALTY_ACCRUAL_20241219.csv received twice',
    source: 'Partner API',
    department: 'Loyalty',
    priority: 'low',
    timestamp: '2024-12-19 08:30:00',
    status: 'resolved',
    assignedTo: 'Emma Watson',
    escalationLevel: 0,
    slaDeadline: '2024-12-19 12:00:00',
    comments: 0
  },
  {
    id: 4,
    type: 'delayed',
    title: 'Crew Roster File Delayed',
    description: 'CREW_ROSTER.json is 30 minutes late from OPS Planning system',
    source: 'OPS Planning',
    department: 'Operations',
    priority: 'high',
    timestamp: '2024-12-19 07:30:00',
    status: 'in_progress',
    assignedTo: 'David Rodriguez',
    escalationLevel: 1,
    slaDeadline: '2024-12-19 08:15:00',
    comments: 3
  },
  {
    id: 5,
    type: 'corrupt',
    title: 'File Corruption Detected',
    description: 'Sales report file failed checksum validation - potential data corruption',
    source: 'Agency Portal',
    department: 'Commercial',
    priority: 'high',
    timestamp: '2024-12-19 06:45:00',
    status: 'escalated',
    assignedTo: 'Admin Team',
    escalationLevel: 2,
    slaDeadline: '2024-12-19 08:00:00',
    comments: 5
  },
  {
    id: 6,
    type: 'missing',
    title: 'Engine Health Report Missing',
    description: 'Daily engine health monitoring report not received from maintenance system',
    source: 'Maintenance System',
    department: 'Engineering',
    priority: 'medium',
    timestamp: '2024-12-19 06:00:00',
    status: 'open',
    assignedTo: 'Engineering Team',
    escalationLevel: 0,
    slaDeadline: '2024-12-19 10:00:00',
    comments: 1
  }
];

const Alerts = () => {
  const { user } = useAuth();
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [comment, setComment] = useState('');

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
      case 'missing':
        return <AlertTriangle className="h-4 w-4" />;
      case 'warning':
      case 'delayed':
        return <Clock className="h-4 w-4" />;
      case 'duplicate':
      case 'corrupt':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getAlertBadge = (type: string) => {
    const badges = {
      error: <Badge className="bg-destructive/10 text-destructive border-destructive/20">Error</Badge>,
      missing: <Badge className="bg-destructive/10 text-destructive border-destructive/20">Missing</Badge>,
      warning: <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>,
      delayed: <Badge className="bg-warning/10 text-warning border-warning/20">Delayed</Badge>,
      duplicate: <Badge className="bg-primary/10 text-primary border-primary/20">Duplicate</Badge>,
      corrupt: <Badge className="bg-destructive/10 text-destructive border-destructive/20">Corrupt</Badge>
    };
    return badges[type as keyof typeof badges] || <Badge variant="outline">{type}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      open: <Badge className="bg-warning/10 text-warning border-warning/20">Open</Badge>,
      acknowledged: <Badge className="bg-primary/10 text-primary border-primary/20">Acknowledged</Badge>,
      in_progress: <Badge className="bg-primary/10  text-primary border-primary/20">In Progress</Badge>,
      resolved: <Badge className="bg-success/10 text-success border-success/20">Resolved</Badge>,
      escalated: <Badge className="bg-destructive/10 text-destructive border-destructive/20">Escalated</Badge>
    };
    return badges[status as keyof typeof badges] || <Badge variant="outline">{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const badges = {
      high: <Badge className="bg-destructive/10 text-destructive border-destructive/20">High</Badge>,
      medium: <Badge className="bg-warning/10 text-warning border-warning/20">Medium</Badge>,
      low: <Badge className="bg-success/10 text-success border-success/20">Low</Badge>
    };
    return badges[priority as keyof typeof badges] || <Badge variant="outline">{priority}</Badge>;
  };

  const filteredAlerts = sampleAlerts.filter(alert => {
    // Department filter
    if (user?.role !== 'admin' && alert.department !== user?.currentDepartment) {
      return false;
    }
    
    // Type filter
    if (filterType !== 'all' && alert.type !== filterType) {
      return false;
    }
    
    // Status filter
    if (filterStatus !== 'all' && alert.status !== filterStatus) {
      return false;
    }
    
    // Search filter
    if (searchQuery && !alert.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !alert.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleAction = (action: string, alertId: number) => {
    console.log(`Action: ${action} on alert ${alertId}`);
    // Here you would typically make an API call
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Alerts & Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Real-time monitoring and alert management for file exchanges
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{filteredAlerts.length} Active Alerts</Badge>
        </div>
      </div>

      {/* Filters */}
      <Card className="card-swiss">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filter Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-swiss pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="type-filter">Alert Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="input-swiss">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="missing">Missing</SelectItem>
                  <SelectItem value="duplicate">Duplicate</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="corrupt">Corrupt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="input-swiss">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="button-swiss">
                <Filter className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts List */}
        <Card className="card-swiss">
          <CardHeader>
            <CardTitle>Active Alerts ({filteredAlerts.length})</CardTitle>
            <CardDescription>Click on an alert to view details and take actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert.id)}
                  className={`border border-border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedAlert === alert.id ? 'bg-primary/5 border-primary/20' : 'hover:bg-accent/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getAlertIcon(alert.type)}
                      <span className="font-medium text-sm">{alert.title}</span>
                    </div>
                    {getPriorityBadge(alert.priority)}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getAlertBadge(alert.type)}
                      {getStatusBadge(alert.status)}
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      {alert.comments > 0 && (
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{alert.comments}</span>
                        </div>
                      )}
                      <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alert Details */}
        <Card className="card-swiss">
          <CardHeader>
            <CardTitle>Alert Details</CardTitle>
            <CardDescription>
              {selectedAlert ? 'View details and take actions on the selected alert' : 'Select an alert to view details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedAlert ? (
              (() => {
                const alert = filteredAlerts.find(a => a.id === selectedAlert);
                if (!alert) return <p>Alert not found</p>;
                
                return (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-heading font-semibold">{alert.title}</h3>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <Label>Source System</Label>
                        <p className="font-medium">{alert.source}</p>
                      </div>
                      <div>
                        <Label>Department</Label>
                        <p className="font-medium">{alert.department}</p>
                      </div>
                      <div>
                        <Label>Assigned To</Label>
                        <p className="font-medium">{alert.assignedTo}</p>
                      </div>
                      <div>
                        <Label>SLA Deadline</Label>
                        <p className="font-medium">{new Date(alert.slaDeadline).toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {getAlertBadge(alert.type)}
                      {getStatusBadge(alert.status)}
                      {getPriorityBadge(alert.priority)}
                      {alert.escalationLevel > 0 && (
                        <Badge variant="outline">Escalation Level {alert.escalationLevel}</Badge>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label>Add Comment</Label>
                      <Textarea
                        placeholder="Add your comment or notes..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="input-swiss"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        className="button-swiss"
                        onClick={() => handleAction('acknowledge', alert.id)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Acknowledge
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="button-swiss"
                        onClick={() => handleAction('assign', alert.id)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Assign
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="button-swiss"
                        onClick={() => handleAction('comment', alert.id)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Comment
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="button-swiss"
                        onClick={() => handleAction('resolve', alert.id)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Resolve
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Notification Channels</Label>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="button-swiss">
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                        <Button size="sm" variant="outline" className="button-swiss">
                          <Send className="h-4 w-4 mr-2" />
                          Teams
                        </Button>
                        <Button size="sm" variant="outline" className="button-swiss">
                          <Slack className="h-4 w-4 mr-2" />
                          Slack
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select an alert from the list to view details and take actions</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Alerts;