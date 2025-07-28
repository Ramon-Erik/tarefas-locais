interface TaskItem {
  readonly id: string;
  value: string;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
}
