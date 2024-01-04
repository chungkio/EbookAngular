import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './environments/environment'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CartComponent } from './cart/cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { LoginComponent } from './auth/login/login.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './shared/components/auth/auth.service';
import { UserService } from './shared/components/auth/user.service';
import { AuthGuard } from './shared/components/auth/auth.guard';
import { CreateUserComponent } from './user/create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookListComponent,
    BookDetailComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    UserComponent,
    CreateUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
  ],
  providers: [AuthService,UserService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
