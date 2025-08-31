import { Rectangle, Sketch } from "@/types";

export function isSketch(obj: unknown): obj is Sketch {
    return typeof obj === "object" && obj !== null && "strokes" in obj;
}

export function isRectangle(obj: unknown): obj is Rectangle {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "shape" in obj &&
        obj.shape === "rectangle"
    );
}
