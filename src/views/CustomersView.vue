<template>
  <div>
    <h1>Customers</h1>
    <ul>
      <li v-for="customer in customers" :key="customer.id">
        <p><strong>Name:</strong> {{ customer.name }}</p>
        <p><strong>Phone:</strong> {{ customer.phone }}</p>
        <p><strong>Account Creation Date:</strong> {{ customer.account_creation_date }}</p>
        <p><strong>Order IDs:</strong> {{ customer.orders_ids }}</p>
        <p><strong>Notes:</strong> {{ customer.notes }}</p>
        <hr />
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
    const token = localStorage.getItem('token'); // Получаем токен из localStorage

    axios.get(`${this.apiUrl}/api/customers`, {
      headers: {
        Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
      },
    })
    .then(response => {
      this.customers = response.data;
    })
    .catch(error => {
      console.error('Error fetching customers:', error);
    });
  },
};
</script>
