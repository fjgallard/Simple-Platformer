export class Player {
  scene: Phaser.Scene;
  sprite!: Phaser.Physics.Arcade.Sprite;

  health: number;
  healthText!: Phaser.GameObjects.Text;

  invulnerable: boolean;
  playerJumpCounter: number;
  playerJumping: boolean;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.health = 100;
    this.playerJumpCounter = 2;
    this.playerJumping = false;
    this.invulnerable = false;
  }

  preload() {
    this.scene.load.spritesheet('dude', 'dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.sprite = this.scene.physics.add.sprite(100, 450, 'dude');
    this.sprite.setBounce(0.2);
    this.sprite.setCollideWorldBounds(true);

    this.addPlayerAnimations();

    this.healthText = this.scene.add.text(16, 16, `Health: ${this.health}`, { fontSize: '32px', fill: '#000' });
  }

  update(cursors) {
    if (cursors.left?.isDown) {
      this.sprite.setVelocityX(-160);
      this.sprite.anims.play('left', true);
    }
  
    else if (cursors.right?.isDown) {
      this.sprite.setVelocityX(160);
      this.sprite.anims.play('right', true);
    }
  
    else {
      this.sprite.setVelocityX(0);
      this.sprite.anims.play('turn');
    }
  
    if (cursors.up?.isDown && this.playerJumpCounter && !this.playerJumping) {
      this.sprite.setVelocityY(-350);
      this.playerJumping = true;
      this.playerJumpCounter--;
    }
  
    if (cursors.up?.isUp) {
      this.playerJumping = false;
    }
  
    if (cursors.up?.isUp && this.sprite.body.touching.down && this.playerJumpCounter < 2) {
      this.playerJumpCounter = 2;
    }
  }

  takeDamage() {
    if (this.invulnerable) {
      return;
    }
    this.health -= 5;
    this.sprite.setTint(0xff0000);
    this.toggleInvulnerability();

    setTimeout(() => {
      this.sprite.clearTint();
      this.toggleInvulnerability();
    }, 1000);

    this.updateHealthText();
  }

  toggleInvulnerability() {
    this.invulnerable = !this.invulnerable;
  }

  updateHealthText() {
    this.healthText.setText(`Health: ${this.health}`);
  }

  private addPlayerAnimations() {
    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }
}