import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchCartItems } from "../apis/cartApi";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      cartItemCount: 0,
      currentUserId: null,
      isLoading: false,
      error: null,

      // 장바구니 아이템 개수 계산
      calculateItemCount: (items) => {
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      // 장바구니 데이터 로드
      loadCartItems: async (userId) => {
        if (!userId) return;
        
        const { currentUserId } = get();
        // 다른 사용자로 로그인한 경우 장바구니 초기화
        if (currentUserId && currentUserId !== userId) {
          set({ cartItems: [], cartItemCount: 0 });
        }

        set({ isLoading: true, error: null, currentUserId: userId });
        try {
          const items = await fetchCartItems(userId);
          set({
            cartItems: items,
            cartItemCount: get().calculateItemCount(items),
            isLoading: false,
          });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },

      // 장바구니 아이템 추가
      addToCart: (newItem) => {
        if (!newItem || !newItem.products) {
          console.error("Invalid cart item:", newItem);
          return;
        }

        const { cartItems } = get();
        const existingItem = cartItems.find(
          (item) => item.products && item.products.id === newItem.products.id
        );

        let updatedItems;
        if (existingItem) {
          // 기존 아이템 수량 증가
          updatedItems = cartItems.map((item) =>
            item.products && item.products.id === newItem.products.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        } else {
          // 새 아이템 추가
          updatedItems = [...cartItems, newItem];
        }

        set({
          cartItems: updatedItems,
          cartItemCount: get().calculateItemCount(updatedItems),
        });
      },

      // 장바구니 아이템 수량 변경
      updateCartItemQuantity: (cartItemId, quantity) => {
        const { cartItems } = get();
        const updatedItems = cartItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
        );

        set({
          cartItems: updatedItems,
          cartItemCount: get().calculateItemCount(updatedItems),
        });
      },

      // 장바구니 아이템 삭제
      removeFromCart: (cartItemId) => {
        const { cartItems } = get();
        const updatedItems = cartItems.filter((item) => item.id !== cartItemId);

        set({
          cartItems: updatedItems,
          cartItemCount: get().calculateItemCount(updatedItems),
        });
      },

      // 장바구니 비우기
      clearCart: () => {
        set({ cartItems: [], cartItemCount: 0 });
      },
      
      // 사용자 로그아웃 시 장바구니 초기화
      resetCart: () => {
        set({ cartItems: [], cartItemCount: 0, currentUserId: null });
      },

      // 장바구니 새로고침
      refreshCart: async (userId) => {
        await get().loadCartItems(userId);
      },
    }),
    {
      name: "cart-store",
      partialize: (state) => ({
        cartItems: state.cartItems,
        cartItemCount: state.cartItemCount,
        currentUserId: state.currentUserId,
      }),
    }
  )
);
