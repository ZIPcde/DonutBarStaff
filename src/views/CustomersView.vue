<template>
  <div>
    <h1>Список клиентов</h1>
    <ul>
      <li v-for="customer in customers" :key="customer.id">
        <p><strong>Имя:</strong> {{ customer.name }}</p>
        <p><strong>Телефон:</strong> {{ customer.phone }}</p>
        <p><strong>Дата создания аккаунта:</strong> {{ customer.account_creation_date }}</p>
        <p><strong>Идентификаторы заказов:</strong> {{ customer.orders_ids }}</p>
        <p><strong>Примечания:</strong> {{ customer.notes }}</p>
        <button @click="openEditModal(customer)">Редактировать</button>
        <button @click="deleteCustomer(customer.id)">Удалить</button>
        <hr />
      </li>
    </ul>

    <!-- Модальное окно для редактирования -->
    <div v-if="editModalVisible" class="modal">
      <div class="modal-content">
        <h2>Редактирование клиента</h2>
        <form @submit.prevent="saveCustomer">
          <label>
            Имя:
            <input v-model="editCustomer.name" type="text" required />
          </label>
          <label>
            Телефон:
            <input v-model="editCustomer.phone" type="text" required />
          </label>
          <label>
            Примечания:
            <textarea v-model="editCustomer.notes"></textarea>
          </label>
          <button type="submit">Сохранить</button>
          <button type="button" @click="closeEditModal">Отмена</button>
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
      customers: [],
      apiUrl: process.env.VUE_APP_API_BASE_URL,
      editModalVisible: false,
      editCustomer: null,
    };
  },
  created() {
    this.fetchCustomers();
  },
  methods: {
    fetchCustomers() {
      const token = localStorage.getItem('token');

      axios.get(`${this.apiUrl}/api/customers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          this.customers = response.data;
        })
        .catch(error => {
          console.error('Ошибка при загрузке клиентов:', error);
        });
    },
    deleteCustomer(id) {
      const token = localStorage.getItem('token');

      axios.delete(`${this.apiUrl}/api/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          this.fetchCustomers(); // Обновить список клиентов после удаления
        })
        .catch(error => {
          console.error('Ошибка при удалении клиента:', error);
        });
    },
    openEditModal(customer) {
      this.editCustomer = { ...customer }; // Копия объекта клиента для редактирования
      this.editModalVisible = true;
    },
    closeEditModal() {
      this.editCustomer = null;
      this.editModalVisible = false;
    },
    saveCustomer() {
      const token = localStorage.getItem('token');

      axios.put(`${this.apiUrl}/api/customers/${this.editCustomer.id}`, this.editCustomer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          this.closeEditModal();
          this.fetchCustomers(); // Обновить список клиентов после сохранения
        })
        .catch(error => {
          console.error('Ошибка при сохранении клиента:', error);
        });
    },
  },
};
</script>

<style>
/* Пример стилей для модального окна */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.modal-content form {
  display: flex;
  flex-direction: column;
}

.modal-content label {
  margin-bottom: 10px;
}

.modal-content button {
  margin-top: 10px;
}
</style>
