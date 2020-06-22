import Phaser from 'phaser';
import { Sky } from '../objects/sky.object';
import { Ground } from '../objects/ground.object';
import { Player } from '../objects/player.object';
import { Bomb } from '../objects/bomb.object';
import { Stars } from '../objects/stars.group';
import { Score } from '../objects/score';

export default class GameScene extends Phaser.Scene {

  private sky: Sky;
  private ground: Ground;
  private player: Player;
  private bombs: Bomb;
  private stars: Stars;
  private score: Score;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super('');

    this.sky = new Sky(this);
    this.ground = new Ground(this);
    this.player = new Player(this);
    this.bombs = new Bomb(this);
    this.stars = new Stars(this);
    this.score = new Score(this);
  }

  preload() {
    this.sky.preload();
    this.ground.preload();
    this.player.preload();
    this.bombs.preload();
    this.stars.preload();
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.sky.create();
    this.ground.create();
    this.player.create();
    this.bombs.create();
    this.stars.create();
    this.score.create();

    this.physics.add.collider(this.player.sprite, this.ground.group);
    this.physics.add.collider(this.stars.group, this.ground.group);
    this.physics.add.collider(this.player.sprite, this.stars.group, this.collectStars, undefined, this);
    this.physics.add.collider(this.bombs.group, this.ground.group);
    this.physics.add.collider(this.bombs.group, this.player.sprite, this.player.takeDamage.bind(this.player), undefined, this);

  }

  update() {
    this.player.update(this.cursors);
    // this.bomb.update();
  }

  private collectStars(player: any, star: any) {
    star.disableBody(true, true);
    this.score.score += Phaser.Math.Between(5, 15);
    this.score.updateScore();

    if (this.stars.group.countActive(true) === 0) {
      this.stars.group.children.iterate(child => {
        child.enableBody(true, child.x, 0, true, true);
      });

      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
  
      var bomb = this.bombs.group.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
  
      var bomb = this.bombs.group.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
}