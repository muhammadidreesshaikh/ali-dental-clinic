import React, { useMemo, useState } from 'react';
import { Box, Button, Chip, Divider, Grid, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { AddRounded, DeleteOutlineRounded, RemoveRounded, PrintRounded, ReceiptLongRounded } from '@mui/icons-material';
import { AppDataGrid } from '../components/AppDataGrid';
import { salesMedicines } from '../data/appData';
import { GlassCard } from '../components/GlassCard';
import { PageHeader } from '../components/PageHeader';
import { useSnackbar } from '../context/SnackbarContext';

const paymentMethods = ['Cash', 'Card', 'Online'];
export const SalesPosPage = () => {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const { notify } = useSnackbar();

  const catalog = useMemo(
    () => salesMedicines.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.17;
  const total = subtotal + tax - discount;

  const addToCart = (medicine) => {
    setCart((current) => {
      const found = current.find((item) => item.id === medicine.id);
      if (found) {
        return current.map((item) => (item.id === medicine.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...current, { ...medicine, qty: 1 }];
    });
    notify(`${medicine.name} added to cart.`, 'success');
  };

  return (
    <Box>
      <PageHeader
        title="Sales & POS"
        subtitle="Barcode-ready billing workspace with cart controls and invoice summary."
        breadcrumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Sales & POS' }]}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <AppDataGrid
            // title="Medicines"
            rows={catalog}
            columns={[
              { field: 'name', headerName: 'Medicine', flex: 1, minWidth: 180 },
              { field: 'category', headerName: 'Category', width: 150 },
              { field: 'stock', headerName: 'Stock', width: 110 },
              { field: 'price', headerName: 'Price', width: 120, valueFormatter: ({ value }) => `Rs. ${value}` },
              {
                field: 'actions',
                headerName: 'Add',
                width: 100,
                sortable: false,
                filterable: false,
                align: 'center',
                headerAlign: 'center',
                renderCell: (params) => (
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => addToCart(params.row)}
                    aria-label={`add ${params.row.name}`}
                    sx={{ borderRadius: '50%', border: '1px solid', borderColor: 'primary.main', bgcolor: 'background.paper' }}
                  >
                    <AddRounded fontSize="small" />
                  </IconButton>
                ),
              },
            ]}
            searchFields={['name', 'category']}
            searchInputSx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
            compact
            cardSx={{ padding: '20px' }}
            tableSx={{ borderRadius: 3 }}
          />
        </Grid>

        <Grid item xs={12} lg={4}>
          <GlassCard sx={{ position: 'sticky', top: 100 }} disableLastChildPadding>
            <Stack spacing={2.5}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <ReceiptLongRounded color="primary" />
                <Typography variant="h6">Invoice Summary</Typography>
              </Stack>
              <Divider />
              <Stack spacing={1.5} sx={{ maxHeight: 340, overflow: 'auto' }}>
                {cart.length ? cart.map((item) => (
                  <Stack key={item.id} direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 800 }} noWrap>{item.name}</Typography>
                      <Typography variant="caption" color="text.secondary">Rs. {item.price}</Typography>
                    </Box>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <IconButton size="small" onClick={() => setCart((current) => current.map((row) => (row.id === item.id ? { ...row, qty: Math.max(1, row.qty - 1) } : row)))}>
                        <RemoveRounded fontSize="small" />
                      </IconButton>
                      <Chip label={item.qty} size="small" />
                      <IconButton size="small" onClick={() => setCart((current) => current.map((row) => (row.id === item.id ? { ...row, qty: row.qty + 1 } : row)))}>
                        <AddRounded fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => setCart((current) => current.filter((row) => row.id !== item.id))}>
                        <DeleteOutlineRounded fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>
                )) : <Typography color="text.secondary">Cart is empty. Add medicines to start billing.</Typography>}
              </Stack>
              <Stack spacing={1.2}>
                <TextField label="Discount" type="number" value={discount} onChange={(event) => setDiscount(Number(event.target.value))} />
                <TextField select label="Payment Method" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                  {paymentMethods.map((method) => (
                    <MenuItem key={method} value={method}>{method}</MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Divider />
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between"><Typography color="text.secondary">Subtotal</Typography><Typography>Rs. {(Number(subtotal) || 0).toLocaleString()}</Typography></Stack>
                <Stack direction="row" justifyContent="space-between"><Typography color="text.secondary">Tax</Typography><Typography>Rs. {Math.round(tax).toLocaleString()}</Typography></Stack>
                <Stack direction="row" justifyContent="space-between"><Typography color="text.secondary">Discount</Typography><Typography>- Rs. {(Number(discount) || 0).toLocaleString()}</Typography></Stack>
                <Stack direction="row" justifyContent="space-between"><Typography variant="h6">Total</Typography><Typography variant="h6">Rs. {total.toFixed(0)}</Typography></Stack>
              </Stack>
              <Button variant="contained" size="large" startIcon={<PrintRounded />} onClick={() => notify(`Invoice ready for ${paymentMethod} payment.`, 'success')}>
                Print Invoice
              </Button>
            </Stack>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
}
