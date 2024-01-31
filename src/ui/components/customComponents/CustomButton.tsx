import Button from '@mui/material/Button';

import { IButton } from '../../../models';

export const CustomButton = ({
  text,
  disabled,
  className,
  onClick,
  color,
  type,
}: IButton) => (
  <Button
    variant='outlined'
    disabled={disabled}
    className={className}
    onClick={onClick}
    color={color}
    type={type}>
    {text}
  </Button>
);
