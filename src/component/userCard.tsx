import  React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { getBook, selectValue } from '@/redux/features/counterSlice';
import { Box, Stack } from '@mui/system';
import Ratings from './Rating';
import { Grid, TextField, Typography } from '@mui/material';
import UserRating from './UserRating';
import UserReviews from './UserReviews';
import Container from '@mui/material/Container';
import axios from 'axios';
import { selectUser } from '@/redux/features/userSlice';
export default function UserCard() {
  const [review, setReview] = useState()
  const [text, setText] = useState()
  console.log(text);
  const token = useSelector(selectUser)
  
  const value = useSelector(selectValue)
  const [rating, setRating] = useState(1)
  const dispatch = useDispatch();
  const handleChange = (e : any) => {
    setText(e.target.value)
  }
  const fetch =async () => {
    try {
      const rs =await axios(`https://bixso-book-mgmt-web.onrender.com/api/v1/book/${value.id}/reviews`)
      setReview(rs.data)
    } catch (error) {
    }
  }
  useEffect(() => {
    fetch()
    dispatch(getBook())
  },[])
  const handleSubmit =async () => {
    try {
      const rs =await axios.post(`https://bixso-book-mgmt-web.onrender.com/api/v1/book/${value.id}/reviews`,{rating: rating, comment: text, token: token.token})
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
  
       <Grid marginTop={2}  container spacing={4}>
      <Grid item xs={12} sm={6}>
      <Card sx={{width:'100%'}}>
      <CardMedia
        sx={{ height: {xs: 200, sm:400}, width:'100%' }}
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
      </Grid>
      <Grid item xs={12} sm={6}>
      <Box sx={{width:{ sm:'100%', xs:'100%'}}} >
      <Stack direction='column'  >
      <Ratings 
      rating={rating}
      setRating={setRating}
      />
      <Typography>Comment</Typography>
      <TextField
          onChange={(e) => handleChange(e)}
          sx={{my: 2}}
          fullWidth
          id="outlined-multiline-static"
          label="Content"
          multiline
          rows={8}
        />
        <Button onClick={handleSubmit} variant="outlined">Submit</Button>
      </Stack>
    </Box>
      </Grid>
    <Grid item xs={12}>
    <UserReviews review={review}/>
    </Grid>
    </Grid>
   

  );
}