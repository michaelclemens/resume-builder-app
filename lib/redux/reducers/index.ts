"use client"

import { combineReducers } from "@reduxjs/toolkit";
import resume from './resume';
import { reducers } from "./sections";

export default combineReducers({
    ...reducers,
    resume,
})