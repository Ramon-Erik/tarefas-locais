import { Component, Input, signal } from '@angular/core';
import { EmptyTask } from '../../components/empty-task/empty-task';
import { AddNewTask } from '../../components/add-new-task/add-new-task';
import { TaskList } from '../../components/task-list/task-list';
import { StorageKeys } from '../../enum/storage-keys.enum';
import Swal from 'sweetalert2'


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
  public deleteTasksAndStorage() {
    localStorage.removeItem(StorageKeys.TaskListLocal)
        this.#tasksList.set([])
        this.addNewTask.set(false)
  }
  public deleteSingleTask(id: string) {
    const taskName = this.#tasksList().map(task => task.id === id? task : undefined)[0]?.value
    console.log(taskName)
    Swal.fire({
      title: "Apagar <strong>uma</strong> task",
      html: `Deseja mesmo apagar a task "${taskName}"?<br><small>Esta ação não pode ser desfeita!</small>`,
      icon: 'warning',
      confirmButtonText: 'Sim, apagar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.#tasksList.update((tasks) => tasks.filter((task) => task.id !== id))
        this.saveTasks()
        if (this.#tasksList().length === 0) {
          this.deleteTasksAndStorage()
        }
      }
    })
  }
  public confirmAndeleteAllTasks() {
    Swal.fire({
      title: "Apagar <strong>todas</strong> as tasks",
      html: "Deseja mesmo apagar <strong>todas</strong> as tasks?<br><small>Esta ação não pode ser desfeita!</small>",
      icon: 'warning',
      confirmButtonText: 'Sim, apagar tudo!',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.deleteTasksAndStorage()
      }
    })
  }
  public saveEditedTask(event: {id: string, value?: string}) {
    this.#tasksList.update((tasks) => 
      tasks.map((task) => 
      task.id === event.id
      ? {
        ...task,
        value: event.value ? event.value : task.value 
      }
      : task
    ))
    this.saveTasks()
  }
  #tasksList = signal<TaskItem[]>(this.loadTasks());
  public tasksList = this.#tasksList.asReadonly();
  public addNewTask = signal(false);
}
