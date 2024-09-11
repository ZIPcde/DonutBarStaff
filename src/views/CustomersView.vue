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
      };
    },
    created() {
      axios.get('http://localhost:3000/customers')
        .then(response => {
          this.customers = response.data;
        });
    },
  };
  </script>
  