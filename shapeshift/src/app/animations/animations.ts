import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export const flyInOutAnimation =
  trigger('flyInOut', [
    transition('void => flyInOut', [
      animate('500ms ease-in-out', keyframes([
        style({opacity: 0, transform: 'translateX(-100%)'}),
        style({opacity: 0.5, transform: 'translateX(-50%)'}),
        style({opacity: 1, transform: 'translateX(0)'}),
      ])),
    ]),
    transition('flyInOut => void', [
      animate('500ms ease-in-out', keyframes([
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

export const scaleInOutAnimation =
  trigger('scaleInOut', [
    transition('void => scaleInOut', [
      animate('1000ms ease-in-out', keyframes([
        style({opacity: 0, transform: 'scale(0)', offset: 0}),
        style({opacity: 0.5, transform: 'scale(1.1)', offset: 0.6}),
        style({opacity: 0.7, transform: 'scale(0.9)', offset: 0.8}),
        style({opacity: 1, transform: 'scale(1)', offset: 1}),
      ])),
    ]),
    transition('scaleInOut => void', [
      animate('1500ms ease-in-out', keyframes([
        style({opacity: 1, transform: 'scale(1)', offset: 0}),
        style({opacity: 0.7, transform: 'scale(0.9)', offset: 0.6}),
        style({opacity: 0.5, transform: 'scale(1.1)', offset: 0.8}),
        style({opacity: 0, transform: 'scale(0)', offset: 1}),
      ])),
    ]),
]);

export const fadeInOutAnimation =
trigger('fadeInOut', [
  transition('void => fadeInOut', [
    animate('800ms ease-in-out', keyframes([
      style({opacity: 0, offset: 0}),
      style({opacity: 0.5, offset: 0.5}),
      style({opacity: 1, offset: 1}),
    ])),
  ]),
  transition('fadeInOut => void', [
    animate('300ms ease-in-out', keyframes([
      style({opacity: 1, offset: 0}),
      style({opacity: 0.5, offset: 0.5}),
      style({opacity: 0, offset: 1}),
    ])),
  ]),
]);

export const entranceAnimation =
  trigger('entrance', [
    state('hidden', style({opacity: 0})),
    transition('* => entrance', [
      animate('1800ms ease-out', keyframes([
        style({opacity: 0.2, transform: 'scale(0.3) rotate(6deg) translateX(-20%) translateY(20%)', offset: 0}),
        style({opacity: 0.7, transform: 'scale(1.03) rotate(-2deg) translateX(2%) translateY(-2%)', offset: 0.3}),
        style({opacity: 1, transform: 'scale(0.98) rotate(1deg) translateX(0%) translateY(0%)', offset: 0.45}),
        style({opacity: 1, transform: 'scale(1.01) rotate(-1deg) translateX(0%) translateY(0%)', offset: 0.6}),
        style({opacity: 1, transform: 'scale(0.99) rotate(1deg) translateX(0%) translateY(0%)', offset: 0.75}),
        style({opacity: 1, transform: 'scale(1.01) rotate(0deg) translateX(0%) translateY(0%)', offset: 0.9}),
        style({opacity: 1, transform: 'scale(1) rotate(0deg) translateX(0%) translateY(0%)', offset: 1}),
      ])),
    ]),
  ]);
