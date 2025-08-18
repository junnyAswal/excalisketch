"use client";

import getStroke from "perfect-freehand";
import { getSvgPathFromStroke } from "@/lib/utils/svg";
import { useRef, useState } from "react";
import { Toolbar } from "./Toolbar";
import { StylePanel } from "./StylePanel";
import { Point, Shape, Sketch, StrokeWidth, Style, Tool } from "@/types";
import {
    createRectangle,
    updateDynamicRectangle,
} from "@/lib/utils/rectangleUtils";

export function Whiteboard() {
    const [points, setPoints] = useState<Point[]>([]);
    const [sketches, setSketches] = useState<Sketch[]>([]);
    const [shapes, setShapes] = useState<Shape[]>([]);
    const [activeTool, setActiveTool] = useState<Tool>("pen");
    const [styleSettings, setStyleSettings] = useState<Style>({
        strokeColour: "#000000",
        strokeWidth: StrokeWidth.MEDIUM,
        opacity: 1,
        rounded: true,
        fillColour: "none",
    });

    const dynamicRectRef = useRef<SVGRectElement>(null);

    function handlePointerDown(e: React.PointerEvent) {
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
        const newPoints: Point[] = [...points, [e.clientX, e.clientY]];
        setPoints(newPoints);

        switch (activeTool) {
            case "pen":
                const stroke = getStroke(newPoints, {
                    size: styleSettings.strokeWidth,
                });
                setSketches([
                    ...sketches,
                    { strokes: [stroke], colour: styleSettings.strokeColour },
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

                setShapes([...shapes, rect]);
                break;
        }
        setPoints([]);
    }

    return (
        <div className='relative h-dvh touch-none'>
            <div className='absolute bottom-4 md:top-4 right-1/2 transform translate-x-1/2'>
                <Toolbar
                    activeTool={activeTool}
                    setActiveTool={setActiveTool}
                />
            </div>

            <div className='absolute right-8 top-1/2 transform -translate-y-40'>
                <StylePanel
                    activeTool={activeTool}
                    styleSettings={styleSettings}
                    setStyleSettings={setStyleSettings}
                />
            </div>

            <svg
                className='w-full h-full bg-white'
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                {sketches.flatMap((sketch, sketchIndex) =>
                    sketch.strokes.map((stroke, strokeIndex) => {
                        const pathData = getSvgPathFromStroke(stroke);

                        return (
                            <path
                                d={pathData}
                                key={`${sketchIndex}-${strokeIndex}`}
                                fill={sketch.colour}
                            />
                        );
                    })
                )}

                {shapes.map((shape, i) => {
                    // type check when adding more shapes
                    return (
                        <rect
                            key={i}
                            width={shape.width}
                            height={shape.height}
                            x={shape.x}
                            y={shape.y}
                            rx={shape.radius}
                            ry={shape.radius}
                            fill={shape.fillColour}
                            stroke={shape.strokeColour}
                            strokeWidth={shape.strokeWidth}
                        ></rect>
                    );
                })}

                {activeTool === "pen" && (
                    <path
                        d={getSvgPathFromStroke(
                            getStroke(points, {
                                size: styleSettings.strokeWidth,
                            })
                        )}
                        fill={styleSettings.strokeColour}
                    />
                )}

                {activeTool === "rectangle" && (
                    <rect ref={dynamicRectRef}></rect>
                )}
            </svg>
        </div>
    );
}
