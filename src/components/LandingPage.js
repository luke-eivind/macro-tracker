import './LandingPage.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import $ from 'jquery';
import ListItemText from '@mui/material/ListItemText';
import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function LandingPage(props) {
  const [calories, setCalories] = useState('');
  const [carbs, setCarbs] = useState('10');
  const [fat, setFat] = useState('10');
  const [protein, setProtein] = useState('10');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    console.log(inputText);
  }, [inputText]);

  useEffect(() => {
    document.getElementById('carbs').textContent = carbs;
    document.getElementById('fat').textContent = fat;
    document.getElementById('protein').textContent = protein;
  });

  useEffect(() => {
    createPie('.pieID.legend', '.pieID.pie');
  });
  function sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
  }
  function addSlice(sliceSize, pieElement, offset, sliceID, color) {
    $(pieElement).append(
      "<div class='slice " + sliceID + "'><span></span></div>"
    );
    var offset = offset - 1;
    var sizeRotation = -179 + sliceSize;
    $('.' + sliceID).css({
      transform: 'rotate(' + offset + 'deg) translate3d(0,0,0)',
    });
    $('.' + sliceID + ' span').css({
      transform: 'rotate(' + sizeRotation + 'deg) translate3d(0,0,0)',
      'background-color': color,
    });
  }
  function iterateSlices(
    sliceSize,
    pieElement,
    offset,
    dataCount,
    sliceCount,
    color
  ) {
    var sliceID = 's' + dataCount + '-' + sliceCount;
    var maxSize = 179;
    if (sliceSize <= maxSize) {
      addSlice(sliceSize, pieElement, offset, sliceID, color);
    } else {
      addSlice(maxSize, pieElement, offset, sliceID, color);
      iterateSlices(
        sliceSize - maxSize,
        pieElement,
        offset + maxSize,
        dataCount,
        sliceCount + 1,
        color
      );
    }
  }
  function createPie(dataElement, pieElement) {
    var listData = [];
    $(dataElement + ' span').each(function () {
      listData.push(Number($(this).html()));
    });
    var listTotal = 0;
    for (var i = 0; i < listData.length; i++) {
      listTotal += listData[i];
    }
    var offset = 0;
    var color = [
      'orange',
      'crimson',
      'olivedrab',
      'purple',
      'tomato',
      'turquoise',
      'forestgreen',
      'navy',
      'gray',
    ];
    for (var i = 0; i < listData.length; i++) {
      var size = sliceSize(listData[i], listTotal);
      iterateSlices(size, pieElement, offset, i, 0, color[i]);
      $(dataElement + ' li:nth-child(' + (i + 1) + ')').css(
        'border-color',
        color[i]
      );
      offset += size;
    }
  }

  const changeCaloriesHandler = (event) => {
    setCalories(event.target.value);
    setInputText(event.target.value);
  };

  const changeCarbsHandler = (event) => {
    setCarbs(event.target.value);
    setInputText(event.target.value);
  };

  const changeFatHandler = (event) => {
    setFat(event.target.value);
    setInputText(event.target.value);
  };

  const changeProteinHandler = (event) => {
    setProtein(event.target.value);
    setInputText(event.target.value);
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Macro Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div class='card'>
        <Box
          component='form'
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete='off'
        >
          <TextField
            id='calories-input'
            label='Calories'
            type='number'
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
                text: 'white',
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
                text: 'white',
              },
            }}
            style={{ margin: '30px', position: 'relative' }}
            variant='outlined'
            onChange={changeCaloriesHandler}
          />
          <TextField
            id='carbs-input'
            label='Carbs'
            type='number'
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
                text: 'white',
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
                text: 'white',
              },
            }}
            style={{ margin: '30px', position: 'relative' }}
            variant='outlined'
            onChange={changeCarbsHandler}
          />
          <TextField
            id='fat-input'
            label='Fat'
            type='number'
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
                text: 'white',
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
                text: 'white',
              },
            }}
            style={{ margin: '30px', position: 'relative' }}
            variant='outlined'
            onChange={changeFatHandler}
          />
          <TextField
            id='protein-input'
            label='Protein'
            type='number'
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
                text: 'white',
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
                text: 'white',
              },
            }}
            style={{ margin: '30px', position: 'relative' }}
            variant='outlined'
            onChange={changeProteinHandler}
          />
        </Box>
      </div>
      <div class='card'>
        <section>
          <div class='pieID pie'></div>
          <ul class='pieID legend'>
            <li>
              <em>Carbs</em>
              <span id='carbs'>70</span>
            </li>
            <li>
              <em>Fat</em>
              <span id='fat'>50</span>
            </li>
            <li>
              <em>Protein</em>
              <span id='protein'>100</span>
            </li>
          </ul>
        </section>
        <Link to='/plan'>
          <Button
            className='btn-7'
            onClick={props.clickNextHandler(calories, carbs, fat, protein)}
          >
            Next
          </Button>
        </Link>
      </div>

      <div class='bottom'>
        <svg
          class='waves'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          viewBox='0 24 150 28'
          preserveAspectRatio='none'
          shape-rendering='auto'
        >
          <defs>
            <path
              id='gentle-wave'
              d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
            />
          </defs>
          <g class='parallax'>
            <use
              xlinkHref='#gentle-wave'
              x='48'
              y='0'
              fill='rgba(255,255,255,0.7'
            />
            <use
              xlinkHref='#gentle-wave'
              x='48'
              y='3'
              fill='rgba(255,255,255,0.5)'
            />
            <use
              xlinkHref='#gentle-wave'
              x='48'
              y='5'
              fill='rgba(255,255,255,0.3)'
            />
            <use xlinkHref='#gentle-wave' x='48' y='7' fill='#fff' />
          </g>
        </svg>
      </div>
    </div>
  );
}
