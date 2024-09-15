<template>
    <div>
      <h1>Customers</h1>
      <ul>
        <li v-for="customer in customers" :key="customer.id">
          {{ customer.name }} - {{ customer.phone }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        customers: [],
        apiUrl: process.env.VUE_APP_API_BASE_URL,
      };
    },
    created() {
      axios.get(`${this.apiUrl}/api/customers`)
        .then(response => {
          this.customers = response.data;
        });
    },
  };
  </script>
  