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
        orders: [],
      };
    },
    created() {
      axios.get('http://localhost:3000/orders')
        .then(response => {
          this.orders = response.data;
        });
    },
  };
  </script>
  