import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setProjectData } from "../reducers/projectsReducer";

const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5164/api/Project/" }),
  tagTypes: ["projectData"],
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: "GetAll",
        method: "GET",
      }),

      providesTags: ["projectData"],
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProjectData(data));
        } catch (err) {
          console.error("Error ", err);
        }
      },
    }),

    addProject: builder.mutation({
      query: (newProject) => ({
        url: "Create",
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: ["projectData"],
    }),
  }),
});

export const { useAddProjectMutation, useGetProjectsQuery } = projectsApi;
export default projectsApi;
