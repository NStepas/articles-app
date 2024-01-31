import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';

import { CustomButton } from '../customComponents/CustomButton';
import { CustomInput } from '../customComponents/CustomInput';

import { useAddArticleMutation } from '../../../slices/apiSlice';
import { TYPE } from '../../../models';
import { initialValues, validate } from './formValidation';

export const AddNewArticle = (props: any) => {
  const [addArticle, { isError, error, isSuccess }] = useAddArticleMutation();

  const { onClose } = props;

  const handleSubmit = async (values: any) => {
    if (values?.name) {
      await addArticle(values);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validate,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (isError) {
      if (error.data?.message) {
        toast.error(error.data.message[0], {
          position: 'bottom-left',
        });
      }
    } else if (isSuccess) {
      onClose();
    }
  }, [error, isSuccess]);

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
          <h1 className='text-2xl'>Add new article</h1>
          <div className='flex flex-col basis-1/4 justify-center mb-5 w-72'>
            <CustomInput
              name='name'
              text='Name'
              formik={formik}
              type='text'
              variant='standard'
            />
            <CustomInput
              name='description'
              text='Description'
              formik={formik}
              type='text'
              variant='standard'
            />
          </div>
          <div className='flex flex-row space-x-4'>
            <CustomButton
              className='w-32'
              type={TYPE.SUBMIT}
              text={'Add Article'}
              disabled={false}
              onClick={handleSubmit}
            />
            <CustomButton
              className='w-32'
              type={TYPE.BUTTON}
              text={'Cancel'}
              disabled={false}
              onClick={onClose}
            />
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
