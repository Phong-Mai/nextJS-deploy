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
import { styled } from '@mui/system';
import ModalEditConfirmPassword from './ModalEditConfirmPassword';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addBook } from '@/redux/features/counterSlice';
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
export default function ModalUpdateBook({value}: {value : any}) {
    const {title, author, description, price, quantity_in_stock, publication_date, image_url } = value
    const [_image_url, set_Image_url] = useState<string>('')
    const [_title, set_Title] = useState<string>(title);
    const [_author, set_Author] = useState<string>(author);
    const [_price, set_Price] = useState<string>(price)
    const [_quantity_in_stock, set_Quantity_in_stock] = useState<string>("20")
    const [_description, set_Description] = useState<string>(description);
    const [_publication_date, set_Publication_date] = useState<string>("2023-10-26")
    const [password, setPassword] = useState<string>('');
    const [isPassword, setIsPassword] = useState<boolean>(false)
    const [checkPassword, setCheckPassWord] = useState<boolean>(false)
    const dispatch = useDispatch()
    
    const handleSubmit =async () => {
        // if(!password) {
        //     setIsPassword(true)
        //     return
        // }
        try {
         const rs = await axios.put(`https://bixso-book-mgmt-web.onrender.com/api/v1/book/${value.id}`, {
            author: _author,
            title: _title,
            price: _price,
            quantity_in_stock: _quantity_in_stock,
            publication_date: _publication_date
          })
          dispatch(addBook(rs.data.data))
          toast.success('Update Success')
        } catch (error) {
          toast.error('Update Fail')
        }
    }

    const handleInput = (e: any) => {
      setPassword(e.target.value)
      setIsPassword(false)
    }
  return (
    <div>
      
          <Typography id="modal-modal-title" variant="h6" color='Highlight' component="h2">
            Add New A Blog
          </Typography>
          <Box component='form'  style={{display:'flex', flexDirection:'column'}}>
            <Button component="label" variant="contained" sx={{width:180, my:2}} startIcon={<CloudUploadIcon />}>
                Upload Image
            <VisuallyHiddenInput type="file" />
            </Button>
            <TextField onChange={(e) => set_Title(e.target.value)} defaultValue={title} style={{marginBottom:15}} focused   label="Title" variant="standard" />
            <TextField onChange={(e)=> set_Author(e.target.value)} defaultValue={author} style={{marginBottom:15}} focused  label="Author" variant="standard" />
            <TextField onChange={(e)=> set_Price(e.target.value)} defaultValue={price} style={{marginBottom:15}} focused label="Price" variant="standard" />
            <TextField multiline onChange={(e)=> set_Description(e.target.value)} defaultValue={description} style={{marginBottom:15}} focused label="Description" variant="standard" />
            <TextField  type='password' onChange={handleInput} required id="outlined-basic" label="Confirm Password" style={{marginBottom:15}} variant="outlined" />
            {isPassword && <Typography paddingBottom={1} color='red'>Please enter a password</Typography>}
            {checkPassword && <Typography paddingBottom={1} color='red'>Incorrect Password</Typography>}
            <Button onClick={handleSubmit} variant='contained' style={{textAlign:'right'}}>Save</Button>
          </Box>
       
    </div>
  );
}