'use client'
import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { decrease, increase } from '@/redux/features/booksSlice';
import Box from '@mui/material/Box/Box';
import { Fade, Menu } from '@mui/material';

export default function SortPriceBook() {
    const dispatch = useDispatch()
    const [sort, setSort] = useState('')
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  const handleIncrease = () => {
    dispatch(increase())
    handleClose()
  }
  const handleDecrease = () => {
    dispatch(decrease())
    handleClose()
  }
  return (

      <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{color:{sm:'#EEEEEE', xs:'black'}}}
      >
        Sort By Price
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
         <MenuItem onClick={handleIncrease}  value='increase'>increase</MenuItem>
          <MenuItem onClick={handleDecrease} value='decrease'>decrease</MenuItem>
      
      </Menu>
    </div>

  );
}