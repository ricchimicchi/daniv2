// types.ts
export interface User {
    id: string;
    userId: string;
    passwordForUser?: string;
    role: 'user' | 'admin';
  }
  