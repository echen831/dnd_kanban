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

    const addItems = (col) => {
        setList(oldList => {
            let newList = JSON.parse(JSON.stringify(oldList))
            newList[col].items.push({ title: '', details: '' })
            return newList
        })
    }


    const removeItem = (params) => {
        setList(oldList => {
            let newList = JSON.parse(JSON.stringify(oldList))
            newList[params.grpIdx].items = newList[params.grpIdx].items.slice(0, params.itemIdx).concat(newList[params.grpIdx].items.slice(params.itemIdx + 1))
            return newList

        })
    }

    const update = (text, params) => {
        setList(oldList => {
            let newList = JSON.parse(JSON.stringify(oldList))
            newList[params.grpIdx].items[params.itemIdx].title = text
            return newList
        })
        textInput.current.value = ''
        setEditTitle(false)
    }

    const getStyles = (params) => {
        const currentItem = dragItem.current
        if (currentItem.grpIdx === params.grpIdx && currentItem.itemIdx === params.itemIdx) {
            return 'current dnd-item'
        }
        return 'dnd-item'
    }

    return (
        <div className='dnd-header'>
            <div className='drag-n-drop'>
                {list.map((grp, grpIdx) => (
                    <div key={grpIdx}
                        className='dnd-group'
                        draggable
                        onDragEnter={dragging && !grp.items.length ? (e) => handleDragEnter(e, { grpIdx, itemIdx: 0 }) : null}
                    >
                        <div className='group-title'>{grp.title}</div>
                        {grp.items ? grp.items.map((item, itemIdx) => (
                            <div draggable
                                onDragStart={(e) => { handleDragStart(e, { grpIdx, itemIdx }) }}
                                onDragEnter={dragging ? (e) => { handleDragEnter(e, { grpIdx, itemIdx }) } : null}
                                key={itemIdx}
                                className={dragging ? getStyles({ grpIdx, itemIdx }) : 'dnd-item'}>

                                <div>
                                    <p>{item.title.length ? item.title : 'Title'}</p>
                                    <button onClick={() => setEditTitle(!editTitle)}>+</button>
                                    <div id={!editTitle ? 'hide' : ''}>
                                        <input type="text" ref={textInput} />
                                        <button onClick={() => update(textInput.current.value, { grpIdx, itemIdx })}>Update</button>
                                    </div>
                                    <button onClick={() => removeItem({ grpIdx, itemIdx })}>Remove</button>
                                </div>
                            </div>
                        )) : null}
                        <button onClick={() => addItems(grpIdx)}>Add</button>
                    </div>
                ))}
            </div>

        </div>
    )
}