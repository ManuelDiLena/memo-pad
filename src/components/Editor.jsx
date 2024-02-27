import React from 'react';

export default function Editor({ item }) {
  return (
    <div className='editor'>
      <div>
        <input className='title' value={item.value} />
      </div>
      <div className='editor-textarea'>
        <textarea className='content' value={item.text}></textarea>
      </div>
    </div>
  );
}