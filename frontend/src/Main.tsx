import React, { useState, useEffect } from 'react';
import { getAllUsers } from './config/services'
import { FetchCall } from './config/fetch';
import { User, GetUsersResponse } from './models/models'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import UserList from './components/UserList/UserList';
import NewUserForm from './components/NewUserForm/NewUserForm';
import TaskList from './components/TaskList/TaskList';
import { initialUser } from './models/initializator'

const Main: React.FC = () => {
    const [data, setData] = useState<User[]>();
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState(false);
    const [user, setUser] = useState<User>(initialUser);

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

    const hadleTasks = (user: User)=> {
        setUser(user)
        setTasks(true)
    }

    const backList = () => {
        setUser(initialUser)
        setTasks(false)
    }

    if (loading) {
        return <div><LoadingSpinner /></div>;
    }
    return (
        <div> 
            {
                tasks
                ?
                    <TaskList user={user} backList={backList}/>
                :
                <div>
                    <NewUserForm/>
                    <UserList users={data || []} onTasks={hadleTasks}/>
                </div>
            }
            
            
        </div>
    )
};
export default Main;
