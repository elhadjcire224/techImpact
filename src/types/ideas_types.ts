export enum IdeaStatus {
  InDiscussion = 'In Discussion',
  InProgress = 'In Progress',
  Completed = 'Completed'
}

export interface IdeaCard {
  author: {
    id: string;
    name: string;
    image: string;
  };
  _count: {
    comments: number;
    likes: number;
  };
  hasLiked: boolean;
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  status: IdeaStatus;
  mentorValidated: boolean;
  authorId: string;
}
