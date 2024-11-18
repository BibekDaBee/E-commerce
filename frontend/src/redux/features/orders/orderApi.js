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
            })
        })
    })
})

export const {useGetOrderByEmailQuery} = orderApi;
export default orderApi;
