import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet, provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes'; 
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { ErrorHandlerService } from './service/error-handler.service';

import { AppComponent } from './app.component';
import { ListAuthorComponent } from './list-author/list-author.component';
import { ListPublisherComponent } from './list-publisher/list-publisher.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent, 
    ListAuthorComponent,
    ListPublisherComponent,
    LoginComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    RouterOutlet, 
    HttpClientModule, 
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {enableTracing: true}), 
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '340351071914-5t0m80o6qnf7a8q7ad66482blh4gc0e9.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
   
  bootstrap: [AppComponent],
})
export class AppModule {}