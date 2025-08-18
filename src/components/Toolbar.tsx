"use client";

import { Tool } from "@/types";
import { PenTool } from "./tools/PenTool";
import { RectangleTool } from "./tools/RectangleTool";

interface ToolbarProps {
    activeTool: Tool;
    setActiveTool: (tool: Tool) => void;
}

export function Toolbar({ activeTool, setActiveTool }: ToolbarProps) {
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
