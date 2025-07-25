import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { EmptyTask } from "../../components/empty-task/empty-task";
import { AddNewTask } from "../../components/add-new-task/add-new-task";

@Component({
  selector: 'app-home',
  imports: [EmptyTask, AddNewTask],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  public tasks = localStorage.getItem('tasks')
  public addNewTask = signal(false)
}
