declare const gapi: any;
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoSnapshotComponent } from './components/todos/todo-snapshot.component';
import { TodoComponent } from './components/todos/todo.component';
import { SpinnerComponent } from './components/spinner/spinner-component';
import { TodosApiService } from './services/todos-api/todos-api.service';
import { TodosDataService } from './services/todos-data/todos-data.service';
import { TitlePipe } from './pipes/extract-title.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        TodosComponent,
        TodoSnapshotComponent,
        TodoComponent,
        SpinnerComponent,
        TitlePipe   
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        InfiniteScrollModule
    ],
    providers: [
        TodosApiService,
        TodosDataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}