import { create } from 'zustand'
import { Task, TodoState } from 'types'
import { devtools, persist } from 'zustand/middleware'

export const useTodosStore = create<TodoState>()(
  devtools(
    persist((set,get) => ({
      tasks: [{
        "title": "First",
        "description": "A \#small test case that hides a \#huge \"no data\" \#inscription",
        "tags": ["\#small","\#huge","\#inscription"],
        "id": "b5f1c009-8fdb-4eb2-b6d6-538a2e1e9aa0",
        "dateOfCreation": "4/3/2023, 1:26:09 AM",
        "editData": "4/3/2023, 1:26:50 AM"
    }],
      selectedTodo: null,
      isEditTodo: false,

      addTodo: (newTodo) => {set({tasks: [...get().tasks, newTodo]})},

      setIsEditTodo: (isEdit) => {
        set({isEditTodo: isEdit})
      },

      deleteTodo: (task) => {
        console.log("delete")
        let filtredTodos = get().tasks.filter(({id}) => id !== task.id)
        set({tasks: filtredTodos})
      },

      selectTodo: (task) => {
        set({selectedTodo: task})
      },
      
      editTodo: (newTodo) => {
        let newTodos = get().tasks.map((task:Task) => {
          return task.id === newTodo.id ? newTodo : task 
        })

        set({tasks: newTodos})
      }
    }),
    {
      name: "tasks-storage" // name of the key, state will be saved under items
    })
  )
)