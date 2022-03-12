import './LandingPage.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import $ from 'jquery';

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
    event.target.value = Number.isInteger(Number(event.target.value))
      ? event.target.value
      : 0;
    setCalories(event.target.value);
    setInputText(event.target.value);
  };

  const changeCarbsHandler = (event) => {
    event.target.value = Number.isInteger(Number(event.target.value))
      ? event.target.value
      : 0;
    setCarbs(event.target.value);
    setInputText(event.target.value);
  };

  const changeFatHandler = (event) => {
    event.target.value = Number.isInteger(Number(event.target.value))
      ? event.target.value
      : 0;
    setFat(event.target.value);
    setInputText(event.target.value);
  };

  const changeProteinHandler = (event) => {
    event.target.value = Number.isInteger(Number(event.target.value))
      ? event.target.value
      : 0;
    setProtein(event.target.value);
    setInputText(event.target.value);
  };

  return (
    <div>
      <h1>Macro Tracker</h1>
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
            style={{ margin: '30px', position: 'relative' }}
            variant='outlined'
            onChange={changeCaloriesHandler}
          />
          <TextField
            id='carbs-input'
            label='Carbs'
            style={{ margin: '30px', position: 'relative' }}
            variant='outlined'
            onChange={changeCarbsHandler}
          />
          <TextField
            id='fat-input'
            label='Fat'
            style={{ margin: '30px', position: 'relative' }}
            variant='outlined'
            onChange={changeFatHandler}
          />
          <TextField
            id='protein-input'
            label='Protein'
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
