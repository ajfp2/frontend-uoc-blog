import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { CardComponent } from './Components/card/card.component';
import { HeaderComponent } from './Components/header/header.component';
import { SpinnerComponent } from './Components/spinner/spinner.component';

//Angular material
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormatDatePipe } from './Pipes/format-date.pipe';



@NgModule({
  declarations: [CardComponent, HeaderComponent, SpinnerComponent, FormatDatePipe],
  imports: [
    CommonModule,
    MatChipsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  exports: [HeaderComponent, SpinnerComponent, CardComponent]
})
export class SharedModule { }
