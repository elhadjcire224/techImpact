import { IdeaStatus } from "./ideas_types";

export const statusConfig: Record<IdeaStatus, { label: string, className: string }> = {
  [IdeaStatus.InDiscussion]: {
    label: IdeaStatus.InDiscussion,
    className: 'bg-blue-500/10 text-blue-500'
  },
  [IdeaStatus.InProgress]: {
    label: IdeaStatus.InProgress,
    className: 'bg-violet-500/10 text-violet-500'
  },
  [IdeaStatus.Completed]: {
    label: IdeaStatus.Completed,
    className: 'bg-green-500/10 text-green-500'
  }
}