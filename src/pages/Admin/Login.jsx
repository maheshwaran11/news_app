import React, { useEffect, useState } from 'react'
import { LoginAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@mui/material';

const Login = () => {
    const navigate = useNavigate();
    const initialStateErrors = {
        username: {required: false},
        password: {required: false}
    }
    const initialInputValues = {
        username: '',
        password: ''
    }
    
    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState(initialInputValues);
    const [message, setMessage] = useState(null);
    const [statusFlag, setstatusFlag] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("Auth")) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    }, [])

    const handleChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    }

    const handleLogin = (event) => {
        console.log({event})
        event.preventDefault();
        let error = {
            username: {required: false},
            password: {required: false}
        };
        let hasError = false;
        if(inputs.username == '') {
            error.username.required = true;
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
            LoginAPI(inputs).then((response) => {
                setMessage(response.data.info);
                setstatusFlag(true);
                if(response.data.status === 1) {
                    navigate('/dashboard');
                    localStorage.setItem("Auth", true);
                    localStorage.setItem("AuthUser", inputs.username);
                }
            }).catch((err) => {
                console.log({err})
                setMessage(err.message);
                setstatusFlag(false);
            }).finally(() => {
                setLoading(false);
                setInputs(initialInputValues);
            });
            // setTimeout(() => {setMessage("")}, 100)
        }
    }

    const handleRegisterLink = () => {
        navigate('/register');
    }

  return (
    <div className='authContainer'>
        <div className='formContainer mw-400px'>
            <div className='loginForm'>
                <h1 className='m-0 pb-4 text-center'>
                    <Icon>person</Icon>
                    Welcome
                </h1>
                <form name='LoginForm'>
                    {
                        message &&
                        <div className={statusFlag ? 'alert error' : 'alert success'}>
                            <Icon>{statusFlag ? 'warning' : 'task_alt'}</Icon>
                            {message}
                        </div>
                    }

                    <div className='fieldWrapper'>
                        <label htmlFor='username'>Username</label>
                        <div className='inputWrapper'>
                            <Icon>person</Icon>
                            <input type="name" id='username' name='username' value={inputs.username} onChange={handleChange} />
                        </div>
                        
                        {errors.username.required && 
                            <span className='error'>Username is required.</span>
                        }
                    </div>


                    <div className='fieldWrapper'>
                        <label htmlFor='password'>Password</label>
                        <div className='inputWrapper'>
                            <Icon>lock</Icon>
                            <input type="password" id='password' name='password' value={inputs.password} onChange={handleChange} />
                        </div>
                        {errors.password.required && 
                            <span className='error'>Password is required.</span>
                        }
                    </div>
                    
                    <div className='buttonWrapper'>
                        {
                            loading && <span>Loading...</span>
                        }
                        <input type="submit" className='btn btn-primary w-100' value="Login" onClick={handleLogin} disabled={loading} />
                        <div className='registerLink'>
                            <span>Don't have an account?</span>
                        <input type="button" className='btn btn-transparent w-100' value="Register" onClick={handleRegisterLink} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login
