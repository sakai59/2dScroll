import phina from 'phina.js'
phina.globalize()
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/assets/CONSTANT'


export default phina.define('Coin', {
    superClass: 'Sprite',
    init() {
        this.superInit('coin', 40, 48)
    },
    hit() {
        this.remove()
    }
})
