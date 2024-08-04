"use client"

import { deleteEducation, setSortOrders } from "@/lib/client/education";
import { removeEducation, selectEducationList, setEducations } from "@/lib/redux/reducers/education";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Education } from "@prisma/client";
import { useEffect, useState } from "react";

export default function({ initialItems: initialEducations }: { initialItems?: Education[] } = {}) {
    const educations = useAppSelector(selectEducationList);
    const dispatch = useAppDispatch();
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (initialEducations && !educations) {
            console.log('setting education...');
            dispatch(setEducations(initialEducations));
        }
    }, [initialEducations])

    const remove = async(education: Education) => {
        setDeleting(true);
        try {
            await deleteEducation(education.id);
            dispatch(removeEducation(education.id));
        } catch(error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }
    }

    const saveSortOrder = async(educations: Education[]) => {
        dispatch(setEducations(educations));
        await setSortOrders(educations);
    }

    return { items: educations ? [...educations] : [...initialEducations ?? []], remove, saveSortOrder, setEditing, editing, deleting }
}