import { combineReducers, createSelector } from "@reduxjs/toolkit";
import resume from './resume';
import personal, { selectPersonalDetails, selectPersonalLoading } from "./personal";
import employment, { selectEmploymentList, selectEmploymentLoading } from "./employment";
import education, { selectEducationList, selectEducationLoading } from "./education";
import skill, { selectSkillList, selectSkillLoading } from "./skill";
import strength, { selectStrengthList, selectStrengthLoading } from "./strength";

export const selectAllResumeDetails = createSelector(
    [selectPersonalDetails, selectEmploymentList, selectEducationList, selectSkillList, selectStrengthList],
    (personal, employments, educations, skills, strengths) => ({ personal, employments, educations, skills, strengths })
);

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