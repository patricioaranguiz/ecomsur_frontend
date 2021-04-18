import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitStatus: boolean = false;
  registerForm: FormGroup = this.formBuilder.group({
    username: [, {validators: [Validators.required], updateOn: "change"}],
    password: [, {validators: [Validators.required], updateOn: "change"}]
  });

  constructor(private authSvc: AuthService,
              private router: Router,
              private snack: MatSnackBar,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

  }


  submit() {
    this.submitStatus = true;
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.authSvc.login(this.registerForm.value)
        .subscribe(((data: any) => {
          sessionStorage.setItem('token', data);
          this.router.navigate(['/rr-hh'])
        }), error1 => {
          this.snack.open(error1.error, '', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        })
    }
  }
}
