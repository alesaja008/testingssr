import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  dataSlice.actions;

export const fetchData = () => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });
    const data = await response.json();
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.toString()));
  }
};

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export default store;
