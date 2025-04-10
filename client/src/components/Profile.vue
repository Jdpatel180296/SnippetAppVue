<template>
    <div class="background">
    <div class="wrapper">
        <div class="profile">
            <!--  profile pic  -->
            <div class="left-column">
                <img v-bind:src="pic" class="profile-pic" alt="profile pic" />
            </div>

            <!--  profile details  -->
            <div class="right-column">
                <p>
                    <i class="far fa-user"></i>
                    {{ user.username }} 
                </p>
                 <p>
                    <i class="fas fa-graduation-cap"></i>
                    years of experience : {{ user.years_experience }}
                </p>
            </div>
        </div>
        <!--  Programming Languages -->
        <div class="loop Programming_Languages">
            <h3>Programming languages</h3>
            <ul>
                <li v-for="programming_language in user.programming_languages">
                    {{ programming_language }}
                </li>
            </ul>
        </div>

        <!--  Snippets -->
        <div class="loop Snippets">
            <h3>Snippets</h3>
            <ul>
                <li v-for="snippet in user.snippets">
                    {{ new Date(snippet.created).getFullYear() }} {{ snippet.title }}
                </li>
            </ul>
            <button @click="addSnippet">+ Add Snippet</button>
        </div>

        <!--  Bookmarks -->
        <div class="loop Bookmarks">
            <h3>Bookmarks</h3>
            <ul>
                <li v-for="bookmark in user.bookmarks">
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
            pic: ''
        };
    },
    async created() {
        const { id } = this.$route.params;

        try {
            const response = await axios.get(
                `https://snippetappvue.onrender.com/users/${id}?bookmarks=true&&snippets=true`
            );

            this.user = response.data;
            this.pic = `https://api.dicebear.com/7.x/initials/svg?seed=${this.user.username}+${this.user.username}&backgroundColor=27b8c7`;
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        async addSnippet() {
            const token = localStorage.getItem('authtoken');
            console.log(token);
        }
    }
};
</script>

<style scoped>
.profile {
    display: flex;
    margin: 0 auto;
    padding: 20px;
}

.profile p {
    color: #f8f8ff;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.profile i {
    color: #27b8c7;
    margin-right: 10px;
}

.profile-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
}

.left-column {
    flex: 1;
    display: flex;
    justify-content: center;
}

.right-column {
    flex: 1;
    display: flex;
    justify-content: left;
    flex-direction: column;
    text-transform: capitalize;
}

.Programming_Languages {
    color: #f8f8ff;
    background-color: #565263;
    text-align: left;
    padding: 15px;
    width: 100%;
}

.loop ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.loop ul li {
    color: #f8f8ff;
    border: 1px solid #d7a8c3;
    border-radius: 20%;
    display: inline-block;
    font-size: 12px;
    margin: 0 7px 7px 0;
    padding: 7px;
    text-transform: uppercase;
}

.Snippets {
    color: #f8f8ff;
    background-color: #73677c;
    text-align: left;
    padding: 15px;
    width: 100%;
}
.Bookmarks {
    color: #f8f8ff;
    background-color: #73677c;
    text-align: left;
    padding: 15px;
    width: 100%;
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
