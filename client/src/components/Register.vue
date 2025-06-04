<!-- Register.vue -->
<template>
    <div class="background">
    <div class="wrapper">
        <!--  header  -->
        <div class="header">
            <h1>Snippet App</h1>
        </div>

        <!--  register  -->
        <div>
            <form class="form">
                <input v-model="user.username" type="text" placeholder="Username" required />
                <input v-model="user.password" type="password" placeholder="Password" required />
                <input v-model="user.years_experience" type="text" placeholder="Years of Experience" />
                <input v-model="user.programming_languages" type="text" placeholder="Programming Languages (comma separated)" />
                <p class="error">{{ error }}</p>
                <button @click="register" type="button">Register</button>
                <p class="login">Already Registered?</p>
                <RouterLink class="login-link" to="/login">Login</RouterLink>
            </form>

        </div>
    </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
                years_experience: '',
                programming_languages: ''
            },
            error: null
        };
    },
    methods: {
        async register() {
            try {
                const user = this.user;
                user.programming_languages = this.user.programming_languages.split(',');

                const response = await axios.post(
                    'https://snippetappvue.onrender.com/users/register',
                    user
                );
               

                // redirect after successful registrations
                this.$router.push('/login');
            } catch (error) {
                // client is setting it's own error message and not reading from server
                this.error = 'username already exists';
                console.log(error);
            }
        }
    }
};
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.background {
  background-image: url('https://media.istockphoto.com/id/956291438/photo/textured-wood-wall.jpg?s=612x612&w=0&k=20&c=LDmRtz43mJGHC2-BHJUi-6I0kAcLHuPyiAfPrt3PV2Y=');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px 30px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  animation: fadeInUp 0.8s ease;
  color: #fff;
}

.header {
  text-align: center;
  margin-bottom: 25px;
}

.header h1 {
  font-size: 28px;
  font-weight: bold;
  color: #f8f8ff;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

input {
  padding: 12px;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: rgba(255, 255, 255, 0.8);
  color: #333;
  transition: 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #27b8c7;
  box-shadow: 0 0 6px rgba(39, 184, 199, 0.5);
}

button {
  padding: 12px;
  background: linear-gradient(to right, #667eea, #764ba2);
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.03);
  background: linear-gradient(to right, #5f5ae6, #8b5bb1);
}

.error {
  text-align: center;
  color: #ff8080;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
}

.login {
  text-align: center;
  color: #eee;
  margin-top: 10px;
}

.login-link {
  color: #ffd369;
  text-align: center;
  display: block;
  margin-top: 5px;
  text-decoration: underline;
  font-weight: bold;
  transition: color 0.2s ease;
}

.login-link:hover {
  color: #fff;
}

</style>
