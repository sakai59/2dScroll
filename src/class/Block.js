import phina from 'phina.js'
phina.globalize()

export default phina.define('Block', {
    superClass: 'RectangleShape',
    init() {
        this.superInit({
            width: 32,
            height: 32,
            fill: 'transparent',
            stroke: 'pink',
        })
        // this.setOrigin(0,0)
    },
})
