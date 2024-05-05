import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { GiConfirmed } from "react-icons/gi";
import { MdDelete } from 'react-icons/md';
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageBookings = () => {
    const token = localStorage.getItem('access-token');
    // console.log(token);
    const axiosSecure = useAxiosSecure();

    const { refetch, data: Payments = [] } = useQuery({
        queryKey: ['Payments'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/api/v1/payment/all`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.json();
        },
    });

    const handleOrder = async (item) => {
        try {
            const { 
                status
                , _id } = item;
    
            // Send a PATCH request to update the payment with the ID of the given item
            const response = await fetch(`http://localhost:5001/api/v1/payment/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    status
                    : 'Confirmed' }) // Update status as needed
            });
    
            const responseData = await response.json();
    
            console.log(responseData);
        } catch (error) {
            console.error(error);
        }
    };
    
    
  
    
       console.log(Payments.data);
    return (
        <div>
            <div className="flex items-center justify-between m-4">
                <h5>All Orders</h5>
                <h5>Total Orders: {Payments?.data?.length}</h5>
            </div>

            {/* table */}
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra md:w-[870px]">
                        {/* head */}
                        <thead className="bg-green text-white rounded-lg">
                            <tr>
                                <th>#</th>
                                <th>User</th>
                                <th>Transition Id</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Conform Order</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { Payments && Payments?.data?.map((user, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{user.email}</td>
                                    <td>{user._id}</td>
                                    <td>{user.price}</td>
                                    <td>{user.status}</td>
                                    <td className='text-center'>
                                        {
                                            user.status === "confirmed" ?
                                                "Completed"
                                                : <button 
                                                    onClick={() => handleOrder(user)}
                                                    className='btn btn-xs text-white bg-green items-center'>
                                                        <GiConfirmed />
                                                </button>
                                        }
                                    </td>

                                    <td>
                                        <button className='btn btn-xs bg-orange-400 text-white'>
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageBookings;
