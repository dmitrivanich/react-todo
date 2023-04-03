import { Text, useColorMode,Card, Flex, Heading, Highlight, CardHeader, CardBody, IconButton, Box, useDisclosure} from "@chakra-ui/react"
import { MenuComponent, MenuOptions } from "components/MenuComponent"
import {useTodosStore} from "store"
import { Task } from "types"
import {useCapitalize} from "hooks"
import { AlertState } from "components/AlertComponent"


export interface TodoFormProps {
    task:Task
    colorMode: string,
    alertState: AlertState
  }

export default function TaskCard({task, colorMode, alertState}:TodoFormProps) {
    const capitalize = useCapitalize()
    const selectTodo = useTodosStore(state => state.selectTodo)
    const setEditTodo = useTodosStore(state => state.setIsEditTodo)


    const menuOptions: MenuOptions = {
        onRemove: (task) => {
          selectTodo(task)
          alertState.onOpen()
        },
        onEdit: (task) => {
          selectTodo(task)
          setEditTodo(true)
        }
    }

    const tags = (tags: string[]) => <Text fontSize="small">
      <Highlight
        query={tags.sort((a, b) => b.length - a.length)}
        styles={{ px: '2', py: '0', rounded: 'full', bg: 'teal.100' }}
      >
        {tags.join(" ")}
      </Highlight>
    </Text>

    return(
    <Card minW="100%">

        <CardHeader>
          <Flex justifyContent="space-between">
              <Box>
                <Heading fontSize="2xl" fontWeight="semibold" color={colorMode === "dark" ? "white" : "black"}>{capitalize(task.title)}</Heading>
                <Text fontSize="small">Created: {task.dateOfCreation}</Text>
                {task.editData && <Text fontSize="small">Edited: {task.editData}</Text>}
              </Box>
              <MenuComponent options={menuOptions} task={task}/>
          </Flex>
        </CardHeader>

        <CardBody>
          <Text color={colorMode === "dark" ? "white" : "black"}>
            <Highlight
              query={task.tags || []}
              styles={{ px: '2', py: '0', rounded: 'full', bg: 'teal.100' }}
            >
              {capitalize(task.description)}
            </Highlight>
          </Text>
        </CardBody>

    </Card>
  )
}