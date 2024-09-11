// donut_bar_stuff/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import OrdersView from '../views/OrdersView.vue';
import ProductsView from '../views/ProductsView.vue';
import CustomersView from '../views/CustomersView.vue';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue'; // Добавляем DashboardView

const routes = [
  { path: '/', component: LoginView },
  { path: '/orders', component: OrdersView, meta: { requiresAuth: true, role: 'staff' } },
  { path: '/products', component: ProductsView, meta: { requiresAuth: true } },
  { path: '/customers', component: CustomersView, meta: { requiresAuth: true, role: 'staff' } },
  { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true, role: 'staff' } } // Страница для персонала
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Глобальный навигационный хук для проверки аутентификации и авторизации
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Можно использовать роль пользователя, если она хранится в localStorage

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next('/');
    } else if (to.meta.role && to.meta.role !== userRole) {
      next('/'); // Перенаправляем на страницу логина или ошибку, если роль не совпадает
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
