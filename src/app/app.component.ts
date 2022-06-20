import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LoadingService } from './shared/services/loading.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  loading: boolean = false;
  showLoginButton: boolean = false;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.router
      .events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => this.showLoginButton = (event as any)['url'] !== '/login');
  }

  ngAfterViewInit(): void {
    this.loadingService.loading
      .subscribe(loading => this.loading = loading);
  }

  signOut() {
    this.userService.signOut();
    this.router.navigate(['/login']);
  }
}
