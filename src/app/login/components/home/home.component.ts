import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  emailForm = new FormControl('', [Validators.required]);

  constructor(
    private router: Router,
    private userService: UserService,
    // private socialAuthService: SocialAuthService,
  ) { }

  ngOnInit(): void {
    if (!!this.userService.user) {
      this.router.navigate(['home']);
    }
  }

  signIn() {
    // this.socialAuthService
    //   .signIn(GoogleLoginProvider.PROVIDER_ID)
    //   .then(response => console.log(response));
    this.userService
      .signUp({ email: this.emailForm.value } as User)
      .subscribe(_ => {
        if (!!this.userService.user) {
          this.router.navigate(['home']);
        }
      });
  }

}
