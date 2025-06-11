<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Gestion des tâches</h1>
    <TaskForm @task-added="fetchTasks" />
    <TaskList :tasks="tasks" @refresh="fetchTasks" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { taskService } from './services/taskService'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

const tasks = ref([])

const fetchTasks = async () => {
  try {
    tasks.value = await taskService.getAllTasks()
  } catch (error) {
    console.error('Erreur de récupération des tâches :', error)
  }
}

onMounted(fetchTasks)
</script>
