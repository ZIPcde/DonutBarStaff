<template>
    <div>
      <h1>Orders</h1>
      <ul>
        <li v-for="order in orders" :key="order.id">
          Order ID: {{ order.id }} - {{ order.details }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        apiUrl: process.env.VUE_APP_API_BASE_URL,
        orders: [],
      };
    },
    created() {
      axios.get(`${this.apiUrl}/api/orders`)
        .then(response => {
          this.orders = response.data;
        });
    },
  };
  </script>
  