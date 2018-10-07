import phina from 'phina.js'
phina.globalize()
import Block from '@/class/Block'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/assets/CONSTANT'

var GS = 32

export default phina.define('Map', {
    superClass: 'RectangleShape',
    init: function(blockGroup) {
        this.superInit()
        this.blockGroup = blockGroup
        this.mapWidth = null
        this.mapHeight = null
        this.absdisX = 0
        this.absdisY = 0
    },
    loading: function(text, stage, player, nextx, nexty) {
        this.text = AssetManager.get(text, stage).data
        console.log(this.text);
        
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

        // 全体マップサイズ
        this.mapWidth = map[0].length * GS
        this.mapHeight = map.length * GS

        // 初期位置設定
        player.x = nextx
        player.y = nexty
    },
    move(player, blockGroup) {
        player.move()
        var offset = this.calcOffset(player)

        this.absdisX += offset.vx
        this.absdisY += offset.vy

        // 端で動かないよう
        if (this.absdisX < 0) {
            offset.vx = 0
            this.absdisX = 0
        } else if (this.absdisX > this.mapWidth - SCREEN_WIDTH) {
            offset.vx -= this.absdisX - (this.mapWidth - SCREEN_WIDTH)
            this.absdisX = this.mapWidth - SCREEN_WIDTH
        }

        if (this.absdisY < 0) {
            offset.vy = 0
            this.absdisY = 0
        } else if (this.absdisY > this.mapHeight - SCREEN_HEIGHT) {
            offset.vy -= this.absdisY - (this.mapHeight - SCREEN_HEIGHT)
            this.absdisY = this.mapHeight - SCREEN_HEIGHT
        }

        player.x += -offset.vx
        player.y += -offset.vy
        blockGroup.children.some(function(block) {
            block.x += -offset.vx
            block.y += -offset.vy
        })
    },
    calcOffset: function(player) {
        var offsetx = player.x - SCREEN_WIDTH / 2
        var offsety = player.y - SCREEN_HEIGHT / 2

        return { vx: offsetx, vy: offsety }
    },
})
