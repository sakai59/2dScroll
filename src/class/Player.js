import phina from 'phina.js'
phina.globalize()
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/assets/CONSTANT'
const [LEFT, RIGHT, UP, DOWN, STOP] = ['left', 'right', 'up', 'down', 'stop']

export default phina.define('Player', {
    superClass: 'Sprite',
    init() {
        this.superInit('chicken', 40, 48)

        this.MAXVX = 8

        this.ax = 2
        this.vx = 0
        this.vy = 0

        this.spritesheet = FrameAnimation('chickenSS').attachTo(this)

        this.direction = DOWN

        this.jFlag = false
    },

    changeDirection(key) {
        if (key.getKey('left')) {
            this.direction = LEFT
            this.vx -= this.ax
        }
        if (key.getKey('right')) {
            this.direction = RIGHT
            this.vx += this.ax
        }
        if (key.getKey('up')) this.direction = UP
        if (key.getKey('down')) this.direction = DOWN

        this.spritesheet.gotoAndPlay(this.direction)
    },
    jump(key) {
        if (!this.jFlag) {
            if (key.getKey('space')) {
                this.jFlag = true
                this.vy = -15
            }
        }
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
    movePos() {
        // 慣性,最高速
        if (this.vx > 0) {
            this.vx = Math.min(Math.abs(this.vx), this.MAXVX)
            this.vx -= this.ax / 4
        }
        if (this.vx < 0) {
            this.vx = Math.min(Math.abs(this.vx), this.MAXVX) * -1
            this.vx += this.ax / 4
        }
        this.vy += 1

        // this.x += this.vx
        // this.y += this.vy
    },
    move() {
        // 移動距離を入れる
        this.x += this.vx
        this.y += this.vy
    },
    hit(attack) {this.vx = 0 },
    update(app) {
        this.key = app.keyboard
        this.changeDirection(this.key)
        this.jump(this.key)

        this.checkScreenIn()
        this.movePos()

    },
    down() {
        console.log('damage');
        
    }
})
