import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { EmptyTask } from "../../components/empty-task/empty-task";
import { AddNewTask } from "../../components/add-new-task/add-new-task";
import { TaskList } from "../../components/task-list/task-list";

@Component({
  selector: 'app-home',
  imports: [EmptyTask, AddNewTask, TaskList],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  public loadTasks(): TaskItem[] {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  } 
  public addTaskInList(task: string) {
    if (task.trim()) {
      const tasks_local = [...this.tasks]
      const timestamp = new Date().getTime()
      const id = `ID${timestamp}`
      const newTask = signal({id, value: task, completed: false})
      
      tasks_local.push(newTask())
      this.tasks = tasks_local
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  }
  public tasks: TaskItem[] = this.loadTasks()
  public addNewTask = signal(false)
}
