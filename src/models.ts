import { TextFieldVariants } from '@mui/material';

export interface IButton {
  text: string;
  disabled: boolean;
  type?: TYPE;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  color?: 'primary' | 'error' | 'secondary' | 'success';
}

export interface IArticle {
  _id?: string;
  id?: string | number;
  name: string;
  description: string;
}

export interface ICustomTableProps {
  articles: IArticle[];
  searchArticles?: IArticle[];
}

export enum TYPE {
  BUTTON = 'button',
  SUBMIT = 'submit',
}

export interface IInput {
  name: string;
  text: string;
  formik?: any;
  disabled?: boolean;
  variant?: TextFieldVariants | undefined;
  type?: string;
  autoComplete?: string;
  value?: string;
  label?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}
