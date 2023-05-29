import { Icon } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { RegisterAPI } from '../../services/api';

const Register = () => {
    const navigate = useNavigate();

    const initialStateErrors = {
        name: {required: false},
        email: {required: false},
        password: {required: false}
    }
    const initialInputValues = {
        name: '',
        email: '',
        password: ''
    }
    
    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState(initialInputValues);
    const [message, setMessage] = useState(null);
    const [statusFlag, setstatusFlag] = useState(false);

    const handleChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    }

    const handleRegister = (event) => {
        console.log({event})
        event.preventDefault();
        let error = {
            name: {required: false},
            email: {required: false},
            password: {required: false}
        };
        let hasError = false;
        if(inputs.name == '') {
            error.name.required = true;
            hasError = true;
        }
        if(inputs.email == '') {
            error.email.required = true;
            hasError = true;
        }
        if(inputs.password == '') {
            error.password.required = true;
            hasError = true;
        }

        setErrors(error);
        
        if(!hasError) {
            setLoading(true);
            
            // Calling API
            RegisterAPI(inputs).then((response) => {
                setMessage(response.data.info);
                setstatusFlag(true);
            }).catch((err) => {
                setMessage(err.message);
                setstatusFlag(false);
            }).finally(() => {
                setLoading(false);
                setInputs(initialInputValues);
            });
            setTimeout(() => {setMessage("")}, 10000)
        }
    }

    const handleLoginLink = () => {
        navigate('/login');
    }

  return (
    <div className='authContainer'>
        <div className='formContainer mw-400px'>
            <div className='registerForm'>
                <h1 className='m-0 pb-4 text-center'>
                <Icon>person</Icon>
                    Create account
                </h1>
                <form name='RegisterForm'>
                    {
                        message &&
                        <div className={statusFlag ? 'alert success' : 'alert error'}>
                            <Icon>{statusFlag ? 'task_alt' : 'warning'}</Icon>
                            {message}
                        </div>
                    }

                    <div className='fieldWrapper'>
                        <label>Full Name</label>
                        <div className='inputWrapper'>
                            <Icon>person</Icon>
                            <input type="name" name='name' value={inputs.name} onChange={handleChange} />
                        </div>
                        {errors.name.required && 
                            <span className='error'>Name is required.</span>
                        }
                    </div>

                    <div className='fieldWrapper'>
                        <label>Email / Username</label>
                        <div className='inputWrapper'>
                            <Icon>mail</Icon>
                            <input type="email" name='email' value={inputs.email} onChange={handleChange} />
                        </div>
                        {errors.email.required && 
                            <span className='error'>Email is required.</span>
                        }
                    </div>

                    <div className='fieldWrapper'>
                        <label>Password</label>
                        <div className='inputWrapper'>
                            <Icon>lock</Icon>
                            <input type="password" name='password' value={inputs.password} onChange={handleChange} />
                        </div>
                        {errors.password.required && 
                            <span className='error'>Password is required.</span>
                        }
                    </div>
                    
                    <div className='buttonWrapper'>
                        {
                            loading && <span>Loading...</span>
                        }
                        <input type="submit" className='btn btn-primary w-100' value="Register" onClick={handleRegister} disabled={loading} />
                        <div className='registerLink'>
                            <span>Already have an account?</span>
                        <input type="button" className='btn btn-transparent w-100' value="Login" onClick={handleLoginLink} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register
