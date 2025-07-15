// calculate.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Person {
  id: number;
  name: string;
  username: string;
}
interface Food {
  id: number;
  name: string;
  price: number;
}
interface Drink {
  id: number;
  name: string;
  price: number;
}
interface Dessert {
  id: number;
  name: string;
  price: number;
}
interface CardModel {
  id:number;
  form: FormGroup;
  personid?: number;
  foodid?: number;
  drinkid?: number; 
  dessertid?: number;
  qty: { food: number, drink: number, dessert: number };
  total?: number;
  amount?: number;
  deleted?: boolean;
}

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss'],
})
export class CalculateComponent implements OnInit {
  formGroup: FormGroup;
  cards: CardModel[] = [];
  people: Person[] = [
    { id: 1, name: 'Ömer Can Korkmaz', username: 'omerkrkmz' },
    { id: 2, name: 'Mehmet Baran Turan', username: 'mehmetrn' },
    { id: 3, name: 'Emre Toka', username: 'emretk' },
    { id: 4, name: 'Deniz Erkin', username: 'derkn' },
    { id: 5, name: 'Batuhan', username: 'batu' },
    { id: 6, name: 'Mehmet Yiğit', username: 'mehmetyt' },
    { id: 7, name: 'Emircan', username: 'emrcn' },
    { id: 8, name: 'Hüsrev', username: 'husrev' },
    { id: 9, name: 'Yağmur', username: 'yagmur' },
    { id: 10, name: 'Burak', username: 'brkkc' },
  ];
  foods: Food[] = [
    { id: 1, name: 'Mercimek Çorbası', price: 120 },
    { id: 2, name: 'Ezogelin Çorbası', price: 120 },
    { id: 3, name: 'Antep Lahmacun', price: 190 },
    { id: 4, name: 'Lahmacun', price: 170 },
    { id: 5, name: 'Döner', price: 440 },
    { id: 6, name: 'Pilav Üstü Döner', price: 460 },
    { id: 7, name: 'Tavuk Şiş', price: 430 },
    { id: 8, name: 'Adana', price: 440 },
    { id: 9, name: 'Kaşarlı Pide', price: 410 },
    { id: 10, name: 'Kıymalı Pide', price: 380 },
    { id: 11, name: 'Kıymalı Kaşarlı Pide', price: 400 },
    { id: 12, name: 'Kuşbaşılı Pide', price: 460 },
    { id: 13, name: 'Kuşbaşılı Kaşarlı Pide', price: 480 },
    { id: 14, name: 'Karışık Pide', price: 410 },
  ];
  drinks: Drink[] = [
    { id: 1, name: 'Su', price: 20 },
    { id: 2, name: 'Ayran', price: 70 },
    { id: 3, name: 'Soda', price: 30 },
    { id: 4, name: 'Kola', price: 70 },
    { id: 5, name: 'Fanta', price: 70 },
    { id: 6, name: 'Meyve Suyu', price: 70 },
    { id: 7, name: 'Fuse Tea', price: 70 },
    { id: 8, name: 'Şalgam', price: 40 },
    { id: 9, name: 'Sprite', price: 70 },
  ];
  desserts: Dessert[] = [
    { id: 1, name: 'Şöbiyet', price: 165 },
    { id: 2, name: 'Fıstıklı Baklava', price: 165 },
    { id: 3, name: 'Cevizli Baklava', price: 142.5 },
    { id: 4, name: 'Havuç Dilimi', price: 165 },
    { id: 5, name: 'Fıstıklı Kadayıf', price: 142.5 },
    { id: 6, name: 'Sultan', price: 165 },
    { id: 7, name: 'Karışık Tatlı', price: 165 },
    { id: 8, name: 'Dürüm', price: 195 },
    { id: 9, name: 'Kaymaklı Baklava', price: 135 },
    { id: 10, name: 'Dondurma', price: 50 },
  ];

  // Adet takibi ve toplam için stub
  qty = { food: 1, drink: 1, dessert: 1 };
  total = 0;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      person: [null, Validators.required],
      food: [null, Validators.required],
      drink: [null, Validators.required],
      dessert: [null, Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    const form = this.fb.group({
      person: [null, Validators.required],
      food: [null, Validators.required],
      drink: [null, Validators.required],
      dessert: [null, Validators.required],
      qty: this.fb.group({
        food: [1, [Validators.required, Validators.min(1)]],
        drink: [1, [Validators.required, Validators.min(1)]],
        dessert: [1, [Validators.required, Validators.min(1)]],
      }), 
      total: [0, [Validators.required, Validators.min(0)]],
      amount: [0, [Validators.required, Validators.min(0)]],  
    })
    const firstCard: CardModel = {
      id: 1, 
      form: form,
      qty: { food: 1, drink: 1, dessert: 1 },
      total: 0,
      amount: 0,
    }
    this.cards.push(firstCard);
  }

  increaseQty(type: 'food' | 'drink' | 'dessert') {
    this.qty[type]++;
  }

  decreaseQty(type: 'food' | 'drink' | 'dessert') {
    if (this.qty[type] > 1) this.qty[type]--;
  }

  getLineTotal(type: 'food' | 'drink' | 'dessert'): number {
    // İlerlemede: gerçek fiyat çarpımı yapılacak
    return 0;
  }

  calculateTotal() {
    // İlerlemede: toplam hesaplama mantığı eklenecek
  }

  save() {
    // İlerlemede: kayıt işlemi eklenecek
  }
  addCard() {
    const newCard: CardModel = {
      id: this.cards.length + 1,
      form: this.fb.group({
        person: [null, Validators.required],
        food: [null, Validators.required],
        drink: [null, Validators.required],
        dessert: [null, Validators.required],
        total: [0, [Validators.required, Validators.min(0)]],
        amount: [0, [Validators.required, Validators.min(0)]],
      }),
      qty: { food: 1, drink: 1, dessert: 1 },
      amount: 0,
    };
    this.cards.push(newCard);
  }
}
