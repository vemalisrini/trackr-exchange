import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Database,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Settings,
  Globe,
  Server
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const sampleSources = [
  {
    id: 1,
    name: 'IATA BSP Daily Reports',
    type: 'SFTP',
    host: 'bsp.iata.org',
    port: 22,
    path: '/reports/daily',
    status: 'active',
    lastSync: '2024-12-19 09:00:00',
    slaThreshold: 30,
    fileNamePattern: 'BSP_DAILY_*.csv',
    matchRule: 'partial',
    schedule: '09:00',
    timezone: 'UTC',
    direction: 'inward',
    department: 'Finance',
    enabled: true,
    successRate: 98.5,
    filesProcessed: 1247
  },
  {
    id: 2,
    name: 'Cargo AWB Manifests',
    type: 'API',
    host: 'api.cargo.system',
    port: 443,
    path: '/manifests',
    status: 'active',
    lastSync: '2024-12-19 08:30:00',
    slaThreshold: 15,
    fileNamePattern: 'AWB_MANIFEST_*.xml',
    matchRule: 'exact',
    schedule: '08:30',
    timezone: 'UTC',
    direction: 'inward',
    department: 'Cargo',
    enabled: true,
    successRate: 97.8,
    filesProcessed: 2156
  },
  {
    id: 3,
    name: 'Operations Crew Roster',
    type: 'Database',
    host: 'ops-db.internal',
    port: 5432,
    path: '/crew_data',
    status: 'failed',
    lastSync: '2024-12-19 06:45:00',
    slaThreshold: 45,
    fileNamePattern: 'CREW_ROSTER_*.json',
    matchRule: 'partial',
    schedule: '07:00',
    timezone: 'UTC',
    direction: 'inward',
    department: 'Operations',
    enabled: true,
    successRate: 94.2,
    filesProcessed: 892
  },
  {
    id: 4,
    name: 'Loyalty Partner API',
    type: 'REST API',
    host: 'partners.loyalty.com',
    port: 443,
    path: '/api/v2/accrual',
    status: 'pending',
    lastSync: '2024-12-19 10:15:00',
    slaThreshold: 60,
    fileNamePattern: 'LOYALTY_*.csv',
    matchRule: 'partial',
    schedule: '10:30',
    timezone: 'UTC',
    direction: 'inward',
    department: 'Loyalty',
    enabled: true,
    successRate: 99.1,
    filesProcessed: 743
  },
  {
    id: 5,
    name: 'Financial Reporting Export',
    type: 'SFTP',
    host: 'reports.finance.internal',
    port: 22,
    path: '/exports',
    status: 'active',
    lastSync: '2024-12-19 08:00:00',
    slaThreshold: 120,
    fileNamePattern: 'FINANCE_EXPORT_*.xlsx',
    matchRule: 'exact',
    schedule: '08:00',
    timezone: 'UTC',
    direction: 'outward',
    department: 'Finance',
    enabled: true,
    successRate: 96.3,
    filesProcessed: 456
  },
  {
    id: 6,
    name: 'Commercial Sales Data',
    type: 'FTP',
    host: 'sales.commercial.system',
    port: 21,
    path: '/daily_sales',
    status: 'active',
    lastSync: '2024-12-19 09:30:00',
    slaThreshold: 90,
    fileNamePattern: 'SALES_*.json',
    matchRule: 'partial',
    schedule: '09:00',
    timezone: 'UTC',
    direction: 'inward',
    department: 'Commercial',
    enabled: false,
    successRate: 92.7,
    filesProcessed: 1345
  }
];

const FileSources = () => {
  const { user } = useAuth();
  const [selectedSource, setSelectedSource] = useState<number | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSource, setNewSource] = useState({
    name: '',
    type: 'SFTP',
    host: '',
    port: 22,
    path: '',
    slaThreshold: 30,
    fileNamePattern: '',
    matchRule: 'partial',
    schedule: '09:00',
    timezone: 'UTC',
    direction: 'inward',
    department: user?.currentDepartment || 'Finance',
    enabled: true
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      active: <Badge className="bg-success/10 text-success border-success/20">Active</Badge>,
      failed: <Badge className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>,
      pending: <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>,
      disabled: <Badge className="bg-muted/50 text-muted-foreground border-muted">Disabled</Badge>
    };
    return badges[status as keyof typeof badges] || <Badge variant="outline">{status}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'SFTP':
      case 'FTP':
        return <Server className="h-4 w-4" />;
      case 'API':
      case 'REST API':
        return <Globe className="h-4 w-4" />;
      case 'Database':
        return <Database className="h-4 w-4" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };

  const filteredSources = sampleSources.filter(source => 
    user?.role === 'admin' || source.department === user?.currentDepartment
  );

  const handleAddSource = () => {
    console.log('Adding new source:', newSource);
    setIsAddDialogOpen(false);
    // Reset form
    setNewSource({
      name: '',
      type: 'SFTP',
      host: '',
      port: 22,
      path: '',
      slaThreshold: 30,
      fileNamePattern: '',
      matchRule: 'partial',
      schedule: '09:00',
      timezone: 'UTC',
      direction: 'inward',
      department: user?.currentDepartment || 'Finance',
      enabled: true
    });
  };

  const handleAction = (action: string, sourceId: number) => {
    console.log(`Action: ${action} on source ${sourceId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">File Sources</h1>
          <p className="text-muted-foreground mt-1">
            Configure and monitor file exchange connections
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="button-swiss">
                <Plus className="h-4 w-4 mr-2" />
                Add Source
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New File Source</DialogTitle>
                <DialogDescription>
                  Configure a new file exchange connection with all necessary parameters.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Connection Name</Label>
                    <Input
                      id="name"
                      value={newSource.name}
                      onChange={(e) => setNewSource({...newSource, name: e.target.value})}
                      placeholder="Enter connection name"
                      className="input-swiss"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Source Type</Label>
                    <Select value={newSource.type} onValueChange={(value) => setNewSource({...newSource, type: value})}>
                      <SelectTrigger className="input-swiss">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SFTP">SFTP</SelectItem>
                        <SelectItem value="FTP">FTP</SelectItem>
                        <SelectItem value="API">REST API</SelectItem>
                        <SelectItem value="Database">Database</SelectItem>
                        <SelectItem value="File Share">File Share</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="host">Host/URL</Label>
                    <Input
                      id="host"
                      value={newSource.host}
                      onChange={(e) => setNewSource({...newSource, host: e.target.value})}
                      placeholder="hostname or IP address"
                      className="input-swiss"
                    />
                  </div>
                  <div>
                    <Label htmlFor="port">Port</Label>
                    <Input
                      id="port"
                      type="number"
                      value={newSource.port}
                      onChange={(e) => setNewSource({...newSource, port: parseInt(e.target.value)})}
                      className="input-swiss"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="path">Path</Label>
                  <Input
                    id="path"
                    value={newSource.path}
                    onChange={(e) => setNewSource({...newSource, path: e.target.value})}
                    placeholder="/path/to/files"
                    className="input-swiss"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="filePattern">File Name Pattern</Label>
                    <Input
                      id="filePattern"
                      value={newSource.fileNamePattern}
                      onChange={(e) => setNewSource({...newSource, fileNamePattern: e.target.value})}
                      placeholder="FILE_*.csv"
                      className="input-swiss"
                    />
                  </div>
                  <div>
                    <Label htmlFor="matchRule">Match Rule</Label>
                    <Select value={newSource.matchRule} onValueChange={(value) => setNewSource({...newSource, matchRule: value})}>
                      <SelectTrigger className="input-swiss">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exact">Exact Match</SelectItem>
                        <SelectItem value="partial">Partial Match</SelectItem>
                        <SelectItem value="regex">Regular Expression</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="schedule">Schedule (HH:MM)</Label>
                    <Input
                      id="schedule"
                      type="time"
                      value={newSource.schedule}
                      onChange={(e) => setNewSource({...newSource, schedule: e.target.value})}
                      className="input-swiss"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={newSource.timezone} onValueChange={(value) => setNewSource({...newSource, timezone: value})}>
                      <SelectTrigger className="input-swiss">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">EST</SelectItem>
                        <SelectItem value="PST">PST</SelectItem>
                        <SelectItem value="GMT">GMT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="slaThreshold">SLA Threshold (minutes)</Label>
                    <Input
                      id="slaThreshold"
                      type="number"
                      value={newSource.slaThreshold}
                      onChange={(e) => setNewSource({...newSource, slaThreshold: parseInt(e.target.value)})}
                      className="input-swiss"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="direction">Direction</Label>
                    <Select value={newSource.direction} onValueChange={(value) => setNewSource({...newSource, direction: value})}>
                      <SelectTrigger className="input-swiss">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inward">Inward</SelectItem>
                        <SelectItem value="outward">Outward</SelectItem>
                        <SelectItem value="bidirectional">Bidirectional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select value={newSource.department} onValueChange={(value) => setNewSource({...newSource, department: value})}>
                      <SelectTrigger className="input-swiss">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Cargo">Cargo</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Loyalty">Loyalty</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enabled"
                    checked={newSource.enabled}
                    onCheckedChange={(checked) => setNewSource({...newSource, enabled: checked})}
                  />
                  <Label htmlFor="enabled">Enable this source</Label>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="button-swiss">
                  Cancel
                </Button>
                <Button onClick={handleAddSource} className="button-swiss">
                  Add Source
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Sources Table */}
      <Card className="card-swiss">
        <CardHeader>
          <CardTitle>Configured Sources ({filteredSources.length})</CardTitle>
          <CardDescription>File exchange connections and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="table-swiss">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Connection</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Last Sync</th>
                  <th>Success Rate</th>
                  <th>SLA</th>
                  <th>Direction</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSources.map((source) => (
                  <tr key={source.id} className={selectedSource === source.id ? 'bg-primary/5' : ''}>
                    <td>
                      <div>
                        <div className="font-medium">{source.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {source.host}:{source.port}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(source.type)}
                        <span className="text-sm">{source.type}</span>
                      </div>
                    </td>
                    <td>{getStatusBadge(source.status)}</td>
                    <td>
                      <div className="text-sm">
                        {new Date(source.lastSync).toLocaleString()}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm font-medium">{source.successRate}%</div>
                        <div className="text-xs text-muted-foreground">
                          ({source.filesProcessed.toLocaleString()} files)
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span className="text-sm">{source.slaThreshold}m</span>
                      </div>
                    </td>
                    <td>
                      <Badge variant="outline" className="capitalize">
                        {source.direction}
                      </Badge>
                    </td>
                    <td>
                      <div className="flex items-center space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedSource(source.id)}
                          className="button-swiss p-2"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction('edit', source.id)}
                          className="button-swiss p-2"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction(source.enabled ? 'disable' : 'enable', source.id)}
                          className="button-swiss p-2"
                        >
                          {source.enabled ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction('test', source.id)}
                          className="button-swiss p-2"
                        >
                          <CheckCircle2 className="h-3 w-3" />
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

      {/* Source Details */}
      {selectedSource && (
        <Card className="card-swiss">
          <CardHeader>
            <CardTitle>Source Details</CardTitle>
            <CardDescription>Detailed information and configuration for the selected source</CardDescription>
          </CardHeader>
          <CardContent>
            {(() => {
              const source = filteredSources.find(s => s.id === selectedSource);
              if (!source) return <p>Source not found</p>;
              
              return (
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="configuration">Configuration</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Connection Name</Label>
                          <p className="font-medium">{source.name}</p>
                        </div>
                        <div>
                          <Label>Department</Label>
                          <p className="font-medium">{source.department}</p>
                        </div>
                        <div>
                          <Label>Direction</Label>
                          <Badge variant="outline" className="capitalize">{source.direction}</Badge>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label>Status</Label>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(source.status)}
                            {source.enabled ? (
                              <CheckCircle2 className="h-4 w-4 text-success" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-warning" />
                            )}
                          </div>
                        </div>
                        <div>
                          <Label>Success Rate</Label>
                          <p className="font-medium">{source.successRate}%</p>
                        </div>
                        <div>
                          <Label>Files Processed</Label>
                          <p className="font-medium">{source.filesProcessed.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="configuration" className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Source Type</Label>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(source.type)}
                            <span className="font-medium">{source.type}</span>
                          </div>
                        </div>
                        <div>
                          <Label>Host</Label>
                          <p className="font-medium">{source.host}</p>
                        </div>
                        <div>
                          <Label>Port</Label>
                          <p className="font-medium">{source.port}</p>
                        </div>
                        <div>
                          <Label>Path</Label>
                          <p className="font-medium">{source.path}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label>File Name Pattern</Label>
                          <p className="font-medium">{source.fileNamePattern}</p>
                        </div>
                        <div>
                          <Label>Match Rule</Label>
                          <Badge variant="outline" className="capitalize">{source.matchRule}</Badge>
                        </div>
                        <div>
                          <Label>SLA Threshold</Label>
                          <p className="font-medium">{source.slaThreshold} minutes</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="schedule" className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Scheduled Time</Label>
                          <p className="font-medium">{source.schedule}</p>
                        </div>
                        <div>
                          <Label>Timezone</Label>
                          <p className="font-medium">{source.timezone}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label>Last Successful Sync</Label>
                          <p className="font-medium">{new Date(source.lastSync).toLocaleString()}</p>
                        </div>
                        <div>
                          <Label>Next Expected</Label>
                          <p className="font-medium">Tomorrow at {source.schedule}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FileSources;