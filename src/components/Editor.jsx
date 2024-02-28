import React, { useContext } from 'react';
import Status from './Status';
import StatusContext from '../status-context';

export default function Editor({ item, onChangeTitle, onChangeText }) {

  const statusContext = useContext(StatusContext);

  // Functions to be able to edit the title and text of the memo in the editor
  function handleTitleChange(e) {
    onChangeTitle(e)
    statusContext.autosave()
  }

  function handleTextChange(e) {
    onChangeText(e)
    statusContext.autosave()
  }

  return (
    <div className='editor'>
      <Status statusCode={statusContext.status} />
      <div>
        <input className='title' value={item.title} onChange={handleTitleChange} />
      </div>
      <div className='editor-textarea'>
        <textarea className='content' value={item.text} onChange={handleTextChange}></textarea>
      </div>
    </div>
  );
}