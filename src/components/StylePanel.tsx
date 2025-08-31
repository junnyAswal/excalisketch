"use client";

import { StrokeWidth, Style, Tool } from "@/types";
import { Ban, Square, SquareRoundCorner } from "lucide-react";

export interface StylePanelProps {
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

    const fillColours = [
        "#fda5d5",
        "#ff6467",
        "#51a2ff",
        "#05df72",
        "#c27aff",
        "#ffb86a",
        "#fff085",
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

    function handleOpacitySlider(newOpacity: string) {
        const opacity = parseFloat(newOpacity);
        setStyleSettings({
            ...styleSettings,
            opacity: opacity / 100,
        });
    }

    function handleFillColour(colour: string) {
        setStyleSettings({
            ...styleSettings,
            fillColour: colour,
        });
    }

    function handleCorners(rounded: boolean) {
        setStyleSettings({
            ...styleSettings,
            rounded: rounded,
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
                    className='w-21 h-6 hover:scale-125 cursor-pointer'
                    onChange={(e) => handleStrokeColour(e.target.value)}
                />
            </div>
            <hr className='border-gray-200' />
            <div className='grid grid-cols-3 [&>*]:w-10 [&>*]:h-10 [&>*]:hover:bg-gray-200 [&>*]:font-bold [&>*]:rounded-lg place-items-center [&>*]:cursor-pointer'>
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
                <div className='flex gap-4 '>
                    <input
                        type='range'
                        className='cursor-pointer w-32'
                        min={0}
                        max={100}
                        defaultValue={100}
                        onChange={(e) => handleOpacitySlider(e.target.value)}
                    />
                    <p className='w-6'>
                        {Math.round(styleSettings.opacity * 100)}
                    </p>
                </div>
            </div>

            <div>
                {activeTool === "rectangle" && (
                    <>
                        <hr className='border-gray-200 mb-4' />
                        <p>Fill:</p>
                        <div className='grid grid-cols-4 gap-2 [&>*]:w-6 [&>*]:h-6 [&>*]:rounded-full [&>*]:hover:scale-125 mt-2 mb-4'>
                            <button>
                                <Ban
                                    className={
                                        "text-red-600 " +
                                        (styleSettings.fillColour === "none"
                                            ? "outline-2 outline-blue-600 outline-offset-1 rounded-full"
                                            : "")
                                    }
                                    onClick={() => handleFillColour("none")}
                                />
                            </button>

                            {fillColours.map((c, i) => {
                                return (
                                    <button
                                        key={i}
                                        style={{ backgroundColor: c }}
                                        className={
                                            "w-6 h-6 hover:scale-125 rounded-full cursor-pointer " +
                                            (styleSettings.fillColour === c
                                                ? "outline-2 outline-blue-600 outline-offset-1"
                                                : "")
                                        }
                                        onClick={() => handleFillColour(c)}
                                    />
                                );
                            })}
                        </div>
                        <p>Corners:</p>
                        <div className='flex gap-2 [&>*]:w-10 [&>*]:h-10 mt-1 mb-2 [&>*]:hover:bg-gray-200 [&>*]:rounded-lg [&>*]:flex [&>*]:items-center [&>*]:justify-center'>
                            <button
                                className={
                                    styleSettings.rounded === false
                                        ? "bg-gray-200"
                                        : ""
                                }
                                onClick={() => handleCorners(false)}
                            >
                                <Square />
                            </button>
                            <button
                                className={
                                    styleSettings.rounded === true
                                        ? "bg-gray-200"
                                        : ""
                                }
                                onClick={() => handleCorners(true)}
                            >
                                <SquareRoundCorner />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
1;
