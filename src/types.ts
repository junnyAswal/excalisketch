export type Point = [number, number];

export type Strokes = number[][][];

export type Tool = "pen";

export interface WhiteboardProps {
    activeTool: Tool;
    setActiveTool: (tool: Tool) => void;
    points?: Point[];
    setPoints?: (points: Point[]) => void;
    strokes?: Strokes;
    setStrokes?: (strokes: Strokes) => void;
}
