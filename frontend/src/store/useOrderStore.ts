import { CheckoutSessionRequest, OrderState } from "@/types/orderType";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_ENDPOINT: string = "http://localhost:3000/api/v1/order";
axios.defaults.withCredentials = true;

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      isLoading: false,
      orders: [],
      createCheckoutSession: async (
        checkoutSession: CheckoutSessionRequest
      ) => {
        try {
          set({ isLoading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/checkout/create-checkout-session`,
            checkoutSession,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          window.location.href = response.data.session.url;
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
        }
      },
      getOrderDetails: async () => {
        try {
          set({ isLoading: true });
          const response = await axios.get(`${API_ENDPOINT}/`);

          set({ isLoading: false, orders: response.data.orders });
        } catch (error) {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "order",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
