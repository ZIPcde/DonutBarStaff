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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="products.length === 0">
          <td colspan="12">No products available</td>
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
          <td>
            <button @click="editProduct(product)">Edit</button>
            <button @click="deleteProduct(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Product Modal -->
    <div v-if="editingProduct" class="modal">
      <div class="modal-content">
        <h2>Edit Product</h2>
        <form @submit.prevent="updateProduct">
          <label>ID:
            <input v-model="editingProduct.id" disabled />
          </label>
          <label>Category:
            <input v-model="editingProduct.category" />
          </label>
          <label>Name:
            <input v-model="editingProduct.name" />
          </label>
          <label>Price:
            <input v-model.number="editingProduct.price" type="number" />
          </label>
          <label>Image Path:
            <input v-model="editingProduct.imagePath" />
          </label>
          <label>Description:
            <textarea v-model="editingProduct.description"></textarea>
          </label>
          <label>Weight:
            <input v-model="editingProduct.weight" />
          </label>
          <label>Calories:
            <input v-model.number="editingProduct.calories" type="number" />
          </label>
          <label>Fats:
            <input v-model.number="editingProduct.fats" type="number" />
          </label>
          <label>Proteins:
            <input v-model.number="editingProduct.proteins" type="number" />
          </label>
          <label>Carbohydrates:
            <input v-model.number="editingProduct.carbohydrates" type="number" />
          </label>
          <button type="submit">Save</button>
          <button @click="cancelEdit">Cancel</button>
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
      products: [],
      editingProduct: null,
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
      }
    },
    editProduct(product) {
      this.editingProduct = { ...product }; // Create a copy for editing
    },
    async updateProduct() {
      try {
        await axios.put(`http://51.250.115.233:3000/api/products/${this.editingProduct.id}`, this.editingProduct);
        this.fetchProducts(); // Refresh the list
        this.editingProduct = null; // Close the modal
      } catch (error) {
        console.error('Error updating product:', error);
      }
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`http://51.250.115.233:3000/api/products/${id}`);
        this.fetchProducts(); // Refresh the list
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
    cancelEdit() {
      this.editingProduct = null; // Close the modal
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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}
</style>
