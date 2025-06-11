<template>
  <form @submit.prevent="submit" class="mb-6 space-y-2">
    <input v-model="title" type="text" placeholder="Titre" class="border p-2 w-full" required />
    <textarea v-model="description" placeholder="Description" class="border p-2 w-full"></textarea>
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['task-added'])

const title = ref('')
const description = ref('')

const submit = async () => {
  await axios.post('http://127.0.0.1:8000/api/tasks', {
    title: title.value,
    description: description.value,
  })

  title.value = ''
  description.value = ''
  emit('task-added')
}
</script>
