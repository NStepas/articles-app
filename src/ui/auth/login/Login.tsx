import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CustomButton } from '../../components/customComponents/CustomButton';
import { CustomInput } from '../../components/customComponents/CustomInput';

import { useLoginMutation } from '../../../slices/apiSlice';
import { TYPE } from '../../../models';

import { ARTICLE_ROUTE, SIGN_UP_ROUTE } from '../../../constants/routes';
import { initialValues, validate } from './formValidation';

export const Login = () => {
  const navigate = useNavigate();

  const [login, { error, isError, data }] = useLoginMutation();
  const handleSubmit = async (values: any) => {
    if (values?.email) {
      await login(values);
    }
  };
  useEffect(() => {
    if (isError) {
      if (error?.data?.message) {
        toast.error(error.data.message, {
          position: 'bottom-left',
        });
      }
    } else if (data?.accessToken) {
      localStorage.setItem('token', data.accessToken);
      navigate(ARTICLE_ROUTE);
    }
  }, [error, data]);

  const formik = useFormik({
    initialValues,
    validationSchema: validate,
    onSubmit: handleSubmit,
  });

  const navigateHandle = () => {
    navigate(SIGN_UP_ROUTE);
  };

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col justify-around w-full h-screen'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-2xl'>Login</h1>
          <div className='flex flex-col basis-1/4 justify-center mb-5 w-72'>
            <CustomInput
              name='email'
              text='Email'
              formik={formik}
              type='email'
              variant='standard'
              autoComplete='email'
            />
            <CustomInput
              name='password'
              text='Password'
              formik={formik}
              type='password'
              variant='standard'
              autoComplete='password'
            />
          </div>
          <div className='flex flex-row space-x-4'>
            <CustomButton
              className='w-32'
              type={TYPE.SUBMIT}
              text={'Confirm'}
              disabled={false}
              onClick={handleSubmit}
            />
            <CustomButton
              className='w-32'
              type={TYPE.BUTTON}
              text={'Sign Up'}
              disabled={false}
              onClick={navigateHandle}
            />
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
