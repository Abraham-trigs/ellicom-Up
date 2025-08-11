import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Job = {
  id: string; // unique per saved job
  jobType: string | null;
  paperSize: string | null;
  quantity: number | null;
  colorType: string;
  sideType: string;
  fileAttached: boolean;
  material: string | null;
};

type JobCardState = {
  jobType: string | null;
  paperSize: string | null;
  quantity: number | null;
  colorType: string;
  sideType: string;
  fileAttached: boolean;
  material: string | null;

  savedJobs: Job[];

  // Modal states...
  isMaterialModalOpen: boolean;
  isJobTypeModalOpen: boolean;
  isPaperSizeModalOpen: boolean;
  isQuantityModalOpen: boolean;

  // Modals open/close
  openModal: () => void;
  closeModal: () => void;
  openPaperSizeModal: () => void;
  closePaperSizeModal: () => void;
  openQuantityModal: () => void;
  closeQuantityModal: () => void;
  openMaterialModal: () => void;
  closeMaterialModal: () => void;

  // Setters
  setJobType: (jobType: string) => void;
  setPaperSize: (size: string) => void;
  setQuantity: (qty: number) => void;
  setColorType: (type: string) => void;
  toggleSideType: () => void;
  setMaterial: (material: string) => void;
  setFileAttached: (attached: boolean) => void;

  // Save current job to savedJobs and reset inputs
  saveJob: () => void;
  resetJob: () => void;
};

const useJobCardStore = create<JobCardState>()(
  devtools(
    persist(
      (set, get) => ({
        jobType: null,
        paperSize: null,
        quantity: null,
        colorType: "Color",
        sideType: "Front",
        fileAttached: false,
        material: null,

        savedJobs: [],

        isMaterialModalOpen: false,
        isJobTypeModalOpen: false,
        isPaperSizeModalOpen: false,
        isQuantityModalOpen: false,

        openModal: () => set({ isJobTypeModalOpen: true }),
        closeModal: () => set({ isJobTypeModalOpen: false }),
        openPaperSizeModal: () => set({ isPaperSizeModalOpen: true }),
        closePaperSizeModal: () => set({ isPaperSizeModalOpen: false }),
        openQuantityModal: () => set({ isQuantityModalOpen: true }),
        closeQuantityModal: () => set({ isQuantityModalOpen: false }),
        openMaterialModal: () => set({ isMaterialModalOpen: true }),
        closeMaterialModal: () => set({ isMaterialModalOpen: false }),

        setJobType: (jobType) => set({ jobType, material: null, isJobTypeModalOpen: false }),
        setPaperSize: (size) => set({ paperSize: size, isPaperSizeModalOpen: false }),
        setQuantity: (qty) => set({ quantity: qty, isQuantityModalOpen: false }),
        setColorType: (type) => set({ colorType: type }),
        toggleSideType: () =>
          set((state) => ({
            sideType: state.sideType === "Front" ? "Front & Back" : "Front",
          })),
        setMaterial: (material) => set({ material, isMaterialModalOpen: false }),
        setFileAttached: (attached) => set({ fileAttached: attached }),

        saveJob: () => {
          const {
            jobType,
            paperSize,
            quantity,
            colorType,
            sideType,
            fileAttached,
            material,
            savedJobs,
          } = get();

          if (!jobType) return; // No jobType, no save

          const newJob: Job = {
            id: crypto.randomUUID(), // unique id for each saved job
            jobType,
            paperSize,
            quantity,
            colorType,
            sideType,
            fileAttached,
            material,
          };

          set({
            savedJobs: [...savedJobs, newJob],
          });

          get().resetJob();
        },

        resetJob: () =>
          set({
            jobType: null,
            paperSize: null,
            quantity: null,
            colorType: "Color",
            sideType: "Front",
            fileAttached: false,
            material: null,
            isMaterialModalOpen: false,
            isJobTypeModalOpen: false,
            isPaperSizeModalOpen: false,
            isQuantityModalOpen: false,
          }),
      }),
      {
        name: "jobCardStore",
        partialize: (state) => ({
          jobType: state.jobType,
          paperSize: state.paperSize,
          quantity: state.quantity,
          colorType: state.colorType,
          sideType: state.sideType,
          fileAttached: state.fileAttached,
          material: state.material,
          savedJobs: state.savedJobs,
        }),
      }
    )
  )
);

export default useJobCardStore;
