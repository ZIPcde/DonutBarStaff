// donut_bar_stuff/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import OrdersView from '../views/OrdersView.vue';
import ProductsView from '../views/ProductsView.vue';
import CustomersView from '../views/CustomersView.vue';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue'; // Добавляем DashboardView

const routes = [
  { path: '/', component: LoginView },
  { path: '/orders', component: OrdersView, meta: { requiresAuth: true } },
  { path: '/products', component: ProductsView, meta: { requiresAuth: true } },
  { path: '/customers', component: CustomersView, meta: { requiresAuth: true } },
  { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } } // Страница для персонала
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Глобальный навигационный хук для проверки аутентификации и авторизации
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/'); // Перенаправляем на страницу логина, если пользователь не авторизован
  } else {
    next(); // Продолжаем маршрут, если пользователь авторизован
  }
});

export default router;
