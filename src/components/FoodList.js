import './FoodList.css';
import Button from '@mui/material/Button';

const FoodList = (props) => {

  return (
    <div className="food-list">
      <h2>
        <b>Foods</b>
      </h2>
      {props.components}
    </div>
  );
};

export default FoodList;
