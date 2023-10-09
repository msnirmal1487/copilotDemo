const fs = require('fs');
export interface TaskFile {
    tasks: Task[];
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: string;
    updatedAt: string;
    dueDate: string;
    category: TaskCategory;
    notes: string[];

}

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

export enum TaskCategory {
    WORK = 'WORK',
    PERSONAL = 'PERSONAL',
    SHOPPING = 'SHOPPING',
    OTHER = 'OTHER'
}

function readTasks(userId: number): TaskFile {
    const fileName = `./server/tasks-${userId}.json`;
    const data = fs.readFileSync(fileName, 'utf8');
    const taskFile = JSON.parse(data);
    return taskFile;
};

