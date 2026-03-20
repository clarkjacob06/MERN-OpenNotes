import api from '../lib/axios.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sileo } from 'sileo';

export default function TestPage() {
    const [user, setUser] = useState({username: '', email: '', password: ''})
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if(!user.username || !user.email || !user.password) return sileo.error({
                title: 'All fields are required',
                description: (<p style={{color: 'white'}}>Please complete the required fields before proceeding</p>)
            })

            await api.post('/users', {
                username: user.username,
                email: user.email,
                password: user.password
            })

           sileo.success({title: 'Registered Successfully', fill: 'black'});
           navigate('/login');

        } catch (error) {
            sileo.error({title: 'Email already exists', 
            }); 
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input type="text" placeholder="Enter username" minLength={3} maxLength={10} onChange={(e) => setUser({...user, username: e.target.value})}/>
            <input type="text" placeholder="Enter Email" onChange={(e) => setUser({...user, email: e.target.value})}/>
            <input type="text" placeholder="Create password" onChange={(e) => setUser({...user, password: e.target.value})}/>
            <button type='submit'>Register</button>
        </form>
    )
}