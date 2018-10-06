phina.globalize()
import phina from 'phina.js'

import { ASSETS } from '@/assets/ASSETS'
import main from '@/main'

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/assets/CONSTANT'

phina.main(function() {
    var app = GameApp({
        startLabel: 'main',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        assets: ASSETS,
    })
    app.enableStats() //fpsの表示
    app.run()
})
