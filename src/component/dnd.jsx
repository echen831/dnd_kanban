import React, { useState, useRef } from 'react';

//[Applied] [Phone Screen] [On site] [Offered] [Accepted] [Rejected]

const INITIALDATA = [
    { title: 'Applied', items: [] },
    { title: 'Phone Screen', items: [] },
    { title: 'On site', items: [] },
    { title: 'Offered', items: [] },
    { title: 'Accepted', items: [] },
    { title: 'Rejected', items: [] },
]

export const DND = (props) => {

    const [ list, setList ] = useState(INITIALDATA);

    return (
        <div className='dnd-header'>
            <div className='dnd-column'>
                {list.map((col, colIdx) => (
                    <div key={colIdx}
                         className='dnd-item'
                         draggable
                    >
                    {col.title}
                    </div>
                ))}
            </div>

        </div>
    )
}