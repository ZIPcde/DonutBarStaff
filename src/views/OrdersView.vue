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
      axios.get('http://51.250.115.233:3000/api/orders')
        .then(response => {
          this.orders = response.data;
        });
    },
  };
  </script>
  