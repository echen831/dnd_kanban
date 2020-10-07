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
    const [dragging, setDragging] = useState(false);
    const [ editTitle, setEditTitle ] = useState(false);

    const dragItem = useRef();
    const dragNode = useRef();
    const textInput = useRef();

    const handleDragStart = (e, params) => {
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout( () => {
            setDragging(true)
        },0)
    };

    const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current) {
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[params.grpIdx].items.splice(params.itemIdx, 0, newList[currentItem.grpIdx].items.splice(currentItem.itemIdx, 1)[0])
                dragItem.current = params;
                return newList
            })
        }
    }

    const handleDragEnd = () => {
        setDragging(false);
        dragNode.current.removeEventListener('dragend', handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
    }

    return (
        <div className='dnd-header'>
            <div className='drag-n-drop'>
                {list.map((grp, grpIdx) => (
                    <div key={grpIdx}
                         className='dnd-item'
                         draggable
                    >
                    {grp.title}
                    </div>
                ))}
            </div>

        </div>
    )
}