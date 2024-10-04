export enum TASKSTATUS {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  INPROGRESS = "INPROGRESS",
  COMPLETED = "COMPLETED"
}

export enum PRIORITY {
  NONE = "NONE",
  URGENT = "URGENT",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW"
}

export enum PROJECT {
  FRONTEND = "FRONTEND",
  CLOUD = "CLOUD",
  PERFORMANCE = "PERFORMANCE",
  BACKEND = "BACKEND",
  QA = "QA",
}

export type ASSIGNEE = {
  name: string ,
  imageUrl: string
}