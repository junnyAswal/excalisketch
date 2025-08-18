"use client";

import { StrokeWidth, Style, Tool } from "@/types";

interface StylePanelProps {
    activeTool: Tool;
    styleSettings: Style;
    setStyleSettings: (style: Style) => void;
}

export function StylePanel({
    activeTool,
    styleSettings,
    setStyleSettings,
}: StylePanelProps) {
    if (activeTool !== "pen" && activeTool !== "rectangle") {
        return;
    }

    const colours = [
        "#000000",
        "#99a1af",
        "#e7000b",
        "#ff6467",
        "#1447e6",
        "#51a2ff",
        "#008236",
        "#05df72",
        "#8200db",
        "#c27aff",
        "#ff6900",
        "#ffb86a",
    ];

    const width = [
        { size: StrokeWidth.SMALL, label: "S" },
        { size: StrokeWidth.MEDIUM, label: "M" },
        { size: StrokeWidth.LARGE, label: "L" },
    ];

    function handleStrokeColour(colour: string) {
        setStyleSettings({
            ...styleSettings,
            strokeColour: colour,
        });
    }

    function handleStrokeWidth(width: StrokeWidth) {
        setStyleSettings({
            ...styleSettings,
            strokeWidth: width,
        });
    }

    return (
        <div className='flex flex-col gap-4 bg-gray-50 rounded-lg p-4 shadow-lg text-sm select-none'>
            <p>Stroke:</p>
            <div className='grid grid-cols-4 gap-2 mb-2'>
                {colours.map((c, i) => {
                    return (
                        <button
                            key={i}
                            style={{ backgroundColor: c }}
                            className={
                                "w-6 h-6 hover:scale-125 rounded-full cursor-pointer " +
                                (styleSettings.strokeColour === c
                                    ? "outline-2 outline-blue-600 outline-offset-1"
                                    : "")
                            }
                            onClick={() => handleStrokeColour(c)}
                        />
                    );
                })}
            </div>
            <div className='flex gap-4'>
                <p>Custom: </p>
                <input
                    type='color'
                    className='w-21 h-6 hover:scale-125'
                    onChange={(e) => handleStrokeColour(e.target.value)}
                />
            </div>
            <hr className='border-gray-200' />
            <div className='grid grid-cols-3 [&>*]:w-10 [&>*]:h-10 [&>*]:hover:bg-gray-200 [&>*]:font-bold [&>*]:rounded-lg place-items-center'>
                {width.map((o, i) => {
                    return (
                        <button
                            key={i}
                            className={
                                styleSettings.strokeWidth === o.size
                                    ? "bg-gray-200"
                                    : ""
                            }
                            onClick={() => handleStrokeWidth(o.size)}
                        >
                            {o.label}
                        </button>
                    );
                })}
            </div>
            <div>
                {/* opacity slider , then hr, then shape options (fill and rounded)*/}
                <p>Opacity:</p>

                <input
                    type='range'
                    className='cursor-pointer'
                    min={0}
                    max={100}
                />

                <p>0</p>
            </div>
        </div>
    );
}
1;
