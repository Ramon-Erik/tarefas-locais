import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList {
  public todoList = signal<{id: string, todo: string, completed: boolean}[]>([])
  public updateItemCheckbox(id: string, isCompleted: boolean) {}
  public deleteItem(id: string) {}
  @Input({
    alias: 'list'
  }) set data(val: Array<{id: string, todo: string, completed: boolean}>) {
    this.todoList.set(val)
  }
}