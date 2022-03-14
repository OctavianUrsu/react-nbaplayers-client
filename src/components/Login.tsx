import React from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import LoginIcon from '@mui/icons-material/Login';

import styles from './Login.module.css';

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField id='outlined-input' label='Login' type='text' />
            <TextField
              style={{ marginTop: '1em' }}
              id='outlined-password-input'
              label='Password'
              type='password'
            />
            <Button style={{ marginTop: '1em' }} variant='text'>
              Login
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
