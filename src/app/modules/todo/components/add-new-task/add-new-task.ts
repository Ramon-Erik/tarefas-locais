import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-add-new-task',
  imports: [],
  templateUrl: './add-new-task.html',
  styleUrl: './add-new-task.scss'
})
export class AddNewTask {
  @Output() public getNewTask = new EventEmitter<string>()
  public sendNewTask(value: string) {
    return this.getNewTask.emit(value)
  }
}
