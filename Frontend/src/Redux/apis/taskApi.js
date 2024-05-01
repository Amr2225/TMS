import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../services/auth/auth";
import { setTasksData, setAssignedDevelopers } from "../reducers/taskReducer";

const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5164/api/Task/" }),
  tagTypes: ["tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: ({ id, role, projectId }) => ({
        url: `GetTasks?userId=${id}&role=${role}&projectId=${projectId}`,
        method: "GET",
        headers: { Authorization: "Bearer " + getAuthToken().token },
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const {
            data: { value },
          } = await queryFulfilled;
          console.log("feteched....");
          dispatch(setTasksData(value));
        } catch (e) {
          console.log(e);
        }
      },
      providesTags: ["tasks"],
    }),

    createTask: builder.mutation({
      query: (newTaskData) => ({
        url: "Create",
        method: "POST",
        body: newTaskData,
        headers: { Authorization: "Bearer " + getAuthToken().token },
      }),
      invalidatesTags: ["tasks"],
    }),

    updateTask: builder.mutation({
      query: (updatedTask) => ({
        url: "UpdateTask",
        method: "PUT",
        headers: { Authorization: "Bearer " + getAuthToken().token },
        body: updatedTask,
      }),
      invalidatesTags: ["tasks"],
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `DeleteTask?id=${id}`,
        method: "DELETE",
        headers: { Authorization: "Bearer " + getAuthToken().token },
      }),
      invalidatesTags: ["tasks"],
    }),
  }),
});
export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
export default taskApi;
