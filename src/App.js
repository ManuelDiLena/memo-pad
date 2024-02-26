import { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([{
    id: 0,
    title: 'First memo',
    text: '# HelloWorld',
    pinned: false,
    created: Date.now()
  }]);

  function handleClick() {
    const memo = {
      id: 1,
      title: 'Second memo',
      text: '# HelloWorld',
      pinned: false,
      created: Date.now()
    }

    setItems([...items, memo])
  }

  return (
    <div className='App container'>
      <div className='panel'>
        <div className='menu'>
          <input className='search' placeholder='Search' />
          <button className='btn' onClick={(e) => handleClick()}>New Memo</button>
        </div>
        <div className='list'>
          {
            items.map((item, i) => {
              return <div key={item.id} className='memo'>{item.title}</div>
            })
          }
        </div>
      </div>

      <div>
        <div className='editor'></div>
        <div className='preview'></div>
      </div>
    </div>
  );
}

export default App;
