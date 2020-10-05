import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './components/search/search.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material/material.module';
import { TableComponent } from './components/table/table.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HttpClientModule} from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {MatSortModule} from '@angular/material/sort';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    TableComponent,
    SpinnerComponent,
    FavoriteComponent,
    CardComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
        MatProgressSpinnerModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        MatSortModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
