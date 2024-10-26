//@Author Adam Long
//@Date 10/26/2024
//@Project SCRUM-112

import {create} from 'zustand';

export const messageButtonState = create((set) => ({
    enabled: false,
    setEnabled: (value) => set({ enabled: value }),
}));