import React from 'react';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LoginIcon from '@mui/icons-material/Login';

import styles from './Login.module.css';

const BASE_URL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : '';

export default function Login() {
  const { control, handleSubmit } = useForm();
  const [isLogged, setIsLogged] = React.useState<boolean>(false);
  const [isCredentialError, setIsCredentialError] = React.useState<boolean>(false);

  // Modal states
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Submit button
  const onSubmit = (body: any) => {
    axios
      .post(`${BASE_URL}/api/user/signin`, body)
      .then((res) => {
        setIsCredentialError(false);
        setIsLogged(true);
      })
      .catch((err) => {
        console.error(err);
        setIsCredentialError(true);
      });
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant='contained'
        startIcon={<LoginIcon />}
      >
        Login
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className={styles.modal}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Controller
                name='nickname'
                control={control}
                defaultValue=''
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label='Nickname'
                    type='text'
                    variant='outlined'
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    disabled={isLogged}
                  />
                )}
                rules={{
                  required: 'Nickname is required',
                  minLength: {
                    value: 3,
                    message:
                      'The nickname should be at least 3 characters long',
                  },
                  maxLength: {
                    value: 12,
                    message:
                      'The nickname should not be longer than 12 characters',
                  },
                }}
              />
              <Controller
                name='password'
                control={control}
                defaultValue=''
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label='Password'
                    type='password'
                    variant='outlined'
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    disabled={isLogged}
                    style={{ marginTop: '1em' }}
                  />
                )}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message:
                      'The password should be at least 6 characters long',
                  },
                }}
              />
              <Button
                style={{ marginTop: '1em' }}
                variant='contained'
                type='submit'
                disabled={isLogged}
              >
                Login
              </Button>
              {isLogged && (
                <Typography
                  variant='overline'
                  display='block'
                  sx={{ color: 'green' }}
                >
                  Login was succesful.
                </Typography>
              )}
              {isCredentialError && (
                <Typography
                  variant='overline'
                  display='block'
                  sx={{ color: 'red' }}
                >
                  Credentials are wrong.
                </Typography>
              )}
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
