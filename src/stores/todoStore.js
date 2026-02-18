import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'todolist'


function loadTodos() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

export const useTodoStore = defineStore('todolist', () => {
  // state
  const todolist = ref(loadTodos())

  // persistence
  // 데이터 변화 관리
  watch(
    todolist,
    (newVal) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
    },
    { deep: true }
  )

  //==== actions ====//

  // create
  function addTodoItem(todo) {
    todolist.value.unshift(todo)
  }
  // read
  function getTodoById(id) {
    return todolist.value.find((todo) => todo.id === id)
  }
  // update
  function updateTodoItem(id, payload) {
    const idx = todolist.value.findIndex((t) => t.id === id)
    if (idx === -1) return false
    todolist.value[idx] = { ...todolist.value[idx], ...payload }
    return true
  }
  // delete
  function deleteTodoItem(id) {
    todolist.value = todolist.value.filter((t) => t.id !== id)
  }

  return {
    todolist,
    addTodoItem,
    getTodoById,
    updateTodoItem,
    deleteTodoItem,
  }
})
