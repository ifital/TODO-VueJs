<template>
  <div class="border p-4 mb-3 rounded">
    <div v-if="!editing">
      <h2 class="font-semibold">{{ task.title }}</h2>
      <p>{{ task.description }}</p>
      <button class="text-blue-600 mr-2" @click="editing = true">Modifier</button>
      <button class="text-red-600" @click="deleteTask">Supprimer</button>
    </div>

    <div v-else>
      <input v-model="editTitle" class="border p-1 w-full mb-1" />
      <textarea v-model="editDescription" class="border p-1 w-full mb-2"></textarea>
      <button class="bg-green-500 text-white px-2 py-1 mr-2" @click="updateTask">Enregistrer</button>
      <button class="bg-gray-300 px-2 py-1" @click="cancelEdit">Annuler</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps(['task'])
const emit = defineEmits(['updated', 'deleted'])

const editing = ref(false)
const editTitle = ref(props.task.title)
const editDescription = ref(props.task.description)

const updateTask = async () => {
  await axios.put(`http://127.0.0.1:8000/api/tasks/${props.task.id}`, {
    title: editTitle.value,
    description: editDescription.value,
  })
  emit('updated')
  editing.value = false
}

const deleteTask = async () => {
  if (confirm('Supprimer cette tâche ?')) {
    await axios.delete(`http://127.0.0.1:5000/api/tasks/${props.task.id}`)
    emit('deleted')
  }
}

const cancelEdit = () => {
  editing.value = false
  editTitle.value = props.task.title
  editDescription.value = props.task.description
}
</script>
