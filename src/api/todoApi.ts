import apiInit from "./index";
import { Todo } from "../types/index";

export const todoApi = apiInit.injectEndpoints({
  endpoints: (builder) => ({
    // get all todo lists
    getTodos: builder.query({
      query: ({ searchText, filter }) => {
        const queryParams = new URLSearchParams();
        if (searchText) queryParams.append("searchText", searchText);
        if (filter) queryParams.append("filter", filter);

        return `/todos?${queryParams.toString()}`;
      },
      providesTags: ["Todo"],
    }),

    // add a new todo list
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),

    // update  todo list
    updateTodo: builder.mutation<Todo, Partial<Todo>>({
      query: ({ _id, ...todo }) => ({
        url: `/todos/${_id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),

    // delete todo list
    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
