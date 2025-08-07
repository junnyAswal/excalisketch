"use client";

import { PenTool } from "./tools/PenTool";
import { WhiteboardProps } from "@/types";
import { RectangleTool } from "./tools/RectangleTool";

export function Toolbar({ activeTool, setActiveTool }: WhiteboardProps) {
    return (
        <div className='flex gap-1.5 bg-gray-50 rounded-lg p-2 shadow-lg'>
            <PenTool activeTool={activeTool} setActiveTool={setActiveTool} />
            <RectangleTool
                activeTool={activeTool}
                setActiveTool={setActiveTool}
            />
        </div>
    );
}
