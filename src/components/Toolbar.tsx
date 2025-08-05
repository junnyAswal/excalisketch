"use client";

import { PenTool } from "./tools/PenTool";
import { WhiteboardProps } from "@/types";

export function Toolbar({ activeTool, setActiveTool }: WhiteboardProps) {
    return (
        <div className='bg-gray-50 rounded-lg p-2 shadow-lg'>
            <PenTool activeTool={activeTool} setActiveTool={setActiveTool} />
        </div>
    );
}
