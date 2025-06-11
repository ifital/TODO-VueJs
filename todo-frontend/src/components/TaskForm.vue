<template>
  <form @submit.prevent="submit" class="mb-6 space-y-2">
    <input v-model="title" type="text" placeholder="Titre" class="border p-2 w-full" required />
    <textarea v-model="description" placeholder="Description" class="border p-2 w-full"></textarea>
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { taskService } from '../services/taskService'

const emit = defineEmits(['task-added'])

const title = ref('')
const description = ref('')

const submitTask = async () => {
  await taskService.createTask({
    title: title.value,
    description: description.value
  })
  emit('task-added')
}
</script>
