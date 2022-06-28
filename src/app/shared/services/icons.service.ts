import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconsService {

  icons: string[] = [
    './../../../../assets/icons/player.svg',
    './../../../../assets/icons/armour.svg',
    './../../../../assets/icons/dragon-knight.svg',
    './../../../../assets/icons/sourcerer.svg',
    './../../../../assets/icons/wizard.svg'
  ];

  constructor() { }

  randomizeIcon(): number {
    return Math.floor(Math.random() * this.icons.length);
  }
}
