import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import { LoginInputState, SignupInputState } from "@/schema/userSchema";

const API_ENDPOINT = "http://localhost:3000/api/v1/user";
axios.defaults.withCredentials = true;

type User = {
  fullname: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  isLoading: boolean;
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      isLoading: false,

      // Signup API implementation
      signup: async (input: SignupInputState) => {
        try {
          set({ isLoading: true });
          const response = await axios.post(`${API_ENDPOINT}/signup`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.data.success) {
            toast.success(response.data.message);
            set({
              isLoading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Signup failed.");
          set({ isLoading: false });
        }
      },

      // Login API implementation
      login: async (input: LoginInputState) => {
        try {
          set({ isLoading: true });
          const response = await axios.post(`${API_ENDPOINT}/login`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              isLoading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Login failed.");
          set({ isLoading: false });
        }
      },

      // verifyEmail API implementation
      verifyEmail: async (verificationCode: string) => {
        try {
          set({ isLoading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/verify-email`,
            { verificationCode },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.success) {
            toast.success(response.data.message);
            set({
              isLoading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Verification failed.");
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
