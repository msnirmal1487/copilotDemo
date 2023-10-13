const fs = require('fs');
export interface TaskFile {
    tasks: Task[];
}

export class TaskList  {

    tasks: Task[];
    taskStatuses: TaskStatus[];
    taskPriorities: TaskPriority[];
    taskCategories: TaskCategory[];
    taskFrequencies: TaskFrequency[];

    constructor($tasks: Task[] = []){
        this.tasks = $tasks;
        this.taskStatuses = Object.values(TaskStatus);
        this.taskPriorities = Object.values(TaskPriority);
        this.taskCategories = Object.values(TaskCategory);
        this.taskFrequencies = Object.values(TaskFrequency);
    }
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
    frequency: TaskFrequency;
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

export enum TaskFrequency {
    NO_REPEAT = 'NO_REPEAT',
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'WEEKLY',
    BI_MONTHLY = 'BI_MONTHLY',
    QUARTERLY = 'QUARTERLY',
    HALF_YEARLY = 'HALF_YEARLY',
    YEARLY = 'YEARLY'
}

interface TaskService {
    getTasks(userId: string): TaskList;
    createTask(userId: string, task: Task): TaskList;
    // updateTask(userId: string, taskId: number, task: Task): void;
    // deleteTask(userId: string, taskId: number): void;
}

export const taskService: TaskService = {
    getTasks,
    createTask,
    // updateTask,
    // deleteTask
};

function createTaskFile(fileName: string): void {
    const userFile: TaskFile = {
        tasks: []
    };
    const data = JSON.stringify(userFile);
    fs.writeFileSync(fileName, data);
};

function getTasks(userId: string): TaskList {
    const fileName = `./server/tasks-${userId}.json`;
    if (!fs.existsSync(fileName)) {
        createTaskFile(fileName);
    }
    const data = fs.readFileSync(fileName, 'utf8');
    const taskFile = JSON.parse(data);
    const taskList = new TaskList(taskFile.tasks);

    return taskList;
};

function createTask(userId: string, task: Task): TaskList {
    const fileName = `./server/tasks-${userId}.json`;
    if (!fs.existsSync(fileName)) {
        createTaskFile(fileName);
    }
    const data = fs.readFileSync(fileName, 'utf8');
    const taskFile = JSON.parse(data);
    task.id = taskFile.tasks.length + 1;
    task.createdAt = new Date().toISOString();
    task.updatedAt = new Date().toISOString();
    taskFile.tasks.push(task);
    const updatedData = JSON.stringify(taskFile);
    fs.writeFileSync(fileName, updatedData);
    const taskList = getTasks(userId);
    return taskList;
}