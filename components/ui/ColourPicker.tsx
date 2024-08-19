"use client"

import useClickOutside from "@/hooks/useClickOutside";
import { ColourElements, ColourElementType } from "@/types/template";
import { RefObject, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { FaFillDrip } from "react-icons/fa";
import { MdFormatColorText } from "react-icons/md";

const getIcon = (elementType: ColourElementType) => {
    switch(elementType) {
        case ColourElements.text:
            return MdFormatColorText;
        case ColourElements.background:
        default:
            return FaFillDrip;
    }
}

export default function ColourPicker(
    { elementType, colour, colourElementRef, onChange, onSave }:
    { elementType: ColourElementType, colour: string, colourElementRef: RefObject<HTMLDivElement>, onChange: (colour: string) => void, onSave: (elementType: ColourElementType, colour: string) => Promise<void> }
) {
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);

    const onColourSelect = (newColour: string) => {
        const property = elementType === ColourElements.background ? 'backgroundColor' : 'color'
        if (colourElementRef.current) colourElementRef.current.style[property] = newColour;
        onChange(newColour);
    }

    useClickOutside(pickerRef, async () => {
        await onSave(elementType, colour);
        setShowPicker(false);
    });

    const Icon = getIcon(elementType);
    return (
        <>
            <button style={{ color: colour }} title={`Change ${elementType} colour`} onClick={() => setShowPicker(!showPicker)}>
                <Icon size="2.5em"/>
            </button>
            {showPicker && (
                <div ref={pickerRef} className={`flex flex-col items-center z-50 absolute -translate-y-10 translate-x-9 p-3 bg-black/50 backdrop-blur-sm shadow-md rounded-lg ring-1 ring-slate-300/60 dark:ring-slate-400/20`}>
                    <HexColorPicker color={colour} onChange={onColourSelect} />
                    <div className="mt-2 [&>input]:rounded-md [&>input]:border [&>input]:bg-white [&>input]:text-gray-700 [&>input]:border-gray-200 [&>input]:shadow-sm [&>input]:focus-within:border-gray-400 [&>input]:focus-within:ring-1 [&>input]:focus-within:ring-gray-400 [&>input]:dark:bg-slate-700 [&>input]:dark:border-slate-600 [&>input]:dark:text-white">
                        <HexColorInput color={colour} onChange={onColourSelect} prefixed />
                    </div>
                </div>
            )}
        </>
    )
}
