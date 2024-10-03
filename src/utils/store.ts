import { create } from 'zustand';

const useStore = create((set) => ({
  roomId: null,
  setRoomId: (id: Number) => set({ roomId: id }),
}));

export default useStore;
