import {HostBinding} from '@angular/core';

export class AnimationEnabledComponent {
  @HostBinding('@flyInOut') state = 'in';
  @HostBinding('style.display') display = 'block';

  formFlyOut(){
    this.state = 'void';
  }

}
