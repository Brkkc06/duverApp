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
  styleUrls: ['./calculate.component.scss'],
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
    { id: 0, name: '--', price: 0 },
    { id: 1, name: 'Mercimek Çorbası', price: 120 },
    { id: 2, name: 'Ezogelin Çorbası', price: 120 },
    { id: 3, name: 'Antep Lahmacun', price: 200 },
    { id: 4, name: 'Lahmacun', price: 180 },
    { id: 10, name: 'Kıymalı Pide', price: 390 },
    { id: 11, name: 'Kıymalı Kaşarlı Pide', price: 400 },
    { id: 9, name: 'Kaşarlı Pide', price: 390 },
    { id: 12, name: 'Kuşbaşılı Pide', price: 480 },
    { id: 13, name: 'Kuşbaşılı Kaşarlı Pide', price: 500 },
    { id: 15, name: 'Dönerli Pide', price: 500 },
    { id: 14, name: 'Karışık Pide', price: 420 },
    { id: 16, name: 'Kuzu Şiş (Acısız)', price: 640 },
    { id: 17, name: 'Kuzu Şiş (Yoğurtlu)', price: 680 },
    { id: 18, name: 'Terbiyeli Kuzu Şiş (Acılı)', price: 640 },
    { id: 20, name: 'Terbiyeli Kuzu Şiş (Yoğurtlu)', price: 680 },
    { id: 19, name: 'Karburga', price: 640 },
    { id: 5, name: 'Döner', price: 440 },
    { id: 21, name: 'Yoğurtlu Döner', price: 500 },
    { id: 22, name: 'İskender', price: 500 },
    { id: 23, name: 'Şiş Köfte', price: 440 },
    { id: 24, name: 'Şiş Köfte (Yoğurtlu)', price: 500 },
    { id: 8, name: 'Adana', price: 440 },
    { id: 25, name: 'Adana (Yoğurtlu)', price: 500 },
    { id: 26, name: 'Beyti Sarma', price: 500 },
    { id: 6, name: 'Patlıcan Kebap', price: 520 },
    { id: 27, name: 'Karışık Kebap(1,5 Porsiyon)', price: 760 },
    { id: 7, name: 'Tavuk Şiş', price: 440 },
    { id: 28, name: 'Tavuk Şiş (Kemiksiz)', price: 440 },
    { id: 29, name: 'Ali Nazik (Bıçak Kıyma)', price: 560 },
    { id: 30, name: 'Ali Nazik (Kuzu Şiş)', price: 700 },
    { id: 31, name: 'Çoban Salata', price: 120 },
    { id: 32, name: 'Domates Söğüş', price: 120 },
    { id: 33, name: 'İçli Köfte', price: 120 },
  ];

  drinks: Drink[] = [
    { id: 0, name: '--', price: 0 },
    { id: 1, name: 'Su', price: 25 },
    { id: 2, name: 'Ayran', price: 65 },
    { id: 3, name: 'Kola', price: 75 },
    { id: 4, name: 'Fanta', price: 75 },
    { id: 5, name: 'Sprite', price: 75 },
    { id: 6, name: 'Fuse Tea', price: 75 },
    { id: 7, name: 'Şalgam', price: 70 },
  ];

  desserts: Dessert[] = [
    { id: 0, name: '--', price: 0 },
    { id: 1, name: 'Şöbiyet', price: 165 },
    { id: 11, name: 'Şöbiyet (Adet)', price: 41.25 },
    { id: 2, name: 'Fıstıklı Baklava', price: 165 },
    { id: 3, name: 'Cevizli Baklava', price: 145 },
    { id: 4, name: 'Havuç Dilimi', price: 165 },
    { id: 5, name: 'Fıstıklı Kadayıf', price: 145 },
    { id: 6, name: 'Sultan', price: 165 },
    { id: 7, name: 'Karışık Tatlı', price: 165 },
    { id: 8, name: 'Burma Kadayıf', price: 180 },
    { id: 9, name: 'Fıstıklı Kuru Baklava', price: 180 },
    { id: 10, name: 'Dondurma', price: 120 },
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
      person: [null, Validators.required],
      food: [null, Validators.required],
      drink: [null, Validators.required],
      dessert: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
    });
    const card: CardModel = {
      id: ++this.cardNextId,
      form: fg,
      qty: { food: 0, drink: 0, dessert: 0 },
      total: 0,
    };
    this.cards.push(card);
    this.calculateCard(card);
  }

  removeCard(id: number): void {
    if (this.cards.length === 1) return;
    this.cards = this.cards.filter((c) => c.id !== id);
    this.calculateTotal();
  }

  increaseQty(type: 'food' | 'drink' | 'dessert', card: CardModel) {
    card.qty[type]++;
    this.calculateCard(card);
  }

  decreaseQty(type: 'food' | 'drink' | 'dessert', card: CardModel) {
    if (card.qty[type] >= 1) {
      card.qty[type]--;
      this.calculateCard(card);
    }
  }

  public getLineTotal(
    type: 'food' | 'drink' | 'dessert',
    card: CardModel
  ): number {
    const id = card.form.get(type)?.value as number;
    const list =
      type === 'food'
        ? this.foods
        : type === 'drink'
        ? this.drinks
        : this.desserts;
    const price = list.find((i) => i.id === id)?.price ?? 0;
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
    this.cards.forEach((c) => this.updateCardTotal(c));

    this.total = this.cards.reduce((acc, c) => acc + c.total, 0);

    this.totalTip = this.cards.reduce(
      (sum, c) => sum + (c.form.get('amount')?.value ?? 0),
      0
    );

    this.tipPercentage =
      this.total > 0 ? (this.totalTip / this.total) * 100 : 0;

    this.cardSummaries = this.cards.map((c) => {
      const pid = c.form.get('person')?.value;
      const pname = this.people.find((p) => p.id === pid)?.name || '';
      return { name: pname, total: c.total };
    });
  }

  save(): void {}
}
