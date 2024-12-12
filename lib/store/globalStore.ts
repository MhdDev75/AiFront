import { create } from "zustand";

type Store = {
  count: number;
  inc: () => void;
};

export type Status = "TODO" | "INPROGRESS" | "DONE";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
};

export type State = {
  tasks: Task[];
};

export type Actions = {
  addTask: (title: string, description: string) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, status: Status) => void;
};

const useStore = create<State & Store & Actions>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  tasks: [],

  addTask: (title: string, description?: string) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: "12313", title, description, status: "TODO" },
      ],
    })),
  removeTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  updateTask: (id: string, status: Status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),
}));

export default useStore;
