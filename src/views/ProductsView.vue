<template>
    <div>
      <h1>Products</h1>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }} - {{ product.price }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        products: [],
      };
    },
    created() {
      axios.get('http://localhost:3000/products')
        .then(response => {
          this.products = response.data;
        });
    },
  };
  </script>
  