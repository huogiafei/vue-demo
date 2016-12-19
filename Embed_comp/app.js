Vue.component('my-select',{
    template:'#select-template',
    props:{
        options:{
            type:Array,
            required: true,
            default:[],

        },
        selectedIndex:{
            type:[String, Number],
            required:false,
            default:0
        }
    },
    computed:{

    },
    mounted:function () {
        var self = this;
        $(this.$el).select2()
            .on('change',function () {
                self.$emit('ab',this.value)
            });
    },
})

var app = new Vue({
    el:"#app",
    data:{
        singleChooseVal:0,
        singleData:[
            {
                label:'automotive',
                val:'1'
            },
            {
                label:'sport',
                val:'2'
            },
            {
                label:'books',
                val:'3'
            }
        ]
    },
    methods:{
        selectShow:function (val) {
            console.log(1)
            this.singleChooseVal = val
        }
    }
})
