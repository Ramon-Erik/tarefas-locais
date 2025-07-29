import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { EmptyTask } from '../../components/empty-task/empty-task';
import { AddNewTask } from '../../components/add-new-task/add-new-task';
import { TaskList } from '../../components/task-list/task-list';
import { StorageKeys } from '../../enum/storage-keys.enum';


@Component({
  selector: 'app-home',
  imports: [EmptyTask, AddNewTask, TaskList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public loadTasks(): TaskItem[] {
    const savedTasks = localStorage.getItem(StorageKeys.TaskListLocal);
    return savedTasks ? JSON.parse(savedTasks) : [];
  }
  private saveTasks() {
    localStorage.setItem(
      StorageKeys.TaskListLocal,
      JSON.stringify(this.#tasksList())
    );
  }
  public addTaskInList(taskValue: string) {
    if (taskValue.trim()) {
      const newTask: TaskItem = {
        id: `ID${Date.now()}`,
        value: taskValue,
        completed: false,
        createdAt: Date.now(),
      };

      this.#tasksList.update((tasksList) => [...tasksList, newTask]);
      this.saveTasks();
    }
  }
  public toggleTaskStatus(id: string) {
    this.#tasksList.update((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? Date.now() : undefined,
            }
          : task
      )
    );
    this.saveTasks();
  }
  #tasksList = signal<TaskItem[]>(this.loadTasks());
  public tasksList = this.#tasksList.asReadonly();
  public addNewTask = signal(false);
}
