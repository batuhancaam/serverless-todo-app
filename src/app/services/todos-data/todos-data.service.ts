import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable()
export class TodosDataService {

    private announceAddTodoSource = new Subject();
    addTodo$ = this.announceAddTodoSource.asObservable();

    constructor() { }

    announceAddTodo(todo) {
        this.announceAddTodoSource.next(todo);
    }
}