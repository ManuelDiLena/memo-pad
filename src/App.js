import { useState } from 'react';
import './App.css';
import Panel from './components/Panel';
import Menu from './components/Menu';
import List from './components/List';
import Memo from './components/Memo';
import Editor from './components/Editor';
import Preview from './components/Preview';

function App() {
  const [items, setItems] = useState([{
    id: 0,
    title: 'First memo',
    text: '# HelloWorld',
    pinned: true,
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
      <Panel>
        <Menu />
        <List>
          {
            items.map((item, i) => {
              return <Memo key={item.id} item={item} />
            })
          }
        </List>
      </Panel>
      <>
        <Editor />
        <Preview />
      </>
    </div>
  );
}

export default App;
