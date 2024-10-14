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
            <div class="column">
            <input
               
                v-model = "user.username"
                type="text"
                placeholder="Username"/>
            <input
                
                v-model = "user.password"
                type="text"
                placeholder="Password"/>

            <p class="error"> {{ error }} </p>
            <button type="button" @click="login">Login</button>
            <p class="register">Not Registered?</p>
            <RouterLink class="register-link" to="/register"> Register Here</RouterLink>
            </div>
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
                const response = await axios.post('http://localhost:8080/users/login', user);
                console.log(response.data)
                
                const token = response.headers.authorization;
                console.log(token);

                //storage of authorization token
                 localStorage.setItem('authtoken', token);

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
.header {
    text-align: center;
    color: #f8f8ff;
    padding-bottom: 20px;
}

h1.header {
    font-size: 18px;
}

.form {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.form.column {
    flex: 1;
    padding: 0 10px;
    
}


input {
    font-family: 'Saira Extra Condensed', sans-serif;
    color: #333;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
}

button {
    width: 100%;
    cursor: pointer;
}

.register {
    display: flex;
    justify-content: center;
    color: #f8f8ff;
}

.register-link {
    display: flex;
    justify-content: center;
    color: #b492ad;
    text-decoration: underline;
}

.error {
    display: flex;
    justify-content: center;
    color: #eb8b7a;
    text-transform: uppercase;
}
.background{
    background-image: url('https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 100vh;
    width: 100vw;
}
</style>
