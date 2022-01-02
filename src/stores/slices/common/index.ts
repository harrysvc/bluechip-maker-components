import { AlertColor } from '@mui/material';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShowMessageParams {
  message: string | null;
  type?: AlertColor;
}
interface CommonState {
  message: ShowMessageParams;
}

const initialState: CommonState = {
  message: {
    message: null,
    type: 'info',
  },
};

const showMessage: CaseReducer<CommonState, PayloadAction<ShowMessageParams>> = (state, { payload }) => {
  state.message = payload;
};

const dismissMessage: CaseReducer<CommonState> = (state) => {
  state.message.message = null;
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showMessage,
    dismissMessage,
  },
});

export const commonReducer = commonSlice.reducer;
export const commonActions = commonSlice.actions;
export const { caseReducers } = commonSlice;
