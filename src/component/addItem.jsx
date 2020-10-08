import React, { useRef, useState } from 'react';


export const AddItem = ({grpIdx, addItems}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const nameInput = useRef();
    const emailInput = useRef();

    const handleSubmit = (e, data) => {
        e.preventDefault();
        addItems(grpIdx, data);
        reset();
    }

    const reset = () => {
        nameInput.current.value = "";
        emailInput.current.value = "";
        setName("");
        setEmail("");
    }

    const onChange = (e, field) => {
        switch (field) {
            case 'name':
                setName(e.currentTarget.value);
                break;
            case 'email':
                setEmail(e.currentTarget.value);
                break;
            default:
                break;
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e, {name, email})}>
            <input type="text" placeholder="Name" ref={nameInput} required onChange={(e)=>onChange(e,"name")}/>
            <input type="text" placeholder="Email" ref={emailInput} required onChange={(e) => onChange(e, "email")}/>
            <button type="submit" >Add Candidate</button>
        </form>
    )
}