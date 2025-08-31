"use client";

import getStroke from "perfect-freehand";
import { getSvgPathFromStroke } from "@/lib/utils/svg";
import { useRef, useState } from "react";
import { Toolbar } from "./Toolbar";
import { StylePanel } from "./StylePanel";
import {
    Element,
    Point,
    Shape,
    Sketch,
    StrokeWidth,
    Style,
    Tool,
} from "@/types";
import {
    createRectangle,
    updateDynamicRectangle,
} from "@/lib/utils/rectangleUtils";
import { MobileStylePanel } from "./MobileStylePanel";
import { UndoRedo } from "./UndoRedo";
import { isRectangle, isSketch } from "@/lib/utils/typeGuards";

export function Whiteboard() {
    const [isDrawing, setIsDrawing] = useState(false);
    const [points, setPoints] = useState<Point[]>([]);
    const [activeTool, setActiveTool] = useState<Tool>("pen");
    const [styleSettings, setStyleSettings] = useState<Style>({
        strokeColour: "#000000",
        strokeWidth: StrokeWidth.MEDIUM,
        opacity: 1,
        rounded: true,
        fillColour: "none",
    });

    const [elements, setElements] = useState<Element[]>([]);
    const [undoStack, setUndoStack] = useState<Element[][]>([]);
    const [redoStack, setRedoStack] = useState<Element[][]>([]);

    const dynamicRectRef = useRef<SVGRectElement>(null);

    function handlePointerDown(e: React.PointerEvent) {
        setIsDrawing(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        setPoints([[e.clientX, e.clientY]]);
    }

    function handlePointerMove(e: React.PointerEvent) {
        if (e.buttons !== 1) return;
        setPoints([...points, [e.clientX, e.clientY]]);

        if (activeTool === "rectangle") {
            if (dynamicRectRef.current) {
                updateDynamicRectangle(
                    dynamicRectRef,
                    points,
                    e.clientX,
                    e.clientY,
                    styleSettings
                );
            }
        }
    }

    function handlePointerUp(e: React.PointerEvent) {
        setIsDrawing(false);
        const newPoints: Point[] = [...points, [e.clientX, e.clientY]];
        setPoints(newPoints);

        // currently outside of tools because all tools change elements
        setUndoStack([...undoStack, elements]);
        setRedoStack([]);

        switch (activeTool) {
            case "pen":
                const stroke = getStroke(newPoints, {
                    size: styleSettings.strokeWidth,
                });

                setElements([
                    ...elements,
                    {
                        strokes: [stroke],
                        colour: styleSettings.strokeColour,
                        opacity: styleSettings.opacity,
                    },
                ]);

                break;
            case "rectangle":
                if (dynamicRectRef.current) {
                    updateDynamicRectangle(
                        dynamicRectRef,
                        points,
                        e.clientX,
                        e.clientY,
                        styleSettings
                    );
                }

                const rect = createRectangle(
                    points,
                    e.clientX,
                    e.clientY,
                    styleSettings
                );

                setElements([...elements, rect]);
                break;
        }
        setPoints([]);
    }

    function undo() {
        if (undoStack.length > 0) {
            setRedoStack([...redoStack, elements]);

            const prevElements = undoStack[undoStack.length - 1];
            setElements(prevElements);
            setUndoStack(undoStack.slice(0, -1));
        }
    }

    function redo() {
        if (redoStack.length > 0) {
            setUndoStack([...undoStack, elements]);

            const prevElements = redoStack[redoStack.length - 1];
            setElements(prevElements);
            setRedoStack(redoStack.slice(0, -1));
        }
    }

    return (
        <div className='relative h-dvh touch-none'>
            <div className='absolute bottom-4 md:top-4 right-1/2 transform translate-x-1/2 pointer-events-none'>
                <div className='flex items-center gap-4'>
                    <Toolbar
                        activeTool={activeTool}
                        setActiveTool={setActiveTool}
                    />

                    <MobileStylePanel
                        activeTool={activeTool}
                        styleSettings={styleSettings}
                        setStyleSettings={setStyleSettings}
                    />
                </div>
            </div>

            <div className='hidden md:block absolute right-8 top-1/2 transform -translate-y-70'>
                <StylePanel
                    activeTool={activeTool}
                    styleSettings={styleSettings}
                    setStyleSettings={setStyleSettings}
                />
            </div>

            <div className='absolute top-6 md:top-auto md:bottom-8 left-4 md:left-12'>
                <UndoRedo
                    undo={undo}
                    redo={redo}
                    canUndo={undoStack.length > 0}
                    canRedo={redoStack.length > 0}
                />
            </div>

            <svg
                className='w-full h-full bg-white'
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                {elements.map((element, elementIndex) => {
                    if (isSketch(element)) {
                        return element.strokes.map((stroke, strokeIndex) => {
                            const pathData = getSvgPathFromStroke(stroke);

                            return (
                                <path
                                    d={pathData}
                                    key={`${elementIndex}-${strokeIndex}`}
                                    fill={element.colour}
                                    opacity={element.opacity}
                                />
                            );
                        });
                    } else if (isRectangle(element)) {
                        return (
                            <rect
                                key={elementIndex}
                                width={element.width}
                                height={element.height}
                                x={element.x}
                                y={element.y}
                                rx={element.radius}
                                ry={element.radius}
                                fill={element.fillColour}
                                stroke={element.strokeColour}
                                strokeWidth={element.strokeWidth}
                                opacity={element.opacity}
                            ></rect>
                        );
                    }
                })}

                {activeTool === "pen" && (
                    <path
                        d={getSvgPathFromStroke(
                            getStroke(points, {
                                size: styleSettings.strokeWidth,
                            })
                        )}
                        fill={styleSettings.strokeColour}
                        opacity={styleSettings.opacity}
                    />
                )}

                {activeTool === "rectangle" && isDrawing && (
                    <rect ref={dynamicRectRef}></rect>
                )}
            </svg>
        </div>
    );
}
