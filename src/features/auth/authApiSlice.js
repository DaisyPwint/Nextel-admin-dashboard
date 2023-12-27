import { apiSlice } from "../../app/services/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
    // tagTypes: ["auth"],
    endpoints: builder => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/admin/login',
                method: 'POST',
                body: data
            }),
            // invalidatesTags: ["auth"]
        }),
        changePwd: builder.mutation({
            query: ({oldPassword,newPassword}) => {
                return ({
                    url: '/auth/admin/change-password',
                    method: 'POST',
                    body: {
                        oldPassword,
                        newPassword
                    }
                })
            },
            // invalidatesTags: ["auth"]
        }),
        resetPwd: builder.mutation({
            query: (data) => ({
                url: '/auth/admin/reset-password',
                method: "POST",
                body: data
            }),
            // invalidatesTags: ["auth"]
        })
    })
})

export const { useLoginMutation,useChangePwdMutation,useResetPwdMutation } = authApiSlice;