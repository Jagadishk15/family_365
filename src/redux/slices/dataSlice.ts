import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OrphanageResponse} from '../../entities/commonObjects';

interface CounterState {
  OrphanageDetails: OrphanageResponse[];
  pincode: string;
}

const initialState: CounterState = {
  OrphanageDetails: [],
  pincode: '',
};

export const counterSlice = createSlice({
  name: 'orphanageDetails',
  initialState,
  reducers: {
    resetState: state => {
      state.OrphanageDetails = [];
    },
    orphanageDetails: (state, actions: PayloadAction<OrphanageResponse>) => {
      state.OrphanageDetails.push(actions.payload);
    },
    setGlobalPinCode: (state, action: PayloadAction<any>) => {
      state.pincode = action.payload;
    },
  },
});

export const {orphanageDetails, setGlobalPinCode, resetState} =
  counterSlice.actions;
export default counterSlice.reducer;
