import { create } from 'zustand';
import { Character, createBlankCharacterJSON } from './characterJsonFunctions';

interface LocalState {
    roomId: String,
    setRoomId: (roomId: String) => void,
    classesJson: Character,
    setClassesJson: (classesJson: Character) => void,
    userId: String,
    setUserId: (userId: String) => void,
}

const useLocalStore = create<LocalState>((set) => ({
    roomId: "",
    setRoomId: (roomId: String) => set({ roomId }),
    classesJson: createBlankCharacterJSON(),
    setClassesJson: (classesJson: Character) => set({classesJson}),
    userId: "",
    setUserId: (userId: String) => set({ userId }),
}));

export default useLocalStore;

