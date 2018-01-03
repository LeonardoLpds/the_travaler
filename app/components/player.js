Player = function(game) {
    this.game = game;
    this.player = null;

    this.createAnimatons = function() {
        this.player.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.player.animations.add('walk', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
        this.player.animations.add('jump', [18, 19, 20, 21, 22, 23, 24, 25], 10, true);
        this.player.animations.add('fall', [28, 29, 30, 31, 32, 33, 34, 35], 10, true);
        this.player.animations.add('death', [36, 37], 5, true);
        this.player.animations.add('run', [38, 39, 40, 41, 42, 43], 12, true);
    }

    this.spawnPlayer = function(x, y){
        // Cria o player
        this.player = this.game.add.sprite(x, y, 'player');

        // Carrega animações
        this.createAnimatons();

        // Permite física
        this.game.physics.arcade.enable(this.player);

        // Definições do corpo
        this.player.body.gravity.y = 1400;
        this.player.body.setSize(32,60,16,4);
        this.player.animations.play("idle");
        this.player.anchor.setTo(0.5);

        // Define método de morte do player
        this.player.death = function(){
            game.sounds.bgm.stop();
            game.sounds.death.play();
            game.state.start("Game Over", false, false, this);
        };
    }

    this.move = function(keys, sounds) {
        if (keys.up.isDown && this.player.body.onFloor()) {
            game.sounds.jump.play();
            this.player.body.velocity.y = -500;
        }
        if (keys.left.isDown) {
            if(keys.left.run) this.player.body.velocity.x = -200;
            else this.player.body.velocity.x = -100;

            this.player.scale.x = -1;
            this.moveAnimation();
        } else if (keys.right.isDown){
            if(keys.right.run) this.player.body.velocity.x = 200;
            else this.player.body.velocity.x = 100;

            this.player.scale.x = 1;
            this.moveAnimation();
        } else {
            this.player.body.velocity.x = 0;
            this.stillAnimation();
        }
    }

    this.moveAnimation = function() {
        if (this.player.body.velocity.y < 0) {
            this.player.animations.play("jump");
        } else if (this.player.body.velocity.y > 0) {
            this.player.animations.play("fall");
        } else if (Math.abs(this.player.body.velocity.x) > 100) {
            this.player.animations.play("run");
        } else {
            this.player.animations.play("walk");
        }
    }

    this.stillAnimation = function() {
        if (this.player.body.velocity.y < 0) {
            this.player.animations.play("jump");
        } else if (this.player.body.velocity.y > 0) {
            this.player.animations.play("fall");
        } else {
            this.player.animations.play("idle");
        }
    }
}