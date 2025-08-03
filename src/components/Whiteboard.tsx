"use client";

import getStroke from "perfect-freehand";
import { getSvgPathFromStroke } from "@/lib/utils/svg";
import { useState } from "react";
import * as React from "react";

type Point = [x: number, y: number];

export function Whiteboard() {
    const [points, setPoints] = useState<Point[]>([]);

    function handlePointerDown(e: React.PointerEvent) {
        e.currentTarget.setPointerCapture(e.pointerId);
        setPoints([[e.pageX, e.pageY]]);
    }

    function handlePointerMove(e: React.PointerEvent) {
        if (e.buttons !== 1) return;
        setPoints([...points, [e.pageX, e.pageY]]);
    }

    // function handlePointerUp(e: MouseEvent) {}

    const stroke = getStroke(points);
    const pathData = getSvgPathFromStroke(stroke);

    return (
        <svg
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            // style={{ touchAction: "none" }}
        >
            {points && <path d={pathData} />}
        </svg>
    );
}
