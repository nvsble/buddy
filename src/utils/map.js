import {MAJOR, MINOR} from "./guidance";

export const Map = {
    nodes: [
        {
            id: 1,
            branches: [
                {
                    id: 3,
                    major: MAJOR.DOWN,
                    minor: MINOR.RIGHT
                },
                {
                    id: 4,
                    major: MAJOR.DOWN,
                    minor: MINOR.LEFT
                },
                {
                    id: 6,
                    major: MAJOR.DOWN,
                    minor: MINOR.AHEAD
                }
            ]
        },
        {
            id: 2,
            horizontal: true,
            branches: [
                {
                    id: 3,
                    major: MAJOR.UP,
                    minor: MINOR.AHEAD
                },
                {
                    id: 5,
                    major: MAJOR.UP,
                    minor: MINOR.RIGHT
                }
            ]
        },
        {
            id: 3,
            horizontal: true,
            branches: [
                {
                    id: 4,
                    major: MAJOR.UP,
                    minor: MINOR.AHEAD
                },
                {
                    id: 2,
                    major: MAJOR.DOWN,
                    minor: MINOR.AHEAD
                },
                {
                    id: 6,
                    major: MAJOR.UP,
                    minor: MINOR.RIGHT
                }
            ]
        },
        {
            id: 4,
            horizontal: true,
            branches: [
                {
                    id: 1,
                    major: MAJOR.DOWN,
                    minor: MINOR.RIGHT
                },
                {
                    id: 3,
                    major: MAJOR.DOWN,
                    minor: MINOR.AHEAD
                },
                {
                    id: 6,
                    major: MAJOR.DOWN,
                    minor: MINOR.LEFT
                }
            ]
        },
        {
            id: 5,
            branches: [
                {
                    id: 2,
                    major: MAJOR.UP,
                    minor: MINOR.LEFT
                },
                {
                    id: 3,
                    major: MAJOR.UP,
                    minor: MINOR.RIGHT
                },
                {
                    id: 7,
                    major: MAJOR.DOWN,
                    minor: MINOR.RIGHT
                },
                {
                    id: 8,
                    major: MAJOR.DOWN,
                    minor: MINOR.LEFT
                },
                ,
                {
                    id: 10,
                    major: MAJOR.DOWN,
                    minor: MINOR.AHEAD
                }
            ]
        },
        {
            id: 6,
            branches: [
                {
                    id: 3,
                    major: MAJOR.UP,
                    minor: MINOR.LEFT
                },
                {
                    id: 1,
                    major: MAJOR.UP,
                    minor: MINOR.AHEAD
                },
                {
                    id: 4,
                    major: MAJOR.UP,
                    minor: MINOR.RIGHT
                },
                {
                    id: 8,
                    major: MAJOR.DOWN,
                    minor: MINOR.RIGHT
                },
                {
                    id: 11,
                    major: MAJOR.DOWN,
                    minor: MINOR.AHEAD
                },
                {
                    id: 9,
                    major: MAJOR.DOWN,
                    minor: MINOR.LEFT
                }
            ]
        },
        {
            id: 7,
            horizontal: true,
            branches: [
                {
                    id: 5,
                    major: MAJOR.UP,
                    minor: MINOR.LEFT
                },
                {
                    id: 8,
                    major: MAJOR.UP,
                    minor: MINOR.AHEAD
                },
                {
                    id: 10,
                    major: MAJOR.UP,
                    minor: MINOR.RIGHT
                }
            ]
        },
        {
            id: 8,
            horizontal: true,
            branches: [
                {
                    id: 5,
                    major: MAJOR.DOWN,
                    minor: MINOR.RIGHT
                },
                {
                    id: 7,
                    major: MAJOR.DOWN,
                    minor: MINOR.AHEAD
                },
                {
                    id: 10,
                    major: MAJOR.DOWN,
                    minor: MINOR.LEFT
                },
                {
                    id: 6,
                    major: MAJOR.UP,
                    minor: MINOR.LEFT
                },
                {
                    id: 9,
                    major: MAJOR.UP,
                    minor: MINOR.AHEAD
                },
                {
                    id: 11,
                    major: MAJOR.UP,
                    minor: MINOR.RIGHT
                }
            ]
        },
        {
            id: 9,
            horizontal: true,
            branches: [
                {
                    id: 6,
                    major: MAJOR.DOWN,
                    minor: MINOR.RIGHT
                },
                {
                    id: 8,
                    major: MAJOR.DOWN,
                    minor: MINOR.AHEAD
                },
                {
                    id: 11,
                    major: MAJOR.DOWN,
                    minor: MINOR.LEFT
                }
            ]
        },
        {
            id: 10,
            horizontal: true,
            branches: [
                {
                    id: 7,
                    major: MAJOR.UP,
                    minor: MINOR.LEFT
                },
                {
                    id: 5,
                    major: MAJOR.UP,
                    minor: MINOR.AHEAD
                },
                {
                    id: 8,
                    major: MAJOR.UP,
                    minor: MINOR.RIGHT
                }
            ]
        },
        {
            id: 11,
            horizontal: true,
            branches: [
                {
                    id: 8,
                    major: MAJOR.UP,
                    minor: MINOR.LEFT
                },
                {
                    id: 6,
                    major: MAJOR.UP,
                    minor: MINOR.AHEAD
                },
                {
                    id: 9,
                    major: MAJOR.UP,
                    minor: MINOR.RIGHT
                }
            ]
        }

    ]
}

