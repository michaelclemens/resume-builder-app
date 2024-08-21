"use client"

import useResume from "@/hooks/useResume";
import { ColourElements, ColourElementType, TemplateOptions } from "@/types/template";
import { getDefaultOptions } from "@/util/template";
import { Resume } from "@prisma/client";
import { RefObject, useState } from "react";
import { FaUndo } from "react-icons/fa";
import { ColourPicker } from "../ui";

export default function ResumeColourPicker({ resume, colourElementRef }: { resume: Resume, colourElementRef: RefObject<HTMLDivElement> }) {
    const { updateTemplateOptions } = useResume();
    const defaultOptions = getDefaultOptions(resume?.template);
    const templateOptions = resume.templateOptions as TemplateOptions ?? {};
    const initialBGColour = templateOptions.colours?.background ?? defaultOptions.background;
    const initialTextColour = templateOptions.colours?.text ?? defaultOptions.text;
    const [backgroundColour, setBGColour] = useState(initialBGColour);
    const [textColour, setTextColour] = useState(initialTextColour);

    const getNewOptions = (elementType: ColourElementType, newColour: string) => ({...(templateOptions as object), colours: {...(templateOptions.colours ?? {}), [elementType]: newColour }})

    const onSave = async (elementType: ColourElementType, newColour: string) => {
        if (newColour === (elementType === ColourElements.background ? initialBGColour : initialTextColour)) return;
        await updateTemplateOptions(resume.id, getNewOptions(elementType, newColour));
    }

    const onResetToDefault = async() => {
        if (backgroundColour === defaultOptions.background && textColour === defaultOptions.text) return;
        await updateTemplateOptions(resume.id, { colours: {}});
        setBGColour(defaultOptions.background);
        setTextColour(defaultOptions.text);
    }

    return (
        <div className={`absolute top-10 z-50 text-[6.5pt] right-3 print:hidden`}>
            <div className="mb-2">
                <ColourPicker 
                    elementType={ColourElements.background} 
                    colour={backgroundColour} 
                    colourElementRef={colourElementRef}
                    onChange={setBGColour}
                    onSave={onSave}
                />
            </div>
            <div className="mb-10">
                <ColourPicker 
                    elementType={ColourElements.text} 
                    colour={textColour} 
                    colourElementRef={colourElementRef}
                    onChange={setTextColour}
                    onSave={onSave}
                />
            </div>
            <div className="mb-2">
                <button className="text-red-900" title="Reset to default colours" onClick={onResetToDefault}>
                    <FaUndo size="2.3em"/>
                </button>
            </div>
        </div>
    )
}
