import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodosDataService } from '../../services/todos-data/todos-data.service';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    @Output() showTodoModalEvent = new EventEmitter();
    @Output() signOutUserEvent = new EventEmitter();

    constructor(private todosDataService: TodosDataService) {
    }

    ngOnInit() { }

    onShowTodoModal($event) {
        $event.preventDefault();
        this.showTodoModalEvent.emit();
    }   

    onSignOut() {
        this.signOutUserEvent.emit();
    }
}