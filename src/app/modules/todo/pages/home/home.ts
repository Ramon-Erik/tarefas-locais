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
  public deleteSingleTask(id: string) {
    console.log('deletar task');
    
  }
  public confirmAndeleteAllTasks() {
    Swal.fire({
      title: "Apagar <strong>todas</strong> as tasks",
      text: "Deseja mesmo apagar todas as tasks? Isso não pode ser desfeito.",
      html: "Deseja mesmo apagar <strong>todas</strong> as tasks?<br><small>Esta ação não pode ser desfeita!</small>",
      icon: 'warning',
      confirmButtonText: 'Sim, apagar tudo!',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.removeItem(StorageKeys.TaskListLocal)
        this.#tasksList.set([])
        this.addNewTask.set(false)
      }
    })
  }
  #tasksList = signal<TaskItem[]>(this.loadTasks());
  public tasksList = this.#tasksList.asReadonly();
  public addNewTask = signal(false);
}
