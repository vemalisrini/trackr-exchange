import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Search, Filter, Eye, Calendar } from 'lucide-react';

const AuditLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAction, setFilterAction] = useState('all');

  const auditLogs = [
    {
      id: 1,
      fileName: 'BSP_DAILY_20241219.csv',
      source: 'IATA BSP',
      status: 'processed',
      timestamp: '2024-12-19 09:15:32',
      action: 'File Received',
      user: 'System',
      department: 'Finance',
      details: 'File successfully received and processed. 1,247 records imported.',
      fileSize: '2.4MB',
      processingTime: '45s'
    },
    {
      id: 2,
      fileName: 'AWB_MANIFEST_20241219.xml',
      source: 'Cargo System',
      status: 'failed',
      timestamp: '2024-12-19 08:45:18',
      action: 'Validation Failed',
      user: 'System',
      department: 'Cargo',
      details: 'Schema validation failed. 5 errors found in AWB number fields.',
      fileSize: '5.1MB',
      processingTime: '12s'
    },
    {
      id: 3,
      fileName: 'LOYALTY_ACCRUAL_20241219.csv',
      source: 'Partner API',
      status: 'processed',
      timestamp: '2024-12-19 10:30:45',
      action: 'Data Quality Check',
      user: 'Emma Watson',
      department: 'Loyalty',
      details: 'Manual review completed. Data drift alert acknowledged.',
      fileSize: '3.2MB',
      processingTime: '2m 15s'
    },
    {
      id: 4,
      fileName: 'CREW_ROSTER_20241219.json',
      source: 'OPS Planning',
      status: 'processed',
      timestamp: '2024-12-19 07:30:12',
      action: 'File Processed',
      user: 'System',
      department: 'Operations',
      details: 'File processed successfully. Crew assignments updated.',
      fileSize: '876KB',
      processingTime: '23s'
    },
    {
      id: 5,
      fileName: 'FINANCE_EXPORT_20241219.xlsx',
      source: 'Finance System',
      status: 'sent',
      timestamp: '2024-12-19 08:05:28',
      action: 'File Sent',
      user: 'Sarah Johnson',
      department: 'Finance',
      details: 'Financial report exported and sent to external auditor.',
      fileSize: '2.4MB',
      processingTime: '8s'
    },
    {
      id: 6,
      fileName: 'SALES_REPORT_20241219.json',
      source: 'Agency Portal',
      status: 'failed',
      timestamp: '2024-12-19 06:45:33',
      action: 'Hash Check Failed',
      user: 'System',
      department: 'Commercial',
      details: 'File hash verification failed. Potential data corruption detected.',
      fileSize: '4.7MB',
      processingTime: '5s'
    },
    {
      id: 7,
      fileName: 'ENGINE_HEALTH_20241219.xml',
      source: 'Maintenance System',
      status: 'processed',
      timestamp: '2024-12-19 06:00:15',
      action: 'File Received',
      user: 'System',
      department: 'Engineering',
      details: 'Engine health monitoring data received and archived.',
      fileSize: '1.8MB',
      processingTime: '34s'
    },
    {
      id: 8,
      fileName: 'PAYROLL_EXPORT_20241219.csv',
      source: 'HR System',
      status: 'sent',
      timestamp: '2024-12-19 05:30:42',
      action: 'Scheduled Export',
      user: 'System',
      department: 'HR/Admin',
      details: 'Monthly payroll data exported to external payroll processor.',
      fileSize: '956KB',
      processingTime: '18s'
    },
    {
      id: 9,
      fileName: 'CUSTOMER_FEEDBACK_20241219.json',
      source: 'CX Platform',
      status: 'processed',
      timestamp: '2024-12-19 11:45:28',
      action: 'Data Ingestion',
      user: 'System',
      department: 'Customer Experience',
      details: 'Customer feedback data processed and indexed for analysis.',
      fileSize: '3.5MB',
      processingTime: '1m 12s'
    },
    {
      id: 10,
      fileName: 'TRAINING_RECORDS_20241219.xlsx',
      source: 'Learning Management',
      status: 'processed',
      timestamp: '2024-12-19 04:15:55',
      action: 'Compliance Check',
      user: 'System',
      department: 'HR/Admin',
      details: 'Training compliance records verified and updated.',
      fileSize: '1.2MB',
      processingTime: '28s'
    }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      processed: <Badge className="bg-success/10 text-success border-success/20">Processed</Badge>,
      failed: <Badge className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>,
      sent: <Badge className="bg-primary/10 text-primary border-primary/20">Sent</Badge>,
      pending: <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>
    };
    return badges[status as keyof typeof badges] || <Badge variant="outline">{status}</Badge>;
  };

  const getActionBadge = (action: string) => {
    const actionColors = {
      'File Received': 'bg-primary/10 text-primary border-primary/20',
      'File Processed': 'bg-success/10 text-success border-success/20',
      'File Sent': 'bg-primary/10 text-primary border-primary/20',
      'Validation Failed': 'bg-destructive/10 text-destructive border-destructive/20',
      'Hash Check Failed': 'bg-destructive/10 text-destructive border-destructive/20',
      'Data Quality Check': 'bg-warning/10 text-warning border-warning/20',
      'Scheduled Export': 'bg-primary/10 text-primary border-primary/20',
      'Data Ingestion': 'bg-success/10 text-success border-success/20',
      'Compliance Check': 'bg-success/10 text-success border-success/20'
    };
    
    const colorClass = actionColors[action as keyof typeof actionColors] || 'bg-muted/50 text-muted-foreground border-muted';
    return <Badge className={colorClass}>{action}</Badge>;
  };

  const filteredLogs = auditLogs.filter(log => {
    // Search filter
    if (searchQuery && !log.fileName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !log.source.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !log.action.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (filterStatus !== 'all' && log.status !== filterStatus) {
      return false;
    }
    
    // Action filter
    if (filterAction !== 'all' && log.action !== filterAction) {
      return false;
    }
    
    return true;
  });

  const handleExport = (format: string) => {
    console.log(`Exporting audit logs as ${format}`);
    // Here you would typically trigger a download
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">
            Immutable record of all file exchange activities and system events
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{filteredLogs.length} Log Entries</Badge>
        </div>
      </div>

      {/* Filters */}
      <Card className="card-swiss">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filter & Export</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="search">Search Logs</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search files, sources, actions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-swiss pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="input-swiss">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="action-filter">Action Type</Label>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger className="input-swiss">
                  <SelectValue placeholder="All Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="File Received">File Received</SelectItem>
                  <SelectItem value="File Processed">File Processed</SelectItem>
                  <SelectItem value="File Sent">File Sent</SelectItem>
                  <SelectItem value="Validation Failed">Validation Failed</SelectItem>
                  <SelectItem value="Data Quality Check">Data Quality Check</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="button-swiss">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Export Options:</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleExport('csv')}
              className="button-swiss"
            >
              <Download className="h-4 w-4 mr-2" />
              CSV
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleExport('xlsx')}
              className="button-swiss"
            >
              <Download className="h-4 w-4 mr-2" />
              Excel
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleExport('pdf')}
              className="button-swiss"
            >
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card className="card-swiss">
        <CardHeader>
          <CardTitle>Audit Trail</CardTitle>
          <CardDescription>
            Chronological record of all file exchange activities ({filteredLogs.length} entries)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="table-swiss">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>File Name</th>
                  <th>Source</th>
                  <th>Action</th>
                  <th>Status</th>
                  <th>User</th>
                  <th>Processing Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="text-sm font-mono">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td>
                      <div>
                        <div className="font-medium">{log.fileName}</div>
                        <div className="text-xs text-muted-foreground">{log.fileSize}</div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="text-sm">{log.source}</div>
                        <div className="text-xs text-muted-foreground">{log.department}</div>
                      </div>
                    </td>
                    <td>{getActionBadge(log.action)}</td>
                    <td>{getStatusBadge(log.status)}</td>
                    <td className="text-sm">{log.user}</td>
                    <td className="text-sm font-mono">{log.processingTime}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="outline"
                        className="button-swiss p-2"
                        title="View Details"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Log Entry Details */}
      <Card className="card-swiss">
        <CardHeader>
          <CardTitle>Recent Activity Details</CardTitle>
          <CardDescription>Detailed information about recent log entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.slice(0, 3).map((log) => (
              <div key={log.id} className="border border-border rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{log.fileName}</span>
                    {getActionBadge(log.action)}
                    {getStatusBadge(log.status)}
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{log.details}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogs;