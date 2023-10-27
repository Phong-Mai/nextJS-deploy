'use client'
import  React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import img from '@/pic/add-book-svgrepo-com.svg'
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addBooks } from '@/redux/features/booksSlice';
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
export default function ModalAddBook() {

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
    const [image_url, setImage_url] = useState("")
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [price, setPrice] = useState('')
    const [quantity_in_stock, setQuantity_in_stock] = useState(0)
    const [publication_date, setPublication_date] = useState('2023-10-25')
    const [description, setDescription] = useState<string>('');
    const dispatch = useDispatch()
    const handleSubmit =async () => {
        if(!title) {
            toast.error("Not empty title");
            return
        }
        if(!author) {
            toast.error("Not empty author");
            return
        }
        if(!description) {
            toast.error("Not empty content");
            return
        }
      const data = {title, author, description, price, quantity_in_stock, publication_date, image_url}
        try {
         const rs =  await axios.post("https://bixso-book-mgmt-web.onrender.com/api/v1/books/", data)
         console.log(rs.data.data);
         
          handleCloseModal()
          dispatch(addBooks(rs.data.data))
          toast.success("Success")
        } catch (error) {
          toast.error('fail')
        }
      
    }
    const handleCloseModal = () => {
        setTitle('')
        setAuthor('')
        setDescription('')
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
  return (
    <div>
        <Typography sx={{color:{sm:'#EEEEEE', xs:'black'}, fontSize:20}} onClick={handleOpen}>
<svg  width="30px" height="30px"  viewBox="-0.5 0 16 16" id="add-book-16px" xmlns="http://www.w3.org/2000/svg">
  <path id="Subtração_6" data-name="Subtração 6" d="M7,16H1.5a.5.5,0,0,1-.5-.5V15H.5a.5.5,0,1,1,0-1H1V11H.5a.5.5,0,1,1,0-1H1V7H.5a.5.5,0,1,1,0-1H1V3.045H.5a.5.5,0,1,1,0-1H1V.5A.5.5,0,0,1,1.5,0h10A3.5,3.5,0,0,1,15,3.5V8H14V3.5A2.5,2.5,0,0,0,11.5,1H2V2.045h.545a.5.5,0,0,1,0,1H2V6h.5a.5.5,0,0,1,0,1H2v3h.5a.5.5,0,0,1,0,1H2v3h.5a.5.5,0,0,1,0,1H7v1Z"/>
  <path id="Caminho_266" data-name="Caminho 266" d="M976.148,357.487h0" transform="translate(-961.648 -349.487)" fill="none" stroke="#000000" stroke-linecap="round" stroke-width="1"/>
  <path id="Caminho_267" data-name="Caminho 267" d="M976.148,357.487h0" transform="translate(-969.148 -341.987)" fill="none" stroke="#000000" stroke-linecap="round" stroke-width="1"/>
  <path id="Caminho_179" data-name="Caminho 179" d="M38,12.5a.5.5,0,0,1-.5.5H35v2.5a.5.5,0,0,1-1,0V13H31.5a.5.5,0,0,1,0-1H34V9.5a.5.5,0,0,1,1,0V12h2.5A.5.5,0,0,1,38,12.5Z" transform="translate(-23)"/>
</svg> &nbsp;Add</Typography>
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
          width : {md: 600, xs:'90%'},
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          }}>
          <Typography id="modal-modal-title" variant="h6" color='Highlight' component="h2">
            Add New A Blog
          </Typography>
          <Box component='form'  style={{display:'flex', flexDirection:'column'}}>
            <Button component="label" variant="contained" sx={{width:180, my:2}} startIcon={<CloudUploadIcon />}>
                Upload Image
            <VisuallyHiddenInput type="file" />
            </Button>
            <TextField onChange={(e) => setTitle(e.target.value)} style={{marginBottom:15}} id="standard-basic" label="Title" variant="standard" />
            <TextField onChange={(e)=> setAuthor(e.target.value)} style={{marginBottom:15}} id="standard-basic" label="Author" variant="standard" />
            <TextField onChange={(e)=> setPrice(e.target.value)} style={{marginBottom:15}} id="standard-basic" label="Price" variant="standard" />
            <TextField multiline onChange={(e)=> setDescription(e.target.value)} style={{marginBottom:15}} id="standard-basic" label="Description" variant="standard" />
            <Button onClick={handleSubmit} variant='contained' style={{textAlign:'right'}}>Save</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}