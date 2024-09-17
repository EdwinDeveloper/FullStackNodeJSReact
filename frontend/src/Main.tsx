import React, { useState, useEffect } from 'react';
import { getAllUsers } from './config/services'
import { FetchCall } from './config/fetch';
import { User, GetUsersResponse } from './models/models'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import UserList from './components/UserList/UserList';
import NewUserForm from './components/NewUserForm/NewUserForm';

const Main: React.FC = () => {
    const [data, setData] = useState<User[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: GetUsersResponse = await FetchCall( getAllUsers() )
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 3000);    
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div><LoadingSpinner /></div>;
    }
    return (
        <div> 
            <NewUserForm/>
            <UserList users={data || []}/>
        </div>
    )
};
export default Main;
