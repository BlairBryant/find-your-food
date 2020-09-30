import React from 'react';
import { useForm } from 'react-hook-form';
import axios from '../axios'

const Home = (props) => {
    const { register, handleSubmit } = useForm();

    let viewLogin = true;

    const registerUser = async (data) => {
        console.log(data);
        const response = await axios.post("/register", data);
        console.log(response.data);
        props.history.push("/ingredients");
    }

    const login = async (data) => {
        console.log(data);
        const response = await axios.post("/login", data);
        if (response.data) {
            props.history.push("/ingredients");
        } else {
            //TODO: Tell user does not exist
            console.log("errrrrorrr");
        }
    }

    return (
        <div>
            {
                viewLogin
                    ?
                    <form onSubmit={handleSubmit(login)}>
                        <label>Email: <input name="email" ref={register} /></label>
                        <label>Password: <input type="password" name="password" ref={register} /></label>
                        <button>Login</button>
                    </form>
                    :
                    <form onSubmit={handleSubmit(registerUser)}>
                        <label>Username: <input name="name" ref={register} /></label>
                        <label>Email: <input name="email" ref={register} /></label>
                        <label>Password: <input type="password" name="password" ref={register} /></label>
                        <button>Register</button>
                    </form>
            }
        </div>
    )
}

export default Home;