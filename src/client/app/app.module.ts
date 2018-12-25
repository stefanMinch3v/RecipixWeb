import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CookieLawModule } from 'angular2-cookie-law';

import { AppRoutesModule } from './app.routes.module';
import { AccountModule } from './components/account/account.module';
import { SharedModule } from './components/shared/shared.module';
import { RecipesModule } from './components/recipes/recipes.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

import { AuthGuard } from './core/services/guards/auth.guard';
import { AdminGuard } from './core/services/guards/admin.guard';

import { TokenInterceptor } from './core/services/interceptors/token.interceptor';
import { ErrorInterceptor } from './core/services/interceptors/error.interceptor';
import { environment } from 'client/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(environment.toastr),
    AccountModule,
    SharedModule,
    RecipesModule,
    CookieLawModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, 
    AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
