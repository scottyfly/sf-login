import React, {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
  useRef,
  LegacyRef,
} from "react"
import styles from "../styles/Todo.module.scss"
import Image from "next/image"
import editIcon from "../public/edit-icon.png"
import deleteIcon from "../public/delete-icon.png"

interface EntryProps {
  item: string
  index: number
  updateTodoList: (items: string[]) => void
  todoList: string[]
  setTodoList: Dispatch<React.SetStateAction<string[]>>
  forceUpdate: () => void
}

const Entry: FC<EntryProps> = ({
  item,
  index,
  setTodoList,
  todoList,
  updateTodoList,
  forceUpdate,
}) => {
  const [showEdit, setShowEdit] = useState(false)
  const [editedVal, setEditedVal] = useState("")

  const handleEdit = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedVal(e.target.value)
  }

  useEffect(() => {
    if (item) {
      setEditedVal(item)
    }
  }, [item])

  const handleEnterEdit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
      e.stopPropagation()
      const listCopy = todoList
      listCopy.splice(index, 1, editedVal)
      updateTodoList(listCopy)
      localStorage.setItem("todoList", JSON.stringify(listCopy))
      setShowEdit(false)
      forceUpdate()
    },
    [editedVal, forceUpdate, todoList, updateTodoList]
  )

  // TODO try out using async instead of forceUpdate()
  const enterPressHandler = useCallback(
    async (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (editedVal.length < 1) return
        const listCopy = todoList
        listCopy.splice(index, 1, editedVal)
        updateTodoList(listCopy)
        localStorage.setItem("todoList", JSON.stringify(listCopy))
        setShowEdit(false)
        forceUpdate()
      }
    },
    [editedVal, forceUpdate, index, todoList, updateTodoList]
  )

  // enterPressHandler().then((response) => console.log(response))

  const deleteItem = (deleteItem: string) => {
    setTodoList((prev) => {
      const newList = prev.filter((item) => item !== deleteItem)
      return newList
    })
  }

  const inputRef = useRef<HTMLInputElement>(null)

  const openEditHandler = () => {
    setShowEdit((prev) => !prev)
  }

  useEffect(() => {
    if (showEdit) {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }, [showEdit])

  const handleLeaveEdit = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.stopPropagation()
    setShowEdit(false)
  }

  return (
    <div className={styles.listItem} key={index}>
      {!showEdit && <div>{item}</div>}
      {showEdit && (
        <div>
          <input
            ref={inputRef}
            type="text"
            id="editInput"
            name="editInput"
            placeholder={item}
            value={editedVal}
            onChange={(e) => handleEdit(e)}
            onKeyDown={(e) => enterPressHandler(e)}
            onBlur={(e) => handleLeaveEdit(e)}
          />
          <button onMouseDown={(e) => handleEnterEdit(e, index)}>Enter</button>
        </div>
      )}
      <div className={styles.listBtns}>
        <button onClick={openEditHandler}>
          <Image src={editIcon} width={20} height={20} alt="edit icon" />
        </button>
        <button onClick={() => deleteItem(item)}>
          <Image src={deleteIcon} width={20} height={20} alt="edit icon" />
        </button>
      </div>
    </div>
  )
}

export default Entry
