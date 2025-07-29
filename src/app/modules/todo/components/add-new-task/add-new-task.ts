import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-add-new-task',
  imports: [],
  templateUrl: './add-new-task.html',
  styleUrl: './add-new-task.scss',
})
export class AddNewTask {
  @ViewChild('newTaskInput') inputEl!: ElementRef;
  @Output() public getNewTask = new EventEmitter<string>();

  public sendNewTaskAndClear(value: string) {
    this.getNewTask.emit(value);
    this.inputEl.nativeElement.value = '';
    this.inputEl.nativeElement.focus();
  }
}
