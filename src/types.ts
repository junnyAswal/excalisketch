export type Point = [number, number];

export type Strokes = number[][][];

export type Tool = "pen" | "rectangle";

export type Sketch = {
    strokes: Strokes;
    colour: string;
    opacity: number;
};

export type Rectangle = {
    x: number;
    y: number;
    width: number;
    height: number;
    strokeColour: string;
    fillColour: string;
    radius: number;
    strokeWidth: StrokeWidth;
    opacity: number;
};

export type Style = {
    strokeColour: string;
    strokeWidth: StrokeWidth;
    opacity: number;
    rounded: boolean;
    fillColour: string;
};

export type Shape = Rectangle;

export interface ToolProps {
    activeTool: Tool;
    setActiveTool: (tool: Tool) => void;
}

export enum StrokeWidth {
    SMALL = 6,
    MEDIUM = 12,
    LARGE = 20,
}
