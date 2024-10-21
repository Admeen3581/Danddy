import { create } from 'zustand';

interface LocalState {
    roomId: String;
    setRoomId: (roomId: String) => void;
    userId: String;
    setUserId: (userId: String) => void;
}

const useLocalStore = create<LocalState>((set) => ({
    roomId: "",
    setRoomId: (roomId: String) => set({ roomId }),
    userId: "",
    setUserId: (userId: String) => set({ userId }),
}));

export default useLocalStore;