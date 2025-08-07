"use client";

import { WhiteboardProps } from "@/types";
import { Square } from "lucide-react";

export function RectangleTool({ activeTool, setActiveTool }: WhiteboardProps) {
    function handleClick() {
        setActiveTool("rectangle");
    }

    return (
        <button
            className={
                "hover:bg-gray-200 rounded-lg p-3 " +
                (activeTool === "rectangle" ? "bg-gray-200 " : "")
            }
            onClick={handleClick}
        >
            <Square className='w-4 h-4' />
        </button>
    );
}
