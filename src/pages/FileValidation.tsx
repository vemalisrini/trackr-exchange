import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CheckCircle2, AlertTriangle, XCircle, FileText, Download, Eye } from 'lucide-react';

const FileValidation = () => {
  const validationResults = [
    {
      id: 1,
      fileName: 'BSP_DAILY_20241219.csv',
      department: 'Finance',
      validationType: 'Schema Validation',
      status: 'passed',
      errors: 0,
      warnings: 2,
      processedAt: '2024-12-19 09:15:00',
      details: 'All required fields present. Minor formatting warnings on date fields.'
    },
    {
      id: 2,
      fileName: 'AWB_MANIFEST_20241219.xml',
      department: 'Cargo',
      validationType: 'Schema + Business Rules',
      status: 'failed',
      errors: 5,
      warnings: 1,
      processedAt: '2024-12-19 08:45:00',
      details: 'Missing required AWB numbers, invalid weight formats detected.'
    },
    {
      id: 3,
      fileName: 'LOYALTY_ACCRUAL_20241219.csv',
      department: 'Loyalty',
      validationType: 'Data Drift Detection',
      status: 'warning',
      errors: 0,
      warnings: 8,
      processedAt: '2024-12-19 10:30:00',
      details: 'Unusual pattern detected in point accrual amounts - 15% deviation from baseline.'
    },
    {
      id: 4,
      fileName: 'CREW_ROSTER_20241219.json',
      department: 'Operations',
      validationType: 'Hash Verification',
      status: 'failed',
      errors: 1,
      warnings: 0,
      processedAt: '2024-12-19 07:30:00',
      details: 'File hash mismatch detected - potential data corruption during transfer.'
    }
  ];

  const errorDetails = [
    {
      fileName: 'AWB_MANIFEST_20241219.xml',
      lineNumber: 45,
      field: 'awb_number',
      error: 'Missing required field',
      severity: 'error'
    },
    {
      fileName: 'AWB_MANIFEST_20241219.xml',
      lineNumber: 67,
      field: 'gross_weight',
      error: 'Invalid format - expected decimal',
      severity: 'error'
    },
    {
      fileName: 'AWB_MANIFEST_20241219.xml',
      lineNumber: 89,
      field: 'destination_code',
      error: 'Invalid airport code',
      severity: 'warning'
    },
    {
      fileName: 'BSP_DAILY_20241219.csv',
      lineNumber: 123,
      field: 'transaction_date',
      error: 'Date format inconsistent',
      severity: 'warning'
    },
    {
      fileName: 'BSP_DAILY_20241219.csv',
      lineNumber: 156,
      field: 'amount',
      error: 'Decimal precision exceeds standard',
      severity: 'warning'
    }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      passed: <Badge className="bg-success/10 text-success border-success/20">Passed</Badge>,
      warning: <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>,
      failed: <Badge className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>
    };
    return badges[status as keyof typeof badges] || <Badge variant="outline">{status}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const badges = {
      error: <Badge className="bg-destructive/10 text-destructive border-destructive/20">Error</Badge>,
      warning: <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>
    };
    return badges[severity as keyof typeof badges] || <Badge variant="outline">{severity}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">File Validation</h1>
          <p className="text-muted-foreground mt-1">
            Schema validation, business rules, and data quality checks
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{validationResults.length} Files Validated</Badge>
        </div>
      </div>

      {/* Validation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="kpi-card">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Passed</p>
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
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-2xl font-heading font-bold">1</p>
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
                <p className="text-2xl font-heading font-bold">2</p>
              </div>
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="kpi-card">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Errors</p>
                <p className="text-2xl font-heading font-bold">6</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Validation Results */}
      <Card className="card-swiss">
        <CardHeader>
          <CardTitle>Validation Results</CardTitle>
          <CardDescription>Recent file validation outcomes and summaries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="table-swiss">
            <table className="w-full">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Validation Type</th>
                  <th>Status</th>
                  <th>Errors/Warnings</th>
                  <th>Processed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {validationResults.map((result) => (
                  <tr key={result.id}>
                    <td>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(result.status)}
                        <div>
                          <div className="font-medium">{result.fileName}</div>
                          <div className="text-xs text-muted-foreground">{result.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm">{result.validationType}</td>
                    <td>{getStatusBadge(result.status)}</td>
                    <td>
                      <div className="flex items-center space-x-2">
                        {result.errors > 0 && (
                          <span className="text-destructive font-medium">{result.errors} errors</span>
                        )}
                        {result.warnings > 0 && (
                          <span className="text-warning font-medium">{result.warnings} warnings</span>
                        )}
                        {result.errors === 0 && result.warnings === 0 && (
                          <span className="text-success font-medium">All checks passed</span>
                        )}
                      </div>
                    </td>
                    <td className="text-sm">
                      {new Date(result.processedAt).toLocaleString()}
                    </td>
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

      {/* Error Details */}
      <Card className="card-swiss">
        <CardHeader>
          <CardTitle>Error Details</CardTitle>
          <CardDescription>Row-level validation errors and warnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing validation errors for failed and warning files
              </div>
              <Button variant="outline" size="sm" className="button-swiss">
                <Download className="h-4 w-4 mr-2" />
                Export Error Report
              </Button>
            </div>
            
            <div className="table-swiss">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>File</th>
                    <th>Line</th>
                    <th>Field</th>
                    <th>Error Description</th>
                    <th>Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {errorDetails.map((error, index) => (
                    <tr key={index}>
                      <td className="font-medium">{error.fileName}</td>
                      <td className="text-sm">{error.lineNumber}</td>
                      <td className="text-sm font-mono">{error.field}</td>
                      <td className="text-sm">{error.error}</td>
                      <td>{getSeverityBadge(error.severity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Drift Alert */}
      <Card className="card-swiss border-warning/20 bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <span>Data Drift Detection Alert</span>
          </CardTitle>
          <CardDescription>
            Unusual patterns detected in loyalty accrual data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Baseline Average</Label>
                <p className="text-2xl font-heading font-bold">2,450 points</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Current Average</Label>
                <p className="text-2xl font-heading font-bold text-warning">2,817 points</p>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Deviation</Label>
              <p className="text-lg font-semibold text-warning">+15% above baseline</p>
              <p className="text-sm text-muted-foreground mt-1">
                This could indicate data quality issues or genuine business changes. 
                Please review the source data and confirm with the business team.
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="button-swiss">
                View Detailed Analysis
              </Button>
              <Button variant="outline" className="button-swiss">
                Create Investigation Ticket
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileValidation;