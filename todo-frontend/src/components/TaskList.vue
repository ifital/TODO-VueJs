<template>
  <div v-if="tasks.length === 0">Aucune tâche</div>
  <div v-else>
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @updated="emit('refresh')"
      @deleted="emit('refresh')"
    />
  </div>
</template>

<script setup>
import TaskItem from './TaskItem.vue'

const props = defineProps(['tasks'])
const emit = defineEmits(['refresh'])

console.log('Tâches reçues dans TaskList :', props.tasks)
</script>
