import { create } from 'zustand'

type Color = 'Black' | 'Color'
type SideType = 'Front' | 'Front & Back'
type JobType = 'Photocopy' | 'Printing' | 'Large Format' | 'Scanning' | ''

interface JobCardState {
  // 📌 Core Job Data
  jobType: JobType
  paperSize: string
  quantity: string
  color: Color
  colorType: string | null
  sideType: SideType
  fileAttached: boolean

  // 📌 Modal States
  isJobTypeModalOpen: boolean
  isPaperSizeModalOpen: boolean
  isQuantityModalOpen: boolean

  // 📌 Setters
  setJobType: (type: JobType) => void
  setPaperSize: (size: string) => void
  setQuantity: (qty: string) => void
  setColor: (color: Color) => void
  setColorType: (type: string) => void
  setSideType: (side: SideType) => void
  attachFile: () => void
  detachFile: () => void

  // 📌 Modal Controls
  toggleModal: () => void
  openModal: () => void
  closeModal: () => void

  openPaperSizeModal: () => void
  closePaperSizeModal: () => void

  openQuantityModal: () => void
  closeQuantityModal: () => void

  toggleSideType: () => void

  // 📌 Reset all
  resetJobCard: () => void
}

const useJobCardStore = create<JobCardState>((set) => ({
  jobType: '',
  paperSize: 'A4',
  quantity: '',
  color: 'Black',
  colorType: null,
  sideType: 'Front',
  fileAttached: false,

  isJobTypeModalOpen: false,
  isPaperSizeModalOpen: false,
  isQuantityModalOpen: false,

  setJobType: (type) => set({ jobType: type }),
  setPaperSize: (size) => set({ paperSize: size }),
  setQuantity: (qty) => set({ quantity: qty }),
  setColor: (color) => set({ color }),
  setColorType: (type) => set({ colorType: type }),
  setSideType: (value) => set({ sideType: value }),

  attachFile: () => set({ fileAttached: true }),
  detachFile: () => set({ fileAttached: false }),

  toggleModal: () =>
    set((state) => ({ isJobTypeModalOpen: !state.isJobTypeModalOpen })),
  openModal: () => set({ isJobTypeModalOpen: true }),
  closeModal: () => set({ isJobTypeModalOpen: false }),

  openPaperSizeModal: () => set({ isPaperSizeModalOpen: true }),
  closePaperSizeModal: () => set({ isPaperSizeModalOpen: false }),

  openQuantityModal: () => set({ isQuantityModalOpen: true }),
  closeQuantityModal: () => set({ isQuantityModalOpen: false }),

  toggleSideType: () =>
    set((state) => ({
      sideType: state.sideType === 'Front & Back' ? 'Front' : 'Front & Back',
    })),

  resetJobCard: () =>
    set({
      jobType: '',
      paperSize: 'A4',
      quantity: '',
      color: 'Black',
      colorType: null,
      sideType: 'Front',
      fileAttached: false,
      isJobTypeModalOpen: false,
      isPaperSizeModalOpen: false,
      isQuantityModalOpen: false,
    }),
}))

export default useJobCardStore
