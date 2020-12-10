import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';

const AllWork = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [allActivity, setAllActivity] = useState([]);
    const [activityUpdated, setActivityUpdated] = useState([0]);

    useEffect(() => {
        fetch('https://polar-everglades-75716.herokuapp.com/allActivity?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setAllActivity(data))
    }, [activityUpdated])

    const handleChange = (id, e) => {
        const status = e.target.value;
        if (status === 'DELETE') {
            fetch(`https://polar-everglades-75716.herokuapp.com/delete/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(result => {
                    if (result) {
                        setActivityUpdated(Math.random())
                        alert('Action Deleted Successfully')
                    }
                })

        }
        else {
            const updatedActivity = { id, status };
            fetch(`https://polar-everglades-75716.herokuapp.com/update/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedActivity)                
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data) {
                        setActivityUpdated(Math.random())
                        alert('Status Updated Successfully')
                    }
                })
        }


    }
    return (
        <div>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th className="text-secondary text-left" scope="col">Sr No</th>
                        <th className="text-secondary" scope="col">Name</th>
                        <th className="text-secondary" scope="col">Date</th>

                        <th className="text-secondary" scope="col">Time</th>
                        <th className="text-secondary" scope="col">Details</th>
                        <th className="text-secondary" scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        allActivity.map((activity, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{activity.name}</td>
                                <td>{activity.date}</td>
                                <td>{activity.time}</td>
                                <td>{activity.details}</td>
                                <td>
                                    <select className={(activity.status === "Done" && "btn text-success") ||
                                        (activity.status === "Pending" && "btn text-danger") ||
                                        (activity.status === "On Going" && "btn text-warning")}
                                        name="status" value={activity.status}
                                        onChange={(e) => handleChange(activity._id, e)} >
                                        <option className="dropdown-item" value="Done">Done</option>
                                        <option className="dropdown-item" value="Pending">Pending</option>
                                        <option className="dropdown-item" value="On Going">On Going</option>
                                        <option className="dropdown-item" value="DELETE">Delete activity</option>
                                    </select>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllWork;