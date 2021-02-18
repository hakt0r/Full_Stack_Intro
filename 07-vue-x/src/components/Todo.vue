<template>
    <div class="input-group d-flex mt-2">
        <input v-if="edit" class="form-control flex-grow-1" type="text" v-model="update" placeholder="update me" />
        <span v-else class="flex-grow-1 input-group-text">{{todo}} </span>
        <div class="input-group-append">
            <button class="btn btn-danger" type="button" v-on:click="$emit('delete',{index})">Delete</button>
            <button class="btn btn-warning" type="button" v-on:click="editTodoList">Update</button>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        todo:  String,
        index: Number,
        list:  Array
    },

    beforeCreate    (){ console.log('beforeCreate',this.todo) },
    created         (){ console.log('created',this.todo) },
    beforeMount     (){ console.log('beforeMount',this.todo) },
    mounted         (){ console.log('mounted',this.todo) },
    beforeUpdate    (){ console.log('beforeUpdate',this.todo) },
    updated         (){ console.log('updated',this.todo) },
    beforeUnmount   (){ console.log('beforeUnmount',this.todo) },
    unmounted       (){ console.log('unmounted',this.todo) },
    errorCaptured   (){ console.log('errorCaptured',this.todo) },
    renderTracked   (){ console.log('renderTracked',this.todo) },
    renderTriggered (){ console.log('renderTriggered',this.todo) },

    data() {
        return {
            update: this.todo,
            edit:   false        
        }
    },

    methods: {

        editTodoList(){
            if( this.edit ){
                const { index, update } = this;
                this.$emit( 'update', { index, update } );
                this.edit = false;
            } else {
                this.edit = true;
            }
        }
    }
}
</script>


<style>

</style>