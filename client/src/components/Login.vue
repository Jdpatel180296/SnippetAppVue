<template>
    <div class="background">

        <div class="wrapper">
       <!--  header  -->
         <div class="header">
              <h1>Snippet App</h1>
        </div>

       
       
       <!-- login -->
        <div>
        <form class="form">
  <input v-model="user.username" type="text" placeholder="Username" />
  <input v-model="user.password" type="password" placeholder="Password" />
  <p class="error">{{ error }}</p>
  <button type="button" @click="login">Login</button>
  <p class="register">Not Registered?</p>
  <RouterLink class="register-link" to="/register">Register Here</RouterLink>
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
                password: ''
            },
            error:null
        };
    },
    methods: {
        async login() {
            const user = this.user

            try {
                const response = await axios.post('https://snippetappvue.onrender.com/users/login', user);
                console.log(response.data)
                
                const token = response.headers.authorization;
                console.log(token);

                const userID = response.data._id;
                console.log(userID);

            
                //storage of authorization token
                 localStorage.setItem('authtoken', token);
                 localStorage.setItem('userID',userID);   

                 this.$router.push(`/profile/${response.data._id}`)

            }catch(error){
              this.error = error.response.data.message
              console.log("This is error")
              console.log(error)
            }
        }
    },
   
}
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
  background-image: url('https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 40px 30px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 1s ease;
  color: #fff;
}

.header {
  text-align: center;
  margin-bottom: 30px;
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
  font-size: 16px;
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
  transition: background 0.3s ease, transform 0.2s ease;
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

.register {
  text-align: center;
  color: #eee;
  margin-top: 10px;
}

.register-link {
  color: #ffd369;
  text-align: center;
  display: block;
  margin-top: 5px;
  text-decoration: underline;
  font-weight: bold;
  transition: color 0.2s ease;
}

.register-link:hover {
  color: #fff;
}

</style>
 