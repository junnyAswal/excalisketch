"use client";

import getStroke from "perfect-freehand";
import { getSvgPathFromStroke } from "@/lib/utils/svg";
import { useState } from "react";
// import * as React from "react";

type Point = [x: number, y: number];

export function Whiteboard() {
    const [points, setPoints] = useState<Point[]>([]);
    const [strokes, setStrokes] = useState<number[][][]>([]);

    function handlePointerDown(e: React.PointerEvent) {
        e.currentTarget.setPointerCapture(e.pointerId);
        setPoints([[e.pageX, e.pageY]]);
    }

    function handlePointerMove(e: React.PointerEvent) {
        if (e.buttons !== 1) return;
        setPoints([...points, [e.pageX, e.pageY]]);
    }

    function handlePointerUp(e: React.PointerEvent) {
        const stroke = getStroke(points);
        setStrokes([...strokes, stroke]);
    }

    return (
        <svg
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            // style={{ touchAction: "none" }}
        >
            {strokes.map((stroke, i) => {
                const pathData = getSvgPathFromStroke(stroke);
                return points && <path d={pathData} key={i} />;
            })}

            {<path d={getSvgPathFromStroke(getStroke(points))} />}
        </svg>
    );
}
