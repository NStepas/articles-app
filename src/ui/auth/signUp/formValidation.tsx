import * as Yup from 'yup';

import {
  IS_REQUIRED,
  PASSWORD_MIN_ERROR,
  PASSWORD_MAX_ERROR,
  EMAIL_ERROR,
} from '../../../constants/formTexts';

import { ISignUp } from '../../../models';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const initialValues: ISignUp = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
};

export const validate = Yup.object({
  first_name: Yup.string().required(IS_REQUIRED),
  last_name: Yup.string().required(IS_REQUIRED),
  email: Yup.string().required(IS_REQUIRED).email(EMAIL_ERROR),
  password: Yup.string()
    .required(IS_REQUIRED)
    .min(6, PASSWORD_MIN_ERROR)
    .max(16, PASSWORD_MAX_ERROR),
  confirm_password: Yup.string().oneOf(
    [Yup.ref('password')],
    'Password must match'
  ),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  address: Yup.string(),
});
