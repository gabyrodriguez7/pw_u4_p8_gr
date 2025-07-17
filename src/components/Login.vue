<template>
  <div class="login-container">
    <div class="login-caja">
        <h2>Iniciar Sesion</h2>
        <input v-model="username" type="text" placeholder="Usuario" >
        <input v-model="password" type="password" placeholder="Contraseña">
        <button @click="login()">Ingresar</button>
    </div>
  </div>
</template>

<script scoped>
export default {
    data(){
        return{
            username: '',
            password: ''
        }
    },
    methods:{
        login(){
            if(this.username === 'admin' && this.password === '123'){
                localStorage.setItem('usuario', 'admin'); 
                localStorage.setItem('auth','true');//Bandera para decir que se autentico
                //Redireccionar a la vista de estudiante
                this.$router.push('/home');  
            }
        }

    }

}
</script>

<style>
.login-container{
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f4f6f8;
    height: 100vh;
    width: 100vw;
}
.login-caja{
    background: #ffffff;
    padding: 30px;
    border-radius: 5px;
    width: 300px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    
}
input{
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    box-sizing: border-box;
}
button{
    width: 100%;
    padding: 10px;
    margin: 0 auto;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>