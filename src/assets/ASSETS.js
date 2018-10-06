export const ASSETS = {
    image: {
        chicken: 'https://cldup.com/rz25KCxIW5.png',
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