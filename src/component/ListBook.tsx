"use client"
import React, {useState, useEffect, useRef} from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, getBook, selectValue } from '@/redux/features/counterSlice';
import { useRouter } from 'next/navigation';
import { getBooks, selectBooks, selectSearch, selectSortPrice } from '@/redux/features/booksSlice';
import { Box, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea/CardActionArea';
import EditIcon from '@mui/icons-material/Edit';
import ModalDeleteBook from './ModalDeleteBook';
import Loading from './Loading';
import {  selectUser, setUser } from '@/redux/features/userSlice';
import { useSession } from 'next-auth/react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));



// props api {booksTest} : booksProps
export default function ListBook() {
    const user = useSelector(selectUser)
    const userGoogle = useSession()
    const books = useSelector(selectBooks)
    const [time, setTime] = useState(false)
    const sortBook = useSelector(selectSortPrice)
    const router = useRouter()
    const dispatch = useDispatch()
    const handleClick = (detailBook : any) => {
        dispatch(addBook(detailBook))
        router.push('/home/viewdetail')
    }    
  const handleEdit = (detailBook : any) => {
    dispatch(addBook(detailBook))
  }
   useEffect(() => {
    if(!user && userGoogle.status === "unauthenticated") {
      router.push('/')
      return
    }
    if(userGoogle.status === "authenticated"){
      dispatch(setUser({
        username: userGoogle.data?.user?.name,
        email: userGoogle.data?.user?.email,
        image_url: userGoogle.data?.user?.image
      }))
    }
   },[sortBook, userGoogle])
  return (
      <Box my={4} >

          <Grid container spacing={2}>
          {books?.map((book :any, index : any) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
            <Card key={index}  >
              <CardActionArea >
            <CardMedia onClick={() => handleClick(book)}
              sx={{ height: 200}}
              image={book.image_url}
              title="green iguana"
        />
        <CardContent onClick={() => handleClick(book)}>
          <Typography noWrap gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography fontSize={18} gutterBottom variant="h5" component="div">
            Author : {book.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.description}
          </Typography>
          <Typography marginTop={1} color='blue'> Price: {book.price}$</Typography>
        </CardContent>
        <CardActions sx={{justifyContent:'space-between'}}>    
          <Button onClick={() => handleEdit(book)} href='/home/update-book' color='success' size="small" endIcon={<EditIcon/>}>Edit</Button>
          <ModalDeleteBook id={book.id}/>
        </CardActions>
        </CardActionArea>
        </Card>
        </Grid>
       ))}
        </Grid>
         
    
      </Box>

  );
}
