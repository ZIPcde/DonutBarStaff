<!-- donut_bar_staff\src\views\DashboardView.vue -->
<template>
  <div class="dashboard">
    <h1>Dashboard</h1>

    <!-- Секция с общей информацией -->
    <div class="info-section">
      <div class="info-box">
        <h3>Total Customers</h3>
        <p>{{ totalCustomers }}</p>
      </div>
      <div class="info-box">
        <h3>Total Orders</h3>
        <p>{{ totalOrders }}</p>
      </div>
      <div class="info-box">
        <h3>Total Products</h3>
        <p>{{ totalProducts }}</p>
      </div>
    </div>

    <!-- Секция с последними заказами -->
    <div class="recent-orders">
      <h2>Recent Orders</h2>
      <ul>
        <li v-for="order in recentOrders" :key="order.id">
          Order ID: {{ order.id }} - {{ order.details }} - {{ order.status }}
        </li>
      </ul>
    </div>

    <!-- Ссылки на другие разделы -->
    <div class="navigation">
      <router-link to="/customers" class="btn">Manage Customers</router-link>
      <router-link to="/orders" class="btn">Manage Orders</router-link>
      <router-link to="/products" class="btn">Manage Products</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_BASE_URL,
      totalCustomers: 0,
      totalOrders: 0,
      totalProducts: 0,
      recentOrders: []
    };
  },
  created() {
    const token = localStorage.getItem('token'); // Получаем токен

axios.get(`${this.apiUrl}/api/customers`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(response => {
  this.totalCustomers = response.data.length;
})
.catch(error => {
  console.error('Error fetching customers:', error);
});

axios.get(`${this.apiUrl}/api/orders`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(response => {
  this.totalOrders = response.data.length;
  this.recentOrders = response.data.slice(0, 5); // Получаем последние 5 заказов
})
.catch(error => {
  console.error('Error fetching orders:', error);
});

axios.get(`${this.apiUrl}/api/products`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(response => {
  this.totalProducts = response.data.length;
})
.catch(error => {
  console.error('Error fetching products:', error);
});
  }
};
</script>

<style scoped>
.dashboard {
  padding: 1rem;
}
.info-section {
  display: flex;
  justify-content: space-around;
}
.info-box {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  width: 200px;
}
.recent-orders {
  margin-top: 2rem;
}
.navigation {
  margin-top: 2rem;
  display: flex;
  justify-content: space-around;
}
.btn {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
}
.btn:hover {
  background-color: #0056b3;
}
</style>

  