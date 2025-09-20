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
  // Finance Department Alerts
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
    type: 'missing',
    title: 'Interline Billing File Missing',
    description: 'IDEC billing file from partner airline not received within SLA window',
    source: 'Interline Portal',
    department: 'Finance',
    priority: 'high',
    timestamp: '2024-12-19 08:30:00',
    status: 'escalated',
    assignedTo: 'Finance Team',
    escalationLevel: 2,
    slaDeadline: '2024-12-19 09:00:00',
    comments: 4
  },
  {
    id: 3,
    type: 'delayed',
    title: 'Settlement File Delayed',
    description: 'Payment gateway settlement file delayed by 45 minutes',
    source: 'Payment Gateway',
    department: 'Finance',
    priority: 'medium',
    timestamp: '2024-12-19 07:45:00',
    status: 'in_progress',
    assignedTo: 'Payment Team',
    escalationLevel: 0,
    slaDeadline: '2024-12-19 10:00:00',
    comments: 1
  },
  
  // Loyalty Department Alerts
  {
    id: 4,
    type: 'duplicate',
    title: 'Duplicate Accrual File Detected',
    description: 'Loyalty accrual file LOYALTY_ACCRUAL_20241219.csv received twice from partner',
    source: 'Partner API',
    department: 'Loyalty',
    priority: 'medium',
    timestamp: '2024-12-19 08:30:00',
    status: 'acknowledged',
    assignedTo: 'Emma Watson',
    escalationLevel: 0,
    slaDeadline: '2024-12-19 12:00:00',
    comments: 1
  },
  {
    id: 5,
    type: 'error',
    title: 'Tier Evaluation File Failed',
    description: 'Monthly tier evaluation processing failed due to data validation errors',
    source: 'Loyalty Engine',
    department: 'Loyalty',
    priority: 'high',
    timestamp: '2024-12-19 06:15:00',
    status: 'open',
    assignedTo: 'Loyalty Team',
    escalationLevel: 1,
    slaDeadline: '2024-12-19 08:00:00',
    comments: 3
  },
  {
    id: 6,
    type: 'warning',
    title: 'Partner Settlement Reconciliation Mismatch',
    description: 'Hotel partner settlement file shows transaction count mismatch',
    source: 'Hotel Partner',
    department: 'Loyalty',
    priority: 'medium',
    timestamp: '2024-12-19 05:30:00',
    status: 'in_progress',
    assignedTo: 'Settlement Team',
    escalationLevel: 0,
    slaDeadline: '2024-12-19 11:00:00',
    comments: 2
  },

  // Operations Department Alerts
  {
    id: 7,
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
    id: 8,
    type: 'missing',
    title: 'Flight Movement Message Missing',
    description: 'ASM (Aircraft Schedule Message) not received for flight AI101',
    source: 'Flight Ops',
    department: 'Operations',
    priority: 'high',
    timestamp: '2024-12-19 06:45:00',
    status: 'escalated',
    assignedTo: 'Flight Dispatch',
    escalationLevel: 2,
    slaDeadline: '2024-12-19 07:30:00',
    comments: 5
  },
  {
    id: 9,
    type: 'corrupt',
    title: 'Weather Data File Corrupted',
    description: 'Weather forecast file failed integrity check - corrupted during transmission',
    source: 'Weather Service',
    department: 'Operations',
    priority: 'medium',
    timestamp: '2024-12-19 05:15:00',
    status: 'acknowledged',
    assignedTo: 'Weather Team',
    escalationLevel: 0,
    slaDeadline: '2024-12-19 08:00:00',
    comments: 1
  },

  // Cargo Department Alerts
  {
    id: 10,
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
    id: 11,
    type: 'error',
    title: 'ULD Tracking File Failed',
    description: 'Unit Load Device tracking file processing failed - invalid data format',
    source: 'ULD System',
    department: 'Cargo',
    priority: 'high',
    timestamp: '2024-12-19 07:00:00',
    status: 'open',
    assignedTo: 'ULD Team',
    escalationLevel: 1,
    slaDeadline: '2024-12-19 09:00:00',
    comments: 2
  },
  {
    id: 12,
    type: 'delayed',
    title: 'Security Screening Logs Delayed',
    description: 'Cargo security screening logs are 20 minutes overdue',
    source: 'Security System',
    department: 'Cargo',
    priority: 'high',
    timestamp: '2024-12-19 06:30:00',
    status: 'in_progress',
    assignedTo: 'Security Team',
    escalationLevel: 1,
    slaDeadline: '2024-12-19 07:15:00',
    comments: 3
  },

  // Commercial Department Alerts
  {
    id: 13,
    type: 'corrupt',
    title: 'GDS Sales File Corruption',
    description: 'Sales report file from Amadeus failed checksum validation - potential data corruption',
    source: 'Amadeus GDS',
    department: 'Commercial',
    priority: 'high',
    timestamp: '2024-12-19 06:45:00',
    status: 'escalated',
    assignedTo: 'Sales Analytics',
    escalationLevel: 2,
    slaDeadline: '2024-12-19 08:00:00',
    comments: 5
  },
  {
    id: 14,
    type: 'missing',
    title: 'ATPCO Fare File Missing',
    description: 'Daily fare update file from ATPCO not received',
    source: 'ATPCO',
    department: 'Commercial',
    priority: 'medium',
    timestamp: '2024-12-19 05:45:00',
    status: 'open',
    assignedTo: 'Pricing Team',
    escalationLevel: 0,
    slaDeadline: '2024-12-19 09:00:00',
    comments: 1
  },
  {
    id: 15,
    type: 'warning',
    title: 'Commission Settlement Discrepancy',
    description: 'Agency commission file shows calculation discrepancies',
    source: 'Commission System',
    department: 'Commercial',
    priority: 'medium',
    timestamp: '2024-12-19 04:30:00',
    status: 'acknowledged',
    assignedTo: 'Commission Team',
    escalationLevel: 0,
    slaDeadline: '2024-12-19 10:00:00',
    comments: 2
  },

  // Customer Experience Department Alerts
  {
    id: 16,
    type: 'delayed',
    title: 'NPS Survey Data Delayed',
    description: 'Weekly customer satisfaction survey data is 2 hours overdue',
    source: 'Survey Platform',
    department: 'Customer Experience',
    priority: 'low',
    timestamp: '2024-12-19 08:00:00',
    status: 'acknowledged',
    assignedTo: 'CX Analytics',
    escalationLevel: 0,
    slaDeadline: '2024-12-19 12:00:00',
    comments: 1
  },
  {
    id: 17,
    type: 'error',
    title: 'Complaint Log Processing Failed',
    description: 'Customer complaint data processing failed due to schema changes',
    source: 'CRM System',
    department: 'Customer Experience',
    priority: 'medium',
    timestamp: '2024-12-19 07:15:00',
    status: 'in_progress',
    assignedTo: 'CRM Team',
    escalationLevel: 0,
    slaDeadline: '2024-12-19 10:00:00',
    comments: 2
  },
  {
    id: 18,
    type: 'warning',
    title: 'Web Analytics Data Gap',
    description: 'Booking funnel analytics showing data gaps for 30-minute period',
    source: 'Analytics Platform',
    department: 'Customer Experience',
    priority: 'low',
    timestamp: '2024-12-19 06:00:00',
    status: 'open',
    assignedTo: 'Digital Team',
    escalationLevel: 0,
    slaDeadline: '2024-12-19 14:00:00',
    comments: 0
  },

  // Engineering Department Alerts
  {
    id: 19,
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
  },
  {
    id: 20,
    type: 'error',
    title: 'Parts Inventory Sync Failed',
    description: 'Aircraft parts inventory synchronization failed with MRO system',
    source: 'MRO System',
    department: 'Engineering',
    priority: 'high',
    timestamp: '2024-12-19 05:30:00',
    status: 'escalated',
    assignedTo: 'Inventory Team',
    escalationLevel: 1,
    slaDeadline: '2024-12-19 08:00:00',
    comments: 4
  },
  {
    id: 21,
    type: 'warning',
    title: 'Compliance Report Threshold Breach',
    description: 'Aircraft compliance report showing threshold breach warnings',
    source: 'Compliance System',
    department: 'Engineering',
    priority: 'medium',
    timestamp: '2024-12-19 04:45:00',
    status: 'acknowledged',
    assignedTo: 'Compliance Team',
    escalationLevel: 0,
    slaDeadline: '2024-12-19 11:00:00',
    comments: 1
  },

  // HR Department Alerts
  {
    id: 22,
    type: 'delayed',
    title: 'Crew Payroll File Delayed',
    description: 'Monthly crew payroll processing file is 1 hour overdue',
    source: 'Payroll System',
    department: 'HR',
    priority: 'medium',
    timestamp: '2024-12-19 09:00:00',
    status: 'in_progress',
    assignedTo: 'Payroll Team',
    escalationLevel: 0,
    slaDeadline: '2024-12-19 11:00:00',
    comments: 2
  },
  {
    id: 23,
    type: 'missing',
    title: 'Training Records Update Missing',
    description: 'Weekly training completion records not received from training system',
    source: 'Training Portal',
    department: 'HR',
    priority: 'low',
    timestamp: '2024-12-19 08:15:00',
    status: 'open',
    assignedTo: 'Training Team',
    escalationLevel: 0,
    slaDeadline: '2024-12-19 16:00:00',
    comments: 0
  },
  {
    id: 24,
    type: 'error',
    title: 'Medical Records Processing Failed',
    description: 'Crew medical records validation failed - invalid format detected',
    source: 'Medical System',
    department: 'HR',
    priority: 'high',
    timestamp: '2024-12-19 07:30:00',
    status: 'escalated',
    assignedTo: 'Medical Team',
    escalationLevel: 1,
    slaDeadline: '2024-12-19 09:30:00',
    comments: 3
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
    const alert = sampleAlerts.find(a => a.id === alertId);
    if (!alert) return;

    switch (action) {
      case 'acknowledge':
        // Update alert status to acknowledged
        alert.status = 'acknowledged';
        setComment('');
        // Show success toast
        console.log(`Alert ${alertId} acknowledged`);
        break;
      case 'assign':
        // Show assignment dialog (simplified for demo)
        const assignee = prompt('Assign to:');
        if (assignee) {
          alert.assignedTo = assignee;
          console.log(`Alert ${alertId} assigned to ${assignee}`);
        }
        break;
      case 'comment':
        // Add comment (simplified for demo)
        if (comment.trim()) {
          alert.comments += 1;
          setComment('');
          console.log(`Comment added to alert ${alertId}: ${comment}`);
        }
        break;
      case 'resolve':
        // Update alert status to resolved
        alert.status = 'resolved';
        setComment('');
        console.log(`Alert ${alertId} resolved`);
        break;
      case 'email':
        // Send email notification (demo)
        console.log(`Email notification sent for alert ${alertId}`);
        alert.comments += 1;
        break;
      case 'teams':
        // Send Teams notification (demo)
        console.log(`Teams notification sent for alert ${alertId}`);
        alert.comments += 1;
        break;
      case 'slack':
        // Send Slack notification (demo)
        console.log(`Slack notification sent for alert ${alertId}`);
        alert.comments += 1;
        break;
    }
    
    // Force re-render
    setSelectedAlert(selectedAlert);
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
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="button-swiss"
                            onClick={() => handleAction('email', alert.id)}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="button-swiss"
                            onClick={() => handleAction('teams', alert.id)}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Teams
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="button-swiss"
                            onClick={() => handleAction('slack', alert.id)}
                          >
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