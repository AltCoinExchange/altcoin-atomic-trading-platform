import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export const flyInOutAnimation =
  trigger('flyInOut', [
    state('in', style({transform: 'translateY(0)'})),
    transition('void => in', [
      animate(500, keyframes([
        style({opacity: 0, transform: 'translateY(100%)'}),
        style({opacity: 0.5, transform: 'translateY(50%)'}),
        style({opacity: 1, transform: 'translateY(0)'}),
      ])),
    ]),
    transition('in => void', [
      animate(500, keyframes([
        style({opacity: 1, transform: 'translateY(0)'}),
        style({opacity: 0.5, transform: 'translateY(-50%)'}),
        style({opacity: 0, transform: 'translateY(-100%)'}),
      ])),
    ]),
  ]);
