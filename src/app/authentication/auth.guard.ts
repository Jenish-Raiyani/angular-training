import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,private router: Router){}
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    boolean | import("@angular/router").UrlTree |
    import("rxjs").Observable<boolean|
     import("@angular/router").UrlTree >|
    Promise<boolean | import("@angular/router").UrlTree> {
      const isAuth=this.authService.getAuthenticated();
    if(!isAuth){
      console.log('user is not logged in')
      this.router.navigate(['/login']);
    }
    return true;
    }


  }

