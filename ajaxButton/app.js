'use strict';
Vue.component('loading-btn', {
    template: '#loadingBtn',
    props: ['label','isLoading'],
    data: function () {
        return {

        }
    },
    methods: {
        submit: function () {
            this.$emit('submit')
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        btnLabel: 'hello',
        isLoad:false
    },
    methods: {
        getInfo: function () {
            let self = this;
            self.isLoad = true;
            setTimeout(function () {
                self.$http.get('https://api.github.com/users/huogiafei')
                    .then(response => {
                        console.log(response)
                        self.isLoad = false;
                    })
            }, 2000)
        }
    },


})