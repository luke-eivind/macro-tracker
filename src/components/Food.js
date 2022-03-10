import './Food.css';
import Button from '@mui/material/Button';

const Food = (props) => {
  const clickDeletedHandler = () => {
    props.deleteHandler(props.name);
  };

  const clickUpHandler = () => {
    props.clickUpHandler(props.name);
  }

  return (
    <div className='food-item card'>
      <img src={props.img} />
      &nbsp;&nbsp;
      <b>Name:</b> &nbsp;{props.name}&nbsp;&nbsp;
      <b>Calories:</b> &nbsp;{props.calories}&nbsp;&nbsp;
      <b>Protien:</b> &nbsp;{props.protein}&nbsp;&nbsp;
      <b>Carbs:</b> &nbsp;{props.carbs}&nbsp;&nbsp;
      <b>Fat:</b> &nbsp;{props.fat}&nbsp;&nbsp;
      <Button onClick={clickDeletedHandler}>delete</Button>
      <Button onClick={clickUpHandler}>up one gram</Button>
    </div>
  );
};

export default Food;
