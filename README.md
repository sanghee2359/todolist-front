# Vue 3 Todo List Project

이 프로젝트는 Vue 3 Composition API와 Pinia를 사용하여 구현된 Todo List 애플리케이션입니다.  
사용자는 할 일을 조회, 등록, 수정, 삭제할 수 있으며, 데이터는 `localStorage`에 저장되어 브라우저를 새로고침해도 유지됩니다.

## ✨ 주요 기능

- **Todo 목록 조회**: 등록된 할 일 목록을 확인할 수 있습니다.
- **제목 검색**: 키워드를 입력하여 할 일의 제목을 검색할 수 있습니다.
- **할 일 등록**: 새로운 할 일을 추가할 수 있습니다.
- **할 일 수정**: 기존 할 일의 내용을 수정할 수 있습니다.
- **할 일 삭제**: 완료되거나 불필요한 할 일을 삭제할 수 있습니다.
- **데이터 영구 저장**: `localStorage`를 활용하여 데이터를 영구적으로 보관합니다.

## 🛠 기술 스택

- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **State Management**: Pinia
- **Router**: Vue Router
- **Persistence**: LocalStorage

## 📂 프로젝트 구조

```
src/
├── assets/
│   └── styles/
│       └── components.css  # 공통 UI 컴포넌트 스타일 (버튼, 카드 등)
├── components/
│   └── TodoList.vue        # 할 일 목록을 표시하는 컴포넌트
├── stores/
│   └── todoStore.js        # Pinia Store (Todo 상태 및 비즈니스 로직 관리, localStorage 연동)
├── views/
│   ├── HomeView.vue        # 메인 페이지 (검색 및 목록 조회)
│   ├── DetailView.vue      # 상세 조회 페이지
│   └── TodoFormView.vue    # 할 일 등록 및 수정 페이지
├── App.vue                 # 최상위 컴포넌트
└── main.js                 # 앱 진입점
```

## 🚀 설치 및 실행 방법

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```

3. **빌드**
   ```bash
   npm run build
   ```

## 📝 구현 상세

### 상태 관리 (Pinia)
- `todoStore.js`에서 `defineStore`를 사용하여 전역 상태를 관리합니다.
- `todolist` 키 기반으로 `localStorage`와 데이터를 동기화합니다 (`watch` 활용).
- 주요 액션: `addTodoItem`, `getTodoById`, `updateTodoItem`, `deleteTodoItem`.

### 스타일 (Styling)
- `assets/styles/components.css`에 버튼, 입력 폼 등 공통 UI 컴포넌트의 스타일을 분리하여 관리합니다.
- View 컴포넌트에서는 레이아웃 및 해당 페이지 고유의 스타일만 작성하여 유지보수성을 높였습니다.

### 컴포지션 API (Composition API)
- `<script setup>` 문법을 사용하여 간결하고 직관적인 코드를 작성했습니다.
- `ref`, `computed`, `watch`, `onMounted` 등의 Vue 3 반응형 API를 적극 활용했습니다.
