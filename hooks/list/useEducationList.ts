"use client"

import { deleteEducation, setSortOrders } from "@/lib/client/education";
import { removeEducation, selectEducationList, setEducations } from "@/lib/redux/reducers/education";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Education } from "@prisma/client";
import { useEffect } from "react";

export default function({ initialItems: initialEducations }: { initialItems?: Education[] } = {}) {
    const educations = useAppSelector(selectEducationList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (initialEducations && !educations) {
            console.log('setting education...');
            dispatch(setEducations(initialEducations));
        }
    }, [initialEducations])

    const remove = async(education: Education) => {
        await deleteEducation(education.id);
        dispatch(removeEducation(education.id));
    }

    const saveSortOrder = async(educations: Education[]) => {
        dispatch(setEducations(educations));
        await setSortOrders(educations);
    }

    return { items: educations ? [...educations] : [...initialEducations ?? []], remove, saveSortOrder }
}