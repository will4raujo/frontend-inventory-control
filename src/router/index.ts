import { createRouter, createWebHistory, Router } from 'vue-router';

import SignIn from '../pages/SignIn.vue';
import SignUp from '../pages/SignUp.vue';

import Home from '../pages/Home.vue';
import Users from '../pages/Users.vue';
import Categories from '../pages/Categories.vue';
import Products from '../pages/Products.vue';
import StockMovements from '../pages/StockMovements.vue';
import Suppliers from '../pages/Suppliers.vue';
import NotFound from '../pages/NotFound.vue';
import AuthLayout from '../layouts/AuthLayout.vue';
import AppLayout from '../layouts/AppLayout.vue';

// import { useUserStore } from '../store/user';

const authRoutes = [
  {path: '/auth', component: AuthLayout, children: [
    { path: '/signin', name: 'SignIn', component: SignIn },
    { path: '/signup', name: 'SignUp', component: SignUp }
  ]}
];

const appRoutes = [
  {path: '/', component: AppLayout, children: [
    { path: '/', name: 'Home', component: Home },
    { path: '/users', name: 'Users', component: Users },
    { path: '/categories', name: 'Categories', component: Categories },
    { path: '/suppliers', name: 'Suppliers', component: Suppliers },
    { path: '/products', name: 'Products', component: Products },
    { path: '/movements', name: 'StockMovements', component: StockMovements }
  ]}
];

const errorRoutes = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    ...authRoutes,
    ...appRoutes,
    ...errorRoutes
  ]
});

// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore();
//   const requiresAuth = appRoutes.some(route => route.path === to.path);

//   if (requiresAuth && !userStore.token) {
//     next({ name: 'SignIn' });
//   } else {
//     next(); 
//   }
// });

export default router;