import { create } from 'zustand';

interface LocalState {
    roomId: string;
    setRoomId: (roomId: string) => void;
    userId: string;
    setUserId: (userId: string) => void;
}

const useLocalStore = create<LocalState>((set) => ({
    roomId: "",
    setRoomId: (roomId: string) => set({ roomId }),
    userId: "",
    setUserId: (userId: string) => set({ userId }),
}));

export default useLocalStore;