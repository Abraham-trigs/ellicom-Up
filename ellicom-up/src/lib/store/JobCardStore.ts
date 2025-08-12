import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Job = {
  id: string;
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

  isMaterialModalOpen: boolean;
  isJobTypeModalOpen: boolean;
  isPaperSizeModalOpen: boolean;
  isQuantityModalOpen: boolean;

  openModal: () => void;
  closeModal: () => void;
  openPaperSizeModal: () => void;
  closePaperSizeModal: () => void;
  openQuantityModal: () => void;
  closeQuantityModal: () => void;
  openMaterialModal: () => void;
  closeMaterialModal: () => void;

  setJobType: (jobType: string) => void;
  setPaperSize: (size: string) => void;
  setQuantity: (qty: number) => void;
  setColorType: (type: string) => void;
  toggleSideType: () => void;
  setMaterial: (material: string) => void;
  setFileAttached: (attached: boolean) => void;

  saveJob: () => void;
  resetJob: () => void;

  // For editing jobs
  editingJobId: string | null;
  editedJob: Job | null;

  startEditJob: (id: string) => void;
  cancelEditJob: () => void;
  saveEditedJob: (job: Job) => void;
  setEditedJobField: (field: keyof Job, value: any) => void;
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

        setJobType: (jobType) =>
          set({ jobType, material: null, isJobTypeModalOpen: false }),
        setPaperSize: (size) =>
          set({ paperSize: size, isPaperSizeModalOpen: false }),
        setQuantity: (qty) => set({ quantity: qty, isQuantityModalOpen: false }),
        setColorType: (type) => set({ colorType: type }),
        toggleSideType: () =>
          set((state) => ({
            sideType: state.sideType === "Front" ? "Front & Back" : "Front",
          })),
        setMaterial: (material) =>
          set({ material, isMaterialModalOpen: false }),
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

          if (!jobType) return;

          const newJob: Job = {
            id: crypto.randomUUID(),
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

        editingJobId: null,
        editedJob: null,

        startEditJob: (id) => {
          const jobToEdit = get().savedJobs.find((job) => job.id === id) || null;
          set({ editingJobId: id, editedJob: jobToEdit });
        },

        cancelEditJob: () => {
          set({ editingJobId: null, editedJob: null });
        },

        saveEditedJob: (job) => {
          const updatedJobs = get().savedJobs.map((j) =>
            j.id === job.id ? job : j
          );
          set({ savedJobs: updatedJobs, editingJobId: null, editedJob: null });
        },

        setEditedJobField: (field, value) => {
          const editedJob = get().editedJob;
          if (!editedJob) return;
          set({
            editedJob: {
              ...editedJob,
              [field]: value,
            },
          });
        },
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
          editingJobId: state.editingJobId,
          editedJob: state.editedJob,
        }),
      }
    )
  )
);

export default useJobCardStore;
