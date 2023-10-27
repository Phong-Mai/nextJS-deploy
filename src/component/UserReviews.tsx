import { Avatar, Box, Card, Stack } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import UserRating from './UserRating';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { Container } from '@mui/system';
import TotalUserRating from './TotalUserRating';
const UserReviews = ({review}) => {
  return (
        <Box>
        <Grid  container>
          <Grid item xs={12}>
          <Card sx={{display:'flex', flexDirection:'column', py:5 ,alignItems:'center', justifyContent:'center'}}>
                   <Typography>Average rating</Typography>
                    <Typography fontSize={50} >0.6</Typography>
                    <TotalUserRating/>
                </Card>
          </Grid>
          <Grid item xs={12} >
          <Card sx={{display:'flex', flexDirection:{sm:'row', xs:'column'}, justifyContent:'space-evenly', alignItems:{sm:'center'},}}>
        <Box sx={{display:'flex',flexDirection:{sm:'column', xs:'row'}, marginTop:{xs:1}, justifyContent:'space-evenly', alignItems:'center' }}>
        <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScNb4-qtstEm2vIdwHDOgeJaxq2n_w4LIKzQ&usqp=CAU" />
      <Typography  sx={{fontWeight:'bold'}} py={2}>Name : User ??</Typography>
      <Typography color='GrayText'>20 Otc 2023</Typography>
        </Box> 
          <Box>
       <UserRating rating={review?.rating}/>
        <Typography py={2}>Thông tin bình luận</Typography>
        <Typography paddingBottom={2}>{review?.comment}</Typography>
        <div>
          <span style={{paddingRight:30}}><ThumbUpOffAltIcon fontSize='small'/> 156</span> 
          <span><ThumbDownOffAltIcon fontSize='small'/> 50</span>
        </div>
       </Box>
       </Card>
          </Grid>
        </Grid>
      </Box>

  )
}

export default UserReviews
