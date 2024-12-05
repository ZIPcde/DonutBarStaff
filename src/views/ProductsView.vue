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
          <td>
            <img 
              v-if="product.imagePath" 
              :src="`${apiUrl}/api/images/${product.imagePath}`" 
              alt="Product Image" 
              width="50" />
          </td>
          <td>{{ product.description }}</td>
          <td>{{ product.weight }}</td>
          <td>{{ product.calories }}</td>
          <td>{{ product.fats }}</td>
          <td>{{ product.proteins }}</td>
          <td>{{ product.carbohydrates }}</td>
          <td>
  <button @click="editProduct(product)">Edit</button>
  <button @click="deleteProduct(product.id)">Delete product</button>
  <button @click="deleteProduct(product.id, product.imagePath)">Delete image</button>
  <form @submit.prevent="uploadImage">
    <input type="file" ref="fileInput" />
    <button type="submit">Upload Image</button>
  </form>
</td>
        </tr>
      </tbody>
    </table>

    <!-- Add Product Form -->
    <div class="form-container">
      <h2>Add New Product</h2>
      <form class="form-holder" @submit.prevent="addProduct">
        <label>Category:
          <input v-model="newProduct.category" required />
        </label>
        <label>Name:
          <input v-model="newProduct.name" required />
        </label>
        <label>Price:
          <input v-model.number="newProduct.price" type="number" required />
        </label>
        <label>Image Path:
          <input v-model="newProduct.imagePath" required />
        </label>
        <label>Description:
          <textarea v-model="newProduct.description" required></textarea>
        </label>
        <label>Weight:
          <input v-model="newProduct.weight" required />
        </label>
        <label>Calories:
          <input v-model.number="newProduct.calories" type="number" required />
        </label>
        <label>Fats:
          <input v-model.number="newProduct.fats" type="number" required />
        </label>
        <label>Proteins:
          <input v-model.number="newProduct.proteins" type="number" required />
        </label>
        <label>Carbohydrates:
          <input v-model.number="newProduct.carbohydrates" type="number" required />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>

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
    <!-- Поле для массового добавления продуктов -->
    <div class="bulk-upload">
      <h2>Bulk Upload Products</h2>
      <textarea 
        v-model="bulkProductsJson" 
        placeholder="Enter JSON array of products" 
        rows="10" 
        style="width: 100%;"
      ></textarea>
      <button @click="uploadBulkProducts">Upload Products</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_BASE_URL,
      products: [],
      newProduct: {
        category: '',
        name: '',
        price: null,
        imagePath: '',
        description: '',
        weight: '',
        calories: null,
        fats: null,
        proteins: null,
        carbohydrates: null,
      },
      editingProduct: null,
      bulkProductsJson: "", // Поле для ввода JSON
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(`${this.apiUrl}/api/products`);
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async uploadBulkProducts() {
      try {
        const token = localStorage.getItem("token");
        const parsedProducts = JSON.parse(this.bulkProductsJson);

        if (!Array.isArray(parsedProducts)) {
          alert("Invalid JSON format. Please provide an array of products.");
          return;
        }

        // Отправляем запрос для массового добавления
        await axios.post(
          `${this.apiUrl}/api/products/bulk`,
          { products: parsedProducts },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Products uploaded successfully!");
        this.bulkProductsJson = ""; // Очистить поле
        this.fetchProducts(); // Обновить список продуктов
      } catch (error) {
        console.error("Error uploading bulk products:", error);
        alert("Failed to upload products. Check console for details.");
      }
    },
    async addProduct() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `${this.apiUrl}/api/products`,
          { productDetails: this.newProduct },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        this.products.push(response.data);
        this.resetNewProduct();
      } catch (error) {
        console.error('Error adding product:', error);
      }
    },
    resetNewProduct() {
      this.newProduct = {
        category: '',
        name: '',
        price: null,
        imagePath: '',
        description: '',
        weight: '',
        calories: null,
        fats: null,
        proteins: null,
        carbohydrates: null,
      };
    },
    editProduct(product) {
      this.editingProduct = { ...product }; // Create a copy for editing
    },
    async updateProduct() {
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          `${this.apiUrl}/api/products/${this.editingProduct.id}`,
          this.editingProduct,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        this.fetchProducts(); // Обновление списка
        this.editingProduct = null; // Закрытие модала
      } catch (error) {
        console.error('Error updating product:', error);
      }
    },
    async deleteProduct(id, imagePath) {
  try {
    const token = localStorage.getItem('token');

    // Удаление изображения
    if (imagePath) {
      const imageFileName = imagePath.split('/').pop(); // Получаем имя файла из пути
      await axios.delete(`${this.apiUrl}/api/images/${imageFileName}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Image deleted successfully');
    }

    // Удаление продукта
    await axios.delete(`${this.apiUrl}/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    this.fetchProducts(); // Обновление списка
  } catch (error) {
    console.error('Error deleting product:', error);
  }
},
    async uploadImage(event) {
    try {
      const token = localStorage.getItem('token');
      const file = event.target.querySelector('input[type="file"]').files[0];
      if (!file) {
        alert('Please select an image file');
        return;
      }
      const formData = new FormData();
      formData.append('image', file);

      // Отправляем запрос без ID
      await axios.post(`${this.apiUrl}/api/images`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  },
    cancelEdit() {
      this.editingProduct = null; // Close the modal
    }
  }
};
</script>

<style scoped>
.form-container {
  margin-left: auto;
}

.form-holder {
  max-width: fit-content;
  display: flex;
  flex-direction: column;
  align-items:end
}

label {
  display: block;
  margin-bottom: 10px;
}

.bulk-upload {
  margin-top: 20px;
}

</style>
