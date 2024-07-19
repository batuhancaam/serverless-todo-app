import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodosApiService } from '../../services/todos-api/todos-api.service';

@Component({
    selector: 'todo-snapshot',
    templateUrl: 'todo-snapshot.component.html'
})

export class TodoSnapshotComponent implements OnInit {
    @Input() todo;
    @Output() deleteTodoEvent = new EventEmitter();
    @Output() refreshTodosEvent = new EventEmitter();

    isLoading = false;
    alert;

    constructor(private todosApiService: TodosApiService) { }

    ngOnInit() { 
        this.alert = {};
    }

    deleteTodo($event, timestamp) {
        $event.stopPropagation();
        this.isLoading = true;
        this.todosApiService.deleteTodo(timestamp).subscribe(
            res=>{
                this.deleteTodoEvent.emit(timestamp);
            }, err => {
                if(err.error && err.error.message) {
                    this.alert = {
                        type: 'danger',
                        message: err.error.message
                    };
                } else {
                    this.alert = {
                        type: 'danger',
                        message: err.message
                    }
                }
                this.refreshTodosEvent.emit();
                this.isLoading = false;
            }, ()=> {
                this.isLoading = false;
            }
        );
    }
}