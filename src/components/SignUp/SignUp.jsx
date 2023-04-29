import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
const SignUp = () => {
    const {SignUp} = useContext(AuthContext)
    const [ error,setError] = useState('')

    const handleSignUp =(event)=>{
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value
        console.log(email,password,confirm)

        setError('')
        if(password !== confirm){
            setError('Please Type Exact Password');
            return
        }
        else if(password.length<6){
            setError('Password must be 6 Char long');
            return
        }

        SignUp(email,password)
        .then(result=>{
            const loggedUser = result.user
            console.log(loggedUser)
            form.reset()
        })
        .catch(error=>{
            setError(error.message)
        })
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" id="confirm" required />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p><small>Already have an account? <Link to="/login">Login</Link></small></p>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default SignUp;