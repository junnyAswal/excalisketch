import { Rectangle, Sketch } from "@/types";

export function isSketch(obj: any): obj is Sketch {
    return "strokes" in obj;
}

export function isRectangle(obj: any): obj is Rectangle {
    return "shape" in obj && obj.shape === "rectangle";
}
