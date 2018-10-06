import phina from 'phina.js'
phina.globalize()

import Player from '@/class/Player';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/assets/CONSTANT'


phina.define('MainScene', {
    // 継承
    superClass: 'DisplayScene',
    // コンストラクタ
    init() {
        this.superInit()
        this.backgroundColor = 'skyblue'

        this.playerGroup = DisplayElement().addChildTo(this)
        Player()
            .setPosition(SCREEN_WIDTH / 2, SCREEN_HEIGHT)
            .addChildTo(this.playerGroup)
    },
    update() {},
})


