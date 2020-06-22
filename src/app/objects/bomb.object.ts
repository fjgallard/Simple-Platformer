export class Bomb {

  group!: Phaser.Physics.Arcade.Group;

  constructor(public scene: Phaser.Scene) {}

  preload() {
    this.scene.load.image('bomb', 'bomb.png');
  }

  create() {
    this.group = this.scene.physics.add.group();
  }

  update() {
    /* setTimeout(() => {
      const bomb = this.group.create(Phaser.Math.Between(40, 760), 0, 'bomb');
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(0, Phaser.Math.Between(10, 20));
    }, 3000); */
  }
}