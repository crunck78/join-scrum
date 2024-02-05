interface TaskCategoryCountResponseAPI {
    category__name: string,
    category__color: string,
    count: number,
    latest_due_date: string
}

interface TaskCategoryCountResponse {
    categoryName: string,
    categoryColor: string,
    count: number,
    latestDueDate: Date
}

interface TaskPriorityCountResponseAPI {
    priority: string,
    count: number,
    latest_due_date: string
}

interface TaskPriorityCountResponse {
    priority: string,
    count: number,
    latestDueDate: Date
}

interface TaskListsCountResponseAPI {
    list__name: string,
    count: number,
    list__position: number,
    list__board__title: string,
    latest_due_date: string
}

interface TaskListsCountResponse {
    listName: string,
    count: number,
    listPosition: number,
    listBoardTitle: string
    latestDueDate: Date
}

interface TasksInBacklogResponseAPI {
    count: number,
    latest_due_date: string
}

interface TasksInBacklogResponse {
    count: number,
    latestDueDate: Date
}

export interface SummaryResponseAPI {
    tasks_by_priority: TaskPriorityCountResponseAPI[],
    tasks_in_lists: TaskListsCountResponseAPI[],
    tasks_in_backlog: TasksInBacklogResponseAPI
    tasks_by_category: TaskCategoryCountResponseAPI[]
}

export interface SummaryResponse {
    tasksByPriority: TaskPriorityCountResponse[],
    tasksInLists: TaskListsCountResponse[],
    tasksInBacklog: TasksInBacklogResponse,
    tasksByCategory: TaskCategoryCountResponse[]
}

class TaskCategoryCount {
    static createInternalValue(taskCategoryCount: TaskCategoryCountResponseAPI): TaskCategoryCountResponse {
        return {
            categoryName: taskCategoryCount.category__name,
            count: taskCategoryCount.count,
            categoryColor: taskCategoryCount.category__color,
            latestDueDate: new Date(taskCategoryCount.latest_due_date)
        };
    }
}

class TaskPriorityCount {
    static createInternalValue(taskPriorityCount: TaskPriorityCountResponseAPI): TaskPriorityCountResponse {
        return {
            priority: taskPriorityCount.priority,
            count: taskPriorityCount.count,
            latestDueDate: new Date(taskPriorityCount.latest_due_date)
        };
    }
}

class TaskListsCount {
    static createInternalValue(taskListsCount: TaskListsCountResponseAPI): TaskListsCountResponse {
        return {
            listName: taskListsCount.list__name,
            count: taskListsCount.count,
            listPosition: taskListsCount.list__position,
            listBoardTitle: taskListsCount.list__board__title,
            latestDueDate: new Date(taskListsCount.latest_due_date)
        };
    }
}

class TasksInBacklog {
    static createInternalValue(tasksInBackLog: TasksInBacklogResponseAPI): TasksInBacklogResponse {
        return {
            count: tasksInBackLog.count,
            latestDueDate: new Date(tasksInBackLog.latest_due_date)
        }
    }
}

export class Summary {
    static createInternalValue(summary: SummaryResponseAPI): SummaryResponse {
        return {
            tasksByPriority: summary.tasks_by_priority.map(taskByPriority => TaskPriorityCount.createInternalValue(taskByPriority)),
            tasksInBacklog: TasksInBacklog.createInternalValue(summary.tasks_in_backlog),
            tasksInLists: summary.tasks_in_lists.map(taskListsCount => TaskListsCount.createInternalValue(taskListsCount)),
            tasksByCategory: summary.tasks_by_category.map(taskByCategory => TaskCategoryCount.createInternalValue(taskByCategory))
        };
    }
}