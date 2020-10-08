import React, { useState, useRef } from 'react';

export const Item = ({ item, update, removeItem, grpIdx, itemIdx}) => {

    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);

    const [name, setName] = useState(item.name);
    const [email, setEmail] = useState(item.email);
    const [phone, setPhone] = useState(item.phone);


    const nameInput = useRef();
    const emailInput = useRef();
    const phoneInput = useRef();

    // const handleUpdate = (field, text, params) => {
    //     update(field, text, params);

    //     switch (field) {
    //         case "name":
    //             setEditName(false);
    //             nameInput.current.value = ""
    //             break;
    //         case "email":
    //             setEditEmail(false);
    //             emailInput.current.value = ""
    //             break;
    //         default:
    //             break;
    //     }
    // }

    const handleUpdate = (e, data, params) => {
        e.preventDefault();
        update(data, params)
    }

    const handleChange = (e, field) => {

        switch (field) {
            case "name":
                setName(e.currentTarget.value)
                break;
            case "email":
                setEmail(e.currentTarget.value)
                break;
            case "phone":
                setPhone(e.currentTarget.value)
                break;
            default:
                break;
        }
    }

    return (
        <div className="item-container" onSubmit={(e)=>handleUpdate(e, {name, email, phone}, {grpIdx, itemIdx})}>
            <form action="">
                <input type="text" ref={nameInput} value={name} placeholder="Name" onChange={(e)=>handleChange(e,"name")}/>
                <input type="text" ref={emailInput} value={email} placeholder="Email" onChange={(e) => handleChange(e, "email")}/>
                <input type="text" ref={phoneInput} value={phone} placeholder="Phone" onChange={(e) => handleChange(e, "phone")}/>
                <button type="submit">Update</button>
            </form>
            {/* <div>
                <p>{item.name.length ? item.name : 'Name'}</p>
                <button onClick={() => setEditName(!editName)}>Edit</button>
            </div>
            <div id={!editName ? 'hide' : ''}>
                <input type="text" ref={nameInput} />
                <button onClick={() => handleUpdate("name", nameInput.current.value, { grpIdx, itemIdx })}>Update</button>
            </div>
            <div>
                <p>{item.email.length ? item.email : 'Email'}</p>
                <button onClick={() => setEditEmail(!editEmail)}>Edit</button>
            </div>
            <div id={!editEmail ? 'hide' : ''}>
                <input type="text" ref={emailInput} />
                <button onClick={() => handleUpdate("email", emailInput.current.value, { grpIdx, itemIdx })}>Update</button>
            </div> */}
            <button onClick={() => removeItem({ grpIdx, itemIdx })}>Remove</button>
        </div>    
    )
}