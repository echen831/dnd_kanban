import React, { useState, useRef } from 'react';

export const Item = ({ item, update, removeItem, grpIdx, itemIdx}) => {

    const [edit, setEdit] = useState(false);

    const [name, setName] = useState(item.name);
    const [email, setEmail] = useState(item.email);
    const [comment, setComment] = useState(item.comment);


    const nameInput = useRef();
    const emailInput = useRef();
    const commentInput = useRef();

    const handleUpdate = (field, text, params) => {
        update(field, text, params);

        switch (field) {
            case "name":
                setEdit(false);
                nameInput.current.value = ""
                break;
            case "email":
                setEdit(false);
                emailInput.current.value = ""
                break;
            case "comment":
                setEdit(false);
                commentInput.current.value = ""
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e, data, params) => {
        e.preventDefault();
        update(data, params);
        
        nameInput.current.value = "";
        emailInput.current.value = "";
        commentInput.current.value = "";
    }

    const handleChange = (e, field) => {

        switch (field) {
            case "name":
                setName(e.currentTarget.value);
                break;
            case "email":
                setEmail(e.currentTarget.value)
                break;
            case "comment":
                setComment(e.currentTarget.value)
                break;
            default:
                break;
        }
    }

    return (
        <div className="item-container" >
            <div className="info-container" id={edit ? 'hide' : ''}>
                <p>{item.name.length ? item.name : 'Name'}</p>
                <p>{item.email.length ? item.email : 'Email'}</p>
                <p>{item.comment.length ? item.comment : ''}</p>
                <p id='edit-btn' onClick={() => setEdit(!edit)}>Edit</p>
                
            </div>


            <div className="edit-container" id={!edit ? 'hide' : ''}>
                <div >
                    <input type="text" placeholder="Name" ref={nameInput} onChange={(e) => handleChange(e, "name")}/>
                    <button onClick={() => handleUpdate("name", nameInput.current.value, { grpIdx, itemIdx })}>Update</button>
                </div>
                <div >
                    <input type="text" placeholder="Email" ref={emailInput} onChange={(e) => handleChange(e, "email")}/>
                    <button onClick={() => handleUpdate("email", emailInput.current.value, { grpIdx, itemIdx })}>Update</button>
                </div>
                <div >
                    <textarea type="text" placeholder="Comments" ref={commentInput} onChange={(e) => handleChange(e, "comment")} />
                    <button onClick={() => handleUpdate("comment", commentInput.current.value, { grpIdx, itemIdx })}>Update</button>
                </div>
                <div>
                    <p id='edit-btn' onClick={() => removeItem({ grpIdx, itemIdx })}>Delete</p>
                    <p id='edit-btn' onClick={() => setEdit(!edit)}>Close</p>
                </div>
            </div>
        </div>    
    )
}