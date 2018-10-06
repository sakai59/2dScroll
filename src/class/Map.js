import phina from 'phina.js'
phina.globalize()
import Block from '@/class/Block'
var GS = 32

export default phina.define('Map', {
    superClass: 'RectangleShape',
    init: function(blockGroup) {
        this.superInit()
        this.blockGroup = blockGroup
    },
    loading: function(text, stage) {
        this.text = AssetManager.get(text, stage).data
        // this.text = require('@/assets/map1')

        var ary = this.text.split('\n')
        var map = []
        for (var i = 0; i < ary.length; i++) {
            map.push(ary[i].split(''))
        }

        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[0].length; j++) {
                if (map[i][j] === 'B') {
                    Block()
                        .setPosition(j * GS, i * GS)
                        .addChildTo(this.blockGroup)
                }
            }
        }
    },
})
