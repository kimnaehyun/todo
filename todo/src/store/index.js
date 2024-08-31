import { createStore } from 'vuex'

import { all, remove } from '@/utills'
const localStorage = await all();
const sessionData = JSON.parse(sessionStorage.getItem('todo'))
export default createStore({
  state: {
    todos: sessionData || localStorage

  },
  mutations: {
    SET_TODO(state, payload) {
      state.todos = [...state.todos, payload];
      sessionStorage.setItem('todo', JSON.stringify(state.todos));
    },
    DELETE_TODO(state, payload) {
      const index = state.todos.findIndex(todo => todo.id === payload)
      state.todos.splice(index, 1)
      sessionStorage.setItem("todo", JSON.stringify(state.todos))
      remove(payload)
    },
    CHANGE_TODO(state, payload) {
      const id = payload.id;
      const index = state.todos.findIndex(todo => todo.id === id);
      state.todos[index] = payload
      sessionStorage.setItem("todo", JSON.stringify(state.todos))
    }
  },
  actions: {
    ADD_TODO({ commit }, payload) {
      commit('SET_TODO', payload)
    }, REMOVE_TODO({ commit }, payload) {
      commit('DELETE_TODO', payload)
    },
  },
  getters: {
    todos: state => state.todos,
  },

})