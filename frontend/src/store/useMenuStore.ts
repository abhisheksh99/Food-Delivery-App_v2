import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurantStore } from "./useRestaurantStore";

type MenuState = {
  isLoading: boolean;
  menu: any | null;
  createMenu: (formData: FormData) => Promise<void>;
  editMenu: (menuId: string, formData: FormData) => Promise<void>;
};

const API_ENDPOINT = "http://localhost:3000/api/v1/menu";
axios.defaults.withCredentials = true;

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      isLoading: false,
      menu: null,
      createMenu: async (formData: FormData) => {
        try {
          set({ isLoading: true });
          const response = await axios.post(`${API_ENDPOINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ isLoading: false, menu: response.data.menu });
          }
          // update restaurant
          useRestaurantStore.getState().addMenuToRestaurant(response.data.menu)


          set({ isLoading: false });
        } catch (error: any) {
          toast.error(error.response?.data?.message || "An error occurred");
          set({ isLoading: false });
        }
      },
      editMenu: async (menuId: string, formData: FormData) => {
        try {
          set({ isLoading: true });
          const response = await axios.put(
            `${API_ENDPOINT}/${menuId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.data.success) {
            toast.success(response.data.message);
            set({ isLoading: false, menu: response.data.menu });
          }
          // update restaurant menu
          useRestaurantStore.getState().updateMenuToRestaurant(response.data.menu)

        } catch (error: any) {
          toast.error(error.response?.data?.message || "An error occurred");
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "menu",
      storage: createJSONStorage(() => localStorage),
    }
  )
);