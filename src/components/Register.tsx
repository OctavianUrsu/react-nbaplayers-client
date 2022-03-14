import React from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';

import styles from './Register.module.css';

export default function Register() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField id='outlined-input' label='Login' type='text' />
            <TextField
              id='outlined-input'
              label='E-Mail'
              type='email'
              style={{ marginTop: '1em' }}
            />
            <TextField
              id='outlined-password-input'
              label='Password'
              type='password'
              style={{ marginTop: '1em' }}
            />
            <Button style={{ marginTop: '1em' }} variant='text'>
              Register
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
