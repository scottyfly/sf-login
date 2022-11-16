import React from "react"
import styles from "../styles/Todo.module.scss"

const Todo = () => {
  return (
    <div className={styles.main}>
      <div className={styles.title}>My To-Do List</div>
      <div className={styles.container}></div>
    </div>
  )
}

export default Todo
