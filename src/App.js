import { useState } from 'react';
import './App.css';
import Panel from './components/Panel';
import Menu from './components/Menu';
import List from './components/List';
import Memo from './components/Memo';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [items, setItems] = useState([]);

  // Function to generate a new memo
  function handleNew() {
    const memo = {
      id: uuidv4(),
      title: '',
      text: '',
      pinned: false,
      created: Date.now()
    }

    setItems([...items, memo])
  }

  return (
    <div className='App container'>
      <Panel>
        <Menu onNew={handleNew} />
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
