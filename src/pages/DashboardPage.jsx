import React, { useEffect, useMemo, useState } from 'react';
import { Box, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { dashboardChartData, dashboardStats, monthlyRevenueLabels, recentSalesRows, topSellingRows } from '../data/appData';
import { MetricCard } from '../components/MetricCard';
import { GlassCard } from '../components/GlassCard';
import { PageHeader } from '../components/PageHeader';
import { LoadingState } from '../components/LoadingState';
import { AppDataGrid } from '../components/AppDataGrid';

const chartKeys = ['today', 'weekly', 'monthly'];

const chartColors = ['#10b981', '#06b6d4', '#8b5cf6', '#0f172a'];

const formatCurrency = (value) => `Rs. ${(Number(value) || 0).toLocaleString()}`;

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <GlassCard sx={{ p: 0, minWidth: 180 }} contentSx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
        {label}
      </Typography>
      {payload.map((entry) => (
        <Typography key={entry.dataKey} variant="body2" color="text.secondary">
          {entry.name}: {(Number(entry.value) || 0).toLocaleString()}
        </Typography>
      ))}
    </GlassCard>
  );
}

export function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState('monthly');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const chartData = useMemo(() => dashboardChartData[range], [range]);
  const revenueLineColor = range === 'today' ? '#06b6d4' : range === 'weekly' ? '#10b981' : '#8b5cf6';

  if (loading) {
    return <LoadingState rows={3} />;
  }

  return (
    <Box>
      <PageHeader
        title="Dashboard"
        subtitle="Live pharmacy operations overview, trends and high-value actions."
        breadcrumbs={[{ label: 'Home' }, { label: 'Dashboard' }]}
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {dashboardStats.map((stat) => (
          <Grid key={stat.label} item xs={12} sm={3} xl={3}>
            <MetricCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} xl={7}>
          <GlassCard>
            <Stack spacing={2.5}>
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2}>
                <Box>
                  <Typography variant="h6">Monthly Revenue</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Interactive revenue and sales trend with smooth animation.
                  </Typography>
                </Box>
                <Tabs value={range} onChange={(_, value) => setRange(value)} sx={{ minHeight: 40 }}>
                  {chartKeys.map((key) => (
                    <Tab key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} value={key} sx={{ minHeight: 40 }} />
                  ))}
                </Tabs>
              </Stack>
              <Box sx={{ width: '100%', height: 360 }}>
                <ResponsiveContainer>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.18} />
                    <XAxis dataKey="label" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" name="Revenue" stroke={revenueLineColor} strokeWidth={4} dot={false} />
                    <Bar dataKey="sales" name="Sales" fill="#06b6d4" radius={[12, 12, 0, 0]} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Stack>
          </GlassCard>
        </Grid>
        <Grid item xs={12} xl={5}>
          <GlassCard sx={{ height: '100%' }}>
            <Stack spacing={2}>
              <Typography variant="h6">Operational Highlights</Typography>
              <Box sx={{ width: '100%', height: 360 }}>
                <ResponsiveContainer>
                  <BarChart data={chartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" opacity={0.18} />
                    <XAxis type="number" tickLine={false} axisLine={false} />
                    <YAxis dataKey="label" type="category" width={70} tickLine={false} axisLine={false} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="revenue" name="Revenue" radius={[0, 12, 12, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={entry.label} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Stack>
          </GlassCard>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid item xs={12} xl={6}>
          <AppDataGrid
            title="Recent Sales"
            rows={recentSalesRows}
            columns={[
              { field: 'invoice', headerName: 'Invoice', width: 130 },
              { field: 'customer', headerName: 'Customer', flex: 1, minWidth: 160 },
              { field: 'amount', headerName: 'Amount', width: 110, valueFormatter: ({ value }) => formatCurrency(value) },
              { field: 'status', headerName: 'Status', width: 110 },
              { field: 'date', headerName: 'Date', width: 110 },
            ]}
            searchFields={[ 'invoice', 'customer', 'status' ]}
            height={400}
            compact
          />
        </Grid>
        <Grid item xs={12} xl={6}>
          <AppDataGrid
            title="Top Selling Medicines"
            rows={topSellingRows}
            columns={[
              { field: 'medicine', headerName: 'Medicine', flex: 1, minWidth: 160 },
              { field: 'category', headerName: 'Category', width: 140 },
              { field: 'sold', headerName: 'Sold', width: 100 },
              { field: 'revenue', headerName: 'Revenue', width: 120, valueFormatter: ({ value }) => formatCurrency(value) },
              { field: 'trend', headerName: 'Trend', width: 100 },
            ]}
            searchFields={[ 'medicine', 'category', 'trend' ]}
            height={400}
            compact
          />
        </Grid>
      </Grid>
    </Box>
  );
}