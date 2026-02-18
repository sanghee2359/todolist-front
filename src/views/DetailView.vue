<template>
    <div class="page">
        <h1>상세 화면</h1>
        
        <div class="card" v-if="todoDetail">
            <div class="field-row">
                <div class="field flex-2">
                    <div class="value">{{ todoDetail.author }}</div>
                </div>

                <div class="field flex-1">
                    <div class="value">{{ todoDetail.createdAt }}</div>
                </div>
            </div>

            <span class="value title">{{ todoDetail.title }}</span>


            <div class="value content">{{ todoDetail.content }} </div>
            <div class="btn-actions">
                <router-link to="/" class="btn btn-primary" type="button">목록</router-link>
                <router-link :to="`/todo/${todoDetail.id}/edit`" class="btn btn-primary" type="button">수정</router-link>
            </div>
        </div>
    </div>
    
</template>
<script setup>

import { computed, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import { useTodoStore } from '@/stores/todoStore'

// store
const todoStore = useTodoStore()

const router = useRoute()

const id = computed(()=>Number(router.params.id))

const todoDetail = computed(()=> todoStore.getTodoById(id.value))

onMounted(()=> {
    console.log(todoDetail.value.createdAt)
    console.log(todoDetail.value.title,'의 상세페이지')
})
</script>

<style></style>