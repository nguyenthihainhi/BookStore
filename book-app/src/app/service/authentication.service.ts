import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { Subject } from 'rxjs';
import { EnvironmentUrlService } from './environment-url.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ExternalAuthDto } from '../interfaces/ExternalAuthDto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangeSub = new Subject<boolean>();
  private extAuthChangeSub = new Subject<SocialUser>();
  public authChanged = this.authChangeSub.asObservable();
  public extAuthChanged = this.extAuthChangeSub.asObservable();
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, 
    private jwtHelper: JwtHelperService, private externalAuthService: SocialAuthService) { 
      this.externalAuthService.authState.subscribe((user) => {
        console.log(user)
        this.extAuthChangeSub.next(user);
      })
    }
    public signInWithGoogle = ()=> {
      this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    
    public signOutExternal = () => {
      this.externalAuthService.signOut();
    }
    public externalLogin = (route: string, body: ExternalAuthDto) => {
      // return this.http.post<AuthResponseDto>(this.createCompleteRoute(route, this.envUrl.urlAddress), body);
    }
}
