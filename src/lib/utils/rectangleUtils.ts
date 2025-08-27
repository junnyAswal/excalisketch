import { RefObject } from "react";
import { Point, Rectangle, StrokeWidth, Style } from "@/types";

export function updateDynamicRectangle(
    ref: RefObject<SVGRectElement | null>,
    points: Point[],
    currX: number,
    currY: number,
    styleSettings: Style
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
    ref.current.setAttribute("stroke", `${styleSettings.strokeColour}`);

    const radius = styleSettings.rounded ? 10 : 0;

    ref.current.setAttribute("rx", `${radius}`);
    ref.current.setAttribute("ry", `${radius}`);
    ref.current.setAttribute("fill", styleSettings.fillColour);
    ref.current.style.strokeWidth = `${styleSettings.strokeWidth}`;
    ref.current.style.opacity = `${styleSettings.opacity}`;
}

export function createRectangle(
    points: Point[],
    currX: number,
    currY: number,
    styleSettings: Style
): Rectangle {
    const startPoints = points[0];
    const x = Math.min(startPoints[0], currX);
    const y = Math.min(startPoints[1], currY);
    const width = Math.abs(currX - startPoints[0]);
    const height = Math.abs(currY - startPoints[1]);
    const radius = styleSettings.rounded ? 10 : 0;

    return {
        x: x,
        y: y,
        width: width,
        height: height,
        radius: radius,
        strokeWidth: styleSettings.strokeWidth,
        strokeColour: styleSettings.strokeColour,
        fillColour: styleSettings.fillColour,
        opacity: styleSettings.opacity,
    };
}
