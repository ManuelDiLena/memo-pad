import React from 'react';

export default function Menu() {
  function handleClick() {}

  return (
    <div className='menu'>
      <input className='search' placeholder='Search' />
      <button className='btn' onClick={(e) => handleClick()}>
        New Memo
      </button>
    </div>
  );
}