import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: SignupComponent },

  { path: 'signup', component: SignupComponent  },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
];
