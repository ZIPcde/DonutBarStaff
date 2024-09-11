<!-- donut_bar_staff\src\views\LoginView.vue -->
<template>
    <div class="login">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input v-model="username" id="username" type="text" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="password" id="password" type="password" required />
        </div>
        <button type="submit">Login</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  
  export default {
    name: 'LoginView',
    setup() {
      const username = ref('');
      const password = ref('');
      const error = ref('');
      const router = useRouter();
  
      const login = async () => {
        try {
          const response = await axios.post('http://localhost:3000/login', {
            username: username.value,
            password: password.value,
          });
          localStorage.setItem('token', response.data.token);
          router.push('/dashboard'); // Перенаправляем на страницу Dashboard
        } catch (err) {
          error.value = 'Invalid username or password';
        }
      };
  
      return {
        username,
        password,
        error,
        login,
      };
    },
  };
  </script>
  
  <style scoped>
  .login {
    max-width: 400px;
    margin: auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  form div {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #218838;
  }
  .error {
    color: red;
    margin-top: 1rem;
  }
  </style>
  