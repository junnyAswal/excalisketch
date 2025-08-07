export type Point = [number, number];

export type Strokes = number[][][];

export type Tool = "pen" | "rectangle";

export type Rectangle = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type Shape = Rectangle;

export interface WhiteboardProps {
    activeTool: Tool;
    setActiveTool: (tool: Tool) => void;
    points?: Point[];
    setPoints?: (points: Point[]) => void;
    strokes?: Strokes;
    setStrokes?: (strokes: Strokes) => void;
}
