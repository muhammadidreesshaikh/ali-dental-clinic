import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const toFormValue = (value) => {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return value;
};

export function FormDialog({ open, title, fields, initialValues, onClose, onSubmit, centered = true, lastFieldLeftAligned = false }) {
  const [values, setValues] = useState(initialValues || {});
  const [preview, setPreview] = useState(initialValues?.image || '');

  useEffect(() => {
    setValues(initialValues || {});
    setPreview(initialValues?.image || '');
  }, [initialValues, open]);

  const handleChange = (name, value) => setValues((current) => ({ ...current, [name]: value }));

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    handleChange('image', objectUrl);
  };

  const helperPreview = useMemo(() => preview || values.image, [preview, values.image]);
  const paperSx = {
    bgcolor: (theme) => (theme.palette.mode === 'dark' ? theme.palette.background.paper : '#ffffff'),
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: paperSx }}>
      <DialogTitle sx={{ fontWeight: 800 }}>{title}</DialogTitle>
      <DialogContent sx={{ display: 'flex', justifyContent: centered ? 'center' : 'flex-start' }}>
        <Stack spacing={2.5} sx={{ pt: 1, width: '100%', maxWidth: 760 }}>
          {helperPreview ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box component="img" alt="preview" src={helperPreview} sx={{ width: 88, height: 88, borderRadius: 4, objectFit: 'cover' }} />
              <Typography variant="body2" color="text.secondary">
                Image preview is stored locally for the current session.
              </Typography>
            </Box>
          ) : null}
          <Grid container spacing={2} justifyContent={centered ? 'center' : 'flex-start'} sx={{ width: '100%', mx: centered ? 'auto' : 0, maxWidth: 700 }}>
            {fields.map((field, index) => {
              const isLastField = index === fields.length - 1;
              const smSize = field.type === 'textarea' ? 12 : 6;

              return (
                <Grid
                  item
                  xs={12}
                  sm={smSize}
                  key={field.name}
                  sx={isLastField && lastFieldLeftAligned ? { mr: { sm: 'auto' } } : undefined}
                >
                  {field.type === 'select' ? (
                    <TextField
                      select
                      fullWidth
                      label={field.label}
                      value={toFormValue(values[field.name])}
                      onChange={(event) => handleChange(field.name, event.target.value)}
                    >
                      {field.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : field.type === 'textarea' ? (
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      label={field.label}
                      value={toFormValue(values[field.name])}
                      onChange={(event) => handleChange(field.name, event.target.value)}
                    />
                  ) : field.type === 'file' ? (
                    <Button variant="outlined" component="label" fullWidth sx={{ height: 56 }}>
                      Upload Image
                      <input hidden type="file" accept="image/*" onChange={handleFile} />
                    </Button>
                  ) : (
                    <TextField
                      fullWidth
                      type={field.type || 'text'}
                      label={field.label}
                      value={toFormValue(values[field.name])}
                      onChange={(event) => handleChange(field.name, event.target.value)}
                      InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                    />
                  )}
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            color: '#1976d2',
            borderColor: '#1976d2',
            '&:hover': {
              borderColor: '#1565c0',
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => onSubmit(values)}
          sx={{
            bgcolor: '#10b981',
            '&:hover': {
              bgcolor: '#059669',
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}