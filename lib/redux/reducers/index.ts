import { combineReducers, createSelector } from "@reduxjs/toolkit";
import resume from './resume';
import personal, { selectPersonalLoading } from "./personal";
import employment, { selectEmploymentLoading } from "./employment";
import education, { selectEducationLoading } from "./education";
import skill, { selectSkillLoading } from "./skill";
import strength, { selectStrengthLoading } from "./strength";

export const selectIsLoadingResume = createSelector(
    [selectPersonalLoading, selectEmploymentLoading, selectEducationLoading, selectSkillLoading, selectStrengthLoading],
    (personal, employments, educations, skills, strengths) => ([ personal, employments, educations, skills, strengths ].some(value => value === true))
);

export default combineReducers({
    resume,
    personal,
    employment,
    education,
    skill,
    strength
})