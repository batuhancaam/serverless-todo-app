import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from "lodash";
import { TodosApiService } from '../../services/todos-api/todos-api.service';
import { TodosDataService } from '../../services/todos-data/todos-data.service';

@Component({
    selector: 'todos',
    templateUrl: 'todos.component.html'
})

export class TodosComponent implements OnInit {
    @Output() showTodoModalEvent = new EventEmitter();
    
    userTodos;
    isLoading;
    isListLoading;
    selectedTodo;
    showTodo = false;
    startKey;
    alert;
    TodosDataSubscription;
    AddTodoSubscription;
    noTodosFound;

    constructor(private todosApiService: TodosApiService,
                private todosDataService: TodosDataService) { }

    ngOnInit() { 
        this.isListLoading = false;
        this.noTodosFound = false;
        this.showTodo = false;
        this.alert = {};
        
        this.refreshTodos();
        this.AddTodoSubscription = this.todosDataService.addTodo$.subscribe(
            (todo)=>{
                this.addTodo(todo);
            }
        );
    }

    refreshTodos() {
        this.isLoading = true;
        this.userTodos = [];
        this.todosApiService.getTodos().subscribe(
            res => {
                let data = res;
                if(_.has(res, 'LastEvaluatedKey')) {
                    this.startKey = res.LastEvaluatedKey.timestamp;
                } else {
                    this.startKey = 0;
                }

                if(_.has(res, 'Items')) {
                    this.userTodos = _.union(this.userTodos, res.Items);
                    if(this.userTodos.length == 0) {
                        this.noTodosFound = true;
                    } else {
                        this.noTodosFound = false;
                    }
                }
            }, err => {
                if(err.error && err.error.message) {
                    this.alert = {
                        type: 'danger',
                        message: err.error.message
                    }
                } else {
                    this.alert = {
                        type: 'danger',
                        message: err.message
                    }
                }
                this.isLoading = false;
            }, () => {
                this.isLoading = false;
            }
        );
    }

    onShowTodoModal($event) {
        $event.preventDefault();
        this.showTodoModalEvent.emit();
    }

    openTodo(todo) {
        this.selectedTodo = todo;
        this.showTodo = true;
    }

    onCloseTodoModal() {
        this.showTodo = false;
    }

    deleteTodo(todo) {
        // this.refreshTodos();
        let index = _.findIndex(this.userTodos, (item) => { return item.timestamp == todo.timestamp; });
        this.userTodos.splice(index, 1);
        if(this.userTodos.length < 5) {
            this.onScrollDown();
        }

        if(this.userTodos.length == 0) {
            this.refreshTodos();
        }
    }

    updateTodo(todo) {
        let index = _.findIndex(this.userTodos, (item) => { return item.timestamp == todo.timestamp; });
        this.userTodos.splice(index, 1, todo);
    }

    addTodo(todo) {
        // console.log("Adding todo", todo);
        this.userTodos.splice(0, 0, todo);
        this.noTodosFound = false;
    }

    onScrollDown() {
        if(this.startKey == 0) {
            return;
        }

        this.isListLoading = true;
        this.TodosDataSubscription = this.todosApiService.getTodos(this.startKey).subscribe(
            res => {
                let data = res;
                if(_.has(res, 'LastEvaluatedKey')) {
                    this.startKey = res.LastEvaluatedKey.timestamp;
                } else {
                    this.startKey = 0;
                }

                if(_.has(res, 'Items')) {
                    this.userTodos = _.union(this.userTodos, res.Items);
                    if(this.userTodos.length == 0) {
                        this.noTodosFound = true;
                    } else {
                        this.noTodosFound = false;
                    }
                }
            }, err => {
                if(err.error && err.error.message) {
                    this.alert = {
                        type: 'danger',
                        message: err.error.message
                    }
                } else {
                    this.alert = {
                        type: 'danger',
                        message: err.message
                    }
                }
                this.isListLoading = false;
            }, () => {
                this.isListLoading = false;
            }
        );
    }

}