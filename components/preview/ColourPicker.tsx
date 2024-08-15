import useClickOutside from "@/hooks/useClickOutside";
import { ColourElements, ColourElementType, ColourOptions, TemplateOptions } from "@/types/template";
import { useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { FaFillDrip, FaUndo } from "react-icons/fa";
import { MdFormatColorText } from "react-icons/md";


export default function ColourPicker(
    { children, templateOptions, defaults, className, align = 'right', onColourChange, onResetToDefault}: 
    { children: React.ReactNode, templateOptions?: TemplateOptions, defaults?: ColourOptions, className?: string, align?: 'left'|'right', onColourChange: (elementType: ColourElementType, colour: string) => Promise<void>, onResetToDefault: () => Promise<void> }
) {
    const backgroundColorPickerRef = useRef(null);
    const [backgroundColor, setBackgroundColour] = useState(templateOptions?.colours?.[ColourElements.background] ?? defaults?.[ColourElements.background] ?? '#fff');
    const [showBackgroundColorPicker, setShowBackgroundColorPicker] = useState(false);

    const textColorPickerRef = useRef(null);
    const [textColor, setTextColour] = useState(templateOptions?.colours?.[ColourElements.text] ?? defaults?.[ColourElements.text] ?? '#000');
    const [showTextColorPicker, setShowTextColorPicker] = useState(false);

    const toggleBackgroundPicker = async() => {
        if (showTextColorPicker) {
            setShowTextColorPicker(false);
        }
        const isUpdating = !!showBackgroundColorPicker && templateOptions?.colours?.[ColourElements.background] !== backgroundColor;
        setShowBackgroundColorPicker(!showBackgroundColorPicker);
        if (isUpdating) {
            await onColourChange(ColourElements.background, backgroundColor);
        }
    }

    const toggleTextPicker = async() => {
        if (showBackgroundColorPicker) {
            setShowBackgroundColorPicker(false);
        }
        const isUpdating = !!showTextColorPicker && templateOptions?.colours?.[ColourElements.text] !== textColor;
        setShowTextColorPicker(!showTextColorPicker);
        if (isUpdating) {
            await onColourChange(ColourElements.text, textColor);
        }
    }

    useClickOutside(backgroundColorPickerRef, toggleBackgroundPicker);
    useClickOutside(textColorPickerRef, toggleTextPicker);

    let containerXPos = '-right-3';
    let pickerXPos = 'translate-x-10';
    if (align === 'left') {
        containerXPos = '-left-8';
        pickerXPos = '-translate-x-full';
    }

    return (
        <>
            <div className={className} style={{ backgroundColor: backgroundColor ?? undefined, color : textColor ?? undefined }}>
                {children}
            </div> 
            <div className={`absolute top-1 z-50 text-[6.5pt] print:hidden ${containerXPos}`}>
                <div className="fixed">
                    <div className="mb-2">
                        <button style={{ color: backgroundColor ?? undefined }} title="Change background colour" onClick={toggleBackgroundPicker}>
                            <FaFillDrip size="2.5em"/>
                        </button>
                        {showBackgroundColorPicker && (
                            <div ref={backgroundColorPickerRef} className={`absolute -translate-y-5 ${pickerXPos}`}>
                                <HexColorPicker color={backgroundColor} onChange={setBackgroundColour} />
                                <HexColorInput color={backgroundColor} onChange={setBackgroundColour} prefixed />
                            </div>
                        )}
                    </div>
                    <div className="mb-10">
                        <button style={{ color: textColor ?? undefined }} title="Change text colour" onClick={toggleTextPicker}>
                            <MdFormatColorText size="2.5em"/>
                        </button>
                        {showTextColorPicker && (
                            <div ref={textColorPickerRef} className={`absolute -translate-y-5 ${pickerXPos}`}>
                                <HexColorPicker color={textColor} onChange={setTextColour} />
                                <HexColorInput color={textColor} onChange={setTextColour} prefixed />
                            </div>
                        )}
                    </div>
                    <div className="mb-2">
                        <button className="text-red-900" title="Reset to default colours" onClick={onResetToDefault}>
                            <FaUndo size="2.3em"/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}