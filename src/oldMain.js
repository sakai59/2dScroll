import phina from 'phina.js'

phina.globalize()

var SCREEN_WIDTH = 640
var SCREEN_HEIGHT = 480
var GRAVITY = 1.8
var GS = 32

var [LEFT, RIGHT, UP, DOWN, STOP] = ['left', 'right', 'up', 'down', 'stop']

phina.define('MainScene', {
    superClass: 'DisplayScene',
    // コンストラクタ
    init: function() {
        this.superInit()
        // 背景は黒に
        this.backgroundColor = 'black'
        this.chickenGroup = DisplayElement().addChildTo(this)
        this.chicken = Chicken()
            .addChildTo(this.chickenGroup)
            .setPosition(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)

        this.blockGroup = DisplayElement().addChildTo(this)
        this.map = Map(this.blockGroup)
        this.map.loading('text', 'stage1_1')
    },

    update() {
        this.collisionX_Group(this.chickenGroup, this.blockGroup)
        this.collisionY_Group(this.chickenGroup, this.blockGroup)
        this.chicken.movePos()
        
    },
    collisionX_Group: function(attacks, defences) {
        attacks.children.some(function(attack) {
            var newx = attack.left + attack.vx
            var newrect = Rect(newx, attack.top, attack.width, attack.height)
            defences.children.some(function(defence) {
                if (Collision.testRectRect(newrect, defence)) {
                    // 右に移動中
                    // ジャンプとかで上に当たってもここに来てる
                    if (attack.vx > 0) {
                        attack.right = defence.left
                        attack.vx = 0
                    }
                    // 左に移動中
                    if (attack.vx < 0) {
                        console.log('左にぶつかった')

                        attack.left = defence.right
                        attack.vx = 0
                    }
                    return true
                }
            })
        })
    },
    collisionY_Group: function(attacks, defences) {
        attacks.children.some(function (attack) {
            
            var newy = attack.top + attack.vy
            var newrect = Rect(attack.left, newy, attack.width, attack.height)
            defences.children.some(function(defence) {
                if (Collision.testRectRect(newrect, defence)) {
                    // 下に移動中
                    if (attack.vy > 0) {
                        
                        attack.bottom = defence.top
                        attack.vy = 0
                        attack.onFloor = true
                    }
                    if (attack.vy < 0) {
                        console.log('上にぶつかった')

                        attack.top = defence.bottom
                        attack.vy = 0
                    }
                    return true
                } else {
                    attack.onFloor = false
                }
            })
        })
    },
})

// プレイヤークラス
phina.define('Chicken', {
    superClass: 'Sprite',
    init: function() {
        this.superInit('chicken', 40, 48)

        this.speed = 2
        this.maxvx = 8
        this.maxvy = 14
        this.vx = 0
        this.vy = 0

        this.spritesheet = FrameAnimation('chickenSS')
        this.spritesheet.attachTo(this)

        this.direction = DOWN

        this.onFloor = false
        this.jumpSpeed = 8
        this.jumpCounter = 0
        this.maxjumpCounter = 4

        this.posNeg = 1
        this.collider.show();

    },

    changeDirection() {
        if (this.key.getKey('left')) {
            this.direction = LEFT
            this.vx -= this.speed
        }
        if (this.key.getKey('right')) {
            this.direction = RIGHT
            this.vx += this.speed
        }
        if (this.key.getKey('up')) this.direction = UP
        if (this.key.getKey('down')) this.direction = DOWN

        this.spritesheet.gotoAndPlay(this.direction)

        if (this.direction === RIGHT) this.posNeg = 1
        if (this.direction === LEFT) this.posNeg = -1
    },
    move2(direc) {
        return

        this.direction = direc
        this.spritesheet.gotoAndPlay(this.direction)

        switch (direc) {
            case LEFT:
            case RIGHT:
                this.vx += this.speed
                break
            default:
                break
        }
    },
    jump() {
        if (this.key.getKey('z')) {
            this.onFloor = false
            this.jumpCounter += 1

            if (this.jumpCounter <= this.maxjumpCounter) {
                this.vy += -this.jumpSpeed
            }
        }
    },
    adjScreenIn() {
        const screenRect = Rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

        // 地面
        if (this.bottom > screenRect.bottom) {
            this.bottom = screenRect.bottom
            this.onFloor = true
        }

        // 画面外に出ないように設定
        if (this.left < screenRect.left) this.left = screenRect.left
        if (screenRect.right < this.right) this.right = screenRect.right
        if (screenRect.top > this.top) this.top = screenRect.top
    },
    movePos() {
        // 慣性,最高速
        if (this.vx > 0) {
            this.vx = Math.min(this.vx, this.maxvx)
            this.vx -= this.speed / 4
        }
        if (this.vx < 0) {
            this.vx = Math.max(this.vx, -this.maxvx)
            this.vx += this.speed / 4
        }


        this.x += this.vx
        this.y += this.vy
    },
    checkOnFloor() {
        // // ジャンプ中の落下速度
        // if (!this.onFloor) this.vy = Math.min(this.vy + GRAVITY, this.maxvy)
        if(this.onFloor === false){
            if(this.vy < this.maxvy){
              this.vy += GRAVITY;
            }
          }

        if (this.onFloor) {
            this.jumpCounter = 0
            this.vy = 0
        }
    },
    update: function(app) {
        this.key = app.keyboard

        this.changeDirection()
        this.jump()
        this.adjScreenIn()
        // this.movePos()
        this.checkOnFloor()
    },
})

// ブロック作成
phina.define('Block', {
    superClass: 'RectangleShape',
    init: function(x, y) {
        this.superInit(x, y)
        this.x = x + 16
        this.y = y + 16
        this.width = 32
        this.height = 32
        this.fill = 'transparent'
        this.stroke = 'pink'
    },
})

phina.define('Map', {
    superClass: 'RectangleShape',
    init: function(blockGroup) {
        this.superInit()
        this.blockGroup = blockGroup
    },
    loading: function(text, stage) {
        this.text = AssetManager.get(text, stage).data
        var ary = this.text.split('\n')
        var map = []
        for (var i = 0; i < ary.length; i++) {
            map.push(ary[i].split(''))
        }

        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[0].length; j++) {
                if (map[i][j] === 'B') {
                    Block(j * GS, i * GS).addChildTo(this.blockGroup)
                }
            }
        }

        
    },
})
