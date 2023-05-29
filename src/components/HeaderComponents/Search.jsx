
import React from 'react'
import { Icon } from '@mui/material'
const Search = () => {
  return (
    <div className='searchWrapper'>
      <div className='searchBtnIcon d-lg-none'>
      <button><Icon>search</Icon></button>
      </div>
      
      <div className='searchContainer'>
          <input type="text" />
          <div className='searchBtn'>
              <button><Icon>search</Icon></button>
          </div>
      </div>
    </div>
  )
}

export default Search
