import React, { useEffect, useState } from 'react'
import DefaultLayout from './Layouts/DefaultLayout'
import { useParams } from 'react-router-dom'
import { GetNewsDetails } from '../services/api';
import { newImagePath } from '../App';
import NewsList from '../components/NewsList';
import { Icon } from '@mui/material';

const NewsDetails = ({id}) => {

    let params = useParams();
    //console.log(params.id);

    const [newsDetail, setNewsDetail] = useState([]);
    const [newsID, setnewsID] = useState(params?.id);
    const [loading, setLoading] = useState(false);
    const [statusFlag, setstatusFlag] = useState(false);

    let newsId = params?.id;
    const newsTitle = params?.title;

   console.log('before' + id);

    useEffect(() => {
        setnewsID(newsId);

        console.log('after' + newsId);
        fetchNewsDetails();
      }, [params]);
    
    
      const fetchNewsDetails = () => {
        setLoading(true);
          GetNewsDetails(newsID).then((response) => {
            
            setNewsDetail(response.data.data[0]);
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
        {
            loading && 
            <div className='loadingWrapper'>
              <Icon>refresh</Icon>
            </div>
          }
        <div className='container'>
            <div className='row'>
            <div className='col col-8'>
                
            {

                    newsID && 
                    <>
                        <h2>{newsDetail.title}</h2>  
                        <div className='newsImageContainer'>
                            <img src={newImagePath+newsDetail.image_url} alt='Social' />
                        </div>
                        <div className='newsContentContainer'>
                            
                            <p>{newsDetail.description}</p>
                        </div>
                    </>
            }
            
            </div>
            <div className='col col-4'>

            </div>
            </div>
                <div className=''>
                    {/* <NewsList template="template1" limit="5" /> */}
                </div>
            </div>     
    </DefaultLayout>
  )
}

export default NewsDetails
