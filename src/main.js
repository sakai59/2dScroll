import phina from 'phina.js'
phina.globalize()

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/assets/CONSTANT'
import Player from '@/class/Player'
import Map from '@/class/Map'

phina.define('MainScene', {
    superClass: 'DisplayScene',
    init() {
        this.superInit()
        this.backgroundColor = 'skyblue'

        this.playerGroup = DisplayElement().addChildTo(this)
        this.player = Player()
            .setPosition(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)
            .addChildTo(this.playerGroup)

        this.blockGroup = DisplayElement().addChildTo(this)
        this.coinGroup = DisplayElement().addChildTo(this)
        this.enemyGroup = DisplayElement().addChildTo(this)
        this.map = Map(this.blockGroup,this.coinGroup,this.enemyGroup)
        this.map.loading('text','stage_kuri',this.player,900,200);

    },
    update() {
        this.collision(this.playerGroup, this.blockGroup)
        this.collision(this.enemyGroup, this.blockGroup)
        this.getCoin(this.playerGroup, this.coinGroup)
        this.map.move(this.player);
        this.collision2(this.playerGroup,this.enemyGroup)

    },
    getCoin(playerG, coinG) {
        playerG.children.forEach(player => {
            coinG.children.forEach(coin => {
                if (Collision.testRectRect(player, coin)) {
                    coin.hit()
                }                
            })
        })
     },
    collision(attacks, defences) {
        attacks.children.forEach(attack => {
            defences.children.forEach(defence => {
                // newRect 横にvx,縦にvy移動した先からattackの大きさ分とった四角
                const nextUpDownRect = Rect(
                    attack.left,
                    attack.top + attack.vy,
                    attack.width,
                    attack.height
                )

                if (Collision.testRectRect(nextUpDownRect, defence)) {
                    if (attack.vy > 0) {
                        attack.bottom = defence.top
                        attack.vy = 0
                        attack.jFlag = false
                    } else if (attack.vy < 0) {
                        attack.top = defence.bottom
                        attack.vy = 0
                    }
                }
                
                const nextSideRect = Rect(
                    attack.left + attack.vx,
                    attack.top,
                    attack.width,
                    attack.height
                )

                if (Collision.testRectRect(nextSideRect, defence)) {
                    attack.hit(attack)
                    if (attack.vx < 0) {
                        attack.left = defence.right
                    } else if (attack.vx > 0) {
                        attack.right = defence.left
                    }
                }
            })
        })
    },
    collision2(attacks, defences) {
        attacks.children.forEach(attack => {
            defences.children.forEach(defence => {
                // newRect 横にvx,縦にvy移動した先からattackの大きさ分とった四角
                const nextUpDownRect = Rect(
                    attack.left,
                    attack.top + attack.vy,
                    attack.width,
                    attack.height
                )

                if (Collision.testRectRect(nextUpDownRect, defence)) {
                    if (attack.vy > 0) {
                        attack.bottom = defence.top
                        attack.jump()
                    } else if (attack.vy < 0) {
                        attack.down()
                    }
                }
                
                const nextSideRect = Rect(
                    attack.left + attack.vx,
                    attack.top,
                    attack.width,
                    attack.height
                )

                if (Collision.testRectRect(nextSideRect, defence)) {
                    attack.down()
                }
            })
        })
    },
})
