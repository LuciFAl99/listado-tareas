export interface Task {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
    assignedPersonIds?: number[];
    dueDate: string; 
  }
  