import phina from 'phina.js'
phina.globalize()
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/assets/CONSTANT'

export default phina.define('Coin', {
    superClass: 'Sprite',
    init() {
        this.superInit('hiyoko', 32, 32)
        this.vy = 0
        this.vx = 2
    },
    update() {
        this.vy += 1
    },
    move() {
        // 移動距離を入れる
        this.x += this.vx
        this.y += this.vy
    },
    checkScreenIn() {
        const screenRect = Rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

        // 地面
        if (this.bottom > screenRect.bottom) {
            this.bottom = screenRect.bottom
            this.vy = 0
            this.jFlag = false
        }

        // 画面外に出ないように設定
        if (this.left < screenRect.left) this.left = screenRect.left
        if (screenRect.right < this.right) this.right = screenRect.right
        if (screenRect.top > this.top) this.top = screenRect.top
    },
    hit() {
        this.vx *= -1
    },
    remove() {
        this.remove()
    }
})
