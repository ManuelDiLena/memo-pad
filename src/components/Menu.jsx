import React from 'react';

export default function Menu({ onNew }) {
  function handleClick() {
    onNew()
  }

  return (
    <div className='menu'>
      <input className='search' placeholder='Search' />
      <button className='btn' onClick={(e) => handleClick()}>
        New Memo
      </button>
    </div>
  );
}