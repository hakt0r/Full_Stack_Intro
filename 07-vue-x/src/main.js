import { createApp } from 'vue';
import { createStore } from 'vuex';

import App from './App.vue';

const todoList = JSON.parse(localStorage.getItem("TodoList") || "[]");

const store = createStore({
  state () { return { todoList } },
  mutations: {
    addTodo(state,text) {
      state.todoList.push( text );
      localStorage.setItem("TodoList", JSON.stringify(state.todoList));
    },

    deleteTodo(state,index){
      state.todoList.splice( index, 1 );
      localStorage.setItem("TodoList", JSON.stringify(state.todoList));
    },

    updateTodo(state,{index,update}){
      state.todoList.splice( index, 1, update );
      localStorage.setItem("TodoList", JSON.stringify(state.todoList));
    }
  }
});

const app = createApp(App);
      app.use(store);
      app.mount('#app');
