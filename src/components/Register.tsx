import React from 'react';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import styles from './Register.module.css';

const BASE_URL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : '';

export default function Register() {
  const { control, handleSubmit } = useForm();
  const [isRegistered, setIsRegistered] = React.useState<boolean>(false);

  // Modal states
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Submit button
  const onSubmit = (body: any) => {
    axios
      .post(`${BASE_URL}/api/user/signup`, body)
      .then((res) => {
        console.log(res.data);
        setIsRegistered(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant='outlined'
        style={{ marginLeft: '0.5em' }}
      >
        Register
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
                    disabled={isRegistered}
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
                name='email'
                control={control}
                defaultValue=''
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label='E-Mail'
                    type='email'
                    variant='outlined'
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    disabled={isRegistered}
                    style={{ marginTop: '1em' }}
                  />
                )}
                rules={{ required: 'E-Mail is required' }}
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
                    disabled={isRegistered}
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
                disabled={isRegistered}
              >
                Register
              </Button>
              {isRegistered && (
                <Typography
                  variant='overline'
                  display='block'
                  sx={{ color: 'green' }}
                >
                  Registration was succesfull.
                </Typography>
              )}
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
