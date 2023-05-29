import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Icon } from '@mui/material';
import { AddCategoryAPI, UploadCategoryImage } from '../services/api';
import AdminLayout from '../pages/Layouts/AdminLayout';

const AddCategory = () => {

    const navigate = useNavigate();
    const initialStateErrors = {
        title: {required: false},
        description: {required: false},
        image_url: {required: false}
    }
    const initialInputValues = {
        title: "",
        description: "",
        image_url: ""
    }
    
    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState(initialInputValues);
    const [selectedFile, setSelectedFile] = useState({});
    const [imageUploadStatus, setImageUploadStatus] = useState(null);
    const [message, setMessage] = useState(null);
    const [statusFlag, setstatusFlag] = useState(false);

    useEffect(() => {

    }, []);


    const handleChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
        if(event.target.type == 'file') {
            setSelectedFile(event.target.files[0]);
        }
        
    }
    
    
    const handleAddCategory = (event) => {
        console.log({selectedFile})

        event.preventDefault();
        let error = {
            title: {required: false},
            description: {required: false},
            image_url: {required: false}
        };
        let hasError = false;
        if(inputs.title == '') {
            error.title.required = true;
            hasError = true;
        }

        if(inputs.image_url == '') {
            error.image_url.required = true;
            hasError = true;
        }

        setErrors(error);
        

        
        event.preventDefault();

        if(!hasError) {
            setLoading(true);
            
            let type = 'categories';
            UploadCategoryImage(inputs, selectedFile, type).then((response) => {
                if(response.status == 200) {
                    // setImageUploadStatus(response.info);
                    // setstatusFlag(true);

                    inputs.image_url = response?.data?.data?.imgname;
                    AddCategoryAPI(inputs).then((response1) => {
                        setMessage(response1.data.info);
                        setstatusFlag(true);
                        if(response1.data.status === 1) {
                            setstatusFlag(true);
                        } else {
                            setstatusFlag(false);
                        }
                    }).catch((err) => {
                        setMessage(err.message);
                        setstatusFlag(false);
                    }).finally(() => {
                        setLoading(false);
                        setInputs(initialInputValues);
                    });

                } else {
                    setImageUploadStatus(response.info);
                    setstatusFlag(false);
                }
            }).catch((err) => {
                console.log({err})
                setMessage(err.message);
                setstatusFlag(false);
            }).finally(() => {
                setstatusFlag(false);
                setInputs(initialInputValues);
            });




            // Calling API
            


            setTimeout(() => {setMessage("")}, 15000)
        }
    }


  return (
    <AdminLayout>
        <div className='box-container400'>
            <div className='formContainer'>
                <div className='addCategoryForm' id='addCategoryForm'>
                    <h1 className='m-0 pb-4 text-center'>
                        Add Category
                    </h1>
                    <form name='addCategoryForm'>
                        {
                            message &&
                            <div className={statusFlag ? 'alert success' : 'alert error'}>
                                <Icon>{statusFlag ? 'task_alt' : 'warning'}</Icon>
                                {message}
                            </div>
                        }

                        <div className='fieldWrapper'>
                            <label htmlFor='title'>Title</label>
                            <input type="name" id='title' name='title' value={inputs.title} onChange={handleChange} />
                            
                            {errors.title.required && 
                                <span className='error'>Title is required.</span>
                            }
                        </div>


                        <div className='fieldWrapper'>
                            <label htmlFor='description'>Description</label>
                            <textarea 
                            id='description' 
                            name='description'
                            value={inputs.description} 
                            onChange={handleChange} />
                        </div>

                        <div className='fieldWrapper'>
                            <label htmlFor='description'>Category Image</label>
                            <input type="file" 
                            id='image_url' 
                            name='image_url'
                            value={inputs.image_url} 
                            onChange={handleChange} />
                            
                            {errors.image_url.required && 
                                <span className='error'>Image is required.</span>
                            }
                        </div>
                        
                        <div className='buttonWrapper'>
                            {
                                loading && <span>Loading...</span>
                            }
                            <input type="submit" className='btn btn-primary w-100' value="Add Category" onClick={handleAddCategory} disabled={loading} />
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AdminLayout>
  )
}

export default AddCategory
