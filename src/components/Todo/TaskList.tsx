import { Text, useColorMode, Flex, Checkbox, Stack, useDisclosure, Input} from "@chakra-ui/react"
import TodoCard from "components/Todo/TaskCard"
import { useCallback, useEffect, useState } from "react"
import { Task } from "types"
import {useTodosStore} from "store"
import { Empty, List } from 'antd';
import AlertComponent from "components/AlertComponent";

import { RiFileForbidLine } from "react-icons/ri"
import  {MenuComponent, MenuOptions } from "components/MenuComponent";
import { useFindHashTags } from "hooks"


export default function TaskList() {
  const alertState = useDisclosure()
  const findHashTags = useFindHashTags()

  const { colorMode } = useColorMode()
  const tasks = useTodosStore(state => state.tasks)
  const deleteTodo = useTodosStore(state => state.deleteTodo)
  const selectTodo = useTodosStore(state => state.selectTodo)
  const selectedTodo = useTodosStore(state => state.selectedTodo)

  //Filter
  const [filterText, setFilterText] = useState('')
  const [filtredTasks, setFiltredTasks] = useState(tasks)


  useEffect(() => {
    const currentFilterText = filterText
    setFilterText(currentFilterText)

    if(!currentFilterText.length || (
      currentFilterText.length === 1 && currentFilterText[0] === "#"
    )) {
      setFiltredTasks(tasks)
      return
    }

    const currentFiltredTasks = tasks.filter((task, index)=>{
      if(!task.tags) return false

      let tagsForFilter = findHashTags(currentFilterText)
      let cardIsFinded = false

      task.tags.forEach((tag1:string) => {
        if(cardIsFinded) return

        tagsForFilter.forEach((tag2:string)=>{
          if(cardIsFinded) return

          if(tag1.includes(tag2)) {
            cardIsFinded = true
          }
        })
      })

      return cardIsFinded
    })
    
    setFiltredTasks(currentFiltredTasks)
  },[tasks, filterText])

  //Alert
  const alertOptions = {
    header: "Delete note",
    message: "Are you sure? You can't undo this action afterwards.",
    confirmBtnText: "Delete",
    discardBtnText: "Cancel",
    confirmAction: () => {
      selectedTodo && deleteTodo(selectedTodo)
      selectTodo(null)
      alertState.onClose()
    },
    discardAction: () => {
      selectTodo(null)
      alertState.onClose()
    }
  }

  return (
    <>
      <AlertComponent
        options={alertOptions} 
        state={alertState}
      />

      {/* filter */}
      <Input value={filterText} onChange={(e) => setFilterText(e.target.value)} placeholder='Filter by #tags' size='sm' />


      <List
        style={{width:"100%", color: "white"}}
        locale={{ emptyText: (<>
          <Text fontSize="4xl" fontWeight="bold">No data</Text>
          <Flex>
            <RiFileForbidLine size="lg"/>
          </Flex>
        </>)}}
        dataSource={filtredTasks}
        renderItem={(task:Task) => (
          <List.Item>
            <TodoCard task={task} colorMode ={colorMode} alertState={alertState}/>
          </List.Item>
        )}
      />
    </>
  )
}