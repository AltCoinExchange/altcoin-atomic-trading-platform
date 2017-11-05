import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export const flyInOutAnimation =
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => in', [
      animate(500, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)'}),
        style({opacity: 0.5, transform: 'translateX(-50%)'}),
        style({opacity: 1, transform: 'translateX(0)'}),
      ])),
    ]),
    transition('in => void', [
      animate(500, keyframes([
        style({opacity: 1, transform: 'translateX(0)'}),
        style({opacity: 0.5, transform: 'translateX(50%)'}),
        style({opacity: 0, transform: 'translateX(100%)'}),
      ])),
    ]),
  ]);

export const coinSwapsAnimation =
  trigger('coinSwaps', [
    state('slideRight', style({transform: 'translateX(200%)'})),
    state('slideLeft', style({transform: 'translateX(-200%)'})),
    state('slideBack', style({transform: 'translateX(0%)'})),
    transition('* <=> *', animate('500ms ease-in-out')),
  ]);
