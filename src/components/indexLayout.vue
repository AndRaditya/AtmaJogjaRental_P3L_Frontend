<template>
	<div class="index">
		<header class="header">
			<!-- <a @click="kembaliDashboard">
				<img src="./Images/AJR_logo.png" alt="AJR Logo" class="logo" />
			</a> -->
			<a class="header-logo" @click="kembaliDashboard">
				<figure class="ajr-logo-header">
					<img src="./Images/AJR_logo.png" alt="AJR Logo" />
				</figure>
			</a>
			<nav class="main-nav">
				<ul class="main-nav-list">
					<li>
						<a href="#gallery" class="main-nav-link">Gallery</a>
					</li>
					<li><a href="#driver" class="main-nav-link">Drivers</a></li>
					<li>
						<a class="main-nav-link login-register" @click="login"
							>Login</a
						>
					</li>
					<li>
						<a
							class="main-nav-link login-register"
							@click="register"
							>Register</a
						>
					</li>
				</ul>
			</nav>
		</header>

		<div>
			<router-view></router-view>
		</div>
	</div>
</template>

<style scoped>
@import "./css/IndexLayout.css";
</style>

<script>
export default {
	name: "Index",
	data() {
		return {
			items: [
				{
					title: "Index",
					to: "/index",
				},
				{
					title: "Register",
					to: "/register",
				},
				{
					title: "Login",
					to: "/login",
				},
				// {title: "Course", to: "/course"},
			],
		};
	},
	methods: {
		login() {
			this.$router.push({
				name: "Login",
			});
		},
		register() {
			this.$router.push({
				name: "Register",
			});
		},
		kembaliDashboard() {
			this.$router.push({
				name: "Index",
			});
		},
	},
};
</script>
