import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

declare const API_ROOT: string;
declare const STAGE: string;

@Injectable()
export class TodosApiService {
    options;
    constructor(private httpClient: HttpClient) {}

    setOptions() {
        this.options = {
            headers: {
                app_user_id: 'test_user',
                app_user_name: 'Test User'
            }
        };
    }

    addTodo(item) {
        let path = STAGE + '/todo';
        let endpoint = API_ROOT + path;
        
        let itemData;
        itemData = {
            content: item.content,
            cat: item.cat
        };

        if(item.title != "") {
            itemData.title = item.title;
        }

        let reqBody = {
            Item: itemData
        };
        this.setOptions();
        return this.httpClient.post(endpoint, reqBody, this.options);
    }

    updateTodo(item) {
        let path = STAGE + '/todo';
        let endpoint = API_ROOT + path;
        
        let itemData;
        itemData = {
            content: item.content,
            cat: item.cat,
            timestamp: parseInt(item.timestamp),
            todo_id: item.todo_id
        };

        if (item.title != "") {
            itemData.title = item.title;
        }

        let reqBody = {
            Item: itemData
        };
        this.setOptions();
        return this.httpClient.patch(endpoint, reqBody, this.options);
    }

    deleteTodo(timestamp) {
        let path = STAGE + '/todo/t/' + timestamp;
        let endpoint = API_ROOT + path;
        this.setOptions();
        return this.httpClient.delete(endpoint, this.options);
    }

    getTodos(start?): Observable<any> {
        let path = STAGE + '/todos?limit=8';
        
        if (start > 0) {
            path += '&start=' + start;
        }
        let endpoint = API_ROOT + path;
        this.setOptions();
        return this.httpClient.get(endpoint, this.options);
    }
}