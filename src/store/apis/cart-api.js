import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cartApi = createApi({
  reducerPath: "Cart",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  // refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getCartItems: builder.query({
      providesTags: (result, error, id) => {
        if (result) {
          let tags = result?.cart?.cartItems?.map((item) => {
            return { type: "item", id: item.course };
          });

          tags?.push({ type: "cart" });

          return tags;
        } else {
          return [];
        }
      },
      query: () => {
        return {
          url: "/carts/showMyCart",
          method: "GET",
        };
      },
    }),

    addCartItem: builder.mutation({
      invalidatesTags: (result, error, cartItem) => {
        return [{ type: "cart" }];
      },
      query: (cartItem) => {
        return {
          url: "/carts",
          method: "POST",
          body: cartItem,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),

    deleteCartItem: builder.mutation({
      invalidatesTags: (result, error, id) => {
        return [{ type: "item", id: id }];
      },
      query: (id) => {
        return {
          url: `/carts/${id}`,
          method: "DELETE",
        };
      },
    }),

    clearCart: builder.mutation({
      invalidatesTags: (result, error, args) => {
        return [{ type: "cart" }];
      },
      query: () => {
        return {
          url: "/carts/clearCart",
          method: "PATCH",
        };
      },
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useAddCartItemMutation,
  useDeleteCartItemMutation,
  useClearCartMutation,
} = cartApi;
export default cartApi;
