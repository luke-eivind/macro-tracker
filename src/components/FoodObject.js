import Food from "./Food";

export default class FoodObject {
    constructor(calories, carbs, fat, protein, quantity){
        this.calories = calories
        this.carbs = carbs
        this.fat = fat
        this.protein = protein
        this.totalCalories = calories * quantity
        this.totalCarbs = carbs * quantity
        this.totalFat = fat * quantity
        this.totalProtein = protein * quantity
        this.component = {}
    }

    setComponent(name, img, clickDeleteHandler) {
        this.component = <Food
        img={img}
        name={name}
        calories={this.totalCalories}
        protein={this.totalProtein}
        carbs={this.totalCarbs}
        fat={this.totalFat}
        deleteHandler={clickDeleteHandler}
      ></Food>
    }


}