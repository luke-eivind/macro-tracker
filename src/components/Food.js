import './Food.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Food = (props) => {
  const clickDeletedHandler = () => {
    props.deleteHandler(props.name);
  };

  const updateQuantityHandler = (e) => {
    props.updateQuantityHandler(props.name, e.target.value);
  }
  

  return (
    <div className='food-item card'>
      <TextField className='number-input' value={props.quantity.toFixed(2)} type='number' defaultValue='100' onChange={updateQuantityHandler} />
      <img src={props.img} />
      &nbsp;&nbsp;
      <b>Name:</b> &nbsp;{props.name}&nbsp;&nbsp;
      <b>Calories:</b> &nbsp;{props.calories}&nbsp;&nbsp;
      <b>Protien:</b> &nbsp;{props.protein}&nbsp;&nbsp;
      <b>Carbs:</b> &nbsp;{props.carbs}&nbsp;&nbsp;
      <b>Fat:</b> &nbsp;{props.fat}&nbsp;&nbsp;
      <Button onClick={clickDeletedHandler}>delete</Button>
    </div>
  );
};

export default Food;
