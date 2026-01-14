// ---------------------------------------------------------------------
// <copyright file="store.js" company="CargoFirst">
// Copyright (c) CargoFirst. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import jobReducer from './slices/jobSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer
  }
});

export default store;








