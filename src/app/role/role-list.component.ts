import { Component } from '@angular/core';
import { BaseListCtl } from '../base-list.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html'
})
export class RoleListComponent extends BaseListCtl {

  constructor(public locator: ServiceLocatorService, route: ActivatedRoute){
    super(locator.endpoints.ROLE, locator, route);
  }

}
