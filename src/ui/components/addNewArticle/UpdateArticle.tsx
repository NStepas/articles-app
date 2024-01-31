import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';

import { CustomInput } from '../customComponents/CustomInput';
import { CustomButton } from '../customComponents/CustomButton';

import { useUpdateArticleMutation } from '../../../slices/apiSlice';
import { TYPE } from '../../../models';
import { initialValues, validate } from './formValidation';

import { ThemeProvider } from '@emotion/react';
import { theme } from '../../styles/theme';

export const UpdateArticle = (props: any) => {
  const [updateArticle, { isError, error, isSuccess }] =
    useUpdateArticleMutation();

  const { onClose, article } = props;
  const handleSubmit = async (values: any) => {
    if (values?.name) {
      await updateArticle({ ...values, id: article._id });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validate,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (isError) {
      if (error?.data?.message) {
        toast.error(error.data.message[0], {
          position: 'bottom-left',
        });
      }
    } else if (isSuccess) {
      onClose();
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    const close = (e: any) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Submit') {
        formik.handleSubmit();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col justify-around w-full h-screen'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-2xl'>Update article</h1>
          <div className='flex flex-col basis-1/4 justify-center mb-5 w-72'>
            <CustomInput
              name='name'
              text={article.name}
              formik={formik}
              type='text'
              variant='standard'
            />
            <CustomInput
              name='description'
              text={article.description}
              formik={formik}
              type='text'
              variant='standard'
            />
          </div>

          <div className='flex flex-row space-x-4'>
            <ThemeProvider theme={theme}>
              <CustomButton
                className='w-48'
                type={TYPE.SUBMIT}
                text={'Update Article'}
                color='success'
                disabled={false}
                onClick={handleSubmit}
              />
              <CustomButton
                className='w-32'
                type={TYPE.BUTTON}
                text={'Cancel'}
                color='success'
                disabled={false}
                onClick={onClose}
              />
            </ThemeProvider>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
