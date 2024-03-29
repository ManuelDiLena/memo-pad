import React from 'react';

export default function Status({ statusCode }) {
  return (
    <div className='statusCodeContainer'>
      { (statusCode === 0) ? '' : '' }
      { (statusCode === 1) ? 'Saving...' : '' }
      { (statusCode === 2) ? 'Document saved' : '' }
    </div>
  );
}