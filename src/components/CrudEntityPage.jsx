import React, { useMemo, useState } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { PageHeader } from './PageHeader';
import { MetricCard } from './MetricCard';
import { AppDataGrid } from './AppDataGrid';
import { FormDialog } from './FormDialog';
import { StatusChip } from './StatusChip';
import { useSnackbar } from '../context/SnackbarContext';

const enrichRows = (rows, config) =>
  rows.map((row) => ({
    ...row,
    status: config.statusAccessor ? config.statusAccessor(row) : row.status,
  }));

export function CrudEntityPage({ config }) {
  const [rows, setRows] = useState(() => enrichRows(config.rows, config));
  const [open, setOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const { notify } = useSnackbar();

  const stats = useMemo(() => config.stats || [], [config.stats]);

  const columns = useMemo(() => {
    return config.columns.map((column) => {
      if (column.field === 'status' || column.field === 'stockStatus') {
        return {
          ...column,
          renderCell: (params) => <StatusChip value={params.value} />,
        };
      }
      return column;
    });
  }, [config.columns]);

  const handleSubmit = (values) => {
    const payload = {
      ...values,
      id: editingRow?.id || Date.now(),
    };

    if (editingRow) {
      setRows((current) => current.map((row) => (row.id === editingRow.id ? { ...row, ...payload } : row)));
      notify(`${config.title} updated successfully.`, 'success');
    } else {
      setRows((current) => [payload, ...current]);
      notify(`${config.title} added successfully.`, 'success');
    }

    setOpen(false);
    setEditingRow(null);
  };

  const handleDelete = (row) => {
    setRows((current) => current.filter((item) => item.id !== row.id));
    notify(`${config.title} removed.`, 'info');
  };

  const openAddDialog = () => {
    setEditingRow(null);
    setOpen(true);
  };

  return (
    <Box>
      <PageHeader title={config.title} subtitle={config.subtitle} actionLabel={config.addLabel} onAction={openAddDialog} breadcrumbs={[{ label: 'Home', to: '/dashboard' }, { label: config.title }]} />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((item) => (
          <Grid item xs={12} sm={6} xl={3} key={item.label}>
            <MetricCard label={item.label} value={item.value} change="Managed live" icon={() => null} gradient="linear-gradient(135deg, #10b981 0%, #06b6d4 100%)" />
          </Grid>
        ))}
      </Grid>

      <AppDataGrid
        title={config.title}
        rows={rows}
        columns={columns}
        searchFields={config.columns.map((column) => column.field)}
        onAdd={openAddDialog}
        onEdit={(row) => {
          setEditingRow(row);
          setOpen(true);
        }}
        onDelete={handleDelete}
        addLabel={config.addLabel}
        filterField={config.filterField}
        filterOptions={config.filterOptions}
        compact
        cardSx={{ padding: '20px' }}
        tableSx={{ borderRadius: 10 }}
      />

      <FormDialog
        open={open}
        title={editingRow ? `Edit ${config.title.slice(0, -1)}` : config.addLabel}
        fields={config.fields}
        initialValues={editingRow || {}}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}