import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-empty-task',
  imports: [],
  templateUrl: './empty-task.html',
  styleUrl: './empty-task.scss',
})
export class EmptyTask {
  public inputAddTask = signal<boolean>(false);
  @Input({
    alias: 'addTask',
  })
  set data(val: boolean) {
    this.inputAddTask.set(val);
  }

  @Output() public inputAddTaskToggle = new EventEmitter<boolean>();
  public sendOutput() {
    return this.inputAddTaskToggle.emit(!this.inputAddTask());
  }
}
