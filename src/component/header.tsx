"use client"
import  React,{useState, useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import ModalAddBook from './ModalAddBook';
import { useDispatch, useSelector } from 'react-redux';
import { searchBook } from '@/redux/features/booksSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SortPriceBook from './SortPriceBook';
import { signOut, useSession } from 'next-auth/react';
import { deepOrange } from '@mui/material/colors';
import { Avatar } from '@mui/material';
import { selectUser, userLogout } from '@/redux/features/userSlice';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: 'transparent',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header() {  
  const user = useSession()
  const userManual = useSelector(selectUser)
  const [search , setSearch] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();

  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleSearch = (e : any) => {
    setSearch(e.target.value)
   
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(searchBook(search))
    router.push('/search')
  }
  const handleLogout = () => {
    dispatch(userLogout())
    signOut()
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem  onClick={handleLogout}>Log out</MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem sx={{display: 'flex', flexDirection:'column' }}>
      <Avatar
        sx={{ bgcolor: deepOrange[500]}}
        alt="Remy Sharp"
        src={userManual?.image_url}
      >
        {userManual?.username?.slice(0,1).toUpperCase()}
      </Avatar>
      <Typography noWrap my={1}>{userManual?.email}</Typography>
          <ModalAddBook/>
          <SortPriceBook/>
          <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </MenuItem>
    </Menu>
  );
  return (
   <div style={{backgroundImage:`url(https://blog.dktcdn.net/articles/ban-sach-online.jpg)`, height:'100vh', backgroundSize:'cover', backgroundPosition:'center'}}>
     <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor:'transparent'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
             <Link style={{textDecoration:'none', color:'white', zIndex:15}} href={'/home'}><HomeIcon sx={{color:'#EEEEEE'}} /></Link>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', color:'#EEEEEE', fontWeight:'bold', fontSize:30}}}
          >
           Bixso
          </Typography>
          <form onSubmit={(e) => handleSubmit(e)}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => handleSearch(e)}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          </form>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}><SortPriceBook/></Box>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar
        sx={{ bgcolor: deepOrange[500], display:{xs:'none', sm:'flex'} }}
        alt="Remy Sharp"
        src={userManual?.image_url}
      >
        {userManual?.username?.slice(0,1).toUpperCase()}
      </Avatar>
      <Typography sx={{display:{xs:'none', sm:'block'}}} marginLeft={2}>{userManual?.email}</Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <ModalAddBook/>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle sx={{color:'#EEEEEE'}}/>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
   </div>
  );
}