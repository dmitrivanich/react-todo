import { VStack, HStack, Flex, useColorMode, Button, Icon, Box } from "@chakra-ui/react"
import { MainComponent }  from "components/MainComponent"
import {SunIcon, MoonIcon} from '@chakra-ui/icons'

function App() {
  const { colorMode, toggleColorMode } = useColorMode()


  return (
    <Box position="relative">
      <Flex position="relative" h={"100vh"} w={"100vw"} justify="space-around" flex="true" className="App">
        <MainComponent/>
      </Flex>

      <Button bg="none" position="absolute" zIndex={1000} left="10px" top="10px" onClick={toggleColorMode}>
        <Icon color="blackAlpha.800" as={colorMode === "dark" ? SunIcon : MoonIcon }/>
      </Button>
    </Box>
  )
}

export default App
