import React from 'react'
const { useState, useEffect } = React

function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('shoppingList')
    return savedItems ? JSON.parse(savedItems) : []
  })
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items))
  }, [items])

  const addItem = (e) => {
    e.preventDefault()
    if (!newItem.trim()) return
    
    setItems([...items, { 
      id: Date.now(), 
      name: newItem.trim(), 
      completed: false 
    }])
    setNewItem('')
  }

  const toggleItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const clearList = () => {
    if (window.confirm('Deseja limpar toda a lista?')) {
      setItems([])
    }
  }

  return (
    <div className="container">
      <h1>Lista de Compras</h1>
      
      <form onSubmit={addItem} className="add-form">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Adicionar item..."
          className="input"
        />
        <button type="submit" className="add-button">
          Adicionar
        </button>
      </form>

      <ul className="shopping-list">
        {items.map(item => (
          <li key={item.id} className="list-item">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItem(item.id)}
              className="checkbox"
            />
            <span 
              className={item.completed ? 'completed' : ''}
              style={{ flex: 1 }}
            >
              {item.name}
            </span>
            <button 
              onClick={() => removeItem(item.id)}
              className="remove-button"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {items.length > 0 && (
        <button onClick={clearList} className="clear-button">
          Limpar Lista
        </button>
      )}

      {items.length === 0 && (
        <p className="empty-message">Sua lista está vazia</p>
      )}
    </div>
  )
}

export default App

// Estilos CSS incorporados
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
  }

  .container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
  }

  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  .add-form {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .input {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }

  .input:focus {
    outline: none;
    border-color: #3498db;
  }

  .add-button {
    padding: 0.8rem 1.5rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  .add-button:hover {
    background-color: #2980b9;
  }

  .shopping-list {
    list-style: none;
    margin-bottom: 1.5rem;
  }

  .list-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: white;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }

  .list-item:hover {
    transform: translateX(5px);
  }

  .checkbox {
    margin-right: 1rem;
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
  }

  .completed {
    text-decoration: line-through;
    color: #95a5a6;
  }

  .remove-button {
    background: none;
    border: none;
    color: #e74c3c;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0 0.5rem;
    transition: color 0.3s ease;
  }

  .remove-button:hover {
    color: #c0392b;
  }

  .clear-button {
    display: block;
    width: 100%;
    padding: 0.8rem;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  .clear-button:hover {
    background-color: #c0392b;
  }

  .empty-message {
    text-align: center;
    color: #95a5a6;
    font-style: italic;
    margin-top: 2rem;
  }
`

// Adicione o estilo ao documento
const styleSheet = document.createElement('style')
styleSheet.innerText = styles
document.head.appendChild(styleSheet)