import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCommentsAsync = createAsyncThunk(
  "comments/fetchCommentsAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/comments");
      if (!response.ok) throw new Error("Failed to fetch comments");
      const comments = await response.json();
      return comments;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCommentAsync = createAsyncThunk(
  "comments/addCommentAsync",
  async (comment, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      if (!response.ok) throw new Error("Failed to add comment");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCommentAsync = createAsyncThunk(
  "comments/deleteCommentAsync",
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3001/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete comment");
      return commentId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: { items: [], status: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommentsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCommentsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addCommentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(addCommentAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;
