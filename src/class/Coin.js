import phina from 'phina.js'
phina.globalize()
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/assets/CONSTANT'


export default phina.define('Coin', {
    superClass: 'Sprite',
    init() {
        this.superInit('coin', 32, 32)
        this.frameIndex = 6;

    },
    hit() {
        this.remove()
    }
})
