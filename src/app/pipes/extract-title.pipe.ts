import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "extractTitle"
})
export class TitlePipe implements PipeTransform {

    transform(todo: { content: string, title?: string }, limit): string {
        limit = parseInt(limit);

        if (todo.title) {
            if(todo.title.length == 0) {
                return this.getTitleFromString(todo.content, limit);    
            } else {
                return this.getTitleFromString(todo.title, limit);
            }
        } else {
            return this.getTitleFromString(todo.content, limit);
        }
    }

    getTitleFromString(str, limit) {
        if (str.length > limit) {
            return str.slice(0, limit) + '...';
        } else {
            return str;
        }
    }
}