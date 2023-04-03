import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  UseDisclosureProps
} from '@chakra-ui/react'
import { useRef } from 'react'

import {Button} from "@chakra-ui/react"

export interface AlertOptions{
  header: string,
  message: string,
  confirmBtnText: string,
  discardBtnText: string,
  confirmAction: () => void,
  discardAction: () => void
}

export interface AlertState{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface AlertProps {
  options: AlertOptions,
  state: AlertState
}

export default function Alert({options,state}:AlertProps) {
  const cancelRef = useRef(null)

  return (
    <>
      <AlertDialog
        isOpen={state.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={state.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {options.header}
            </AlertDialogHeader>

            <AlertDialogBody>
              {options.message}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={options.discardAction}>
                {options.discardBtnText}
              </Button>
              <Button colorScheme='red' onClick={options.confirmAction} ml={3}>
                {options.confirmBtnText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}