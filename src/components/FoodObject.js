import Food from './Food';

export default class FoodObject {
  constructor(
    calories,
    carbs,
    fat,
    protein,
    quantity,
    name,
    img,
    clickDeleteHandler,
    clickUpHandler
  ) {
    this.calories = calories;
    this.carbs = carbs;
    this.fat = fat;
    this.protein = protein;
    this.quantity = quantity;
    this.name = name;
    this.img = img;
    this.clickDeleteHandler = clickDeleteHandler;
    this.clickUpHandler = clickUpHandler;
  }

  get totalCalories() {
    return this.calories * this.quantity;
  }

  get totalCarbs() {
    return this.carbs * this.quantity;
  }

  get totalFat() {
    return this.fat * this.quantity;
  }

  get totalProtein() {
    return this.protein * this.quantity;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
    this.totalCalories = this.calories * quantity;
  }

  get component() {
    return (
      <Food
        img={this.img}
        name={this.name}
        calories={this.totalCalories.toFixed(2)}
        protein={this.totalProtein.toFixed(2)}
        carbs={this.totalCarbs.toFixed(2)}
        fat={this.totalFat.toFixed(2)}
        deleteHandler={this.clickDeleteHandler}
        clickUpHandler={this.clickUpHandler}
      ></Food>
    );
  }
}
