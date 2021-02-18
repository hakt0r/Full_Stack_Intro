<template>
    <div class="container col-6">
        <AddTodo/>
        <Todo
            v-for="(item, index) in $store.state.todoList"
            v-bind:todo="item"
            v-bind:key="index"
            v-bind:index="index"
            @update="$store.commit( 'updateTodo', $event )"
            @delete="$store.commit( 'deleteTodo', $event.index )"
        />
    </div>
</template>

<script>
import Todo from "./Todo"
import AddTodo from "./AddTodo"

export default {
    name: 'TodoList',
    components: {
        Todo,
        AddTodo
    }
}
</script>