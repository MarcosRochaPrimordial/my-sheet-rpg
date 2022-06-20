import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SocialLoginModule,
    SharedModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId),
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
})
export class LoginModule { }
