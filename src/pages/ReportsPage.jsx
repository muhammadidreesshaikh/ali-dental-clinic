import React from 'react';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { dashboardChartData, reportRows } from '../data/appData';
import { GlassCard } from '../components/GlassCard';
import { PageHeader } from '../components/PageHeader';

export function ReportsPage() {
  const chartData = dashboardChartData.monthly;

  return (
    <Box>
      <PageHeader
        title="Reports"
        subtitle="Sales, revenue, inventory and expiry reports with export-ready analytics."
        actionLabel="Download PDF"
        breadcrumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Reports' }]}
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {reportRows.map((report) => (
          <Grid item xs={12} md={4} key={report.id}>
            <GlassCard>
              <Stack spacing={1}>
                <Typography color="text.secondary">{report.title}</Typography>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>{report.value}</Typography>
                <Typography color={report.trend.startsWith('+') ? 'success.main' : 'error.main'} sx={{ fontWeight: 800 }}>
                  {report.trend}
                </Typography>
              </Stack>
            </GlassCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} xl={8}>
          <GlassCard disableLastChildPadding>
            <Stack spacing={2}>
              <Typography variant="h6">Revenue Analytics</Typography>
              <Box sx={{ width: '100%', height: 360 }}>
                <ResponsiveContainer>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.18} />
                    <XAxis dataKey="label" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#10b981" radius={[12, 12, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Stack>
          </GlassCard>
        </Grid>
        <Grid item xs={6} xl={4}>
          <GlassCard disableLastChildPadding>
            <Stack spacing={2}>
              <Typography variant="h6">Exports</Typography>
              <Button variant="contained" fullWidth>Download PDF</Button>
              <Button variant="outlined" fullWidth>Export Excel</Button>
              <Button variant="outlined" fullWidth>Print Summary</Button>
            </Stack>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
}