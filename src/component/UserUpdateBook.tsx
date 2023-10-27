import  React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import {  getBook, selectValue } from '@/redux/features/counterSlice';
import { Box, Container, Stack } from '@mui/system';
import Ratings from './Rating';
import { TextField, Typography } from '@mui/material';
import UserRating from './UserRating';
import ModalUpdateBook from './ModalUpdateBook';

export default function UserUpdateBook() {
  const value = useSelector(selectValue)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBook())
  },[])
  return (
    <Box sx={{marginTop:5}}>
      <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 1, md: 4 }}
      sx={{display :' flex', justifyContent:'space-evenly'}}
      >
      <Box sx={{width: {sm:700, xs:'100%'} }}>
      <Card >
      <CardMedia
        sx={{ height: 400 }}
        image={value.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {value.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Author : {value.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions sx={{color:'blue', justifyContent:'center'}}>
        Price: {value.price}$
      </CardActions>
    </Card>
    <Stack
    my={3}
    mx='auto'
      direction='column'
      spacing={{ xs: 1, sm: 2, md: 3}}
      sx={{width:'100%'}}
      >
         <Typography>Lịch sử thay đổi</Typography>
      <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScNb4-qtstEm2vIdwHDOgeJaxq2n_w4LIKzQ&usqp=CAU" />
      <span>Name</span>
      </Stack>
        <Typography>10/10/2023</Typography>
        <Typography>đã update Image..., title..., author...</Typography>
      </Stack>
    </Box>
    <Box sx={{width:{ sm:400, xs:'100%'}}} >
      <Stack direction='column' spacing={{ xs: 1, sm: 2, md: 4 }}   >
      <ModalUpdateBook value={value}/>
      </Stack>
    </Box>
    </Stack>
    </Box>
  );
}