import { create } from 'zustand';

interface LocalState {
    roomId: String,
    setRoomId: (roomId: String) => void
}

const useLocalStore = create<LocalState>((set) => ({
    roomId: "",
    setRoomId: (roomId: String) => set({ roomId }),
}));

export default useLocalStore;
