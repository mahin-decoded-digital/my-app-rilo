import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ProjectType = 'Web' | 'Mobile' | 'Cloud' | 'AI' | 'Other';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  projectType: ProjectType | string;
  message: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'responded';
}

interface ContactState {
  submissions: ContactSubmission[];
  addSubmission: (submission: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>) => void;
  updateSubmissionStatus: (id: string, status: ContactSubmission['status']) => void;
  deleteSubmission: (id: string) => void;
  clearAll: () => void;
}

export const useContactStore = create<ContactState>()(
  persist(
    (set) => ({
      submissions: [],
      
      addSubmission: (data) => set((state) => ({
        submissions: [
          ...state.submissions,
          {
            ...data,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            status: 'pending',
          },
        ],
      })),
      
      updateSubmissionStatus: (id, status) => set((state) => ({
        submissions: state.submissions.map((sub) =>
          sub.id === id ? { ...sub, status } : sub
        ),
      })),
      
      deleteSubmission: (id) => set((state) => ({
        submissions: state.submissions.filter((sub) => sub.id !== id),
      })),
      
      clearAll: () => set({ submissions: [] }),
    }),
    {
      name: 'savannah-contact-storage',
    }
  )
);