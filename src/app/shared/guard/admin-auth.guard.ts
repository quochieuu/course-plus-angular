import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AdminAuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        if (sessionStorage.getItem('auth-token') != null) {
            return true;
        }

        this.router.navigate(['/admin/auth/login']);
        return false;
    }
}
