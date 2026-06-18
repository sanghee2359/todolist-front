<template>
    <div class="page">
        <h1>To do List</h1>

        <div class="search-card">
            <input class="search-input" type="text" v-model="searchValue" placeholder="검색" 
            @keyup.enter="findTodo"> <!--Enter활성화-->
            <div class="btn-actions">
                <button class="btn btn-primary" @click="findTodo">조회</button>
                <button class="btn btn-ghost" @click="resetSearch">초기화</button>
            </div>
        </div>
        <!-- 할일 목록 10개 이상 스크롤 -->
        <div :class="['todo-wrap', { scroll: todolist.length > 10 }]">
            <TodoList :todolist="todolist" :search="appliedSearch" @delete-todo="deleteTodo"/>
        </div>
        <div>
            <router-link to="/create"><button class="btn btn-primary" type="button">등록</button></router-link>
        </div>
    </div>
</template>
<script setup>
import TodoList from '@/components/TodoList.vue';
import { ref, onMounted, computed } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()
const todolist = computed(() => todoStore.todolist)

const searchValue = ref(''); // 입력 데이터
const appliedSearch = ref('') // 적용할 검색 데이터


// 검색
const findTodo = () => {
  appliedSearch.value = searchValue.value
  console.log('조회 이벤트 실행, keyword:', searchValue.value)
}

// 검색 초기화 
const resetSearch = () => {
  searchValue.value = ''
  appliedSearch.value = ''
}

// 할일 목록에서 삭제 
const deleteTodo = (id) => todoStore.deleteTodoItem(id)

</script>
