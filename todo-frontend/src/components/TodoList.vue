<template>
  <div class="todo-container">
    <h1>Ma Liste de Tâches</h1>
    
    <!-- Formulaire d'ajout -->
    <form @submit.prevent="addTask" class="task-form">
      <div class="form-group">
        <input
          v-model="newTask.title"
          type="text"
          placeholder="Titre de la tâche"
          required
          class="form-input"
        />
      </div>
      <div class="form-group">
        <textarea
          v-model="newTask.description"
          placeholder="Description (optionnelle)"
          class="form-textarea"
        ></textarea>
      </div>
      <button type="submit" class="btn-primary">Ajouter la tâche</button>
    </form>

    <!-- Message d'erreur -->
    <div v-if="taskStore.error" class="error-message">
      {{ taskStore.error }}
    </div>

    <!-- Statistiques -->
    <div class="stats">
      <span>Total: {{ taskStore.totalTasks }}</span>
      <span>Terminées: {{ taskStore.completedTasks.length }}</span>
      <span>En cours: {{ taskStore.pendingTasks.length }}</span>
    </div>

    <!-- Loading -->
    <div v-if="taskStore.loading" class="loading">
      Chargement...
    </div>

    <!-- Liste des tâches -->
    <div v-else class="tasks-list">
      <div
        v-for="task in taskStore.tasks"
        :key="task.id"
        class="task-item"
        :class="{ completed: task.completed }"
      >
        <div class="task-content">
          <h3>{{ task.title }}</h3>
          <p v-if="task.description">{{ task.description }}</p>
          <small>{{ formatDate(task.created_at) }}</small>
        </div>
        
        <div class="task-actions">
          <button
            @click="toggleTask(task.id)"
            class="btn-toggle"
            :class="{ completed: task.completed }"
          >
            {{ task.completed ? '✓' : '○' }}
          </button>
          
          <button
            @click="deleteTask(task.id)"
            class="btn-delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>

    <!-- Message si pas de tâches -->
    <div v-if="!taskStore.loading && taskStore.tasks.length === 0" class="empty-state">
      Aucune tâche pour le moment. Ajoutez-en une !
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()

const newTask = ref({
  title: '',
  description: ''
})

const addTask = async () => {
  if (newTask.value.title.trim()) {
    await taskStore.addTask(newTask.value)
    newTask.value = { title: '', description: '' }
  }
}

const toggleTask = async (id) => {
  await taskStore.toggleTask(id)
}

const deleteTask = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
    await taskStore.deleteTask(id)
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  taskStore.fetchTasks()
})
</script>

<style scoped>
.todo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.task-form {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-textarea {
  height: 80px;
  resize: vertical;
}

.btn-primary {
  background: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary:hover {
  background: #0056b3;
}

.stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #e9ecef;
  border-radius: 4px;
}

.error-message {
  color: #dc3545;
  background: #f8d7da;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  transition: all 0.2s;
}

.task-item:hover {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.task-item.completed {
  opacity: 0.7;
  background: #f8f9fa;
}

.task-item.completed .task-content h3 {
  text-decoration: line-through;
}

.task-content h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.task-content p {
  margin: 0 0 0.5rem 0;
  color: #666;
}

.task-content small {
  color: #999;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-toggle {
  background: #28a745;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 1.2rem;
}

.btn-toggle.completed {
  background: #6c757d;
}

.btn-delete {
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
}

.btn-delete:hover {
  background: #c82333;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-style: italic;
}
</style>