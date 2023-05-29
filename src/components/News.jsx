import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';

const News = ({template}) => {

    const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = () => {
    axios.get("http://localhost/api/newsAPI/api/read.php")
    .then(data => {
      console.log(data.results);
      setCategories(data.results);
      console.log({data})
      setLoading(true);
    })
    .catch(err => console.log(err));  
  }

    

return (
    <>
    <div className={template}>
    {categories.map((data, index) => (
        
            <div key={index} className='col'>
                <div  className='card'>
                    <Link to="/">
                        <div className='newsImageContainer'>
                            <img src={data.image_url} alt='Social' />
                        </div>
                        <div className='newsContentContainer'>
                            <h2>{data.title}</h2>
                            <p>{data.description}</p>
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

export default News
