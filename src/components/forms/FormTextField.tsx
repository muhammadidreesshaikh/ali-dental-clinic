import { TextField, InputAdornment, IconButton, type TextFieldProps } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

export function FormTextField<TFieldValues extends FieldValues>({
  control,
  name,
  type,
  ...props
}: TextFieldProps & { control: Control<TFieldValues>; name: Path<TFieldValues>; type?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const renderField = ({ field, fieldState }: any) => {
    const endAdornment = isPassword ? (
      <InputAdornment position="end">
        <IconButton aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((s) => !s)} edge="end">
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ) : undefined;

    const mergedInputProps = { ...(props.InputProps ?? {}), endAdornment: (props.InputProps?.endAdornment ?? endAdornment) };

    return (
      <TextField
        {...field}
        {...props}
        type={inputType}
        fullWidth
        error={Boolean(fieldState.error)}
        helperText={fieldState.error?.message ?? props.helperText}
        InputProps={mergedInputProps}
      />
    );
  };

  return <Controller control={control} name={name} render={renderField} />;
}