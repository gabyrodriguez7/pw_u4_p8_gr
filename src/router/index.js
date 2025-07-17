import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EstudianteView from '../views/EstudianteView.vue'
import ProfesorView from '../views/ProfesorView.vue'
import LoginView from '../views/LoginView.vue'

function estaAutenticado() {
  return localStorage.getItem('auth') === 'true'; // Verifica si el usuario está autenticado
}

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    //Bandera para requerir autenticación
    meta:{
      requiereAuth: true // Esta ruta requiere autenticación
    }
  },
    {
    path: '/estudiante',
    name: 'estudiante',
    component: EstudianteView
  },
    {
    path: '/profesor',
    name: 'profesor',
    component: ProfesorView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiereAuth){
    //Si no esta autenticado
    if(!estaAutenticado()){
      next('/login'); 
    }else{
      next();
    }
  }else{
    next();
  }

})
export default router
