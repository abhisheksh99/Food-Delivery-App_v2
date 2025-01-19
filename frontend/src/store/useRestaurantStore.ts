import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";
import { MenuItem, RestaurantState } from "@/types/restaurantType";



const API_ENDPOINT = "http://localhost:3000/api/v1/restaurant";
axios.defaults.withCredentials = true;

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set) => ({
      // Define all required state properties
      isLoading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      singleRestaurant: null,
      restaurantOrder: [],

      // Action: Create a restaurant
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

      // Action: Get all restaurants
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

      // Action: Update a restaurant
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
          }
        } catch (error: any) {
          toast.error(
            error.response?.data?.message || "Failed to update restaurant."
          );
        } finally {
          set({ isLoading: false });
        }
      },

      // Action: Search for restaurants
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
          console.log(`Requesting: ${API_ENDPOINT}/search/${searchText}?${params.toString()}`);
          if (response.data.success) {
            set({ searchedRestaurant: response.data });
          }
        } catch (error: any) {
          toast.error("Failed to search restaurants.");
        } finally {
          set({ isLoading: false });
        }
      },

      // Action: Add a menu item to a restaurant
      addMenuToRestaurant: (menu: MenuItem) => {
        set((state) => ({
          restaurant: state.restaurant
            ? {
                ...state.restaurant,
                menus: [...state.restaurant.menus, menu],
              }
            : null,
        }));
      },

      // Action: Update a menu item in a restaurant
      updateMenuToRestaurant: (updatedMenu: MenuItem) => {
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

      // Action: Set applied filter
      setAppliedFilter: (value: string) => {
        set((state) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied
            ? state.appliedFilter.filter((item) => item !== value)
            : [...state.appliedFilter, value];
          return { appliedFilter: updatedFilter };
        });
      },

      // Action: Reset applied filter
      resetAppliedFilter: () => {
        set({ appliedFilter: [] });
      },

      // Action: Get single restaurant details
      getSingleRestaurant: async (restaurantId: string) => {
        try {
          set({ isLoading: true });
          const response = await axios.get(`${API_ENDPOINT}/${restaurantId}`);
          if (response.data.success) {
            set({ singleRestaurant: response.data.restaurant });
          }
        } catch (error) {
          console.error(error);
          toast.error("Failed to fetch restaurant details.");
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "Restaurant",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
