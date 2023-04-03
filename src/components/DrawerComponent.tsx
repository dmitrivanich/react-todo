import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useTodosStore } from 'store';
import { TodoForm } from './Todo';
import { TodoFormOptions } from './Todo/TodoForm';
import AlertComponent from "components/AlertComponent"

export interface DrawerOptions {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function DrawerComponent() {
  const alertState = useDisclosure()
  const isEtidTodo = useTodosStore(state => state.isEditTodo)
  const setIsEtidTodo = useTodosStore(state => state.setIsEditTodo)
  const selectTodo = useTodosStore(state => state.selectTodo)
  const selectedTodo = useTodosStore(state => state.selectedTodo)
  const editTodo = useTodosStore(state => state.editTodo)


  const TodoFormOptions: TodoFormOptions | undefined = selectedTodo ? {
    todoInfo: selectedTodo,
    submitBtnName: "Confirm changes",
    textAreaHeight: "20vh",
    sumbitBtnAction: (todo) =>{
      editTodo(todo)
      setIsEtidTodo(false)
      selectTodo(null)
    }
  } : undefined

  const alertOptions = {
    header: "Discard changes",
    message: "Are you sure? You can't undo this action afterwards.",
    confirmBtnText: "Discard",
    discardBtnText: "Cancel",
    
    confirmAction: () => {
      setIsEtidTodo(false)
      selectTodo(null)
      alertState.onClose()
    },

    discardAction: () => {
      alertState.onClose()
    }
  }

  return (
    <Drawer
      isOpen={isEtidTodo}
      placement='right'
      onClose={() => alertState.onOpen()}
    >
      <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit task</DrawerHeader>

          <DrawerBody>
            <TodoForm options={TodoFormOptions}/>

            <AlertComponent
              options={alertOptions} 
              state={alertState}
            />
          </DrawerBody>
        </DrawerContent>
    </Drawer>
  )
}