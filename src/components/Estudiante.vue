<template>
  <div class="container">
    <h1>Bienvenidos a la gestión de estudiantes</h1>
    <button @click="obtenerTodos">Actualizar tabla</button>
    <div class="cabecera">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha Nacimiento</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="estudiante in estudiantes" :key="estudiante.id">
            <td>{{ estudiante.id }}</td>
            <td>
              <input v-if="estudiante.id === estudianteSeleccionado.id" v-model="estudianteSeleccionado.nombre">
              <span v-else>{{ estudiante.nombre }}</span>
            </td>
            <td>
              <input v-if="estudiante.id === estudianteSeleccionado.id" v-model="estudianteSeleccionado.apellido">
              <span v-else>{{ estudiante.apellido }}</span>
            </td>
            <td>
              <input v-if="estudiante.id === estudianteSeleccionado.id" type="date"
                v-model="estudianteSeleccionado.fechaNacimiento">
              <span v-else>{{ estudiante.fechaNacimiento }}</span>
            </td>
            <td>
              <select v-if="estudiante.id === estudianteSeleccionado.id" v-model="estudianteSeleccionado.genero">
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
              <span v-else>{{ estudiante.genero }}</span>
            </td>
            <td>
              <button v-if="estudiante.id === estudianteSeleccionado.id"
                @click="actualizarEstudiante()">Guardar</button>
              <button v-else @click="seleccionarParaActualizar(estudiante)">Editar</button>
              <button id="boton_borrar" @click="eliminarPorIdDirecto(estudiante.id)">Borrar</button>
            </td>
          </tr>
          <tr>
            <td>-</td>
            <td><input v-model="nuevoEstudiante.nombre" placeholder="Nombre"></td>
            <td><input v-model="nuevoEstudiante.apellido" placeholder="Apellido"></td>
            <td><input type="date" v-model="nuevoEstudiante.fechaNacimiento"></td>
            <td>
              <select v-model="nuevoEstudiante.genero">
                <option value="">Género</option>
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
            </td>
            <td>
              <button @click="agregarEstudiante()">Agregar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { guardarFachada, actualizarFachada, eliminarPorIdFachada, obtenerTodosFachada } from '@/clients/EstudianteClient.js'

export default {
  data() {
    return {
      estudiantes: [],
      nuevoEstudiante: {
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        genero: ''
      },
      estudianteSeleccionado: {},
    };
  },
  methods: {
    async obtenerTodos() {
      this.estudiantes = await obtenerTodosFachada();
    },
    async agregarEstudiante() {
      if (
        this.nuevoEstudiante.nombre &&
        this.nuevoEstudiante.apellido &&
        this.nuevoEstudiante.fechaNacimiento &&
        this.nuevoEstudiante.genero
      ) {
        const estudianteToSend = {
          nombre: this.nuevoEstudiante.nombre,
          apellido: this.nuevoEstudiante.apellido,
          fechaNacimiento: this.nuevoEstudiante.fechaNacimiento + 'T00:00:00',
          genero: this.nuevoEstudiante.genero
        };
        await guardarFachada(estudianteToSend);
        this.nuevoEstudiante = { nombre: '', apellido: '', fechaNacimiento: '', genero: '' };
        await this.obtenerTodos();
      }
    },
    async actualizarEstudiante() {
      if (this.estudianteSeleccionado.id) {
        const estudianteToUpdate = {
          nombre: this.estudianteSeleccionado.nombre,
          apellido: this.estudianteSeleccionado.apellido,
          fechaNacimiento: this.estudianteSeleccionado.fechaNacimiento + 'T00:00:00',
          genero: this.estudianteSeleccionado.genero
        };
        await actualizarFachada(estudianteToUpdate, this.estudianteSeleccionado.id);
        this.estudianteSeleccionado = {};
        await this.obtenerTodos();
      }
    },
    seleccionarParaActualizar(estudiante) {
      let fecha = estudiante.fechaNacimiento;
      if (fecha && fecha.includes('T')) {
        fecha = fecha.split('T')[0];
      }
      this.estudianteSeleccionado = { ...estudiante, fechaNacimiento: fecha };
    },
    async eliminarPorIdDirecto(id) {
      await eliminarPorIdFachada(id);
      await this.obtenerTodos();
    }
  },
  mounted() {
    this.obtenerTodos();
  }
}
</script>

<style scoped>
button {
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
  background: aquamarine;
  border: none;
  color: rgb(56, 108, 91);
  font-size: 25px;
}

#boton_borrar {
  background: rgb(222, 93, 93);
  color: #5a2121;
}

#boton_borrar:hover {
  background: rgb(153, 70, 70);
  color: rgb(102, 19, 19);
  cursor: pointer;
}

#boton_borrar:active {
  background: rgb(226, 39, 2);
  transform: translateY(1px);
}

button:hover {
  background: rgb(100, 200, 170);
  color: rgb(30, 80, 65);
  cursor: pointer;
}

button:active {
  background: rgb(41, 141, 111);
}

h1 {
  text-align: center;
  color: rgb(56, 108, 91);
}

.cabecera {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
}

table {
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

th {
  background-color: #408177;
  color: #ffffff;
  text-align: left;
  padding: 12px;
  font-size: 16px;
}

td {
  padding: 12px;
  border-bottom: 1px solid #eee;
  font-size: 15px;
  color: #333333;
}

th {
  text-align: center;
  vertical-align: middle;
  padding: 12px;
  font-size: 16px;
}

tr:nth-child(even) {
  background-color: #f1f5f9;

}

tr:hover {
  background-color: #d8f3dc;
  cursor: pointer;
}

input {
  border: none;
  font-size: 15px;
  border-radius: 5px;
  width: 150px;
}

select {
  border: none;
  font-size: 15px;
  border-radius: 5px;
}
</style>