import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Search, 
  Filter,
  CalendarIcon,
  Eye,
  FileCheck,
  FileX,
  RotateCcw
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const InwardFiles = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const sampleInwardFiles = [
    // Finance Department Files
    {
      id: 1,
      fileName: 'BSP_DAILY_20241219.csv',
      source: 'IATA BSP',
      department: 'Finance',
      status: 'received',
      expectedTime: '2024-12-19 08:00:00',
      receivedTime: '2024-12-19 08:05:00',
      slaDeadline: '2024-12-19 10:00:00',
      fileSize: '2.4MB',
      recordCount: 15420,
      validationStatus: 'passed',
      processingStatus: 'completed'
    },
    {
      id: 2,
      fileName: 'SALES_REPORT_GDS_20241219.xlsx',
      source: 'Amadeus GDS',
      department: 'Finance',
      status: 'processing',
      expectedTime: '2024-12-19 09:00:00',
      receivedTime: '2024-12-19 09:02:00',
      slaDeadline: '2024-12-19 11:00:00',
      fileSize: '8.7MB',
      recordCount: 45230,
      validationStatus: 'in_progress',
      processingStatus: 'processing'
    },
    {
      id: 3,
      fileName: 'INTERLINE_BILLING_20241219.xml',
      source: 'Partner Airlines',
      department: 'Finance',
      status: 'missing',
      expectedTime: '2024-12-19 07:30:00',
      receivedTime: null,
      slaDeadline: '2024-12-19 09:30:00',
      fileSize: null,
      recordCount: null,
      validationStatus: 'pending',
      processingStatus: 'pending'
    },
    
    // Loyalty Department Files
    {
      id: 4,
      fileName: 'LOYALTY_ACCRUAL_20241219.json',
      source: 'Hotel Partners',
      department: 'Loyalty',
      status: 'received',
      expectedTime: '2024-12-19 06:00:00',
      receivedTime: '2024-12-19 06:03:00',
      slaDeadline: '2024-12-19 08:00:00',
      fileSize: '1.2MB',
      recordCount: 8750,
      validationStatus: 'passed',
      processingStatus: 'completed'
    },
    {
      id: 5,
      fileName: 'PARTNER_SETTLEMENT_20241219.csv',
      source: 'Car Rental Partners',
      department: 'Loyalty',
      status: 'failed',
      expectedTime: '2024-12-19 08:30:00',
      receivedTime: '2024-12-19 08:45:00',
      slaDeadline: '2024-12-19 10:30:00',
      fileSize: '890KB',
      recordCount: 2340,
      validationStatus: 'failed',
      processingStatus: 'failed'
    },
    {
      id: 6,
      fileName: 'TIER_EVALUATION_20241219.xml',
      source: 'Loyalty Engine',
      department: 'Loyalty',
      status: 'delayed',
      expectedTime: '2024-12-19 05:00:00',
      receivedTime: null,
      slaDeadline: '2024-12-19 07:00:00',
      fileSize: null,
      recordCount: null,
      validationStatus: 'pending',
      processingStatus: 'pending'
    },

    // Operations Department Files
    {
      id: 7,
      fileName: 'CREW_ROSTER_20241219.json',
      source: 'Crew Planning',
      department: 'Operations',
      status: 'received',
      expectedTime: '2024-12-19 05:30:00',
      receivedTime: '2024-12-19 05:32:00',
      slaDeadline: '2024-12-19 07:30:00',
      fileSize: '456KB',
      recordCount: 1250,
      validationStatus: 'passed',
      processingStatus: 'completed'
    },
    {
      id: 8,
      fileName: 'FLIGHT_PLANS_20241219.xml',
      source: 'Flight Planning',
      department: 'Operations',
      status: 'processing',
      expectedTime: '2024-12-19 04:00:00',
      receivedTime: '2024-12-19 04:15:00',
      slaDeadline: '2024-12-19 06:00:00',
      fileSize: '3.2MB',
      recordCount: 156,
      validationStatus: 'passed',
      processingStatus: 'processing'
    },
    {
      id: 9,
      fileName: 'PNL_MESSAGES_20241219.txt',
      source: 'Airport Systems',
      department: 'Operations',
      status: 'failed',
      expectedTime: '2024-12-19 06:45:00',
      receivedTime: '2024-12-19 07:00:00',
      slaDeadline: '2024-12-19 08:45:00',
      fileSize: '234KB',
      recordCount: 89,
      validationStatus: 'failed',
      processingStatus: 'failed'
    },

    // Cargo Department Files
    {
      id: 10,
      fileName: 'AWB_DAILY_20241219.xml',
      source: 'Cargo Terminal',
      department: 'Cargo',
      status: 'received',
      expectedTime: '2024-12-19 07:00:00',
      receivedTime: '2024-12-19 07:05:00',
      slaDeadline: '2024-12-19 09:00:00',
      fileSize: '5.1MB',
      recordCount: 3420,
      validationStatus: 'passed',
      processingStatus: 'completed'
    },
    {
      id: 11,
      fileName: 'CARGO_MANIFEST_20241219.csv',
      source: 'Freight Forwarders',
      department: 'Cargo',
      status: 'processing',
      expectedTime: '2024-12-19 08:00:00',
      receivedTime: '2024-12-19 08:12:00',
      slaDeadline: '2024-12-19 10:00:00',
      fileSize: '1.8MB',
      recordCount: 567,
      validationStatus: 'in_progress',
      processingStatus: 'processing'
    },
    {
      id: 12,
      fileName: 'ULD_TRACKING_20241219.json',
      source: 'ULD Management',
      department: 'Cargo',
      status: 'missing',
      expectedTime: '2024-12-19 06:30:00',
      receivedTime: null,
      slaDeadline: '2024-12-19 08:30:00',
      fileSize: null,
      recordCount: null,
      validationStatus: 'pending',
      processingStatus: 'pending'
    },

    // Commercial Department Files
    {
      id: 13,
      fileName: 'AGENCY_SALES_20241219.xlsx',
      source: 'Travel Agencies',
      department: 'Commercial',
      status: 'received',
      expectedTime: '2024-12-19 09:30:00',
      receivedTime: '2024-12-19 09:35:00',
      slaDeadline: '2024-12-19 11:30:00',
      fileSize: '6.4MB',
      recordCount: 23450,
      validationStatus: 'passed',
      processingStatus: 'completed'
    },
    {
      id: 14,
      fileName: 'FARE_UPDATES_20241219.xml',
      source: 'ATPCO',
      department: 'Commercial',
      status: 'delayed',
      expectedTime: '2024-12-19 05:00:00',
      receivedTime: null,
      slaDeadline: '2024-12-19 07:00:00',
      fileSize: null,
      recordCount: null,
      validationStatus: 'pending',
      processingStatus: 'pending'
    },
    {
      id: 15,
      fileName: 'MARKET_REPORTS_20241219.pdf',
      source: 'Market Analytics',
      department: 'Commercial',
      status: 'failed',
      expectedTime: '2024-12-19 08:00:00',
      receivedTime: '2024-12-19 08:30:00',
      slaDeadline: '2024-12-19 10:00:00',
      fileSize: '2.1MB',
      recordCount: 1,
      validationStatus: 'failed',
      processingStatus: 'failed'
    },

    // Customer Experience Department Files
    {
      id: 16,
      fileName: 'NPS_SURVEY_20241219.csv',
      source: 'Survey Platform',
      department: 'Customer Experience',
      status: 'received',
      expectedTime: '2024-12-19 10:00:00',
      receivedTime: '2024-12-19 10:05:00',
      slaDeadline: '2024-12-19 12:00:00',
      fileSize: '345KB',
      recordCount: 1250,
      validationStatus: 'passed',
      processingStatus: 'completed'
    },
    {
      id: 17,
      fileName: 'COMPLAINT_LOGS_20241219.json',
      source: 'CRM System',
      department: 'Customer Experience',
      status: 'processing',
      expectedTime: '2024-12-19 09:15:00',
      receivedTime: '2024-12-19 09:20:00',
      slaDeadline: '2024-12-19 11:15:00',
      fileSize: '567KB',
      recordCount: 89,
      validationStatus: 'in_progress',
      processingStatus: 'processing'
    },

    // Engineering Department Files
    {
      id: 18,
      fileName: 'ENGINE_HEALTH_20241219.xml',
      source: 'Aircraft Monitoring',
      department: 'Engineering',
      status: 'received',
      expectedTime: '2024-12-19 06:00:00',
      receivedTime: '2024-12-19 06:08:00',
      slaDeadline: '2024-12-19 08:00:00',
      fileSize: '890KB',
      recordCount: 24,
      validationStatus: 'passed',
      processingStatus: 'completed'
    },
    {
      id: 19,
      fileName: 'PARTS_INVENTORY_20241219.csv',
      source: 'MRO System',
      department: 'Engineering',
      status: 'failed',
      expectedTime: '2024-12-19 07:00:00',
      receivedTime: '2024-12-19 07:30:00',
      slaDeadline: '2024-12-19 09:00:00',
      fileSize: '1.2MB',
      recordCount: 5670,
      validationStatus: 'failed',
      processingStatus: 'failed'
    },

    // HR Department Files
    {
      id: 20,
      fileName: 'PAYROLL_20241219.xlsx',
      source: 'Payroll System',
      department: 'HR',
      status: 'received',
      expectedTime: '2024-12-19 08:00:00',
      receivedTime: '2024-12-19 08:10:00',
      slaDeadline: '2024-12-19 10:00:00',
      fileSize: '3.4MB',
      recordCount: 2340,
      validationStatus: 'passed',
      processingStatus: 'completed'
    },
    {
      id: 21,
      fileName: 'TRAINING_RECORDS_20241219.json',
      source: 'Training Portal',
      department: 'HR',
      status: 'delayed',
      expectedTime: '2024-12-19 09:00:00',
      receivedTime: null,
      slaDeadline: '2024-12-19 11:00:00',
      fileSize: null,
      recordCount: null,
      validationStatus: 'pending',
      processingStatus: 'pending'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-primary" />;
      case 'missing':
      case 'delayed':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'failed':
        return <FileX className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      received: <Badge className="bg-success/10 text-success border-success/20">Received</Badge>,
      processing: <Badge className="bg-primary/10 text-primary border-primary/20">Processing</Badge>,
      missing: <Badge className="bg-warning/10 text-warning border-warning/20">Missing</Badge>,
      delayed: <Badge className="bg-warning/10 text-warning border-warning/20">Delayed</Badge>,
      failed: <Badge className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>
    };
    return badges[status as keyof typeof badges] || <Badge variant="outline">{status}</Badge>;
  };

  const getValidationBadge = (status: string) => {
    const badges = {
      passed: <Badge className="bg-success/10 text-success border-success/20">Passed</Badge>,
      failed: <Badge className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>,
      in_progress: <Badge className="bg-primary/10 text-primary border-primary/20">In Progress</Badge>,
      pending: <Badge className="bg-muted/20 text-muted-foreground border-muted/40">Pending</Badge>
    };
    return badges[status as keyof typeof badges] || <Badge variant="outline">{status}</Badge>;
  };

  const filteredFiles = sampleInwardFiles.filter(file => {
    // Department filter for non-admin users
    if (user?.role !== 'admin' && file.department !== user?.currentDepartment) {
      return false;
    }
    
    // Department filter for admin users
    if (departmentFilter !== 'all' && file.department !== departmentFilter) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== 'all' && file.status !== statusFilter) {
      return false;
    }
    
    // Search filter
    if (searchQuery && !file.fileName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !file.source.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Date range filter
    if (dateFrom && new Date(file.expectedTime) < dateFrom) {
      return false;
    }
    if (dateTo && new Date(file.expectedTime) > dateTo) {
      return false;
    }
    
    return true;
  });

  const handleAction = (action: string, fileId: number) => {
    const file = sampleInwardFiles.find(f => f.id === fileId);
    if (!file) return;

    switch (action) {
      case 'view':
        console.log(`Viewing file details for: ${file.fileName}`);
        // In a real app, this would open a detailed view
        alert(`Viewing details for:\n\nFile: ${file.fileName}\nSource: ${file.source}\nStatus: ${file.status}\nRecords: ${file.recordCount || 'N/A'}\nSize: ${file.fileSize || 'N/A'}`);
        break;
      case 'download':
        console.log(`Downloading file: ${file.fileName}`);
        // In a real app, this would trigger file download
        alert(`Download initiated for: ${file.fileName}`);
        break;
      case 'reprocess':
        console.log(`Reprocessing file: ${file.fileName}`);
        file.status = 'processing';
        file.processingStatus = 'processing';
        alert(`Reprocessing initiated for: ${file.fileName}`);
        break;
      case 'validate':
        console.log(`Validating file: ${file.fileName}`);
        file.validationStatus = 'in_progress';
        alert(`Validation started for: ${file.fileName}`);
        break;
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setDepartmentFilter('all');
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  // Calculate statistics
  const stats = {
    total: filteredFiles.length,
    received: filteredFiles.filter(f => f.status === 'received').length,
    processing: filteredFiles.filter(f => f.status === 'processing').length,
    missing: filteredFiles.filter(f => f.status === 'missing').length,
    failed: filteredFiles.filter(f => f.status === 'failed').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Inward Files</h1>
          <p className="text-muted-foreground mt-1">
            Monitor inbound file transfers and processing status
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{filteredFiles.length} Files</Badge>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="kpi-card">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-heading font-bold">{stats.total}</p>
              </div>
              <FileCheck className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="kpi-card">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Received</p>
                <p className="text-2xl font-heading font-bold">{stats.received}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="kpi-card">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Processing</p>
                <p className="text-2xl font-heading font-bold">{stats.processing}</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="kpi-card">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Missing</p>
                <p className="text-2xl font-heading font-bold">{stats.missing}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="kpi-card">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-heading font-bold">{stats.failed}</p>
              </div>
              <FileX className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-swiss">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filter Files</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-swiss pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="input-swiss">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="missing">Missing</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {user?.role === 'admin' && (
              <div>
                <Label htmlFor="department-filter">Department</Label>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="input-swiss">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Loyalty">Loyalty</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Cargo">Cargo</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Customer Experience">Customer Experience</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label>Date From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "input-swiss justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Date To</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "input-swiss justify-start text-left font-normal",
                      !dateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="button-swiss" onClick={resetFilters}>
                <Filter className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Files Table */}
      <Card className="card-swiss">
        <CardHeader>
          <CardTitle>Inward File Tracking</CardTitle>
          <CardDescription>Current status of inbound file transfers and processing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="table-swiss">
            <table className="w-full">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Expected Time</th>
                  <th>Received Time</th>
                  <th>Validation</th>
                  <th>Records</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => (
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
                    <td>{file.source}</td>
                    <td>{getStatusBadge(file.status)}</td>
                    <td>
                      <div className="text-sm">
                        {new Date(file.expectedTime).toLocaleString()}
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        {file.receivedTime ? new Date(file.receivedTime).toLocaleString() : 'Not received'}
                      </div>
                    </td>
                    <td>{getValidationBadge(file.validationStatus)}</td>
                    <td className="text-sm">{file.recordCount?.toLocaleString() || 'N/A'}</td>
                    <td className="text-sm">{file.fileSize || 'N/A'}</td>
                    <td>
                      <div className="flex items-center space-x-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="button-swiss p-2"
                          onClick={() => handleAction('view', file.id)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        {file.status === 'received' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="button-swiss p-2"
                            onClick={() => handleAction('download', file.id)}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        )}
                        {file.status === 'failed' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="button-swiss p-2"
                            onClick={() => handleAction('reprocess', file.id)}
                          >
                            <RotateCcw className="h-3 w-3" />
                          </Button>
                        )}
                        {file.validationStatus === 'failed' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="button-swiss p-2"
                            onClick={() => handleAction('validate', file.id)}
                          >
                            <FileCheck className="h-3 w-3" />
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

export default InwardFiles;