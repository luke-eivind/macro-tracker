import './Food.css';
import Button from '@mui/material/Button';

const Food = (props) => {
  const clickHandler = () => {
    props.deleteHandler(props.name);
  };

  console.log(props.fat)

  return (
    <div className='food-item card'>
      <img src={props.img} />
      &nbsp;&nbsp;
      <b>Name:</b> &nbsp;{props.name}&nbsp;&nbsp;
      <b>Calories:</b> &nbsp;{props.calories}&nbsp;&nbsp;  
      <b>Protien:</b> &nbsp;{props.protein}&nbsp;&nbsp;
      <b>Carbs:</b> &nbsp;{props.carbs}&nbsp;&nbsp;
      <b>Fat:</b> &nbsp;{parseInt(props.fat).toFixed(2)}&nbsp;&nbsp;
      <Button onClick={clickHandler}>delete</Button>
    </div>
  );
};

export default Food;
