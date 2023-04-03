export interface Task {
  id: string,
  dateOfCreation: string,
  editData?: string,
  title: string,
  description: string,
  tags?: string[]
}

export interface TodoState {
  tasks: Task[] | [],
  selectedTodo: Task | null,
  isEditTodo: boolean,
  
  setIsEditTodo: (isEdit: boolean) => void,
  selectTodo: (todo:Task | null) => void,
  addTodo: (newTodo:Task) => void,
  deleteTodo: (todo:Task) => void,
  editTodo: (newTodo:Task) => void
}
