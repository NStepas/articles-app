import { useState } from 'react';

import { TextField } from '@mui/material';

import { IInput } from '../../../models';

export const CustomInput = ({
  name,
  text,
  variant,
  type,
  disabled,
  autoComplete,
  formik,
}: IInput) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  return (
    <>
      <TextField
        name={name}
        label={text}
        variant={variant}
        type={type}
        autoComplete={autoComplete}
        disabled={disabled}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        onFocus={() => handleFocus()}
      />
      {(isFocused && formik.errors[name]) ?? <p>{formik.errors[name]}</p>}
    </>
  );
};
