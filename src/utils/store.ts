import { create } from 'zustand';

interface LocalState {
    roomId: String,
    setRoomId: (roomId: String) => void,
    classesJson: JSON
    setClassesJson: (classesJson: JSON) => void
}

const useLocalStore = create<LocalState>((set) => ({
    roomId: "",
    setRoomId: (roomId: String) => set({ roomId }),
    classesJson: JSON,
    setClassesJson: (classesJson: JSON) => set({classesJson})
}));

export default useLocalStore;
