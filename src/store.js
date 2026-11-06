import { create } from 'zustand'

export const SLOTS = ['paint', 'wheels', 'spoiler']

export const DEFAULT_BUILD = {
  paint: 'obsidian',
  wheels: 'wheel-1',
  spoiler: 'none',
}

export const useBuild = create((set) => ({
  ...DEFAULT_BUILD,
  setPart: (slot, id) => set({ [slot]: id }),
  setBuild: (build) => set(build),
}))