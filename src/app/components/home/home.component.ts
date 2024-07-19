import { Component, OnInit } from '@angular/core';
import { TodosDataService } from '../../services/todos-data/todos-data.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

    showTodoModal = false;
    newTodo;
    constructor(private todosDataService: TodosDataService
    ) {  }

    ngOnInit() { 
        this.newTodo = {};
        
    }

    onShowTodoModal($event) {
        this.showTodoModal = true;
    }

    onCloseTodoModal($event) {
        this.showTodoModal = false;
    }

    onSignOut() {
    }

}