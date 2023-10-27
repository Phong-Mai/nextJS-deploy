'use client'
import  React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete'
interface IProps {
    showModal: boolean;
    setShowModal: (value : boolean) => void
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
export default function ModalEditConfirmPassword() {

  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  
  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };
  
  const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    max-width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    margin-bottom: 15px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 24px ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState<string>('');
    const [isPassword, setIsPassword] = useState<boolean>(false)
    const handleSubmit = () => {
        if(!password) {
          setIsPassword(true)
            return
        }
    }
    const handleCloseModal = () => {
        setPassword('')
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleInput = (e: any) => {
      setPassword(e.target.value)
      setIsPassword(false)
    }
  return (
    <div>
        <Button color='inherit' onClick={handleOpen}>Save</Button>
      <Modal
        open={open}
        onClose={()=> handleCloseModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box  sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width : {md: 400, xs:'90%'},
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          }}>
          <Typography fontSize={30} id="modal-modal-title" variant="h6" color='error' component="h2">
            Update New A Book
          </Typography>
          <Box component='form'  style={{display:'flex', flexDirection:'column'}}>
          <Typography py={2}>
          Confirm Password
          </Typography>
          <TextField type='password' onChange={handleInput} required id="outlined-basic" label="Password" variant="outlined" />
          {isPassword && <Typography py={1} color='red'>Please enter a password</Typography>}
            <div style={{alignSelf:'flex-end'}}>
            <Button onClick={()=> handleCloseModal()} color='success'  style={{marginRight:5}}>Cancel</Button>
            <Button onClick={(e) => handleSubmit(e)} color='error'  style={{textAlign:'right'}}>Agree</Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}