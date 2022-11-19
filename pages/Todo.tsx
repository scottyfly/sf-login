import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
} from "react"
import styles from "../styles/Todo.module.scss"
import Entry from "../components/Entry"
import { useRouter } from "next/router"
import { useForceUpdate } from "../hooks/useForceUpdate.js"

// const useForceUpdate = () => {
//   const [value, setValue] = useState(0) // integer state
//   return () => setValue((value) => value + 1) // update state to force render
//   // An function that increment 👆🏻 the previous state like here
//   // is better than directly setting `value + 1`
// }

const Todo = () => {
  const [todoList, setTodoList] = useState<string[]>([])
  const [todo, setTodo] = useState<string>("")
  const [searchResults, setSearchResults] = useState<string[]>()
  const [showSearch, setShowSearch] = useState(false)
  const [showNew, setShowNew] = useState(false)

  const router = useRouter()

  const forceUpdate = useForceUpdate()

  const newTodoRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    console.log("todoList", todoList)
    console.log("todo", todo)
  }, [todo, todoList])

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

  const showNewHandler = () => {
    setShowNew(true)
  }

  useEffect(() => {
    if (showNew) {
      if (newTodoRef.current) {
        newTodoRef.current.focus()
      }
    }
  }, [showNew])

  const leaveEntryHandler = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    e.stopPropagation()
    setShowNew(false)
  }

  return (
    <div className={styles.main}>
      <div className={styles.logoutContainer}>
        <div className={styles.logout} onClick={handleLogout}>
          Logout
        </div>
      </div>
      <div className={styles.title}>My To-Do List</div>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.searchAndAddContainer}>
            <input
              onChange={searchHandler}
              type="text"
              id="search"
              name="search"
              placeholder="search"
              onBlur={() => setShowSearch(false)}
            />

            <button onClick={showNewHandler} className={styles.newBtn}>
              New
            </button>
          </div>

          {showNew && (
            <div className={styles.inputContainer}>
              <input
                ref={newTodoRef}
                onChange={(e) => setTodo(e.target.value)}
                onKeyDown={(e) => enterPressHandler(e)}
                onBlur={(e) => leaveEntryHandler(e)}
                tabIndex={0}
                id="todo"
                name="todo"
                type="text"
                value={todo}
                maxLength={25}
                className={styles.newInput}
              />
              {/* onMouseDown has priority over onblur */}
              <button className={styles.saveBtn} onMouseDown={saveHandler}>
                Save
              </button>
            </div>
          )}
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
