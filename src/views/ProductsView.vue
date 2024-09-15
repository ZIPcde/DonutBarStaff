<template>
  <div>
    <h1>Products</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Category</th>
          <th>Name</th>
          <th>Price</th>
          <th>Image Path</th>
          <th>Description</th>
          <th>Weight</th>
          <th>Calories</th>
          <th>Fats</th>
          <th>Proteins</th>
          <th>Carbohydrates</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="products.length === 0">
          <td colspan="11">No products available</td>
        </tr>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.imagePath }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.weight }}</td>
          <td>{{ product.calories }}</td>
          <td>{{ product.fats }}</td>
          <td>{{ product.proteins }}</td>
          <td>{{ product.carbohydrates }}</td>
        </tr>
      </tbody>
    </table>
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
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://51.250.115.233:3000/api/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        // Optionally handle error and set an empty array or show an error message
      }
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
</style>

  