import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DefaultLayout from './Layouts/DefaultLayout';
import NewsList from '../components/NewsList';

const Categories = (props) => {
    let params = useParams();
    
    const [catId, setCatId] = useState("");
    const [catTitle, setCatTitle] = useState("");

    useEffect(() => {

        console.log({params})
        const id = params.id;
        console.log({id})
        setCatId(params.id);
        setCatTitle(params.title);
        getCat(params.id);
    }, [params.id])

    const getCat = (catId) => {
        return <NewsList template="template3" slectedCategory={catId} />
    }


  return (
    <DefaultLayout>
        <div className='container'>
            <div className='row'>
                <div className='col col-9'>
                    <h1>{catTitle}</h1>
                        {
                            
                        catId &&
                            getCat(catId)
                        }
                </div>
            </div>
        </div>
    </DefaultLayout>
    
  )
}

export default Categories
