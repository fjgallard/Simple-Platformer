import Phaser from 'phaser'
import GameScene from './app/scenes/game.scene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 600 }
		}
	},
	scene: [GameScene]
}

export default new Phaser.Game(config)
