<template>
  <div class="container">
    <button v-on:click="guardar()">Guardar</button>
    <button v-on:click="actualizar()">Actualizar</button>
    <button v-on:click="actualizarParcial()">Actualizar Parcial</button>
    <button v-on:click="eliminar()">Eliminar</button>


  </div>
</template>

<script>
import {guardarFachada,actualizarFachada,actualizarParcialFachada,eliminarPorIdFachada} from '@/clients/EstudianteClient.js'

export default {
    methods:{
         async guardar(){
        //EstudianteTo
        //private Integer id;
        //private String nombre;
        //private String apellido;
        //private LocalDateTime fechaNacimiento;
        //private String genero;
        let fecha = '1999-06-29';
            const estudianteToBody = {
                nombre:'Gabriela',
                apellido:'Rodriguez',
                fechaNacimiento: fecha+'T00:00:00',
                genero:'F'
            };
          await guardarFachada(estudianteToBody);
        },
        async actualizar(){
                let fecha = '2001-06-29';
                const estudianteToBody = {
                nombre:'Hugo',
                apellido:'Villacis',
                fechaNacimiento: fecha+'T00:00:00',
                genero:'M'
            };
           await actualizarFachada(estudianteToBody,27);
        },
        async actualizarParcial(){
                let fecha = '2001-06-29';
                const estudianteToBody = {
                apellido:'Minjoo',
            };
           await actualizarParcialFachada(estudianteToBody,26);
        },
        async eliminar(){
            await eliminarPorIdFachada(25);

        }
    }
}
</script>

<style>

button{
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
  background: aquamarine;
  border: none;
  color: rgb(56, 108, 91);
}

button:hover {
  background: rgb(100, 200, 170);
  color: rgb(30, 80, 65);
  cursor: pointer;
}

button:active {
  background: rgb(41, 141, 111);
  transform: translateY(1px);
}



</style>