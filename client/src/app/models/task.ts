export interface Task {
    _id: string;
    title: string;
    description: string;
    status: 'todo' | 'inProgress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    assignedTo: number; // User ID
    assignedBy: number; // User ID
    createdAt: Date;
    dueDate: Date;
  }