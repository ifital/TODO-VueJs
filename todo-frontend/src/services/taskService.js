import api from './api'

export const taskService = {
  // Récupérer toutes les tâches
  async getAllTasks() {
    const response = await api.get('/tasks')
    return response.data
  },

  // Créer une nouvelle tâche
  async createTask(task) {
    const response = await api.post('/tasks', task)
    return response.data
  },

  // Mettre à jour une tâche
  async updateTask(id, task) {
    const response = await api.put(`/tasks/${id}`, task)
    return response.data
  },

  // Supprimer une tâche
  async deleteTask(id) {
    await api.delete(`/tasks/${id}`)
  }
}