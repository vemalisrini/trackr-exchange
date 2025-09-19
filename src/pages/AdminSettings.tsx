import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Settings,
  Users,
  Mail,
  Database,
  Shield,
  Globe,
  Plus,
  Edit,
  Trash2,
  Send,
  CheckCircle2
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
import { useToast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const { toast } = useToast();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'employee',
    departments: [] as string[]
  });

  const [emailConfig, setEmailConfig] = useState({
    emailId: 'alerts@omnitrackr.com',
    category: 'system_alerts',
    subject: 'OmniTrackr Alert: {{alert_type}}',
    body: `Dear {{recipient_name}},

An alert has been triggered in the OmniTrackr system:

Alert Type: {{alert_type}}
File Name: {{file_name}}
Source: {{source_system}}
Time: {{timestamp}}
Description: {{description}}

Please take appropriate action.

Best regards,
OmniTrackr System`
  });

  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@airline.com',
      role: 'employee',
      departments: ['Finance'],
      status: 'active',
      lastLogin: '2024-12-19 09:15:00'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@airline.com',
      role: 'employee',
      departments: ['Cargo'],
      status: 'active',
      lastLogin: '2024-12-19 08:45:00'
    },
    {
      id: 3,
      name: 'David Rodriguez',
      email: 'david.rodriguez@airline.com',
      role: 'employee',
      departments: ['Operations'],
      status: 'active',
      lastLogin: '2024-12-19 07:30:00'
    },
    {
      id: 4,
      name: 'Emma Watson',
      email: 'emma.watson@airline.com',
      role: 'employee',
      departments: ['Loyalty'],
      status: 'active',
      lastLogin: '2024-12-19 10:30:00'
    },
    {
      id: 5,
      name: 'John Smith',
      email: 'john.smith@airline.com',
      role: 'admin',
      departments: ['Finance', 'Cargo', 'Operations', 'Loyalty', 'Commercial', 'Customer Experience', 'Engineering', 'HR/Admin'],
      status: 'active',
      lastLogin: '2024-12-19 11:00:00'
    }
  ];

  const systemSettings = {
    slaThresholds: {
      default: 30,
      critical: 15,
      warning: 60
    },
    retentionPeriods: {
      auditLogs: 365,
      fileData: 90,
      reports: 730
    },
    notifications: {
      emailEnabled: true,
      slackEnabled: true,
      teamsEnabled: true
    }
  };

  const getRoleBadge = (role: string) => {
    const badges = {
      admin: <Badge className="bg-destructive/10 text-destructive border-destructive/20">Admin</Badge>,
      employee: <Badge className="bg-primary/10 text-primary border-primary/20">Employee</Badge>
    };
    return badges[role as keyof typeof badges] || <Badge variant="outline">{role}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: <Badge className="bg-success/10 text-success border-success/20">Active</Badge>,
      inactive: <Badge className="bg-muted/50 text-muted-foreground border-muted">Inactive</Badge>
    };
    return badges[status as keyof typeof badges] || <Badge variant="outline">{status}</Badge>;
  };

  const handleAddUser = () => {
    console.log('Adding user:', newUser);
    setIsAddUserOpen(false);
    setNewUser({
      name: '',
      email: '',
      role: 'employee',
      departments: []
    });
    toast({
      title: "User Added",
      description: `${newUser.name} has been added successfully.`,
    });
  };

  const handleTestEmail = () => {
    console.log('Testing email configuration');
    toast({
      title: "Test Email Sent",
      description: `Test email sent to ${testEmail}`,
    });
  };

  const handleSaveEmailConfig = () => {
    console.log('Saving email configuration:', emailConfig);
    toast({
      title: "Configuration Saved",
      description: "Email configuration has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Admin Settings</h1>
          <p className="text-muted-foreground mt-1">
            System configuration, user management, and administrative controls
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Administrator Access</Badge>
        </div>
      </div>

      {/* Settings Tabs */}
      <Card className="card-swiss">
        <CardContent className="p-6">
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="email">Email Config</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-6 mt-6">
              {/* User Management Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-heading font-semibold">User Management</h3>
                  <p className="text-sm text-muted-foreground">Manage user accounts and permissions</p>
                </div>
                <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                  <DialogTrigger asChild>
                    <Button className="button-swiss">
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>
                        Create a new user account with appropriate role and department access.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                            placeholder="Enter full name"
                            className="input-swiss"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            placeholder="user@airline.com"
                            className="input-swiss"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                          <SelectTrigger className="input-swiss">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="employee">Employee</SelectItem>
                            <SelectItem value="admin">Administrator</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Department Access</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {['Finance', 'Cargo', 'Operations', 'Loyalty', 'Commercial', 'Customer Experience', 'Engineering', 'HR/Admin'].map((dept) => (
                            <label key={dept} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={newUser.departments.includes(dept)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNewUser({...newUser, departments: [...newUser.departments, dept]});
                                  } else {
                                    setNewUser({...newUser, departments: newUser.departments.filter(d => d !== dept)});
                                  }
                                }}
                                className="rounded"
                              />
                              <span className="text-sm">{dept}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddUserOpen(false)} className="button-swiss">
                        Cancel
                      </Button>
                      <Button onClick={handleAddUser} className="button-swiss">
                        Add User
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Users Table */}
              <div className="table-swiss">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Departments</th>
                      <th>Status</th>
                      <th>Last Login</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>{getRoleBadge(user.role)}</td>
                        <td>
                          <div className="flex flex-wrap gap-1">
                            {user.departments.slice(0, 2).map((dept) => (
                              <Badge key={dept} variant="outline" className="text-xs">
                                {dept}
                              </Badge>
                            ))}
                            {user.departments.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{user.departments.length - 2}
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td>{getStatusBadge(user.status)}</td>
                        <td className="text-sm">
                          {new Date(user.lastLogin).toLocaleString()}
                        </td>
                        <td>
                          <div className="flex items-center space-x-1">
                            <Button size="sm" variant="outline" className="button-swiss p-2">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="button-swiss p-2">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="system" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* SLA Settings */}
                <Card className="card-swiss">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>SLA Thresholds</span>
                    </CardTitle>
                    <CardDescription>Configure service level agreement thresholds</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="default-sla">Default SLA (minutes)</Label>
                      <Input
                        id="default-sla"
                        type="number"
                        value={systemSettings.slaThresholds.default}
                        className="input-swiss"
                      />
                    </div>
                    <div>
                      <Label htmlFor="critical-sla">Critical Files SLA (minutes)</Label>
                      <Input
                        id="critical-sla"
                        type="number"
                        value={systemSettings.slaThresholds.critical}
                        className="input-swiss"
                      />
                    </div>
                    <div>
                      <Label htmlFor="warning-sla">Warning Threshold (minutes)</Label>
                      <Input
                        id="warning-sla"
                        type="number"
                        value={systemSettings.slaThresholds.warning}
                        className="input-swiss"
                      />
                    </div>
                    <Button className="button-swiss">Save SLA Settings</Button>
                  </CardContent>
                </Card>

                {/* Retention Settings */}
                <Card className="card-swiss">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Database className="h-5 w-5" />
                      <span>Data Retention</span>
                    </CardTitle>
                    <CardDescription>Configure data retention periods</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="audit-retention">Audit Logs (days)</Label>
                      <Input
                        id="audit-retention"
                        type="number"
                        value={systemSettings.retentionPeriods.auditLogs}
                        className="input-swiss"
                      />
                    </div>
                    <div>
                      <Label htmlFor="file-retention">File Data (days)</Label>
                      <Input
                        id="file-retention"
                        type="number"
                        value={systemSettings.retentionPeriods.fileData}
                        className="input-swiss"
                      />
                    </div>
                    <div>
                      <Label htmlFor="report-retention">Reports (days)</Label>
                      <Input
                        id="report-retention"
                        type="number"
                        value={systemSettings.retentionPeriods.reports}
                        className="input-swiss"
                      />
                    </div>
                    <Button className="button-swiss">Save Retention Settings</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Notification Settings */}
              <Card className="card-swiss">
                <CardHeader>
                  <CardTitle>Notification Channels</CardTitle>
                  <CardDescription>Enable or disable notification channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Send alerts via email</p>
                      </div>
                      <Switch
                        checked={systemSettings.notifications.emailEnabled}
                        onCheckedChange={() => {}}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Microsoft Teams</Label>
                        <p className="text-sm text-muted-foreground">Send alerts to Teams channels</p>
                      </div>
                      <Switch
                        checked={systemSettings.notifications.teamsEnabled}
                        onCheckedChange={() => {}}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Slack Integration</Label>
                        <p className="text-sm text-muted-foreground">Send alerts to Slack channels</p>
                      </div>
                      <Switch
                        checked={systemSettings.notifications.slackEnabled}
                        onCheckedChange={() => {}}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email" className="space-y-6 mt-6">
              <Card className="card-swiss">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span>Email Configuration</span>
                  </CardTitle>
                  <CardDescription>Configure email templates and settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email-id">Email ID</Label>
                      <Input
                        id="email-id"
                        value={emailConfig.emailId}
                        onChange={(e) => setEmailConfig({...emailConfig, emailId: e.target.value})}
                        className="input-swiss"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={emailConfig.category} onValueChange={(value) => setEmailConfig({...emailConfig, category: value})}>
                        <SelectTrigger className="input-swiss">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="system_alerts">System Alerts</SelectItem>
                          <SelectItem value="sla_warnings">SLA Warnings</SelectItem>
                          <SelectItem value="failure_notifications">Failure Notifications</SelectItem>
                          <SelectItem value="reports">Reports</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={emailConfig.subject}
                      onChange={(e) => setEmailConfig({...emailConfig, subject: e.target.value})}
                      className="input-swiss"
                    />
                  </div>

                  <div>
                    <Label htmlFor="body">Email Body</Label>
                    <Textarea
                      id="body"
                      value={emailConfig.body}
                      onChange={(e) => setEmailConfig({...emailConfig, body: e.target.value})}
                      rows={10}
                      className="input-swiss"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Label htmlFor="test-email">Test Email</Label>
                      <Input
                        id="test-email"
                        type="email"
                        placeholder="test@example.com"
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        className="input-swiss"
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleTestEmail}
                      className="button-swiss mt-6"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Test
                    </Button>
                  </div>

                  <Button onClick={handleSaveEmailConfig} className="button-swiss">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="card-swiss">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Security Settings</span>
                    </CardTitle>
                    <CardDescription>Configure security and access controls</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Session Timeout</Label>
                        <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                      </div>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 min</SelectItem>
                          <SelectItem value="30">30 min</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>IP Restrictions</Label>
                        <p className="text-sm text-muted-foreground">Limit access by IP address</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-swiss">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="h-5 w-5" />
                      <span>Multi-Language Support</span>
                    </CardTitle>
                    <CardDescription>Configure language and localization</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Default Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger className="input-swiss">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Allow Language Toggle</Label>
                        <p className="text-sm text-muted-foreground">Let users change language</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div>
                      <Label>Timezone</Label>
                      <Select defaultValue="utc">
                        <SelectTrigger className="input-swiss">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">EST</SelectItem>
                          <SelectItem value="pst">PST</SelectItem>
                          <SelectItem value="gmt">GMT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;