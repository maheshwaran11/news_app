import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Icon } from '@mui/material';
import { AddNewsAPI, GetAllCategories, UploadNewsImage } from '../services/api';
import AdminLayout from '../pages/Layouts/AdminLayout';

const AddNews = () => {

    const navigate = useNavigate();
    const initialStateErrors = {
        title: {required: false},
        description: {required: false},
        image_url: {required: false},
        category: {required: false},
        tags: {required: false}
    }
    const initialInputValues = {
        title: "",
        description: "",
        image_url: "",
        category: "",
        tags: ""
    }
    
    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState(initialInputValues);
    const [allCategories, setAllCategories] = useState([]);

    const [selectedFile, setSelectedFile] = useState({});
    const [imageUploadStatus, setImageUploadStatus] = useState(null);
    const [message, setMessage] = useState(null);
    const [statusFlag, setstatusFlag] = useState(false);

    useEffect(() => {
        GetAllCategories().then((response) => {
            if(response.data.status === 1) {
                console.log({response})
                setAllCategories(response.data.data);
            }
        }).catch((err) => {
            console.log({err})
            
        }).finally(() => {
            
        });
    }, []);


    const handleChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
        if(event.target.type == 'file') {
            setSelectedFile(event.target.files[0]);
        }
    }
    
    
    const handleAddNews = (event) => {
        event.preventDefault();
        let error = {
            title: {required: false},
            description: {required: false},
            image_url: {required: false},
            category: {required: false},
            tags: {required: false}
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

        if(inputs.category == '') {
            error.category.required = true;
            hasError = true;
        }

        if(inputs.tags == '') {
            error.tags.required = true;
            hasError = true;
        }

        setErrors(error);
        

        
        event.preventDefault();

        if(!hasError) {
            setLoading(true);
            let type="news";

            UploadNewsImage(inputs, selectedFile, type).then((response) => {
                if(response.status == 200) {
                    inputs.image_url = response?.data?.data?.imgname;
                    AddNewsAPI(inputs).then((response) => {
                        setMessage(response.data.info);
                        setstatusFlag(true);
                        if(response.data.status === 1) {
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
                        Add News
                    </h1>
                    <form name='addCategoryForm' method='POST'>
                        {
                            message &&
                            <div className={statusFlag ? 'alert success' : 'alert error'}>
                                <Icon>{statusFlag ? 'task_alt' : 'warning'}</Icon>
                                {message}
                            </div>
                        }

                        <div className='row1'>
                                <div className='fieldWrapper'>
                                    <label htmlFor='title'>Title</label>
                                    <input type="name" id='title' name='title' value={inputs.title} onChange={handleChange} />
                                    
                                    {errors.title.required && 
                                        <span className='error'>Title is required.</span>
                                    }
                                </div>

                                <div className='fieldWrapper'>
                                    <label htmlFor='category'>Select Category</label>
                                    <select id='category' name='category' value={inputs.category} onChange={handleChange}>
                                    <option value="">--- Select ---</option>
                                    {
                                        allCategories.map((data, index) => {
                                            return <option value={data.id} key={index}>{data.title}</option>
                                        })
                                    }
                                    
                                        
                                    </select>
                                    
                                    {errors.category.required && 
                                        <span className='error'>Category is required.</span>
                                    }
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

                                <div className='fieldWrapper'>
                                    <label htmlFor='tags'>Tags</label>
                                    <input type="text" id='tags' name='tags' value={inputs.tags} onChange={handleChange} />
                                    
                                    {errors.tags.required && 
                                        <span className='error'>Tags is required.</span>
                                    }
                                </div>

                        </div>

                        


                        <div className='fieldWrapper'>
                            <label htmlFor='description'>Description</label>
                            <textarea 
                            id='description' 
                            name='description'
                            rows={8}
                            value={inputs.description} 
                            onChange={handleChange} />
                        </div>

                        
                        
                        <div className='buttonWrapper'>
                            {
                                loading && <span>Loading...</span>
                            }
                            <input type="submit" className='btn btn-primary w-100' value="Add News" onClick={handleAddNews} disabled={loading} />
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AdminLayout>
  )
}

export default AddNews
