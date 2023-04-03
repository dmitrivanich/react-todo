import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'

import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { HiDotsVertical } from "react-icons/hi"
import { IconButton } from '@chakra-ui/react'
import { Task } from 'types'

export interface MenuOptions {
  onRemove: (task:Task) => void,
  onEdit: (task:Task) => void
}

interface MenuProps {
  options: MenuOptions,
  task:Task
}

export function MenuComponent({options, task}: MenuProps) {

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HiDotsVertical />}
        variant='outline'
      />

      <MenuList>

        <MenuItem icon={<EditIcon />} onClick={() => options.onEdit(task)}>
          Edit Todo
        </MenuItem>

        <MenuItem color="red" icon={<DeleteIcon />} onClick={() => options.onRemove(task)}>
          Delete Todo
        </MenuItem>
        
      </MenuList>
    </Menu>
  )
}
