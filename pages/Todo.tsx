import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  useCallback,
  useEffect,
} from "react"
import styles from "../styles/Todo.module.scss"
import Entry from "../components/Entry"
import { useRouter } from "next/router"
import { join } from "path"

const useForceUpdate = () => {
  const [value, setValue] = useState(0) // integer state
  return () => setValue((value) => value + 1) // update state to force render
  // An function that increment 👆🏻 the previous state like here
  // is better than directly setting `value + 1`
}

const Todo = () => {
  const [todoList, setTodoList] = useState<string[]>([])
  const [todo, setTodo] = useState<string>("")
  const [searchResults, setSearchResults] = useState<string[]>()
  const [showSearch, setShowSearch] = useState(false)

  const router = useRouter()

  const forceUpdate = useForceUpdate()

  //   const refresh = () => {
  //     forceUpdate()
  //   }

  useEffect(() => {
    const storage = localStorage.getItem("todoList")
    if (storage) {
      const storedList = JSON.parse(storage)
      console.log("storedList", storedList)
      setTodoList(storedList)
    }
  }, [])

  const saveHandler = useCallback(() => {
    if (todo.length < 1) {
      return alert("Please enter at least one character")
    }
    setTodoList((prev) => [todo, ...prev])
    setTodo("")
  }, [todo])

  const enterPressHandler = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (todo.length < 1) return
        setTodoList((prev) => [todo, ...prev])
        setTodo("")
      }
    },
    [todo]
  )

  useEffect(() => {
    console.log("todo", todo)
  }, [todo])

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

  const updateTodoList = (items: string[]) => {
    setTodoList(items)
  }

  useEffect(() => {
    if (todoList && todoList.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todoList))
    }
  }, [todoList])

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className={styles.main}>
      <div className={styles.logout} onClick={handleLogout}>
        Logout
      </div>
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
          <div className={styles.listContainer}>
            {!showSearch &&
              todoList.map((item, index) => (
                <Entry
                  key={index}
                  item={item}
                  index={index}
                  todoList={todoList}
                  setTodoList={setTodoList}
                  updateTodoList={updateTodoList}
                  forceUpdate={forceUpdate}
                />
              ))}
            {showSearch &&
              searchResults &&
              searchResults.map((item, index) => (
                <Entry
                  key={index}
                  item={item}
                  index={index}
                  todoList={todoList}
                  setTodoList={setTodoList}
                  updateTodoList={updateTodoList}
                  forceUpdate={forceUpdate}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo
