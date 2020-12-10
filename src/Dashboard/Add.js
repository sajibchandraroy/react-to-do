import React, { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import DateTimePicker from 'react-datetime-picker';
import "react-datepicker/dist/react-datepicker.css";


const Add = () => {

    const [value, onChange] = useState(new Date());

    
    console.log(value);
    const currentform = useRef(null);
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {        
        var d = value;        
        const timeString = d.toLocaleTimeString().replace(/:\d+ /, ' ');
        const datestring = value.getDate() + "-" + (value.getMonth() + 1) + "-" + value.getFullYear();
        data.date = datestring;
        data.time = timeString;
        data.status = "Pending";        
        console.log(data);


        fetch('https://polar-everglades-75716.herokuapp.com/add', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(success => {
                if (success) {      
                    currentform.current.reset();          
                    alert('Action created successfully.');                    
                }
            })
    }
    return (
        <form className="p-5" ref={currentform} onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <input type="text" ref={register({ required: true })} name="name" placeholder="Your Name" className="form-control" />
                {errors.name && <span className="text-danger">This field is required</span>}
            </div>

            <div className="form-group">
                <input type="text" ref={register({ required: true })} name="email" placeholder="Email" className="form-control" />
                {errors.email && <span className="text-danger">This field is required</span>}
            </div>

            <div className="form-group">
                <input type="text" ref={register({ required: true })} name="action" placeholder="Action Name" className="form-control" />
                {errors.phone && <span className="text-danger">This field is required</span>}
            </div>

            <div className="form-group row">
                <div className="col-4">
                    <DateTimePicker
                        onChange={onChange}
                        value={value}
                    />
                </div>
                <div className="col-8">
                    <input ref={register({ required: true })} className="form-control" name="details" placeholder="Details" type="text" />
                    {errors.weight && <span className="text-danger">This field is required</span>}
                </div>
            </div>
            <div className="form-group text-right">
                <button type="submit" className="btn btn-brand">Send</button>
            </div>
        </form>


    );
};

export default Add;