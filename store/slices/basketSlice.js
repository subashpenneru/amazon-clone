import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        const newItems = [...state.items];
        const reqItem = state.items[index];
        const updatedItem = {
          ...reqItem,
          qty: reqItem.qty + 1,
        };
        newItems[index] = updatedItem;
        state.items = [...newItems];
      } else {
        state.items = [...state.items, action.payload];
      }
    },
    removeFromBasket: (state, action) => {
      const { id, qty } = action.payload;
      if (!qty) {
        state.items = state.items.filter((item) => item.id !== id);
        return;
      }

      const newItems = [...state.items];
      const index = state.items.findIndex((item) => item.id === id);
      if (index >= 0) {
        const reqItem = state.items[index];
        if (reqItem.qty === 1) {
          state.items = newItems.filter((item) => item.id !== id);
        } else {
          const updatedItem = {
            ...reqItem,
            qty: reqItem.qty - 1,
          };

          newItems[index] = updatedItem;
          state.items = [...newItems];
        }
      }
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce(
    (prev, curr) => {
      const obj = {
        ...prev,
        totalItems: prev.totalItems + curr.qty,
        totalPrice: Number(
          (prev.totalPrice + curr.price * curr.qty).toFixed(2)
        ),
      };
      return obj;
    },
    { totalItems: 0, totalPrice: 0 }
  );

export default basketSlice.reducer;
