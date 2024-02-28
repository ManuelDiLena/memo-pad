import React, { useContext } from 'react';
import ItemsContext from '../items-context';

export default function Menu() {

  const itemsContext = useContext(ItemsContext);

  function handleClick() {
    itemsContext.onNew()
  }

  function handleChange(e) {
    itemsContext.onSearch(e)
  }

  return (
    <div className='menu'>
      <input className='search' placeholder='Search' onChange={handleChange} />
      <button className='btn' onClick={(e) => handleClick()}>
        New Memo
      </button>
    </div>
  );
}