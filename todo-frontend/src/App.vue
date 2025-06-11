<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Gestion des tâches</h1>
    <TaskForm @task-added="fetchTasks" />
    <TaskList :tasks="tasks" @refresh="fetchTasks" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

const tasks = ref([])

const fetchTasks = async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/tasks')
    // Vérifie si les tâches sont dans res.data.data
    tasks.value = Array.isArray(res.data) ? res.data : res.data.data
    console.log('Tâches récupérées :', tasks.value)
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches :', error)
  }
}

onMounted(fetchTasks)
</script>
