import './Food.css'
import Button from '@mui/material/Button';

const Food = (props) => {

  const clickHandler = () => {
    props.deleteHandler(props.name)
  }
  
  return (
    <div className="food-item">
      Name: {props.name}<br/>
      Calories: {props.calories}<br/>
      Protien: {props.protein}<br/>
      Carbs: {props.carbs}<br/>
      Fat: {props.fat}<br/>

      <Button onClick={clickHandler} >delete</Button>
    </div>
  );
};

export default Food;
