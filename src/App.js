import { useEffect, useState } from 'react';
import './App.css';
import Panel from './components/Panel';
import Menu from './components/Menu';
import List from './components/List';
import Memo from './components/Memo';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { v4 as uuidv4 } from 'uuid';
import ItemsContext from './items-context';
import StatusContext from './status-context';
import { get, post, put } from './lib/http';

function App() {

  const URL = 'http://localhost:3000/';

  const [items, setItems] = useState([]);
  const [copyItems, setCopyItems] = useState([]);
  const [actualIndex, setActualIndex] = useState(-1);
  const [lock, setLock] = useState(false);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    getItems();
  }, [])

  // Function to get memos from server
  async function getItems() {
    let data = await get(`${URL}`)
    let res = getOrderedMemos(data)

    setItems(res)
    setCopyItems(res)

    if (items.length > 0) setActualIndex(0)
  }

  // Function to generate a new memo
  async function handleNew() {
    const memo = {
      id: uuidv4(),
      title: 'New memo',
      text: 'Test',
      pinned: false,
      created: Date.now()
    }

    let memos = [...items]
    memos.unshift(memo)
    let res = getOrderedMemos(memos)

    setItems(res)
    setCopyItems(res)

    // Send a new memo to the server
    const data = await post(`${URL}new`, memo)
  }

  // Function to pin a memo
  function handlePinned(item, i) {
    setActualIndex(i)
    let id = item.id
    let memos = [...items]
    memos[i].pinned = !memos[i].pinned

    let res = getOrderedMemos(memos)

    setItems(res)
    setCopyItems(res)

    let index = res.findIndex(x => x.id === id)

    setActualIndex(index)
  }

  // Function to order the memos, the first pinned
  function getOrderedMemos(arr) {
    let items = [...arr]
    let pinned = items.filter(x => x.pinned === true)
    let rest = items.filter(x => x.pinned === false)

    pinned = sortByDate(pinned, true)
    rest = sortByDate(rest, true)

    return [...pinned, ...rest]
  }

  // Function that sorts by creation date
  function sortByDate(arr, asc = false) {
    if (asc) {
      return arr.sort((a, b) => new Date(b.created) - new Date(a.created))
    } 
    else {
      return arr.sort((a, b) => new Date(a.created) - new Date(b.created))
    }
  }

  // Function to select a memo from the left panel
  function handleSelectMemo(item, e) {
    if (e.target.classList.contains('memo')) return
    const index = items.findIndex(x => x === item)
    setActualIndex(index)
  }

  // Functions to be able to edit the title and text of the memo in the editor
  function onChangeTitle(e) {
    const title = e.target.value
    let memos = [...items]
    memos[actualIndex].title = title

    setItems(memos)
    setCopyItems(memos)
  }

  function onChangeText(e) {
    const text = e.target.value
    let memos = [...items]
    memos[actualIndex].text = text

    setItems(memos)
    setCopyItems(memos)
  }

  // Functions to be able to update and save memos on the server
  function autosave() {
    if (!lock) {
      setLock(true)
      setStatus(1)
      setTimeout(() => {
        save()
        setLock(false)
      }, 3000)
    }
  }

  async function save() {
    const item = items[actualIndex]

    const response = await put(`${URL}update`, item)

    setStatus(2)
    setTimeout(() => {
      setStatus(0)
    }, 1000)
  }

  // Function to display a selected memo in the editor
  function renderEditorUI() {
    return (
      <>
        <StatusContext.Provider value={{ status: status, autosave: autosave }}>
          <Editor 
            item={copyItems[actualIndex]} 
            onChangeTitle={onChangeTitle}
            onChangeText={onChangeText}
          />
        </StatusContext.Provider>
        <Preview text={copyItems[actualIndex].text} />
      </>
    )
  }

  // Function to search memos
  function handleSearch(e) {
    const q = e.target.value
    if (q === '') {
      setCopyItems([...items])
    }
    else {
      let res = items.filter(x => x.title.indexOf(q) >= 0 || x.text.indexOf(q) >= 0)
      if (res.length === 0) {
        setActualIndex(-1)
      }
      else {
        setCopyItems([...res])
        setActualIndex(0)
      }
    }
  }

  return (
    <div className='App container'>
      <Panel>
        <ItemsContext.Provider value={{onSearch:handleSearch, onNew:handleNew}}>
          <Menu onNew={handleNew} onSearch={handleSearch} />
        </ItemsContext.Provider>
        <List>
          {
            copyItems.map((item, i) => {
              return <Memo 
                key={item.id}
                actualIndex={actualIndex}
                item={item} 
                index={i}
                onHandlePinned={handlePinned}
                onHandleSelectMemo={handleSelectMemo}
              />
            })
          }
        </List>
      </Panel>
      <>
        {
          (actualIndex >= 0) ? renderEditorUI() : ''
        }
      </>
    </div>
  );
}

export default App;
