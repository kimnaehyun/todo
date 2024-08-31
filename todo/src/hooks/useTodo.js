import store from '../store'
import { ref, computed } from 'vue'
import { checkData, add, updateData } from '@/utills'
export default function useTodos() {
  const newTitle = ref('')
  const newContent = ref('')
  const updateTitle = ref('')
  const updateContent = ref('')
  const isModal = ref(false);
  const selectedTodo = ref(null);

  const status = ref('all');


  const modal = (todo) => {
    selectedTodo.value = todo;
    isModal.value = !isModal.value;
  };

  const todos = computed(() => store.getters['todos'])

  const checkTodo = (i) => {
    const todo = todos.value.find(t => t.id === i);
    const id = todo.id;
    let todoDone = todo.done;
    if (todoDone == 0) {
      todoDone = 1
    } else {
      todoDone = 0
    }
    const value = {
      ...todo,
      done: todoDone
    }
    store.commit('CHANGE_TODO', value)
    checkData(id, todoDone)
  }

  const addTodo = () => {
    const titleValue = newTitle.value && newTitle.value.trim()
    const contetValue = newContent.value
    if (!titleValue) {
      alert("제목을 적어주십시오.")
      return
    }
    for (let i = 0; i < store.state.todos.length; i++) {
      if (titleValue === store.state.todos[i].title) {
        alert("같은 제목을 사용하실 수 없습니디.")
        return
      }
    }

    const id = (todos.value.length && todos.value[todos.value.length - 1].id + 1) || 1
    const payload = {
      id: id,
      title: titleValue,
      content: contetValue,
      done: 0
    }
    store.dispatch('ADD_TODO', payload)
    add(titleValue, contetValue)
    newTitle.value = ''
    newContent.value = ''
  }

  const updateTodo = (i) => {
    const updateTitleValue = updateTitle.value && updateTitle.value.trim();
    const updateContentValue = updateContent.value;

    const todo = todos.value.find(t => t.id === i);
    const id = todo.id;

    if (!updateTitleValue) {
      alert("제목을 적어주십시오.");
      return;
    }
    for (let i = 0; i < store.state.todos.length; i++) {
      if (updateTitleValue === store.state.todos[i].title) {
        alert("같은 제목을 사용하실 수 없습니디.")
        return
      }
    }
    const value = {
      ...todo,
      title: updateTitleValue,
      content: updateContentValue
    };
    store.commit('CHANGE_TODO', value);
    updateData(id, updateTitleValue, updateContentValue)
    updateTitle.value = '';
    updateContent.value = '';
  }

  const removeTodo = (id) => {
    store.dispatch('REMOVE_TODO', id)
  }
  return {
    updateTitle,
    updateContent,
    addTodo,
    newTitle,
    newContent,
    removeTodo,
    todos,
    updateTodo,
    checkTodo,
    isModal,
    selectedTodo,
    modal,
    status
  }
}