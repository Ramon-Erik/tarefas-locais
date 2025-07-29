import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { TaskActions } from '../../enum/task-actions.enum';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  public pendingTasks(): TaskItem[] {
    return this.#tasksList().filter((task) => !task.completed);
  }
  public completedTasks(): TaskItem[] {
    return this.#tasksList().filter((task) => task.completed);
  }
  #tasksList = signal<TaskItem[]>([]);
  @Output() public deleteTask = new EventEmitter<string>();
  @Output() public toggleTask = new EventEmitter<string>();
  @Output() public editTask = new EventEmitter<{id: string, value?: string}>();
  @Input({
    alias: 'list',
  })
  set data(val: TaskItem[]) {
    this.#tasksList.set(val);
  }
  readonly TaskActions = TaskActions;
  public sendTaskId(id: string, action: TaskActions, value?: string) {
    switch (action) {
      case TaskActions.TOGGLE:
        return this.toggleTask.emit(id);
      case TaskActions.DELETE:
        return this.deleteTask.emit(id);
      case TaskActions.EDIT:
        return this.editTask.emit({id, value});
    }
  }
}
