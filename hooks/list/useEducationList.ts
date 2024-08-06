"use client"

import { deleteEducation, setSortOrders } from "@/lib/client/education";
import { getSection, SectionEnums } from "@/lib/redux/reducers/sections"
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Education } from "@prisma/client";
import { useEffect, useState } from "react";

export default function({ initialItems: initialEducations }: { initialItems?: Education[] } = {}) {
    const { actions, selectors } = getSection(SectionEnums.education);
    const educations = useAppSelector(selectors.selectItems);
    const dispatch = useAppDispatch();
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (initialEducations && !educations) {
            console.log('setting education...');
            dispatch(actions.setItems(initialEducations));
        }
    }, [initialEducations])

    const remove = async(education: Education) => {
        setDeleting(true);
        try {
            await deleteEducation(education.id);
            dispatch(actions.removeItem(education.id));
        } catch(error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }
    }

    const saveSortOrder = async(educations: Education[]) => {
        dispatch(actions.setItems(educations));
        await setSortOrders(educations);
    }

    return { items: educations ? [...educations] : [...initialEducations ?? []], remove, saveSortOrder, setEditing, editing, deleting }
}