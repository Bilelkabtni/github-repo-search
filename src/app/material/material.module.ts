import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {NgModule} from '@angular/core';

@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class MaterialModule {
  constructor() {
  }
}
