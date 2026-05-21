import React, { useMemo, useState } from 'react';
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlineRounded, PictureAsPdfRounded, SearchRounded } from '@mui/icons-material';
import { GlassCard } from './GlassCard';
import { EmptyState } from './EmptyState';
import { downloadCsv, printTableAsPdf } from '../utils/export';
import { StatusChip } from './StatusChip';

const defaultColumns = (onEdit, onDelete) => [
  {
    field: 'actions',
    headerName: 'Actions',
    width: 140,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="outlined" onClick={() => onEdit?.(params.row)} disabled={!onEdit}>
          Edit
        </Button>
        <Button size="small" color="error" variant="outlined" onClick={() => onDelete?.(params.row)} disabled={!onDelete}>
          <DeleteOutlineRounded fontSize="small" />
        </Button>
      </Stack>
    ),
  },
];

export function AppDataGrid({ title, rows, columns, searchFields, onEdit, onDelete, onAdd, addLabel = 'Add', extraActions = [], filterField, filterOptions = [], height = 520, compact = false }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rows.filter((row) => {
      const searchMatch = !query || searchFields.some((field) => String(row[field] ?? '').toLowerCase().includes(query));
      const filterMatch = filter === 'All' || !filterField || String(row[filterField]) === filter;
      return searchMatch && filterMatch;
    });
  }, [filter, filterField, rows, search, searchFields]);

  const displayColumns = useMemo(() => {
    if (!onEdit && !onDelete) {
      return columns;
    }
    return [...columns, ...defaultColumns(onEdit, onDelete)];
  }, [columns, onDelete, onEdit]);

  const exportableRows = filteredRows.map((row) => ({ ...row }));

  return (
    <GlassCard contentSx={{ p: compact ? 0 : 3 }}>
      <Stack spacing={2.5}>
        <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2" color="text.secondary">
              Search, filter, sort and export records from a polished MUI DataGrid.
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', sm: 'center' }}>
            <TextField
              size="small"
              placeholder="Search..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              InputProps={{
                startAdornment: <SearchRounded sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
            {filterField ? (
              <TextField select size="small" value={filter} onChange={(event) => setFilter(event.target.value)} sx={{ minWidth: 160 }}>
                {filterOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            ) : null}
            <Button variant="contained" onClick={onAdd}>
              {addLabel}
            </Button>
            <Button variant="outlined" onClick={() => printTableAsPdf(title, exportableRows)} startIcon={<PictureAsPdfRounded />}>
              PDF
            </Button>
            <Button variant="outlined" onClick={() => downloadCsv(exportableRows, title)}>
              Excel
            </Button>
            {extraActions}
          </Stack>
        </Stack>
        <Box sx={{ height, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={displayColumns}
            pageSizeOptions={[5, 10, 20]}
            initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
            disableRowSelectionOnClick
            slots={{
              noRowsOverlay: () => <EmptyState title="No records found" description="Try another search or add a new record." actionLabel={onAdd ? addLabel : undefined} onAction={onAdd} />,
            }}
            sx={{ border: 'none' }}
          />
        </Box>
      </Stack>
    </GlassCard>
  );
}