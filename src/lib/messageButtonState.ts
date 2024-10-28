/**
 * @Author Adam Long
 * @Date 10/27/2024
 * @Project SCRUM-113
 */

import {create} from 'zustand';

const messageButtonState = create((set) => ({
    enabled: false,
    setEnabled: (value) => set({ enabled: value }),
}));

//possible bug -- I may need to 'use client'
export default messageButtonState;