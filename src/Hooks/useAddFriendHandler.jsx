import axios from 'axios';
import React from 'react'

const useAddFriendHandler = () => {

    const data = { userId: userData._id, friendId: friend._id }
    axios.put(`${BASE_BACKEND_URL}/addfriend`, data)
        .then(res => {
            toast.success(res.data.message)
        })
        .catch(err => console.error("Add friend failed:", err));


    return (
        <div>useAddFriendHandler</div>
    )
}

export default useAddFriendHandler