import React, { useState, useRef } from 'react';
import { Item } from './item';
import { AddItem } from './addItem'

//[Applied] [Phone Screen] [On site] [Offered] [Accepted] [Rejected]

const INITIALDATA = [
    { title: 'Applied', items: [{ name: 'Eric One', email: 'e1@gmail.com', comments: ["eric is great", "eric is awesome"] }] },
    { title: 'Phone Screen', items: [{ name: 'Eric Two', email: 'e2@gmail.com', comments: [] }] },
    { title: 'On site', items: [] },
    { title: 'Offered', items: [] },
    { title: 'Accepted', items: [] },
    { title: 'Rejected', items: [] },
]

export const DND = () => {

    const [ list, setList ] = useState(INITIALDATA);
    const [dragging, setDragging] = useState(false);

    const dragItem = useRef();
    const dragNode = useRef();


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

    const addItems = (col, data) => {
        let newList = [...list];

        if(data.name.trim() !== "" && data.email.trim() !== "") {
            newList[col].items.push({ name: data.name, email: data.email, comments: [] });
            setList(newList)
        }
    }

    const addComment = (comment, params) => {
        let newList = [...list];

        if(comment.trim() !== "") {
            newList[params.grpIdx].items[params.itemIdx].comments.push(comment);
            setList(newList);
        }
    }

    const removeComment = (params) => {
        let newList = [...list];
        newList[params.grpIdx].items[params.itemIdx].comments = 
            newList[params.grpIdx].items[params.itemIdx].comments.slice(0,params.commentIdx)
            .concat(newList[params.grpIdx].items[params.itemIdx].comments.slice(params.commentIdx + 1))
        setList(newList);
    }


    const removeItem = (params) => {
        let newList = [...list];
        newList[params.grpIdx].items = newList[params.grpIdx].items.slice(0, params.itemIdx).concat(newList[params.grpIdx].items.slice(params.itemIdx + 1))
        setList(newList)
    }


    const update = (field, text, params) => {

        let newList = [...list];
        newList[params.grpIdx].items[params.itemIdx][field] = text;
        setList(newList);
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
            <div className='drag-n-drop' id={dragging ? 'dragging' : ''}>
                {list.map((grp, grpIdx) => (
                    <div key={grpIdx} 
                         className='dnd-group'
                         onDragEnter={dragging && !grp.items.length ? (e) => handleDragEnter(e, { grpIdx, itemIdx: 0 }) : null}>
                        <div className='group-title'>{grp.title}</div>
                        {grp.items ? grp.items.map((item, itemIdx) => (
                            <div draggable
                                onDragStart={(e) => { handleDragStart(e, { grpIdx, itemIdx }) }}
                                onDragEnter={dragging ? (e) => { handleDragEnter(e, { grpIdx, itemIdx }) } : null}
                                key={itemIdx}
                                className={dragging ? getStyles({ grpIdx, itemIdx }) : 'dnd-item'}>
                                <Item item={item}
                                      grpIdx={grpIdx}
                                      itemIdx={itemIdx}
                                      update={update}
                                      removeItem={removeItem}
                                      addComment={addComment}
                                      removeComment={removeComment}
                                />

                            </div>
                        )) : null}
                        {grp.title === 'Applied' ? <AddItem grpIdx={grpIdx} addItems={addItems}/> : null}
                        
                    </div>
                ))}
            </div>

        </div>
    )
}