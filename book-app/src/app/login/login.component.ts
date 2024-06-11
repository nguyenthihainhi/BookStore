import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { AuthenticationService } from '../service/authentication.service';
import { ExternalAuthDto } from '../interfaces/ExternalAuthDto';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showError?: boolean;
  errorMessage?: String;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private authService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
    externalLogin = () => {
      this.showError = false;
      this.authService.signInWithGoogle();
    
      this.authService.extAuthChanged.subscribe( user => {
        const externalAuth: ExternalAuthDto = {
          provider: user.provider,
          idToken: user.idToken
        }
    
        // this.validateExternalAuth(externalAuth);
      })
    }
    private validateExternalAuth(externalAuth: ExternalAuthDto) {
      this.authService.externalLogin('api/accounts/externallogin', externalAuth)
        .subscribe({
          next: (res: any) => {
            localStorage.setItem("token", res.token);
            this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
            this.router.navigate(['/home']); // Assuming '/home' is the route to navigate after successful login
          },
          error: (err: HttpErrorResponse) => {
            this.errorMessage = err.message;
            this.showError = true;
            this.authService.signOutExternal();
          }
        });
    }
}
