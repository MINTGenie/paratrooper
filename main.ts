controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . 4 . . . . . . . . 
        . . . . . . 4 4 4 . . . . . . . 
        . . . . . . . 4 . . . . . . . . 
        . . . . . . . 4 . . . . . . . . 
        . . . . . . . 4 . . . . . . . . 
        . . . . . . . 4 . . . . . . . . 
        . . . . . 4 4 4 4 4 . . . . . . 
        `, Paratrooper, 0, -80)
    projectile.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.destroy()
})
info.onLifeZero(function () {
    Paratrooper.destroy(effects.fire, 500)
    pause(500)
    game.over(false, effects.splatter)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.ashes, 50)
    info.changeScoreBy(1)
    if (info.score() == 10) {
        Paratrooper.destroy()
        Devil.destroy()
        pause(500)
        game.over(true, effects.confetti)
    }
})
let Devil: Sprite = null
let projectile: Sprite = null
let Paratrooper: Sprite = null
Paratrooper = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . 7 . . . . . . . . 
    . . . . . . . 9 . . . . . . . . 
    . . . . . . . 8 . . . . . . . . 
    . . . . . . . 9 . . . . . . . . 
    . . . . . . . 8 . . . . . . . . 
    . . . . . . . 9 . . . . . . . . 
    . . . . . . . 2 . . . . . . . . 
    . . . . . . . 9 . . . . . . . . 
    . . . . . . . 9 . . . . . . . . 
    . . . . . . 9 9 9 . . . . . . . 
    . . . . . 9 9 e 9 9 . . . . . . 
    . . . . 9 9 e 9 e 9 9 . . . . . 
    . . . 9 9 e 9 9 9 e 9 9 . . . . 
    . . 9 9 e 9 9 2 9 9 e 9 9 . . . 
    9 9 9 9 9 9 2 9 2 9 9 9 9 9 9 9 
    `, SpriteKind.Player)
Paratrooper.setPosition(80, 110)
controller.moveSprite(Paratrooper, 100, 0)
info.setLife(3)
info.setScore(0)
game.onUpdateInterval(randint(1000, 5000), function () {
    Devil = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Enemy)
    Devil.setVelocity(0, 50)
    Devil.setPosition(randint(0, 120), 0)
})
