import React from 'react';

export default function Menu({ onNew, onSearch }) {
  function handleClick() {
    onNew()
  }

  function handleChange(e) {
    onSearch(e)
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