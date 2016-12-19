Vue.component('draggable-header', {
    template: '#header-view-template',
    props: ['headerColor', 'headerHeight'],
    data: function () {
        return {
            dragging: false,
            //origin header size
            origin: {
                x: document.querySelector('.darggable-container').offsetWidth,
                y: this.headerHeight
            },

            //svg path Q point
            c: {
                x: document.querySelector('.darggable-container').offsetWidth / 2,
                y: this.headerHeight
            },

            //touch/mouse event start point
            start: {x: 0, y: 0}
        }
    },
    mounted: function () {
        document.querySelector('.darggable-container svg').style.width = this.origin.x
        var circle = document.querySelector('.header-view-circle')
        circle.style.cx = this.origin.x/ 2

    },
    computed: {
        headerPath: function () {
            return `M0 0 H${this.origin.x} V${this.origin.y} Q${this.c.x} ${this.c.y} 0 ${this.origin.y} Z`
        },
        contentPosition: function () {
            var dy = this.c.y - this.origin.y;
            var dampen = dy > 0 ? 2 : 4;
            return {
                transform: `translate3d(0,${dy / dampen - this.origin.y }px,0)`
            }
        },
        dotY:function () {
            var dy = this.c.y-10;
            return dy
        }
    },


    methods: {
        dragStart: function (e) {
            e = e.changedTouches ? e.changedTouches[0] : e
            this.dragging = true
            this.start.x = e.pageX
            this.start.y = e.pageY
        },
        dragOn: function (e) {
            e = e.changedTouches ? e.changedTouches[0] : e
            if (this.dragging) {
                this.c.x = e.pageX - this.start.x + this.origin.x / 2
                var dy = e.pageY - this.start.y
                var dampen = dy > 0 ? 1.5 : 4
                this.c.y = +this.origin.y + dy / dampen
            }
        },
        dragStop: function (e) {
            if (this.dragging) {
                this.dragging = false
                dynamics.animate(this.c, {
                    x: this.origin.x / 2,
                    y: this.origin.y
                }, {
                    type: dynamics.spring,
                    duration: 700,
                    friction: 280
                })
            }
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        header: {
            height: 140,
            color: '#7CB342'
        },
        content: {
            position: ''
        }
    }
})