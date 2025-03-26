import { CanDeactivate } from '@angular/router';

export class CanDeactivateGuard  implements CanDeactivate<any> {

  canDeactivate(component: any) {
    return component.canDeactivate();
  }
}
