<template>
    <div class="index">
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow p-4 mb-5 bg-white navbaredit" id="navbarTop">
            <div class="container-fluid">
                <div class="col-sm-2">
                    <a @click="kembaliDashboard" style="text-decoration: none; display: flex; justify-content: start">
                        <img src="./Images/AJR_logo.png" style="width: 80px; height:80px;" align="left">
                        <h2
                            style="color: black; margin-top: 12px; margin-left: 10px; display: flex; width: 1000px; font-size: 24px; font-weight: bold">
                            Atma Jogja Rental</h2>
                    </a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav" style="margin: 0 0 0 auto;">
                        <li class="nav-item">
                            <a class="nav-link" @click="register">Register</a>
                        </li>
                        <li class="nav-item" style="margin-left: 16px">
                            <a class="nav-link" @click="login">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="fullheight pa-5" style="padding: 0px">
            <router-view></router-view>
        </div>

    </div>
</template>

<style scoped>
    @import './css/navbarIndex.css';
</style>

<script>
    export default {
        name: "Index",
        data() {
            return {
                items: [{
                        title: "Index",
                        to: "/index"
                    },
                    {
                        title: "Register",
                        to: "/register"
                    },
                    {
                        title: "Login",
                        to: "/login"
                    },
                    // {title: "Course", to: "/course"},
                ],
            };
        },
        methods: {
            login() {
                this.$router.push({
                    name: 'Login',
                });

            },
            register() {
                this.$router.push({
                    name: 'Register',
                });

            },
            kembaliDashboard() {
                this.$router.push({
                    name: 'Index',
                });
            }
        }
    };
</script>