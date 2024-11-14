<template>
  <div>
    <h1>Orders</h1>
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer Name</th>
          <th>Phone</th>
          <th>Delivery Required</th>
          <th>Delivery Address</th>
          <th>Total Amount</th>
          <th>Table Number</th>
          <th>Order Time</th>
          <th>Pickup Time</th>
          <th>Items</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customer_name }}</td>
          <td>{{ order.customer_phone }}</td>
          <td>{{ order.delivery_required ? 'Yes' : 'No' }}</td>
          <td>{{ order.delivery_address || 'N/A' }}</td>
          <td>{{ order.total_amount }}</td>
          <td>{{ order.table_number || 'N/A' }}</td>
          <td>{{ order.order_time }}</td>
          <td>{{ order.pickup_time || 'N/A' }}</td>
          <td>
            <ul>
              <li v-for="item in JSON.parse(order.items)" :key="item.name">
                {{ item.name }} (Quantity: {{ item.quantity }}, Price: {{ item.price }})
              </li>
            </ul>
          </td>
          <td>
            <button @click="openEditModal(order)">Edit</button>
            <button @click="deleteOrder(order.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Order Modal -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeEditModal">&times;</span>
        <h2>Edit Order #{{ currentOrder.id }}</h2>
        <form @submit.prevent="updateOrder">
          <label>
            Customer Name:
            <input type="text" v-model="currentOrder.customer_name" required />
          </label>
          <label>
            Phone:
            <input type="text" v-model="currentOrder.customer_phone" required />
          </label>
          <label>
            Delivery Required:
            <select v-model="currentOrder.delivery_required">
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </select>
          </label>
          <label v-if="currentOrder.delivery_required">
            Delivery Address:
            <input type="text" v-model="currentOrder.delivery_address" />
          </label>
          <label>
            Total Amount:
            <input type="number" v-model="currentOrder.total_amount" required />
          </label>
          <label>
            Table Number:
            <input type="number" v-model="currentOrder.table_number" />
          </label>
          <label>
            Pickup Time:
            <input type="datetime-local" v-model="currentOrder.pickup_time" />
          </label>

          <!-- Items Section -->
          <h3>Items</h3>
          <div v-for="(item, index) in currentOrder.items" :key="index" class="item">
            <label>
              Name:
              <input type="text" v-model="item.name" required />
            </label>
            <label>
              Quantity:
              <input type="number" v-model="item.quantity" required />
            </label>
            <label>
              Price:
              <input type="number" v-model="item.price" required />
            </label>
            <button type="button" @click="removeItem(index)">Remove Item</button>
          </div>
          <button type="button" @click="addItem">Add Item</button>
          
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      orders: [],
      apiUrl: process.env.VUE_APP_API_BASE_URL,
      showEditModal: false,
      currentOrder: null,
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      const token = localStorage.getItem('token');

      axios
        .get(`${this.apiUrl}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.orders = response.data;
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    },
    openEditModal(order) {
      this.currentOrder = { ...order, items: JSON.parse(order.items) }; // Парсим items для редактирования
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.currentOrder = null;
    },
    updateOrder() {
      const token = localStorage.getItem('token');

      // Преобразуем items обратно в JSON-строку
      const orderToUpdate = {
        ...this.currentOrder,
        items: JSON.stringify(this.currentOrder.items),
      };

      axios
        .put(`${this.apiUrl}/api/orders/${this.currentOrder.id}`, orderToUpdate, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          this.fetchOrders(); // Обновляем список заказов после изменения
          this.closeEditModal();
          console.log(`Order with ID ${this.currentOrder.id} updated successfully.`);
        })
        .catch((error) => {
          console.error('Error updating order:', error);
        });
    },
    deleteOrder(orderId) {
      const token = localStorage.getItem('token');

      axios
        .delete(`${this.apiUrl}/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          this.orders = this.orders.filter(order => order.id !== orderId);
          console.log(`Order with ID ${orderId} deleted successfully.`);
        })
        .catch((error) => {
          console.error('Error deleting order:', error);
        });
    },
    addItem() {
      this.currentOrder.items.push({ name: '', quantity: 1, price: 0 });
    },
    removeItem(index) {
      this.currentOrder.items.splice(index, 1);
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}
button {
  margin-right: 5px;
}

/* Modal Styles */
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}
.close {
  float: right;
  font-size: 1.5em;
  cursor: pointer;
}
.item {
  margin-bottom: 10px;
}
</style>
