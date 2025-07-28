import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList {
  public pendingTasks(): TaskItem[] {
    return this.#tasksList().filter(task => !task.completed)
  }
  public completedTasks(): TaskItem[] {
    return this.#tasksList().filter(task => task.completed)
  }
  public deleteItem(id: string) {}
  #tasksList = signal<TaskItem[]>([])
  @Output() public toggleTask = new EventEmitter<string>()
  public sendTaskId(id: string) {
    return this.toggleTask.emit(id)
  }
  @Input({
    alias: 'list'
  }) set data(val: TaskItem[]) {
    this.#tasksList.set(val)
  }
}