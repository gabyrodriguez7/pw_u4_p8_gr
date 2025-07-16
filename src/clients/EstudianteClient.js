import axios from "axios";


const URL_API = 'http://localhost:8081/api/matricula/v1/estudiantes';
//Guardar
//public Response guardar(@RequestBody EstudianteTo estudiante)

const guardar = async (body) => {
  const data = axios
    .post(`${URL_API}`, body)
    .then((r) => r.data);
  console.log(data);
};

//Actualizar
// public Response actualizarPorId(@RequestBody EstudianteTo estudiante, @PathParam("id") Integer id)
const actualizar = async (body, id) => {
  axios
    .put(`${URL_API}/${id}`, body)
    .then((r) => r.data);
};

//Actualizar Parcial
// public Response actualizarParcialPorId(@RequestBody EstudianteTo estudiante, @PathParam("id") Integer id)
const actualizarParcial = async (body, id) => {
  axios
    .patch(`${URL_API}/${id}`, body)
    .then((r) => r.data);
};

//Eliminar
// public Response borrarPorId(@PathParam("id") Integer id)
const eliminarPorId = async (id) => {
  axios
    .delete(`${URL_API}/${id}`)
    .then((r) => r.data);
};


//Fachadas
export const guardarFachada = async (body) => {
  await guardar(body);
};

export const actualizarFachada = async (body, id) => {
  await actualizar(body, id);
};

export const actualizarParcialFachada = async (body, id) => {
  await actualizarParcial(body, id);
};

export const eliminarPorIdFachada = async (id) => {
  await eliminarPorId(id);
};
