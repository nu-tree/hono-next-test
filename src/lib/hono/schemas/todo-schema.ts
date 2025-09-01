import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
});

export const updateTodoSchema = z.object({
  title: z.string().optional(),
  completed: z.boolean().optional(),
});

// Todo 타입 정의
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
