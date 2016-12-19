'use strict';
//Init
const USER = 'cookie';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAbm30agrKjyFKWrMXOAv3xdUvty1Mc_7c",
    authDomain: "vue2-3e5bb.firebaseapp.com",
    databaseURL: "https://vue2-3e5bb.firebaseio.com",
    storageBucket: "vue2-3e5bb.appspot.com",
    messagingSenderId: "693567234704"
};
firebase.initializeApp(config);

//init Database
var DB = firebase.database();
var usersRef = firebase.database().ref('user/'+USER);
//init Vue
var app = new Vue({
    el:'#app',
    firebase:{
        todos:DB.ref('user/'+USER),
    },
    data:{
        newTodo:''
    },
    methods:{
        'addTodo':function () {
            if(this.newTodo != '')
            usersRef.push(this.newTodo)
            this.newTodo = ''
        },
        'removeTodo':function (todo) {
            console.log(todo['.key'])
            usersRef.child(todo['.key']).remove()
        }
    }
})
