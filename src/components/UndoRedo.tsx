"use client";

import { Redo2Icon, Undo2Icon } from "lucide-react";

interface UndoRedoProps {
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

export function UndoRedo({ undo, redo, canUndo, canRedo }: UndoRedoProps) {
    return (
        // [X] make array of object that contains sketches and shapes object
        // [X] refactor rendering code with function, this should re
        // [X] make undo and redo stack
        // [X] after every action, add to the undo stack and empty the redo stack
        // [X] if undo, pop (array of all elements) from undo stack, and add to redo stack
        // [ ] make hover and opacity + clickability conditional on stack

        <div className='grid grid-cols-2 w-20 h-10 bg-gray-200 rounded-lg [&>*]:p-3 [&>*]:enabled:hover:bg-gray-300 [&>*]:disabled:opacity-50 [&>*]:enabled:cursor-pointer'>
            <button
                className='w-10 h-10 rounded-l-lg pr-0 flex items-center justify-center'
                onClick={undo}
                disabled={!canUndo}
            >
                <Undo2Icon className='w-6 h-6' />
            </button>
            <button
                className='w-10 h-10 rounded-r-lg pl-0 flex items-center justify-center'
                onClick={redo}
                disabled={!canRedo}
            >
                <Redo2Icon className='w-6 h-6' />
            </button>
        </div>
    );
    1;
}
