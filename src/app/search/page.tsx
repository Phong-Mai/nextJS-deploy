"use client"
import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { addBook, getBook, selectValue } from '@/redux/features/counterSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getBooks, selectBooks, selectSearch } from '@/redux/features/booksSlice';
import { Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import ModalDeleteBook from '@/component/ModalDeleteBook';
import EditIcon from '@mui/icons-material/Edit';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ListBook() {
    const router = useRouter()
    const [books, setBook] = useState<any>([])
    console.log(books);
    
    const search = useSelector(selectSearch)
    const dispatch = useDispatch()
    const handleClick = (detailBook : any) => {
        dispatch(addBook(detailBook))
        router.push('/home/viewdetail')
    }    
    const handleEdit = (detailBook : any) => {
      dispatch(addBook(detailBook))
    }
    useEffect(() => {
        setBook(search || localStorage.getItem("search"))
    },[search])
    
  return (
    <Box  my={4} >
    
          <Grid container spacing={2}>
          {books?.map((book :any, index : any) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
            <Card >
              <CardActionArea >
            <CardMedia onClick={() => handleClick(book)}
              sx={{ height: 200}}
              image={book.image}
              title="green iguana"
        />
        <CardContent onClick={() => handleClick(book)}>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography fontSize={18} gutterBottom variant="h5" component="div">
            Author : {book.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <Typography marginTop={1} color='blue'> Price: {book.price}$</Typography>
        </CardContent>
       
        <CardActions sx={{justifyContent:'space-between'}}>    
          <Button onClick={() => handleEdit(book)} href='/home/update-book' color='success' size="small" endIcon={<EditIcon/>}>Edit</Button>
          <ModalDeleteBook/>
        </CardActions>
        </CardActionArea>
        </Card>
        </Grid>
       ))}
        </Grid>
      </Box>
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 700}} aria-label="customized table">
    //     <TableHead>
    //       <TableRow>
    //         <StyledTableCell>Image</StyledTableCell>
    //         <StyledTableCell align="right">Author</StyledTableCell>
    //         <StyledTableCell align="right">Title</StyledTableCell>
    //         <StyledTableCell align="right">Description</StyledTableCell>
    //         <StyledTableCell align="right">Price</StyledTableCell>
    //         <StyledTableCell align="right">Action</StyledTableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {books?.map((book, index) => (
    //         <StyledTableRow onClick={() => handleClick(book)} key={index}>
    //          <StyledTableCell component="th" scope="book">
    //             <img width={150} height={150} src={book.image}/>
    //           </StyledTableCell>
    //           <StyledTableCell align="right">{book.author}</StyledTableCell>
    //           <StyledTableCell align="right">{book.title}</StyledTableCell>
    //           <StyledTableCell align="right">{book.description}</StyledTableCell>
    //           <StyledTableCell align="right">{book.price}$</StyledTableCell>
    //           <StyledTableCell align="right">
    //           <Button sx={{marginRight:1}} size='small' color='success' variant="outlined">Edit</Button>
    //           <Button size='small' color='warning' variant="outlined">Delete</Button>
    //           </StyledTableCell>
    //         </StyledTableRow>
    //       ))}
    //     </TableBody>
 
    //   </Table>
    //   {search?.length === 0 && <p style={{textAlign:'center'}}>No results were found</p>}
    // </TableContainer>
  );
}