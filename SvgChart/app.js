'use strict';

function valToPoint(typeIndex, value, index, total) {
    var TYPE = ['value', 'label', 'bg'];
    var edge = '';
    switch (TYPE[typeIndex]) {
        case 'value':
            edge = value / 2 * .7
            break;
        case 'label':
            edge = 50 * .84
            break;
        case 'bg':
            edge = value / 2 * .7
            break;
    }

    var angle = Math.PI * 2 / total * index
    var cos = Math.cos(angle)
    var sin = Math.sin(angle)

    var tx = sin * edge + 50
    var ty = 50 - cos * edge
    return {
        x: tx,
        y: ty
    }
}

Vue.component('radar', {
    props: ['stats', 'degree'],
    template: '#radarMain-template',
    computed: {
        'valuePoints': function () {
            var total = this.stats.length;
            //shape
            var result = this.stats.map(function (item, i) {
                var point = valToPoint(0, item.data, i, total);
                return point.x + ',' + point.y
            })

            //line
            var linesStr = result.map(function (item) {
                return '50,50 ' + item
            })

            return {
                polygonStr: result.join(' '),
                linesStr: linesStr
            }
        },
    },
    components: {
        'axis-label': {
            template: '#radarLabel-template',
            props: ['stats'],
            computed: {
                'labelPoints': function () {
                    var data = this.stats;
                    return data.map(function (item, i) {
                        var point = valToPoint(1, '', i, data.length);
                        return {
                            x: point.x,
                            y: point.y,
                            label: data[i].label,
                            value: data[i].data
                        }
                    })
                }
            }
        },
        'radar-bg': {
            template: '#radarBg-template',
            props: ['stats', 'degree'],
            computed: {
                'bgShape': function () {
                    var shapeNum = this.degree
                    var edgeNum = this.stats.length;
                    var unit = parseFloat(100 / shapeNum).toFixed(2)

                    var s_a = Array.from({length: shapeNum}, () => '')
                    var e_a = Array.from({length: edgeNum}, () => '')
                    var temp = s_a.map(function (shape, i) {
                        var result = e_a.map(function (item, j) {
                            var point = valToPoint(2, unit * (i + 1), j, edgeNum)
                            return point.x + ',' + point.y
                        })
                        return result.join(' ')
                    })
                    return temp;
                },
                'bgLine': function () {
                    var total = this.stats.length;
                    return this.stats.map(function (item, i) {
                        var point = valToPoint(2, 100, i, total)
                        return '50,50 ' + point.x + ',' + point.y
                    })
                }
            }
        }
    }
})

Vue.component('radar-console', {
    template: '#radarConsole-template',
    props: ['stats','mode'],
    data:function () {
        return{
            newProp : ''
        }
    },
    methods: {
        remove: function (index) {
            if (this.stats.length > 3) {
                this.$emit('remove', this.stats, index);
            }
            else {
                console.log('at least 3 props')
            }
        },
        updateProp:function (val) {
            this.newProp = val.trim()
        },
        add:function () {
            if(this.newProp !=''){
                this.$emit('add',this.stats,this.newProp)
                this.newProp = ''
            }
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        playerData: {
            degree: 5,
            mode:'read',
            stats: [
                {label: '篮板', data: 30},
                {label: '防守', data: 70},
                {label: '得分', data: 90},
                {label: '助攻', data: 60},
                {label: '盖帽', data: 70},
                {label: '失误', data: 80},
            ]
        },
        studentData: {
            degree: 2,
            mode:'edit',
            stats: [
                {label: '英语', data: 85},
                {label: '数学', data: 67},
                {label: '语文', data: 88},
                {label: '体育', data: 92},
                {label: '历史', data: 45},
            ]
        },
        pcData: {
            degree: 4,
            mode:'read',
            stats: [
                {label: '显卡', data: 90},
                {label: 'CPU', data: 80},
                {label: '内存', data: 50},
                {label: '主板', data: 75},
                {label: '磁盘', data: 95},
            ]
        }
    },
    methods: {
        removeProp: function (parents, index) {
            parents.splice(index, 1);
        },
        addProp:function (parents,label) {
            parents.push({
                label:label,
                data:100
            });
        }
    }
})






