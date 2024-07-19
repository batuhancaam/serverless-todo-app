import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TodosApiService } from '../../services/todos-api/todos-api.service';
import { TodosDataService } from '../../services/todos-data/todos-data.service';

@Component({
    selector: 'todo',
    templateUrl: 'todo.component.html'
})

export class TodoComponent implements OnInit {
    @Input() todo;
    @Output() closeModalEvent = new EventEmitter();
    @Output() updateTodoEvent = new EventEmitter();
    @ViewChild("focus") vcInput;

    isLoading = false;
    alert;

    todoForm;
    defaultTitle;
    disableSubmit = false;

    constructor(private formBuilder: FormBuilder,
        private todosApiService: TodosApiService,
        private todosDataService: TodosDataService) {

    }

    ngOnInit() {
        this.alert = {};
        this.isLoading = true;
        this.defaultTitle = 'Title';
        this.todoForm = this.formBuilder.group({
            'title': [this.todo.title ? this.todo.title : ''],
            'content': [this.todo.content ? this.todo.content : '', Validators.required],
            'cat': [this.todo.cat ? this.todo.cat : 'general'],
            'timestamp': [this.todo.timestamp],
            'todo_id': [this.todo.todo_id]
        });
        this.isLoading = false;
    }

    ngAfterContentInit() {
        this.vcInput.nativeElement.focus();
    }

    onSubmit() {
        this.isLoading = true;
        this.disableSubmit = true;

        if (!this.todoForm.value.timestamp) {
            this.todosApiService.addTodo(this.todoForm.value).subscribe(
                todo => {
                    this.todosDataService.announceAddTodo(todo);
                },
                err => {
                    if (err.error && err.error.message) {
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

                    this.disableSubmit = false;
                    this.isLoading = false;
                },
                () => {
                    this.onCloseTodoModal();
                }
            );
        } else {
            this.todosApiService.updateTodo(this.todoForm.value).subscribe(
                todo => {
                    this.updateTodoEvent.emit(todo);
                },
                err => {
                    if (err.error && err.error.message) {
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

                    this.disableSubmit = false;
                    this.isLoading = false;
                },
                () => {
                    this.onCloseTodoModal();
                }
            );
        }
    }

    onCloseTodoModal($event?) {
        if ($event) {
            $event.preventDefault();
        }
        this.closeModalEvent.emit();
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode == 27) { // 27 ==> Escape key 
            this.closeModalEvent.emit();
        }
    }
}