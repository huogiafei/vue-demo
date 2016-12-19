'use strict';
Vue.component('my-modal',{
    template:'#modal-template',
    props:['showModal','data'],
    methods:{
        modalClose:function () {
            this.$emit('close')
        },
        click:function (action) {
            if(action == ''){
                this.$emit('close')
            }
            else{
                action()
                this.$emit('close')
            }
        }
    }
})

var app = new Vue({
    el:'#app',
    data:{
        showModal : false,
        modalData:{}
    },
    methods:{
        openModal:function () {
            console.log(1)
            this.showModal = true;
            this.modalData = {
                title:'Can I Use',
                content:'The Email Design Guide is filled with tips and advice to help you convey your message in style.Learn how to better use images, fonts, calls to action and more.',
                btn:[
                    {
                        label:'OK',
                        action:function(){
                            console.log(123)
                        }
                    }
                ]
            }
        },


    }
})

function test() {
    console.log(123)
}

