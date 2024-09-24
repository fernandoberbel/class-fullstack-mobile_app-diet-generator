import { create } from "zustand";

export type User = {
  name: string;
  weight: string;
  height: string;
  age: string;
  gender: string;
  level: string;
  goal: string;
};

type DataState = {
  user: User;
  setPageOne: (data: Omit<User, "gender" | "level" | "goal">) => void;
  setPageTwo: (data: Pick<User, "gender" | "level" | "goal">) => void;
};

export const useDataStore = create<DataState>((set) => ({
  user: {
    name: "",
    weight: "",
    height: "",
    age: "",
    gender: "",
    level: "",
    goal: "",
  },
  setPageOne: (data) => set((state) => ({ user: { ...state.user, ...data } })),
  setPageTwo: (data) => set((state) => ({ user: { ...state.user, ...data } })),
}));
