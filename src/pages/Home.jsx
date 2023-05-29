import React, { useEffect, useState } from 'react'
import DefaultLayout from './Layouts/DefaultLayout'
import NewsList from '../components/NewsList'
import { GetAllCategories } from '../services/api';

const Home = () => {

  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFlag, setstatusFlag] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchAllCategories();
  }, []);


  const fetchAllCategories = () => {
      GetAllCategories().then((response) => {
        let data = response.data.data;
        setCategoryList(data); 
        
        setstatusFlag(true);
        if(response.data.status === 1) {
            setstatusFlag(true);
        } else {
            setstatusFlag(false);
        }
    }).catch((err) => {
        setstatusFlag(false);
    }).finally(() => {
        setLoading(false);
    });
  }


  return (
    <DefaultLayout>
        <section id='slider' className='pt-mobile-50'>
          <div className='container'>

            {
              categoryList?.[0]?.id &&
                <NewsList template="template2" limit="3"  slectedCategory={categoryList?.[0]?.id} /> 
            }
          

          <h2>Latest News</h2>
          {
              categoryList?.[1]?.id &&
             <NewsList template="template3" limit="6" slectedCategory="" />
          }
          <h2>Latest News</h2>
          {
              categoryList?.[2]?.id &&
              <NewsList template="template1" limit="4"  slectedCategory={categoryList?.[2]?.id}/>
          }

          


          </div>
        </section>
    </DefaultLayout>
  )
}

export default Home
