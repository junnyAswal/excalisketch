"use client";

import getStroke from "perfect-freehand";
import { getSvgPathFromStroke } from "@/lib/utils/svg";
import { useRef, useState } from "react";
import { Toolbar } from "./Toolbar";
import { Point, Rectangle, Shape, Strokes, Tool } from "@/types";
import {
    createRectangle,
    updateDynamicRectangle,
} from "@/lib/utils/rectangleUtils";

export function Whiteboard() {
    const [points, setPoints] = useState<Point[]>([]);
    const [strokes, setStrokes] = useState<Strokes>([]);
    const [shapes, setShapes] = useState<Shape[]>([]);
    const [activeTool, setActiveTool] = useState<Tool>("pen");
    const dynamicRectRef = useRef<SVGRectElement>(null);

    function handlePointerDown(e: React.PointerEvent) {
        e.currentTarget.setPointerCapture(e.pointerId);
        setPoints([[e.pageX, e.pageY]]);
    }

    function handlePointerMove(e: React.PointerEvent) {
        if (e.buttons !== 1) return;
        setPoints([...points, [e.pageX, e.pageY]]);

        if (activeTool === "rectangle") {
            if (dynamicRectRef.current) {
                updateDynamicRectangle(
                    dynamicRectRef,
                    points,
                    e.pageX,
                    e.pageY
                );
            }
        }
    }

    function handlePointerUp(e: React.PointerEvent) {
        const newPoints: Point[] = [...points, [e.pageX, e.pageY]];
        setPoints(newPoints);

        switch (activeTool) {
            case "pen":
                const stroke = getStroke(newPoints);
                setStrokes([...strokes, stroke]);
                break;
            case "rectangle":
                if (dynamicRectRef.current) {
                    updateDynamicRectangle(
                        dynamicRectRef,
                        points,
                        e.pageX,
                        e.pageY
                    );
                }

                const rect = createRectangle(points, e.pageX, e.pageY);

                setShapes([...shapes, rect]);
                break;
        }
        setPoints([]);
    }

    return (
        <div className='relative h-screen'>
            <div className='absolute right-1/2 transform translate-x-1/2 translate-y-1/2'>
                <Toolbar
                    activeTool={activeTool}
                    setActiveTool={setActiveTool}
                />
            </div>

            <svg
                className='w-full h-full bg-white'
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                {strokes.map((stroke, i) => {
                    const pathData = getSvgPathFromStroke(stroke);
                    return <path d={pathData} key={i} />;
                })}

                {shapes.map((shape, i) => {
                    // type check when adding more shapes
                    return (
                        <rect
                            key={i}
                            width={shape.width}
                            height={shape.height}
                            x={shape.x}
                            y={shape.y}
                            rx={20}
                            ry={20}
                            fill='none'
                            stroke='black'
                            strokeWidth={10}
                        ></rect>
                    );
                })}

                {activeTool === "pen" && (
                    <path d={getSvgPathFromStroke(getStroke(points))} />
                )}

                {activeTool === "rectangle" && (
                    <rect ref={dynamicRectRef}></rect>
                )}
            </svg>
        </div>
    );
}
