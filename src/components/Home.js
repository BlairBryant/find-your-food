import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../axios';
import { UserContext } from '../provider/Provider';
import '../styles/home.scss';

const Home = (props) => {
    const { register, handleSubmit } = useForm();
    const [user, setUser] = useContext(UserContext);
    const [viewLogin, setViewLogin] = useState(true);

    const registerUser = async (data) => {
        try {
            const response = await axios.post("/register", data);
            setUser(response.data)
            props.history.push("/ingredients");
        } catch (e) {
            console.error(e)
        }
    }

    const login = async (data) => {
        try {
            const response = await axios.post("/login", data);
            if (response.data) {
                setUser(response.data)
                props.history.push("/ingredients");
            } else {
                //TODO: Tell user does not exist
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="home column">
            <h1>Find Your Food</h1>
            {
                viewLogin
                    ?
                    <form onSubmit={handleSubmit(login)} className="column">
                        <label>Email: <input name="email" ref={register} /></label>
                        <label>Password: <input type="password" name="password" ref={register} /></label>
                        <button className="btn">Login</button>
                        <span onClick={() => setViewLogin(prevState => !prevState)}>No Account? Register</span>
                    </form>
                    :
                    <form onSubmit={handleSubmit(registerUser)} className="column">
                        <label>Username: <input name="registerName" ref={register} /></label>
                        <label>Email: <input name="registerEmail" ref={register} /></label>
                        <label>Password: <input type="password" name="registerPassword" ref={register} /></label>
                        <button className="btn">Register</button>
                        <span onClick={() => setViewLogin(prevState => !prevState)}>Have an account? Login</span>
                    </form>
            }
            <div className="terms-of-service">
                <span>Terms of Service</span>
                <span>Contact</span>
            </div>
        </div>
    )
}

export default Home;