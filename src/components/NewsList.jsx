import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { GetAllNews, GetCategoryDetails } from '../services/api';
import { newImagePath } from '../App';
import { Icon } from '@mui/material';

const NewsList = ({template, limit, slectedCategory}) => {

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFlag, setstatusFlag] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchAllNews();
  }, [slectedCategory]);


  const fetchAllNews = () => {
    setLoading(true);
      GetAllNews(slectedCategory).then((response) => {
        let data = response.data.data.slice(0, limit);
        setNewsList(data); 
        
        // data.map((item) => {
        //   let categoryID = item.category;
        //   GetCategoryDetails(categoryID).then((response1) => {
        //     setCategory(response1.data.data[0].title);
        //   }).catch((err) => {
        //   }).finally(() => {
        //   });
        //   console.log({category})
        // })
        
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
    <>
          {
            loading && 
            <div className='loadingWrapper'>
              <Icon>refresh</Icon>
            </div>
          }
         <div className={template}>
          {newsList.map((data, index) => (
            <div key={index} className='col card'>
                <div  className=''>
                    <Link to={`/newsDetails/${data.id}/${data.title}`}>
                          <div className='newsImageContainer'>
                              <img src={newImagePath+data.image_url} alt='Social' />
                              {/* <h3 className='categoryText'>{category}</h3> */}
                          </div>
                          <div className='newsContentContainer'>
                          <h2>{data.title.slice(0, 100)}</h2>
                          
                              <p>{data.description.slice(0, 400)+'...'}</p>
                            <button>View More</button>
                        </div>
                    </Link>
                </div>
            </div>
          ))}
          </div>
    </>
  )
}

export default NewsList
