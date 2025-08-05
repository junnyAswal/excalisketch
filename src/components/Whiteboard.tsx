"use client";

import getStroke from "perfect-freehand";
import { getSvgPathFromStroke } from "@/lib/utils/svg";
import { useState } from "react";
import { Toolbar } from "./Toolbar";
import { Point, Strokes, Tool } from "@/types";

export function Whiteboard() {
    const [points, setPoints] = useState<Point[]>([]);
    const [strokes, setStrokes] = useState<Strokes>([]);
    const [activeTool, setActiveTool] = useState<Tool>("pen");

    function handlePointerDown(e: React.PointerEvent) {
        e.currentTarget.setPointerCapture(e.pointerId);
        setPoints([[e.pageX, e.pageY]]);
    }

    function handlePointerMove(e: React.PointerEvent) {
        if (e.buttons !== 1) return;
        setPoints([...points, [e.pageX, e.pageY]]);
    }

    function handlePointerUp(e: React.PointerEvent) {
        // for shape handling
        // const endPoint: Point = [e.pageX, e.pageY]
        setPoints([...points, [e.pageX, e.pageY]]);

        if (activeTool === "pen") {
            const stroke = getStroke(points);
            setStrokes([...strokes, stroke]);
        }

        setPoints([]);
    }

    return (
        <div className='relative h-screen'>
            <div className='absolute left-1/2 transform translate-y-1/2'>
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

                {<path d={getSvgPathFromStroke(getStroke(points))} />}
            </svg>
        </div>
    );
}
