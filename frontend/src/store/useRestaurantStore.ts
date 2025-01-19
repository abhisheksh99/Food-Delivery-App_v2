import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const API_ENDPOINT = "http://localhost:3000/api/v1/restaurant";
axios.defaults.withCredentials = true;

export const useRestaurantStore = create(
  persist(
    (set,get) => ({
      restaurant: null,
      isLoading: false,
      searchedRestaurant:null,

      // Create Restaurant Api implementation
      createRestaurant: async (formData: FormData) => {
        try {
          set({ isLoading: true });
          const response = await axios.post(`${API_ENDPOINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(
            error.response?.data?.message || "Failed to create restaurant."
          );
        } finally {
          set({ isLoading: false });
        }
      },

      // Get Restaurant Api implementation
      getRestaurant: async () => {
        try {
          set({ isLoading: true });
          const response = await axios.get(`${API_ENDPOINT}/`);
          if (response.data.success) {
            set({ restaurant: response.data.restaurant });
          }
        } catch (error: any) {
          toast.error("Failed to fetch restaurants.");
          if (error.response?.status === 404) {
            set({ restaurant: null });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      //  Update a restaurant APi implemetation
      updateRestaurant: async (formData: FormData) => {
        try {
          set({ isLoading: true });
          const response = await axios.put(`${API_ENDPOINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ isLoading: false });
          }
        } catch (error: any) {
          toast.error(
            error.response?.data?.message || "Failed to update restaurant."
          );
        } finally {
          set({ isLoading: false });
        }
      },

      // Search Restaurant Api implememtaion
      searchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: string[]
      ) => {
        try {
          set({ isLoading: true });
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines.join(","));

          const response = await axios.get(
            `${API_ENDPOINT}/search/${searchText}?${params.toString()}`
          );
          console.log(
            `Requesting: ${API_ENDPOINT}/search/${searchText}?${params.toString()}`
          );
          if (response.data.success) {
            set({ searchedRestaurant: response.data });
          }
        } catch (error: any) {
          toast.error("Failed to search restaurants.");
        } finally {
          set({ isLoading: false });
        }
      },
      // Add a menu item to a restaurant Api implementation
      addMenuToRestaurant: async(menu:any) =>{
        set((state) => ({
          restaurant: state.restaurant
            ? {
                ...state.restaurant,
                menus: [...state.restaurant.menus, menu],
              }
            : null,
        }));

      },
      // Update a menu item Api implementation
      updateMenuToRestaurant: (updatedMenu:any) => {
        set((state) => {
          if (state.restaurant) {
            const updatedMenus = state.restaurant.menus.map((menu) =>
              menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return {
              restaurant: {
                ...state.restaurant,
                menus: updatedMenus,
              },
            };
          }
          return state;
        });
      },
    }),
    {
      name: "Restaurant",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
