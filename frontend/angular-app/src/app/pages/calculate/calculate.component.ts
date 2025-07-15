import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Person {
  id:number;
  name: string;
  username: string;
}
interface Food {
  id: number;
  name: string;
}
interface Drink {
  id: number;
  name: string; 
}
interface dessert {
  id: number;
  name: string;
}


@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrl: './calculate.component.scss'
})
export class CalculateComponent implements OnInit {
  formGroup!: FormGroup;
  people: Person[] = [];
  foods: Food[] = [
    { id: 1, name: 'Pizza' },
    { id: 2, name: 'Burger' },
    { id: 3, name: 'Pasta' }
  ];
  drinks: Drink[] = [
    { id: 1, name: 'Coke' },
    { id: 2, name: 'Water' },
    { id: 3, name: 'Juice' }
  ];
  desserts: dessert[] = [
    { id: 1, name: 'Ice Cream' },
    { id: 2, name: 'Cake' },
    { id: 3, name: 'Pie' }
  ];
   constructor(private fb: FormBuilder) {
    // formGroup’a tüm kontrolerimizi ekliyoruz
    this.formGroup = this.fb.group({
      person:  [null, Validators.required],
      food:    [null, Validators.required],
      drink:   [null, Validators.required],
      dessert: [null, Validators.required],
      amount:  [null, [Validators.required, Validators.min(0)]]
    });
  }  
  ngOnInit(): void {
    this.people = [
      { id: 1, name: 'John Doe', username: 'johndoe' },
      { id: 2, name: 'Jane Smith', username: 'janesmith' },
      { id: 3, name: 'Alice Johnson', username: 'alicej' }
    ];
  }
}
