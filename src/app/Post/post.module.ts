import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

// Componentes
import { HomeComponent } from './components/home/home.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Pipes
// import { FormatDatePipe } from '../Shared/Pipes/format-date.pipe';
import { GraficasComponent } from './components/graficas/graficas.component';
import { SharedModule } from '../Shared/shared.module';


@NgModule({
  declarations: [
    PostsListComponent,
    PostFormComponent,
    HomeComponent,
    // FormatDatePipe,
    DashboardComponent,
    GraficasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    NgChartsModule
],
})
export class PostModule {}
