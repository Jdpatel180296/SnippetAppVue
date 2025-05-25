<template>
  <div class="background">
    <div class="wrapper">
      <!-- Profile -->
      <div class="profile">
        <div class="left-column">
          <img :src="pic" class="profile-pic" alt="profile pic" />
        </div>
        <div class="right-column">
          <p><i class="far fa-user"></i> {{ user.username }}</p>
          <p><i class="fas fa-graduation-cap"></i> years of experience: {{ user.years_experience }}</p>
        </div>
      </div>

      <!-- Languages -->
      <div class="loop Programming_Languages">
        <h3>Programming languages</h3>
        <ul>
          <li v-for="lang in user.programming_languages" :key="lang">{{ lang }}</li>
        </ul>
      </div>

      <!-- Snippets -->
      <div class="loop Snippets">
        <h3>Snippets</h3>
        <div class="snippet-list">
          <div class="snippet-card" v-for="(snippet, index) in displayedSnippets" :key="snippet._id">
            <div class="snippet-header">
              <span class="snippet-date">📅 {{ new Date(snippet.created).toLocaleDateString() }}</span>
              <h4 class="snippet-title">{{ snippet.title }}</h4>
            </div>
            <pre
              class="snippet-code"
              :class="'language-' + snippet.programming_language.toLowerCase()"
            >
        <code :class="'language-' + snippet.programming_language.toLowerCase()">
        {{ snippet.code_snippet }}
        </code>
            </pre>
            <button @click="copyToClipboard(snippet.code_snippet)">📋 Copy Code</button>
          </div>
          <button v-if="user.snippets.length > 3" @click="toggleSnippetView">
            {{ showAllSnippets ? '▲ Show Less' : '▼ Show All' }}
          </button>
        </div>
        <button @click="addSnippet">+ Add Snippet</button>
      </div>

      <!-- Bookmarks -->
      <div class="loop Bookmarks">
        <h3>Bookmarks</h3>
        <ul>
          <li v-for="bookmark in user.bookmarks" :key="bookmark._id">
            {{ bookmark._id }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {},
      pic: '',
      showAllSnippets: false,
    };
  },
  computed: {
    displayedSnippets() {
      return this.showAllSnippets
        ? this.user.snippets
        : this.user.snippets?.slice(0, 3);
    },
  },
  async created() {
    const { id } = this.$route.params;
    try {
      const response = await axios.get(
        `https://snippetappvue.onrender.com/users/${id}?bookmarks=true&&snippets=true`
      );
      this.user = response.data;
      this.pic = `https://api.dicebear.com/7.x/initials/svg?seed=${this.user.username}+${this.user.username}&backgroundColor=27b8c7`;
      this.highlightSnippets();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    addSnippet() {
      const token = localStorage.getItem('authtoken');
      if (!token) {
        alert("Please login to add a snippet.");
        return;
      }
      this.$router.push(`/addSnippet`);
    },
    copyToClipboard(code) {
      navigator.clipboard.writeText(code).then(() => {
        alert("Code copied to clipboard!");
      });
    },
    toggleSnippetView() {
      this.showAllSnippets = !this.showAllSnippets;
    },
    highlightSnippets() {
      this.$nextTick(() => {
        if (window.Prism) {
          window.Prism.highlightAll();
        }
      });
    },
  },
};
</script>
<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.background {
  background-image: url('https://media.istockphoto.com/id/956291438/photo/textured-wood-wall.jpg?s=612x612&w=0&k=20&c=LDmRtz43mJGHC2-BHJUi-6I0kAcLHuPyiAfPrt3PV2Y=');
  background-size: cover;
  background-position: center;
  margin-top: 0;
  height: 100%;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 0;
}

.wrapper {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  width: 90%;
  max-width: 800px;
  animation: fadeInUp 1s ease-out;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.profile {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
  animation: fadeInUp 0.8s ease-out;
}

.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #27b8c7;
}

.right-column {
  text-transform: capitalize;
  color: #f8f8ff;
}

.right-column p {
  margin: 5px 0;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.right-column i {
  margin-right: 8px;
  color: #27b8c7;
}

/* Reusable section container */
.loop {
  margin-top: 20px;
  padding: 20px;
  border-radius: 12px;
  animation: fadeInUp 0.8s ease-out;
  transition: transform 0.3s ease;
}

.loop:hover {
  transform: translateY(-4px);
}

.Programming_Languages,
.Snippets,
.Bookmarks {
  background-color: rgba(86, 82, 99, 0.85);
  color: #fff;
}

.loop h3 {
  margin-bottom: 15px;
  color: #ffd369;
}

.loop ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0;
  margin: 0;
}

.loop ul li {
  background-color: #27b8c7;
  color: #fff;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.loop ul li:hover {
  background-color: #20a6b2;
}

button {
  margin-top: 10px;
  padding: 10px 18px;
  background: linear-gradient(to right, #667eea, #764ba2);
  color: white;
  font-weight: bold;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 14px rgba(118, 75, 162, 0.4);
}

.snippet-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.snippet-card {
  background-color: rgba(255, 255, 255, 0.08);
  border-left: 4px solid #27b8c7;
  padding: 16px;
  border-radius: 12px;
  color: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.snippet-card:hover {
  transform: translateY(-4px);
}

.snippet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.snippet-title {
  font-size: 18px;
  font-weight: bold;
  color: #ffd369;
}

.snippet-date {
  font-size: 14px;
  color: #ccc;
}

.snippet-code {
  background-color: #2e2e3a;
  padding: 12px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #e5e5e5;
  margin-bottom: 10px;
}

.snippet-code code {
  white-space: pre-wrap;
}

.snippet-card button {
  padding: 8px 12px;
  background-color: #27b8c7;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.snippet-card button:hover {
  background-color: #2097a3;
}

</style>