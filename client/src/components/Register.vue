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
                <div class="column">
                    <input
                        v-model="user.username"
                        type="text"
                        placeholder="Username"
                        required="true"
                    />
                    <input
                        v-model="user.password"
                        type="password"
                        placeholder="Password"
                        required="true"
                    />
                   
                    <input
                        v-model="user.years_experience"
                        type="text"
                        placeholder="Years of Experience"
                        default="0"
                    />
                    <input
                        v-model="user.programming_languages"
                        type="text"
                        placeholder="Programming Languages (comma separated)"
                    />
                   
                    <p class="error">{{ error }}</p>
                    <button @click="register" type="button">Register</button>
                    <p class="login">Already Registered?</p>
                    <RouterLink class="login-link" to="/login">
                        Login
                    </RouterLink>
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
                console.log(response.data);

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

.form .column {
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

.login {
    display: flex;
    justify-content: center;
    color: #f8f8ff;
}

.login-link {
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
    background-image: url('https://media.istockphoto.com/id/956291438/photo/textured-wood-wall.jpg?s=612x612&w=0&k=20&c=LDmRtz43mJGHC2-BHJUi-6I0kAcLHuPyiAfPrt3PV2Y=');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    margin-top: 0%;
    height: 100vh;
    width: 100vw;
}
</style>
