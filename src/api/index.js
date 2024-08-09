import axios from 'axios'

class Api {
  constructor() {
    this.baseUrl = 'http://localhost:8000/api/v1'
  }

  async renameFile(id, newName) {
    try {
      const response = await axios.put(`${this.baseUrl}/files/${id}`, {
        name: newName
      })

      return response.data
    } catch (error) {
      let errorMessage = 'Error renaming file'

      if (error.response) {
        errorMessage = `Server error: ${error.response.status} - ${error.response.data.message}`
      } else if (error.request) {
        errorMessage = 'No response received from server'
      } else {
        errorMessage = 'Error renaming file: ' + error.message
      }

      throw new Error(errorMessage)
    }
  }
}

export default new Api()
