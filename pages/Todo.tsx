import React, { useState, KeyboardEvent, ChangeEvent } from "react"
import styles from "../styles/Todo.module.scss"

const Todo = () => {
  const [todoList, setTodoList] = useState<string[]>([])
  const [todo, setTodo] = useState<string>("")
  const [searchResults, setSearchResults] = useState<string[]>()
  const [showSearch, setShowSearch] = useState(false)
  //   const [search, setSearch] = useState<string>("")

  const saveHandler = () => {
    if (todo.length < 1) {
      return alert("Please enter at least one character")
    }
    setTodoList((prev) => [todo, ...prev])
    setTodo("")
  }

  const enterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTodoList((prev) => [todo, ...prev])
      setTodo("")
    }
  }

  //   const deleteItem = (deletedItem: string) => {
  //     setTodoList((prev) => {
  //       const newList = prev.filter((item) => item !== deletedItem)
  //       return newList
  //     })
  //   }

  const deleteItem = (deleteItem: string) => {
    setTodoList((prev) => {
      const newList = prev.filter((item) => item !== deleteItem)
      return newList
    })
  }

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value
    if (search.length === 0) {
      setShowSearch(false)
    } else {
      setShowSearch(true)
      setSearchResults(
        todoList.filter((x) =>
          x.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      )
    }
  }

  // TODO add edit
  // TODO save todoList to localstorage
  // TODO add logout

  return (
    <div className={styles.main}>
      <div className={styles.title}>My To-Do List</div>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <label htmlFor="search">Search</label>
          <input
            onChange={searchHandler}
            type="text"
            id="search"
            name="search"
          />
          <label htmlFor="todo">What do you want to do?</label>

          <div className={styles.inputContainer}>
            <input
              onChange={(e) => setTodo(e.target.value)}
              onKeyDown={(e) => enterPressHandler(e)}
              tabIndex={0}
              id="todo"
              name="todo"
              type="text"
              value={todo}
              maxLength={25}
            />
            <button onClick={saveHandler}>Save</button>
          </div>
          {!showSearch &&
            todoList.map((item, index) => (
              <div className={styles.listItem} key={index}>
                <div>{item}</div>
                <button>Edit</button>
                <button onClick={() => deleteItem(item)}>Delete</button>
              </div>
            ))}
          {showSearch &&
            searchResults &&
            searchResults.map((item, index) => (
              <div className={styles.listItem} key={index}>
                <div>{item}</div>
                <button>Edit</button>
                <button onClick={() => deleteItem(item)}>Delete</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Todo
