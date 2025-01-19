// ng new auth-dashboard-app --routing

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from "@angular/material/table"
import {MatCommonModule} from "@angular/material/core"
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './services/auth.service';
import { TaskFormComponent } from './dialogs/task-form/task-form.component';
import { httpInterceptorProviders } from './interceptors/jwt.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from './pagination';
import { CommonModule } from '@angular/common';
import { TeamManagementComponent } from './team-management/team-management.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    TaskFormComponent,

    PaginationComponent,
     TeamManagementComponent,
     TaskListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatChipsModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatCommonModule,
    MatTableModule,
    MatCardModule,
    MatMenuModule,
    MatBadgeModule,
    NgbModule,
    CommonModule,
    FormsModule
  ],
  providers: [AuthGuard, AuthService,
    // LoggingInterceptor,
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
