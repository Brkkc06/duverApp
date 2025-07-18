import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  id: number;
  form: FormGroup;
  qty: { food: number; drink: number; dessert: number };
  total: number;
}

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss']
})
export class CalculateComponent implements OnInit {
  cards: CardModel[] = [];
  total = 0;
  totalTip = 0;
  tipPercentage = 0;
  cardSummaries: { name: string; total: number }[] = [];
  private cardNextId = 0;

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
    { id: 4, name: 'Lahmacun', price: 180 },
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addCard();
  }

  trackById(_: number, card: CardModel): number {
    return card.id;
  }

  getFoodControl(form: FormGroup): FormControl {
    return form.get('food') as FormControl;
  }
  getDrinkControl(form: FormGroup): FormControl {
    return form.get('drink') as FormControl;
  }
  getDessertControl(form: FormGroup): FormControl {
    return form.get('dessert') as FormControl;
  }

  addCard(): void {
    const fg = this.fb.group({
      person:  [null, Validators.required],
      food:    [null, Validators.required],
      drink:   [null, Validators.required],
      dessert: [null, Validators.required],
      amount:  [null, [Validators.required, Validators.min(0)]],
    });
    const card: CardModel = {
      id: ++this.cardNextId,
      form: fg,
      qty: { food: 1, drink: 1, dessert: 1 },
      total: 0
    };
    this.cards.push(card);
    this.calculateCard(card);
  }

  removeCard(id: number): void {
    if (this.cards.length === 1) return;
    this.cards = this.cards.filter(c => c.id !== id);
    this.calculateTotal();
  }

  increaseQty(type: 'food'|'drink'|'dessert', card: CardModel) {
    card.qty[type]++;
    this.calculateCard(card);
  }

  decreaseQty(type: 'food'|'drink'|'dessert', card: CardModel) {
    if (card.qty[type] > 1) {
      card.qty[type]--;
      this.calculateCard(card);
    }
  }

  public getLineTotal(type: 'food'|'drink'|'dessert', card: CardModel): number {
    const id = card.form.get(type)?.value as number;
    const list = type === 'food'   ? this.foods
               : type === 'drink'  ? this.drinks
               : this.desserts;
    const price = list.find(i => i.id === id)?.price ?? 0;
    return price * card.qty[type];
  }

  private updateCardTotal(card: CardModel): void {
    const sumItems =
      this.getLineTotal('food', card) +
      this.getLineTotal('drink', card) +
      this.getLineTotal('dessert', card);
    const tip = card.form.get('amount')?.value ?? 0;
    card.total = sumItems + tip;
  }

  public calculateCard(card: CardModel): void {
    this.updateCardTotal(card);
    this.calculateTotal();
  }

  public calculateTotal(): void {
    
    this.cards.forEach(c => this.updateCardTotal(c));

    
    this.total = this.cards.reduce((acc, c) => acc + c.total, 0);

    
    this.totalTip = this.cards.reduce(
      (sum, c) => sum + (c.form.get('amount')?.value ?? 0),
      0
    );

   
    this.tipPercentage = this.total > 0 ? (this.totalTip / this.total) * 100 : 0;

    
    this.cardSummaries = this.cards.map(c => {
      const pid = c.form.get('person')?.value;
      const pname = this.people.find(p => p.id === pid)?.name || '';
      return { name: pname, total: c.total };
    });
  }

  save(): void {
   
  }
}
