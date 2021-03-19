const mousePos={
	x:0, y:0
}
const soonDead = [];
const enemies = [];
const rays = [];


const upgradeImgs=[
	"imgs/upgrades/ammo.png",
	"imgs/upgrades/maxHp.png",
	"imgs/upgrades/restoreHp.png",
	"imgs/upgrades/dmgBuff.png"
]
const upgradePrices = {
	ammo: 1000,
	maxHp: 5000,
	restoreHp: 500,
	dmgBuff: 7500
}
const pricesGrowth = {
	ammo: 150,
	maxHp: 1000,
	restoreHp: 50,
	dmgBuff: 10000
}
const settings={
	showHpBars: true,
	showReloadAnimation: true,
	showDeathAnimation: true,
	showRays:true
}

const gunUpgrades={
	shotgun: 1,
	ar: 1,
	sniper: 1
}

const gunSprites={
	shotgun: [
		"imgs/guns/shotgun1Sprite.png",
		"imgs/guns/shotgun2Sprite.png",
		"imgs/guns/shotgun3Sprite.png"
	],
	ar: [
		"imgs/guns/ar1sprite.png",
		"imgs/guns/ar2sprite.png",
		"imgs/guns/ar3sprite.png"
	],
	sniper: [
		"imgs/guns/sniper1sprite.png",
		"imgs/guns/sniper2sprite.png",
		"imgs/guns/sniper3sprite.png"
	]
}