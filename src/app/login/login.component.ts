import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';
import { ServiceLocatorService } from '../service-locator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  endpoint = "http://localhost:8080/Auth/login";

  form: any = {
    error: false,
    message: '',
    data: { id: null },
    inputerror: {},
    errorMessage: '',
  };

  constructor(private httpService: HttpServiceService, private router: Router, private locator: ServiceLocatorService, private route: ActivatedRoute) {
   var _self = this;
    const errorMessage = this.route.snapshot.queryParams['errorMessage'];
    if(errorMessage){
      _self.form.error = true;
      _self.form.message = errorMessage;
    }
  }

  signIn() {
    var _self = this;
    this.httpService.post(this.endpoint, this.form.data, function (res: any) {

      _self.form.message = '';
      _self.form.inputerror = {};

      if (res.result.message) {
        _self.form.message = res.result.message;
      }

      _self.form.error = !res.success;
      if (_self.form.error && res.result.inputerror) {
        _self.form.inputerror = res.result.inputerror;
      }

      if (res.success) {
        localStorage.setItem("loginId", res.result.data.login);
        localStorage.setItem("role", res.result.data.roleName);
        localStorage.setItem("fname", res.result.data.firstName);
        localStorage.setItem("lname", res.result.data.lastName);
        localStorage.setItem("userId", res.result.data.id);
        localStorage.setItem('token', 'Bearer ' + res.result.token)
         _self.router.navigateByUrl('dashboard');
      }
    });
  }

  signUp() {
    this.router.navigateByUrl('signup');
  }
}