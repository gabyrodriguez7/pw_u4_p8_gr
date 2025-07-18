import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import EstudianteView from "../views/EstudianteView.vue";
import RecursoProhibido from "../views/RecursoProhibidoView.vue";
import NotasIngresoView from "../views/NotasIngresoView.vue";

import {obtenerPaginasPermitidas} from '../helpers/Autorizacion'

function estaAutenticado() {
  return localStorage.getItem("auth") === "true"; // Verifica si el usuario está autenticado
}

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
    //Bandera para requerir autenticación
    meta: {
      requiereAuth: true, // Esta ruta requiere autenticación
    },
  },
  {
    path: "/about",
    name: "AboutView",
    component: AboutView,
    meta: {
      requiereAuth: true,
    },
  },
  {
    path: "/estudiante",
    name: "estudiante",
    component: EstudianteView,
    meta: {
      requiereAuth: true,
    },
  },
  {
    path: "/notas",
    name: "NotasIngresoView",
    component: NotasIngresoView,
    meta: {
      requiereAuth: true,
    },
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/403",
    name: "403",
    component: RecursoProhibido,
    meta: {
      requiereAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
//Guardian(antes de cada pagina)(a donde voy y de donde vengo)
router.beforeEach((to, from, next) => {
  if (to.meta.requiereAuth) {
    //Si no esta autenticado redirrecione a 
    if (!estaAutenticado()) {
      //Redirige a la pagina de login
      next("/login");
    } else {
      //Cuando esta autenticado EVALUO a que paginas tengo autorizacion
      //Siga a la ruta que estaba intentando acceder
      let usuario = localStorage.getItem('usuario');
      let paginas = obtenerPaginasPermitidas(usuario);
      if(paginas.includes(to.path)){
        next();
      }else{
        next('/403');
      }
      next();
    }
  } else {
    next();
  }
});

export default router;
