<template>
<div class="container col-6">
    <div class="input-group d-flex">
        <input
            class="form-control flex-grow-1"
            type="text"
            placeholder="write todo here"
            v-model="text"
        />
        <div class="input-group-append">
            <input
                class="btn btn-primary btn-sm"
                type="button"
                value="Add"
                v-on:click="addTodo"
            />
        </div>
    </div>
        
    <Todo
        v-for="(item, index) in todoList"
        v-bind:todo="item"
        v-bind:key="index"
        v-bind:index="index"
        v-bind:list="todoList"
        @update="updateTodo( $event.index, $event.update )"
        @delete="deleteTodo( $event.index )"
    />
</div>
</template>


<script>
import Todo from "./Todo"

export default {
    name: 'TodoList',
    components: {
        Todo
    },

    data: () => ({
        text: '',
        todoList: JSON.parse(localStorage.getItem("TodoList") || "[]")
    }),

    methods: {
        debug(args){
            console.log(args)
        },

        addTodo() {
            if (this.text) {
                this.todoList.push(this.text);
                this.text='';
                localStorage.setItem("TodoList", JSON.stringify(this.todoList));
            }
        },

        deleteTodo(index){
            this.todoList.splice(index,1);
            localStorage.setItem("TodoList", JSON.stringify(this.todoList));
        },

        updateTodo(index,update){
            this.todoList.splice(index,1,update);
            localStorage.setItem("TodoList", JSON.stringify(this.todoList));
        }
    }
}
</script>


<style>

</style>