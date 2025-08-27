import { useState } from "react";
import { StylePanel, StylePanelProps } from "./StylePanel";
import { Palette } from "lucide-react";

export function MobileStylePanel({
    activeTool,
    styleSettings,
    setStyleSettings,
}: StylePanelProps) {
    const [isStylePanelOpen, setIsStylePanelOpen] = useState(false);

    return (
        <>
            <div className='bg-gray-50 rounded-lg shadow-lg p-2 pointer-events-auto block md:hidden'>
                <button
                    className={
                        "hover:bg-gray-200 rounded-lg p-3 " +
                        (isStylePanelOpen ? "bg-gray-200" : "")
                    }
                    onClick={() => setIsStylePanelOpen(!isStylePanelOpen)}
                >
                    <Palette className='w-4 h-4' />
                </button>
                {isStylePanelOpen && (
                    <div className='absolute bottom-full left-1/2 transform -translate-x-1/2'>
                        <StylePanel
                            activeTool={activeTool}
                            styleSettings={styleSettings}
                            setStyleSettings={setStyleSettings}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
