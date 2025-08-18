"use client";

import { ToolProps } from "@/types";
import { Pen } from "lucide-react";

export function PenTool({ activeTool, setActiveTool }: ToolProps) {
    function handleClick() {
        setActiveTool("pen");
    }

    return (
        <button
            className={
                "hover:bg-gray-200 rounded-lg p-3 " +
                (activeTool === "pen" ? "bg-gray-200 " : "")
            }
            onClick={handleClick}
        >
            <Pen className='w-4 h-4' />
        </button>
    );
}
