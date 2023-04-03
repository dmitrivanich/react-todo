import { VStack, Text, Box, useColorMode } from "@chakra-ui/react"
import {TodoList, TodoForm} from "components/Todo"
import DrawerComponent from "components/DrawerComponent"

export const MainComponent = () => {
  const { colorMode } = useColorMode()

  return (
    <VStack h="100%" w="100vw" overflowY="auto" overflowX="hidden"  pt="10px" direction="row" fill="red">

      
      <VStack minW="240px" w="300px" spacing={10}>
        
        <Box w="100%">
          <Text w="100%" textAlign="center" fontSize="3xl" fontWeight="bold" color={colorMode === "dark" ? "blackAlpha.900" : "#B7C2DA"}>New note</Text>
          <TodoForm />
        </Box>

        <Box w="100%">
          <Text w="100%" textAlign="center" fontSize="3xl" fontWeight="bold" color={colorMode === "dark" ? "blackAlpha.900" : "#B7C2DA"}>List of notes</Text>
          <TodoList/>
        </Box>

      </VStack>

      <DrawerComponent/>
    </VStack>
  )
}


