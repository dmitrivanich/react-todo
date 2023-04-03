import { Input,Button,FormErrorMessage, Text, FormControl, Textarea, Select,Highlight,useColorMode} from "@chakra-ui/react"
import { Field, Form, Formik } from 'formik';
import { useState, useRef } from "react";
import { v4 } from "uuid"
import {useTodosStore} from "store"
import {useDatetime, useFindHashTags} from "hooks";
import { Task } from "types";
import "./Styles.scss"

export interface TodoFormOptions {
  todoInfo: Task,
  textAreaHeight?: string,
  submitBtnName?: string,
  sumbitBtnAction: (todo:Task) => void
}

export default function TodoForm({options}:{options?: TodoFormOptions}){
  const { colorMode } = useColorMode()
  const findHashTag = useFindHashTags()

  const addTodo = useTodosStore(state => state.addTodo)
  const validateTitle = (text: string) => (text ? "" : 'Required')
  const [hashTags, setHashTags] = useState<string[]>([])
  const [isEditDiscription, setIsEditDiscription] = useState<boolean>(false)

  const validateDiscription = (text: string) => {
    setHashTags(findHashTag(text))
    const newText = `<span style={{color:"red}}>${text}</span>`
    return (newText ? "" : 'Required')
  }

  const datetime = useDatetime()

  const submitForm = (values:any, actions:any) => {
    const newTodo = {
      ...values,
      tags: findHashTag(values.description),
      id: String(v4()),
      dateOfCreation: datetime("en-US")
    }

    setTimeout(() => {
      if(options) {
        options.sumbitBtnAction({
          ...values,
          tags: findHashTag(options.todoInfo.description),
          id: options.todoInfo.id,
          dateOfCreation: options.todoInfo.dateOfCreation,
          editData: datetime("en-US")
        })
      }else{
        addTodo(newTodo)
      }
      
      actions.setSubmitting(false)
      actions.resetForm()
    }, 300)
  }

  return (
    <Formik
      initialValues={{
        title: options?.todoInfo.title || "",
        description: options?.todoInfo.description || "",
      }}
      
      onSubmit={(values, actions) => submitForm(values, actions)}
    >
      {(props) => (
        <Form style={{width:"100%"}}>

          <Field name='title' validate={validateTitle}>
            {({ field, form }: { field: any, form: any }) => (
              <FormControl isInvalid={form.errors.title && form.touched.title}>
                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                <Input mb={2} {...field} placeholder='Task title...' maxLength={36} />
              </FormControl>
            )}
          </Field>

          <Field name='description' validate={validateDiscription}>
            {({ field, form }: { field: any, form: any }) => (
              <FormControl isInvalid={form.errors.description && form.touched.description}>
                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                {
                  isEditDiscription
                  ? <Textarea mb={2} onBlurCapture={()=> {
                    setIsEditDiscription(!isEditDiscription)
                  }} {...field} placeholder='Task description...' maxLength={288}/>
                  : <Text className={`textarea ${colorMode}`} {...field} onMouseDown={()=> setIsEditDiscription(!isEditDiscription)}>
                      <Highlight
                        query={hashTags.sort((a, b) => b.length - a.length)}
                        styles={{ px: '2', py: '0', rounded: 'full', bg: 'teal.100' }}
                      >
                        {field.value || "Description..."}
                      </Highlight>
                    </Text>
                }
                
              </FormControl>
            )}
          </Field>

          {isEditDiscription && <Text mt={2} mb={2} ml="10px" h="auto" lineHeight={7} flexWrap="wrap" fontSize="12px">
            <Highlight
              query={hashTags.sort((a, b) => b.length - a.length)}
              styles={{ px: '2', py: '0', rounded: 'full', bg: 'teal.100' }}
            >
              {hashTags?.join(" ")}
            </Highlight>
          </Text>}

          <Button
            mt={2}
            w="100%"
            colorScheme="gray"
            isLoading={props.isSubmitting}
            type='submit'
          >
            {options?.submitBtnName || "Save"}
          </Button>
        </Form>
      )}
    </Formik>
  )
}