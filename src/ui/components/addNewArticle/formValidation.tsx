import * as Yup from 'yup';

import { IArticle } from '../../../models';

import {
  IS_REQUIRED,
  MAX_LENGTH,
  MIN_LENGTH,
} from '../../../constants/formTexts';

export const initialValues: IArticle = {
  name: '',
  description: '',
};

export const validate = Yup.object({
  name: Yup.string()
    .required(IS_REQUIRED)
    .min(1, MIN_LENGTH)
    .max(30, MAX_LENGTH),
  description: Yup.string().required(IS_REQUIRED).min(1, MIN_LENGTH),
});
