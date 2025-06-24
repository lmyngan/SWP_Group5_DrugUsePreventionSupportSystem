import { useEffect, useState } from 'react';
import { userApi } from '../service/api';

const UserProfile = ({ accountId }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await userApi.getById(accountId);
                setUser(data);
            } catch (err) {
                setUser(null);
            }
        };
        if (accountId) fetchUser();
    }, [accountId]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <p>ID: {user.accountId}</p>
            <p>Username: {user.accountname}</p>
            <p>Password: {user.password}</p>
            <p>Full Name: {user.fullName}</p>
            <p>Date of Birth: {user.dateOfBirth}</p>
            <p>Gender: {user.gender}</p>
            <p>Address: {user.address}</p>
            <p>Role ID: {user.roleId}</p>
        </div>
    );
};

export default UserProfile;