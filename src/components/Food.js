import './Food.css'

const Food = (props) => {
  return (
    <div className="food-item">
      Name: {props.name}<br/>
      Calories: {props.calories}<br/>
      Protien: {props.protein}<br/>
      Carbs: {props.carbs}<br/>
      Fat: {props.fat}<br/>
    </div>
  );
};

export default Food;
