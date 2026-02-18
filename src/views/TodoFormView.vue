<template>
  <div class="page">
    <h1>{{ isEdit ? '수정' : '등록' }}</h1>
      <form class="card" @submit.prevent="submitTodo">
         <div class="field-row">
          <div class="field flex-2">
            <input
              class="input"
              v-model="todoForm.author"
              placeholder="작성자"
            />
          </div>

          <div class="field flex-1">
            <input
              class="input"
              type="text"
              ref="datepicker"
              placeholder="날짜 선택"
              readonly
            />
          </div>
        </div>

        <div class="field"><input class="input" v-model="todoForm.title" placeholder="제목"/></div>
        <div class="field"><textarea class="textarea" v-model="todoForm.content" placeholder="내용"></textarea></div>
        <div class="btn-actions">
          <router-link to="/" class="btn btn-primary">목록</router-link>
          <button class="btn btn-primary" type="submit">
            {{ isEdit ? '수정' : '등록' }}
          </button>
        </div>
      </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeKo from 'air-datepicker/locale/ko'
import { useTodoStore } from '@/stores/todoStore'

// store
const todoStore = useTodoStore()

// 라우터 인스턴스
const route = useRoute() // 현재 경로 정보
const router = useRouter() // 이동 컨트롤러

// 상세정보 id
const id = computed(() => (route.params.id ? Number(route.params.id) : null))
const isEdit = computed(() => id.value !== null)

// 할일 입력 폼
const todoForm = reactive({
  author: "",
  title: "",
  content: "",
  selectedDate: "",
})

// ==== datepicker ==== //
const datepicker = ref (null)

onMounted(() => {
  console.log('등록/수정 페이지 isEdit = ', isEdit.value)
  new AirDatepicker(datepicker.value, {
    autoClose: true,
    dateFormat: "yyyy-MM-dd",
    locale: localeKo,
    timepicker: true,
    timeFormat: "hh:MM AA",
    onSelect: ({ formattedDate }) => {
      // console.log('선택한 날짜:', formattedDate);
      todoForm.selectedDate = formattedDate;
    },
  })

  // 수정 모드면 기존 데이터 렌더링
  if (isEdit.value) {
    const existing = todoStore.getTodoById(id.value)

    if (!existing) {
      alert('존재하지 않는 할 일입니다.')
      router.push('/')
      return
    }

    todoForm.author = existing.author
    todoForm.title = existing.title
    todoForm.content = existing.content
    todoForm.selectedDate = existing.createdAt

    // datepicker input에 데이터 렌더링
    datepicker.value.value = existing.createdAt
    }
})

function validateForm() {
  if (!todoForm.author.trim()) return alert('작성자를 입력하세요'), false
  if (!todoForm.title.trim()) return alert('제목을 입력하세요'), false
  if (!todoForm.content.trim()) return alert('내용을 입력하세요'), false
  if (!todoForm.selectedDate.trim()) return alert('날짜를 선택하세요'), false
  return true // 모두 통과
}

function submitTodo() {
  if (!validateForm()) return

  const payload = { 
    author: todoForm.author,
    title: todoForm.title,
    content: todoForm.content,
    createdAt: todoForm.selectedDate,
  }

  if (isEdit.value) { // 수정
    todoStore.updateTodoItem(id.value, payload)
    router.push(`/todo/${id.value}`)
  } else {
    todoStore.addTodoItem({ id: Date.now(), ...payload }) // 등록 
    router.push('/')
  }
}
</script>
<style></style>
