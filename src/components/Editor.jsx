import React from 'react';

export default function Editor({ item, onChangeTitle, onChangeText }) {

  // Functions to be able to edit the title and text of the memo in the editor
  function handleTitleChange(e) {
    onChangeTitle(e)
  }

  function handleTextChange(e) {
    onChangeText(e)
  }

  return (
    <div className='editor'>
      <div>
        <input className='title' value={item.title} onChange={handleTitleChange} />
      </div>
      <div className='editor-textarea'>
        <textarea className='content' value={item.text} onChange={handleTextChange}></textarea>
      </div>
    </div>
  );
}