import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet, provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes'; 
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '399669106700-7r82t4a5lb7kb7n2eb4o3h55tg768vbs.apps.googleusercontent.com', {
                scopes: 'email',
               
              }
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    }
  ],
   
  bootstrap: [AppComponent],
})
export class AppModule {}