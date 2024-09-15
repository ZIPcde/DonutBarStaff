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
      axios.get('http://51.250.115.233:3000/api/customers')
        .then(response => {
          this.customers = response.data;
        });
    },
  };
  </script>
  