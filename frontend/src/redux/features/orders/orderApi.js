import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseURL";

const orderApi = createApi({
    reducerPath: "orderAPi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/orders`,
        credentials: "include"
    }),
    tagTypes: ["Order"],
    endpoints: (builder) => ({
        getOrderByEmail: builder.query({
            query: (email) => ({
                url:`/${email}`,
                method: 'GET'
            }),
            providesTags: ['Order']
        }),
        getOrderById: builder.query({
            query: (orderId) => ({
                url:`/order/${orderId}`,
                method: 'GET'
            }),
            providesTags: ['Order']
        }),
        getAllOrders: builder.query({
            query: () => ({
                url:'',
                method:'Get'
            }),
            providesTags:['Order']
        }),
        updateOrderStatus: builder.mutation({
            query: ({id, status}) => ({
                url: `/update-order-status/${id}`,
                method: 'PATCH',
                body: {status},
            }),
            invalidatesTags: ['Order']
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/delete-order/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order']
        })
    })
})

export const {useGetOrderByEmailQuery, useGetOrderByIdQuery, useGetAllOrdersQuery, useDeleteOrderMutation, useUpdateOrderStatusMutation} = orderApi;
export default orderApi;
