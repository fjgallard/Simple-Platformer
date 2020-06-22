export class Ground {
  group!: Phaser.Physics.Arcade.StaticGroup;

  constructor(public scene: Phaser.Scene) {
  }

  preload() {
    this.scene.load.image('ground', 'platform.png');
  }

  create() {
    this.group = this.scene.physics.add.staticGroup();
    this.group.create(400, 568, 'ground').setScale(2).refreshBody();

    this.group.create(600, 400, 'ground');
    this.group.create(50, 250, 'ground');
    this.group.create(750, 220, 'ground');
  }
}