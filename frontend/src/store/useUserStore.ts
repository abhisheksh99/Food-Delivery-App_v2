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
    checkAuthentication: () => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    updateProfile: (input: any) => Promise<void>;
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
                    const response = await axios.post(
                        `${API_ENDPOINT}/signup`,
                        input,
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
                    toast.error(error.response?.data?.message || "Signup failed.");
                    set({ isLoading: false });
                }
            },

            // Login API implementation
            login: async (input: LoginInputState) => {
                try {
                    set({ isLoading: true });
                    const response = await axios.post(
                        `${API_ENDPOINT}/login`,
                        input,
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
                    toast.error(error.response?.data?.message || "Login failed.");
                    set({ isLoading: false });
                }
            },

            // verifyEmail implementation
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

            // checkAuthentication implementation
            checkAuthentication: async () => {
                try {
                    set({ isCheckingAuth: true });
                    const response = await axios.get(`${API_ENDPOINT}/check-auth`);
                    if (response.data.success) {
                        set({
                            user: response.data.user,
                            isAuthenticated: true,
                            isCheckingAuth: false,
                        });
                    }
                } catch (error: any) {
                    set({ isAuthenticated: false, isCheckingAuth: false });
                }
            },

            // logout implementation
            logout: async () => {
                try {
                    set({ isLoading: true });
                    const response = await axios.post(`${API_ENDPOINT}/logout`);
                    if (response.data.success) {
                        toast.success(response.data.message);
                        set({ isLoading: false, user: null, isAuthenticated: false });
                    }
                } catch (error: any) {
                    toast.error(error.response?.data?.message || "Logout failed.");
                    set({ isLoading: false });
                }
            },

            // forgotPassword implementation
            forgotPassword: async (email: string) => {
                try {
                    set({ isLoading: true });
                    const response = await axios.post(
                        `${API_ENDPOINT}/forgot-password`,
                        { email }
                    );
                    if (response.data.success) {
                        toast.success(response.data.message);
                        set({ isLoading: false });
                    }
                } catch (error: any) {
                    toast.error(error.response?.data?.message || "Request failed.");
                    set({ isLoading: false });
                }
            },

            // resetPassword implementation
            resetPassword: async (token: string, newPassword: string) => {
                try {
                    set({ isLoading: true });
                    const response = await axios.post(
                        `${API_ENDPOINT}/reset-password/${token}`,
                        { newPassword }
                    );
                    if (response.data.success) {
                        toast.success(response.data.message);
                        set({ isLoading: false });
                    }
                } catch (error: any) {
                    toast.error(error.response?.data?.message || "Reset failed.");
                    set({ isLoading: false });
                }
            },

            // updateProfile implementation
            updateProfile: async (input: any) => {
                try {
                    const response = await axios.put(
                        `${API_ENDPOINT}/profile/update`,
                        input,
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (response.data.success) {
                        toast.success(response.data.message);
                        set({ user: response.data.user, isAuthenticated: true });
                    }
                } catch (error: any) {
                    toast.error(error.response?.data?.message || "Update failed.");
                }
            },
        }),
        {
            name: "user",
            storage: createJSONStorage(() => localStorage),
        }
    )
);