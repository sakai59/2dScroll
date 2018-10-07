export const ASSETS = {
    image: {
        chicken: 'https://cldup.com/rz25KCxIW5.png',
        coin: 'https://rawgit.com/sakai59/2dScroll/master/src/assets/piece.png',
        hiyoko: 'https://rawgit.com/minimo/phina.js_advent_20151212/master/hiyoco_nomal_full.png',
    },
    text: {
        // stage1_1: '@/assets/map1.txt',
        // stage1_1:'https://cldup.com/KTURKWzB0x.txt',
        stage1_1: 'https://rawgit.com/sakai59/2dScroll/master/src/assets/map1.txt',
        stage1_2: 'https://rawgit.com/sakai59/2dScroll/master/src/assets/map2.txt',
        stage_coin: 'https://rawgit.com/sakai59/2dScroll/master/src/assets/map_coin.txt',
        stage_kuri: 'https://rawgit.com/sakai59/2dScroll/master/src/assets/map_kuri.txt',
        stage_coinblock: 'https://rawgit.com/sakai59/2dScroll/master/src/assets/map_coinblock.txt',
    },
    spritesheet: {
        chickenSS: {
            frame: {
                width: 40,
                height: 48,
                cols: 6,
                rows: 4,
            },
            animations: {
                right: {
                    frames: [12, 13, 14, 13],
                    next: 'right',
                    frequency: 8,
                },
                left: {
                    frames: [6, 7, 8, 7],
                    next: 'left',
                    frequency: 8,
                },
                up: {
                    frames: [18, 19, 20, 19],
                    next: 'up',
                    frequency: 8,
                },
                down: {
                    frames: [0, 1, 2, 1],
                    next: 'down',
                    frequency: 8,
                },
            },
        },
    },
}
