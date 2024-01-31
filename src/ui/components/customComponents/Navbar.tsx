import { useNavigate } from 'react-router-dom';
import { AppBar, Container, ThemeProvider, Toolbar } from '@mui/material';

import { CustomButton } from './CustomButton';

import { LOGIN_ROUTE, PUBLIC_ROUTE } from '../../../constants/routes';

import { theme } from '../../styles/theme';

export const NavBar = ({ showModal }: any) => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const onLogOutHandler = async () => {
    localStorage.removeItem('token');
    navigate(PUBLIC_ROUTE);
  };

  const onLoginHandler = async () => {
    navigate(LOGIN_ROUTE);
  };

  return (
    <AppBar
      position='static'
      className=' w-full h-full flex bg-gradient-to-l from-blue-500 to-sky-100'>
      <Container className=' w-full h-full flex flex-row'>
        <Toolbar>
          <Container>
            <p className='text-[#1976d2] font-bold'>Articles</p>
          </Container>

          <Container
            sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <ThemeProvider theme={theme}>
              {token ? (
                <div>
                  <span>
                    <CustomButton
                      text='Add article'
                      disabled={false}
                      onClick={showModal}
                      color='primary'
                      className='text-[#e3f2fd]'
                    />
                  </span>
                  <span className='ml-4'>
                    <CustomButton
                      text='LogOut'
                      disabled={false}
                      onClick={onLogOutHandler}
                      color='primary'
                      className='text-[#e3f2fd]'
                    />
                  </span>
                </div>
              ) : (
                <CustomButton
                  text='Login'
                  disabled={false}
                  onClick={onLoginHandler}
                  color='primary'
                  className='text-[#e3f2fd]'
                />
              )}
            </ThemeProvider>
          </Container>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
