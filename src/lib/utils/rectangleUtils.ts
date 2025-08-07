import { RefObject } from "react";
import { Point, Rectangle } from "@/types";

export function updateDynamicRectangle(
    ref: RefObject<SVGRectElement | null>,
    points: Point[],
    currX: number,
    currY: number
) {
    if (!ref.current) return;

    const startPoints = points[0];
    const x = Math.min(startPoints[0], currX);
    const y = Math.min(startPoints[1], currY);
    const width = Math.abs(currX - startPoints[0]);
    const height = Math.abs(currY - startPoints[1]);

    ref.current.setAttribute("x", `${x}`);
    ref.current.setAttribute("y", `${y}`);
    ref.current.setAttribute("width", `${width}`);
    ref.current.setAttribute("height", `${height}`);
    ref.current.setAttribute("fill", "none");
    ref.current.setAttribute("stroke", "black");
    ref.current.setAttribute("rx", "20");
    ref.current.setAttribute("ry", "20");
    ref.current.style.strokeWidth = "10";
}

export function createRectangle(
    points: Point[],
    currX: number,
    currY: number
): Rectangle {
    const startPoints = points[0];
    const x = Math.min(startPoints[0], currX);
    const y = Math.min(startPoints[1], currY);
    const width = Math.abs(currX - startPoints[0]);
    const height = Math.abs(currY - startPoints[1]);

    return {
        x: x,
        y: y,
        width: width,
        height: height,
    };
}
