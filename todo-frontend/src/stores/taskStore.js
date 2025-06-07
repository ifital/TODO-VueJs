import { defineStore } from 'pinia'
import { taskService } from '@/services/taskService'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null
  }),

  getters: {
    completedTasks: (state) => state.tasks.filter(task => task.completed),
    pendingTasks: (state) => state.tasks.filter(task => !task.completed),
    totalTasks: (state) => state.tasks.length
  },

  actions: {
    async fetchTasks() {
      this.loading = true
      this.error = null
      try {
        this.tasks = await taskService.getAllTasks()
      } catch (error) {
        this.error = 'Erreur lors du chargement des tâches'
        console.error('Error fetching tasks:', error)
      } finally {
        this.loading = false
      }
    },

    async addTask(taskData) {
      try {
        const newTask = await taskService.createTask(taskData)
        this.tasks.unshift(newTask)
      } catch (error) {
        this.error = 'Erreur lors de la création de la tâche'
        console.error('Error creating task:', error)
      }
    },

    async updateTask(id, taskData) {
      try {
        const updatedTask = await taskService.updateTask(id, taskData)
        const index = this.tasks.findIndex(task => task.id === id)
        if (index !== -1) {
          this.tasks[index] = updatedTask
        }
      } catch (error) {
        this.error = 'Erreur lors de la mise à jour de la tâche'
        console.error('Error updating task:', error)
      }
    },

    async deleteTask(id) {
      try {
        await taskService.deleteTask(id)
        this.tasks = this.tasks.filter(task => task.id !== id)
      } catch (error) {
        this.error = 'Erreur lors de la suppression de la tâche'
        console.error('Error deleting task:', error)
      }
    },

    async toggleTask(id) {
      const task = this.tasks.find(task => task.id === id)
      if (task) {
        await this.updateTask(id, { ...task, completed: !task.completed })
      }
    }
  }
})