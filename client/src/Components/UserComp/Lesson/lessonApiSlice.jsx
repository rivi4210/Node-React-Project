import apiSlice from "../../../app/apiSlice";

const lessonsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
       
        getLessonByLevel: build.query({
            query: (level) => ({
                url: '/lesson/level/'.concat(level)
            }),
            providesTags: ["Lessons"]
        }),

       
    }),
})

export const {
    useGetLessonByLevelQuery
} = lessonsApiSlice