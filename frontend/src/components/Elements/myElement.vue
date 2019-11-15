<template>

    <div>
        <div>
            {{ appName }}
            isLoggedIn : {{ isLoggedIn }}
            <h5 v-if="isLoggedIn">Logged In with : {{ Auth.fullname }} </h5>
            
            <button v-if="isLoggedIn" v-on:click="logout" class="btn btn-sm btn-warning">logout</button>
            <router-link v-if="!isLoggedIn" to="/login" class="btn btn-sm btn-info">login</router-link>
        </div>


        <img alt="Vue logo" src="./assets/logo.png">

        <div>
            <router-link class="btn btn-outline-primary" to="/home">
            <i class="fa fa-home"></i> Home
            </router-link>
            <router-link class="btn btn-outline-secondary" to="/users">
            <vue-fontawesome icon="users" size="1" color="red"></vue-fontawesome> user list
            </router-link>
            <router-link class="btn btn-outline-success" to="/users/create">
            <vue-fontawesome icon="plus"></vue-fontawesome> create user
            </router-link>
            <router-link class="btn btn-outline-danger" to="/validateDemo">Validate Demo</router-link>
        </div>
    </div>

</template>