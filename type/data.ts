interface MealsProps {
  schedule: string;
  name: string;
  food: string;
}

export interface Data {
  name: string;
  weight: string;
  height: string;
  age: string;
  gender: string;
  goal: string;
  level: string;
  meals: MealsProps;
}
