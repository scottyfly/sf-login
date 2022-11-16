import React, { useState, KeyboardEvent } from "react"
import styles from "../styles/Todo.module.scss"

const Todo = () => {
  const [todoList, setTodoList] = useState<string[]>([])
  const [todo, setTodo] = useState<string>("")

  const saveHandler = () => {
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

  const deleteItem = (itemIndex: number) => {
    console.log("index", itemIndex)
    setTodoList((prev) => {
      console.log("prev", prev[itemIndex])
      const newList = prev.filter((item) => item !== prev[itemIndex])
      console.log("new list", newList)
      return newList
    })
  }

  return (
    <div className={styles.main}>
      <div className={styles.title}>My To-Do List</div>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
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
            />
            <button onClick={saveHandler}>Save</button>
          </div>
          {todoList.map((item, index) => (
            <div className={styles.listItem} key={index}>
              <div>{item}</div>
              <button onClick={() => deleteItem(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Todo
