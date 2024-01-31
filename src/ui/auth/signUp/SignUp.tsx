import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CustomButton } from '../../components/customComponents/CustomButton';
import { CustomInput } from '../../components/customComponents/CustomInput';

import { useSignUpMutation } from '../../../slices/apiSlice';
import { TYPE } from '../../../models';
import { LOGIN_ROUTE } from '../../../constants/routes';
import { initialValues, validate } from './formValidation';

export const SignUp = () => {
  const navigate = useNavigate();

  const [signUp, { isError, error, isSuccess }] = useSignUpMutation();

  const handleSubmit = async (values: any) => {
    if (values?.email) {
      const { email, password, first_name, last_name } = values;
      await signUp({ email, password, first_name, last_name });
    }
  };

  useEffect(() => {
    if (isError) {
      if (error?.data?.message[0]) {
        toast.error(error.data.message[0], {
          position: 'bottom-left',
        });
      }
    } else if (isSuccess) {
      navigate(LOGIN_ROUTE);
    }
  }, [error]);

  const formik = useFormik({
    initialValues,
    validationSchema: validate,
    onSubmit: handleSubmit,
  });

  const navigateHandle = () => {
    navigate(LOGIN_ROUTE);
  };

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col justify-around w-full h-screen'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-2xl'>Sign Up</h1>
          <div className='flex flex-col basis-1/4 justify-center mb-5 w-72'>
            <CustomInput
              name='first_name'
              text='First Name'
              formik={formik}
              type='string'
              variant='standard'
              autoComplete='first_name'
            />
            <CustomInput
              name='last_name'
              text='Last Name'
              formik={formik}
              type='string'
              variant='standard'
              autoComplete='last_name'
            />
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
            <CustomInput
              name='confirm_password'
              text='Confirm Password'
              formik={formik}
              type='password'
              variant='standard'
              autoComplete='confirm_password'
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
              text={'Login'}
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
