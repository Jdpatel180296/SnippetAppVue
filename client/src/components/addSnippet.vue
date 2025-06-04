<template>
  <div class="container">
    <h2 class="title">🚀 Add a Snippet</h2>
    <form @submit.prevent="handleSubmit" class="animated-form">
      <div class="form-group">
        <label>Title</label>
        <input v-model="snippet.title" type="text" required class="input" />
      </div>

      <div class="form-group">
        <label>Language</label>
        <input v-model="snippet.programming_language" type="text" required class="input" />
      </div>

      <div class="form-group">
        <label>Snippet</label>
        <textarea v-model="snippet.code_snippet" rows="6" required class="textarea"></textarea>
      </div>

      <button type="submit" class="submit-button">✨ Add Snippet</button>
    </form>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'AddSnippet',
  data() {
    return {
      snippet: {
        title: '',
        code_snippet: '',
        programming_language: '',
        user_id:localStorage.getItem("userID"),
      },
    };
  },
  methods: {
    async handleSubmit() {

        const snippet = this.snippet;
        const token = localStorage.getItem('authtoken');

        console.log(token);
        console.log(this.snippet);
        console.log(localStorage.getItem("userID"))

        try {
            const response = await axios.post('https://snippetappvue.onrender.com/snippets', snippet,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
            
            
            alert('🎉 Snippet added successfully!');
            this.snippet.title = '';
            this.snippet.programming_language = '';
            this.snippet.code_snippet = '';

            this.$router.push(`/profile/${response.data.user_id}`)
            
        } catch (error) {
            this.error = error.response.data.message
              console.log("Error in adding snippet")
              console.log(error)
        }


    },
  },
};
</script>

<style scoped>
/* Animation keyframes */
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.container {
  max-width: 600px;
  margin: 60px auto;
  padding: 30px;
  background: linear-gradient(135deg, #ffffff, #f0f4ff);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  animation: fadeSlideUp 0.8s ease-out;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #4b4b8f;
  text-align: center;
  margin-bottom: 25px;
}

.animated-form {
  animation: fadeSlideUp 0.8s ease-out;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: 600;
  color: #3d3d66;
  margin-bottom: 8px;
}

.input,
.textarea {
  width: 100%;
  padding: 12px 14px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 10px;
  transition: all 0.3s ease;
  background-color: #fdfdfd;
}

.input:focus,
.textarea:focus {
  border-color: #6a67ce;
  box-shadow: 0 0 6px rgba(106, 103, 206, 0.4);
  outline: none;
}

.textarea {
  resize: vertical;
}

.submit-button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(to right, #667eea, #764ba2);
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.submit-button:hover {
  transform: scale(1.04);
  box-shadow: 0 6px 16px rgba(118, 75, 162, 0.4);
}
</style>
