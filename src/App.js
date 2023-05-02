
import './App.css';
import { useState } from "react"; //hook
import { v4 as uuidv4 } from 'uuid';
import {items} from './data'

function App() {
  const [itemsState, setitemsState] = useState(items);
  const [item,setItem] = useState({name:''});
  const [done,setDone] = useState({isDone:''});

  function handleAddItem() {
    console.log(item);
    setitemsState([...itemsState,item]);
    setItem({name:''})
}

function handleChange(e) {
  setItem({...item,[e.target.name]:e.target.value});
  item.id = uuidv4();
}

function handleDelete(id) {
  setitemsState(itemsState.filter((item)=>item.id!==id));    
}

function handleDone(isDone){
  setitemsState(itemsState.filter((item)=>item.isDone===true));  
}

function handleSortByDone(isDone){
  handleDone(isDone)
}

function handleSearch(e) {
  if (e.target.value.trim()==="") {
     setitemsState(items);
  }
  else{
   let filteredItems = itemsState.filter((item)=>item.name.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()));
   setitemsState(filteredItems);
  }
}
  return (
    <>
    <h1>ToDo</h1>
    <input onChange={(e)=>handleSearch(e)} placeholder="search item"/>
      <button onClick={()=>handleSortByDone(item.isDone)}>sort by done</button>
    <ul>
        {itemsState.map((item, idx) => {
          return (
            <li key={idx}>
              {item.name}{" "}
              <button onClick={()=>handleDelete(item.id)}>delete</button>
            </li>
          );
        })}
      </ul>
      <h4>Add new item</h4>
      <input name="name" value={item.name} onChange={(e)=>handleChange(e)} placeholder="item" type="text"/>
      <button onClick={handleAddItem}>Add New Item</button>
    </>
  );
}

export default App;
