var canvas = document.querySelector("#canvas");
const H = canvas.height = window.innerHeight;
const W = canvas.width = window.innerWidth;
const c = canvas.getContext("2d");
var day=0;
var max=12;
var enemiesTypes=0;
var STATUS = 'MENU';
var PREVIOUS ='';
var created = 0;
var soonDead = [];
var enemies = [];
var rays = [];
var player = new Player;
var spawnRate = 0.993;
var mousePos={
	x:0, y:0
}
var mainScreenImg = new Image();
mainScreenImg.src = 'imgs/mainScreen.png';
var background = new Image();
background.src = 'imgs/background.png';
var currentGunSprite = new Image();
var upgradeImgs=[
	"imgs/upgrades/ammo.png",
	"imgs/upgrades/maxHp.png",
	"imgs/upgrades/restoreHp.png",
	"imgs/upgrades/dmgBuff.png"
]
var upgradePrices = {
	ammo: 1000,
	maxHp: 5000,
	restoreHp: 500,
	dmgBuff: 7500
}
var pricesGrowth = {
	ammo: 150,
	maxHp: 1000,
	restoreHp: 50,
	dmgBuff: 10000
}
var settings={
	showHpBars: true,
	showReloadAnimation: true,
	showDeathAnimation: true,
	showRays:true
}
var sampleGun = new Gun;
var sampleGunImg = new Image;

var gunUpgrades={
	shotgun: 1,
	ar: 1,
	sniper: 1
}
var gunSprites={
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
var shotgunSprite = new Image();
	shotgunSprite.src = gunSprites.shotgun[gunUpgrades.shotgun-1];
var arSprite = new Image();
	arSprite.src = gunSprites.ar[gunUpgrades.ar-1];
var sniperSprite = new Image();
	sniperSprite.src = gunSprites.sniper[gunUpgrades.sniper-1];
animate();


canvas.addEventListener('click', function(evt) {
	switch(STATUS){
		case 'MENU':
			if(mousePos.x>=100 && mousePos.x<= 500 && mousePos.y>=H/2-150 && mousePos.y<=H/2-40){
				nextDay();
				STATUS = 'COMBAT';
			}
			if(mousePos.x>=100 && mousePos.x<= 500 && mousePos.y>=H/2 && mousePos.y<=H/2+90){
				PREVIOUS = 'MENU';
				STATUS='SETTINGS';
			}
		break;
		case 'COMBAT':
			if(mousePos.x>=W-350 && mousePos.x<=W-150 && mousePos.y>=25 && mousePos.y<=65)
					STATUS = 'PAUSE';
			else
				player.gun.shot(mousePos.x, mousePos.y, settings.showDeathAnimation, settings.showRays);
			break;
		case 'PAUSE': 
			if(mousePos.x>=W/2-150 && mousePos.x<=W/2+150 && mousePos.y>=H/2 && mousePos.y<=H/2+50)
				STATUS = 'COMBAT';
		break;
		case 'DEAD':
			if(mousePos.x>+W/2-150 && mousePos.x<= W/2+150 && mousePos.y>= H/2+70 && mousePos.y<= H/2+120){
				reset();
				STATUS = 'MENU';
			}
		break;
		case 'SETTINGS': 
		let x = W/2-250
		let w = h = 60;
			if(mousePos.y<=H/2-200||mousePos.y>=H/2+200||mousePos.x<=W/2-300||mousePos.x>=W/2+300){
				STATUS = PREVIOUS;
				PREVIOUS='';
			}
			if(mousePos.x>=x && mousePos.x<=x+w && mousePos.y>=H/2-130 && mousePos.y<=H/2-130+h)
				toggleSettings('death');
			if(mousePos.x>=x && mousePos.x<=x+w && mousePos.y>=H/2-55 && mousePos.y<=H/2-55+h)
				toggleSettings('hpBars');
			if(mousePos.x>=x && mousePos.x<=x+w && mousePos.y>=H/2+20 && mousePos.y<=H/2+20+h)
				toggleSettings('rays');
			if(mousePos.x>=x && mousePos.x<=x+w && mousePos.y>=H/2+95 && mousePos.y<=H/2+95+h)
				toggleSettings('reload');

		break;
		case 'SHOP':
			let baseX = W/6+50;
			let baseY = 300;
			let baseW = W/6-100;
			let baseH = W/6-100;
			let step = W/6;
			let height = 150;
			let bufforX = 22.75;
			let bufforY = 35;
			let x2=3*W/6+50
			let y=275+W/6;
			let status = player.getStatus();
			if(mousePos.x>=W-350 && mousePos.x<=W-150 && mousePos.y>=25 && mousePos.y<=65){
				player.gun.instantRefill();
				STATUS	= 'COMBAT';
			}
			if(mousePos.x >=baseX && mousePos.x <= baseX+baseW && mousePos.y >= baseY && mousePos.y <=baseY+baseH ){
				if(status.money-upgradePrices.ammo>=0){
					player.gun.increseMagSize();
					player.spendMoney(upgradePrices.ammo);
					upgradePrices.ammo+=pricesGrowth.ammo;
				}
			}
			if(mousePos.x >=baseX+step && mousePos.x <= baseX+step+baseW && mousePos.y >= baseY && mousePos.y <=baseY+baseH ){	
				if(status.money-upgradePrices.maxHp>=0){
					player.increseMaxHp();
					player.spendMoney(upgradePrices.maxHp);
					upgradePrices.maxHp+=pricesGrowth.maxHp;
				}
			}
			if(mousePos.x >=baseX+2*step && mousePos.x <= baseX+2*step+baseW && mousePos.y >= baseY && mousePos.y <=baseY+baseH ){
				if(status.money-upgradePrices.restoreHp>=0 && status.hp!=status.maxHp){
					player.restoreHp();
					player.spendMoney(upgradePrices.restoreHp);
					upgradePrices.restoreHp+=pricesGrowth.restoreHp;
				}
			}
			if(mousePos.x >=baseX+3*step && mousePos.x <= baseX+3*step+baseW && mousePos.y >= baseY && mousePos.y <= baseY+baseH){
				if(status.money-upgradePrices.dmgBuff>=0){
					player.gun.doubleDamage();
					player.spendMoney(upgradePrices.dmgBuff);
					upgradePrices.dmgBuff+=pricesGrowth.dmgBuff;
				}
			}
			if(mousePos.x>=W/2-100 && mousePos.x<=W/2+100 && mousePos.y>=H-100 && mousePos.y<=H-50){
				PREVIOUS = STATUS;
				STATUS='SETTINGS';
			}

			if(mousePos.x>=x2+1*bufforX && mousePos.x<=x2+1*bufforX+height && mousePos.y>=y+bufforY && mousePos.y<=y+bufforY+height){
				STATUS='DETAILS';
				sampleGun = new Gun(1,gunUpgrades.shotgun);
				sampleGunImg.src = gunSprites.shotgun[gunUpgrades.shotgun-1];
			}
			if(mousePos.x>=x2+2*bufforX+height && mousePos.x<=x2+2*bufforX+2*height && mousePos.y>=y+bufforY && mousePos.y<=y+bufforY+height){
				STATUS='DETAILS';
				sampleGun = new Gun(2,gunUpgrades.ar);
				sampleGunImg.src = gunSprites.ar[gunUpgrades.ar-1];
			}
			if(mousePos.x>=x2+3*bufforX+2*height && mousePos.x<=x2+3*bufforX+3*height && mousePos.y>=y+bufforY && mousePos.y<=y+bufforY+height){
				STATUS='DETAILS';
				sampleGun = new Gun(3,gunUpgrades.sniper);
				sampleGunImg.src = gunSprites.sniper[gunUpgrades.sniper-1];
			}
		break;
		case 'DETAILS':
			let X = W/2-350;
			let Y = H/2-175;
			let wd = 700;
			let hi = 350;
			let Status = player.getStatus();
			if(mousePos.x<=W/2-350 || mousePos.x>=W/2+350 || mousePos.y<=H/2-175 || mousePos.y>=H/2+175)
				STATUS='SHOP';
			if(mousePos.x>=X+wd-225 && mousePos.x<=X+wd-25 && mousePos.y>=Y+hi-75 && mousePos.y<=Y+hi-25){
				if(Status.money>=sampleGun.price){
					upgradeGun(sampleGun.type);
					player.spendMoney(sampleGun.price);
					sampleGun= new Gun(sampleGun.type, sampleGun.lvl<3? sampleGun.lvl+1 : 3);
					if(sampleGun.type ==1){
						sampleGunImg.src = gunSprites.shotgun[sampleGun.lvl-1];
					} else if(sampleGun.type ==2){
						sampleGunImg.src = gunSprites.ar[sampleGun.lvl-1];
					} else if(sampleGun.type ==3){
						sampleGunImg.src = gunSprites.sniper[sampleGun.lvl-1];
					}
				}
			}
	}
}, false);

canvas.addEventListener('mousemove', function(evt) {
	let mouse = getMousePos(canvas, evt);
	mousePos.x = mouse.x;
	mousePos.y = mouse.y;
}, false);

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}


function animate(){
	requestAnimationFrame(animate);
	switch(STATUS){
		case 'COMBAT':
			c.clearRect(0, 0, canvas.width, canvas.height);
			c.drawImage(background, 0,90,W,H);
			drawStats();
			player.show();
			player.showBaracade();
			createEnemies();
			enemies.sort(compareValues('x'))
			for(i=0; i<soonDead.length; i++){
				soonDead[i].dead() ? soonDead.splice(i,1) : soonDead[i].showDeath();
			}
			if(settings.showRays===true){
				for(i=0; i<rays.length; i++){
					if(rays[i].disapeare()){
						rays.splice(i, 1);
					}
				}
			}
			for(i=0;i<enemies.length;i++){
				if(enemies[i].alive){
					enemies[i].show();
					enemies[i].update();
				}
				if(enemies[i].damaged()&&settings.showHpBars===true){
					enemies[i].showHpBar();
				}
				if(enemies[i].dangerous()){
					player.takeDmg(enemies[i].dealDmg());
					let status = player.getStatus();
					if(status.hp<=0){
						STATUS = 'DEAD';
					}
				}
			}
			if(created === max && enemies.length === 0 && soonDead.length === 0){
				player.gun.instantRefill();
				nextDay();
				player.gun.expireBuffs();
				STATUS = 'SHOP';
				
			}
			if(player.gun.emptyMag())
				player.gun.reload(mousePos.x, mousePos.y,settings.showReloadAnimation);
		break;
		case 'MENU':
			mainMenu();
		break;
		case 'SETTINGS':
			settingsScreen();
		break;
		case 'PAUSE':
			pauseScreen();
		break;
		case 'DEAD':
			deadScreen();
		break;
		case 'SHOP':
			shopLayout();
		break;
		case 'DETAILS':
			gunUpgradeInterface();
	}
}

function drawStats(){
	c.fillStyle= 'rgb(82, 79, 78)';
	c.fillRect(0,0,W,90);
	c.rect(150,25,200,40);
	c.strokeStyle='black';
	c.stroke();
	let status = player.getStatus();
	c.fillStyle = 'rgb(222, 222, 222)';
	c.fillRect(151, 26, 198, 38);
	c.fillRect(W-850, 25, 400, 40);
	c.fillStyle = "rgb(89, 110, 64)";
	c.fillRect(151, 26, (status.ammo/status.maxAmmo)*198, 38);	
	c.font = '30px serif';
	c.fillStyle = 'black';
	c.fillText(status.maxAmmo+" / "+status.ammo, 400, 55);
	c.fillText(status.money+"$", 650, 55);
	c.fillText("HP", W-440,55);
	c.fillText("day "+day, 900,55);
	c.fillStyle = 'rgb(128, 126, 126)';
	c.fillRect(W-350,25,200,40);
	c.fillStyle = 'rgb(222, 222, 222)';
	c.fillText("PAUSE", W-295, 55);
	c.fillStyle = 'rgb(117, 30, 11)';
	c.fillRect(W-849,26,(status.hp/status.maxHp)*398, 38);
}

function createEnemies(){
	if(created!=max){
		let chance = Math.random();
		if(chance>spawnRate){
			let type = Math.round(Math.random()*enemiesTypes);
			let enemy = new Enemy(type, -40);
			enemies.push(enemy);
			created++;
		}
	}
}

function nextDay(){
	max +=day;
	day++; 
	//day 0 - default guy
	day===4 ? enemiesTypes++ : enemiesTypes+=0; // ar guy
	day===10 ? enemiesTypes++ : enemiesTypes+=0; // boomer 
	day===15 ? enemiesTypes++ : enemiesTypes+=0;	// shield boi
	// day===4 ? enemiesTypes++ : enemiesTypes+=0;	// motorcycle dude?
	// day===5 ? enemiesTypes++ : enemiesTypes+=0;	// motherfucking tank babe
	created = 0;
	let enemy = new Enemy(enemiesTypes,-40);
	enemies.push(enemy);
	created++;
	spawnRate-=0.001;
}

function mainMenu(){
	c.drawImage(mainScreenImg, 0,0,W,H);
	c.fillStyle = 'rgb(69, 80, 97)';
	c.fillRect(100, H/2-150,400, 90);
	c.fillRect(100, H/2,400, 90);
	c.fillStyle = 'rgb(171, 181, 196)';
	c.font = '68px serif';
	c.fillText('NEW GAME', 118, H/2-82);
	c.fillText('SETTINGS', 143.3, H/2+68);
}

function settingsScreen(){
	PREVIOUS==='MENU' ? mainMenu() : shopLayout();
	c.fillStyle = '#abb5c4';
	c.beginPath();
	c.fillRect(W/2-300,H/2-200,600,400);
	c.font = '35px serif';
	c.fillStyle='rgb(69, 80, 97)';
	c.rect(W/2-300,H/2-200,600,400);
	c.strokeStyle = 'rgb(69, 80, 97)';
	c.stroke();
	c.beginPath();
	c.moveTo(W/2-300,H/2-160);
	c.lineTo(W/2+300,H/2-160);
	c.stroke();
	c.fillText("Settings", W/2-54.5, H/2-170);
	c.font = '30px serif';
	c.fillText("Show enemies death animations", W/2-175, H/2-90);
	if(settings.showDeathAnimation===true){
		c.lineWidth=3;
		c.beginPath();
		c.moveTo(W/2-250,H/2-130);
		c.lineTo(W/2-190,H/2-70);
		c.stroke();
		c.beginPath();
		c.moveTo(W/2-250,H/2-70);
		c.lineTo(W/2-190,H/2-130);
		c.stroke();
		c.lineWidth=1;
	}
	c.rect(W/2-250, H/2-130,60,60);
	c.stroke();
	c.fillText("Show enemies hp bars", W/2-175, H/2-15);
	if(settings.showHpBars===true){
		c.lineWidth=3;
		c.beginPath();
		c.moveTo(W/2-250,H/2-55);
		c.lineTo(W/2-190,H/2+5);
		c.stroke();
		c.beginPath();
		c.moveTo(W/2-250,H/2+5);
		c.lineTo(W/2-190,H/2-55);
		c.stroke();
		c.lineWidth=1;
	}
	c.rect(W/2-250, H/2-55,60,60);
	c.stroke();
	c.fillText("Show rays", W/2-175, H/2+60);
	if(settings.showRays===true){
		c.lineWidth=3;
		c.beginPath();
		c.moveTo(W/2-250,H/2+20);
		c.lineTo(W/2-190,H/2+80);
		c.stroke();
		c.beginPath();
		c.moveTo(W/2-250,H/2+80);
		c.lineTo(W/2-190,H/2+20);
		c.stroke();
		c.lineWidth=1;
	}
	c.rect(W/2-250, H/2+20,60,60);
	c.stroke();
	c.fillText("Show reload animation", W/2-175, H/2+135);
	if(settings.showReloadAnimation===true){
		c.lineWidth=3;
		c.beginPath();
		c.moveTo(W/2-250,H/2+95);
		c.lineTo(W/2-190,H/2+155);
		c.stroke();
		c.beginPath();
		c.moveTo(W/2-250,H/2+155);
		c.lineTo(W/2-190,H/2+95);
		c.stroke();
		c.lineWidth=1;
	}
	c.rect(W/2-250, H/2+95,60,60);
	c.stroke();
	c.strokeStyle = 'black';
}

function toggleSettings(setting){
	switch(setting){
		case 'hpBars':
		settings.showHpBars===true ? settings.showHpBars = false : settings.showHpBars=true; break; 
		case 'death':
		settings.showDeathAnimation===true ? settings.showDeathAnimation = false : settings.showDeathAnimation=true; break;
		case 'rays':
		settings.showRays===true ? settings.showRays = false : settings.showRays=true; break;
		case 'reload':
		settings.showReloadAnimation===true ? settings.showReloadAnimation = false : settings.showReloadAnimation=true; break;
	}
}

function reset(){
	enemies.length = 0;
	soonDead.length = 0;
	rays.length = 0;
	day = 0;
	spawnRate = 0.993;
	max=12;
	enemiesTypes=0;
 	player = new Player;
	upgradePrices.ammo= 1000;
	upgradePrices.maxHp= 5000;
	upgradePrices.restoreHp= 500;
	upgradePrices.dmgBuff= 7500;
	gunUpgrades.shotgun=1;
	gunUpgrades.ar = 1;
	gunUpgrades.sniper = 1;
	shotgunSprite.src = gunSprites.shotgun[gunUpgrades.shotgun-1];
	arSprite.src = gunSprites.ar[gunUpgrades.ar-1];
	sniperSprite.src = gunSprites.sniper[gunUpgrades.sniper-1];
}

function pauseScreen(){
	c.fillStyle = 'rgb(82, 79, 78)';
	c.fillRect(0,0,W,H);
	c.fillStyle = 'black';
	c.font = '50px serif';
	c.fillText("GAME PAUSED",W/2-173,H/2-40);
	c.fillStyle = 'rgb(105, 101, 99)';
	c.fillRect(W/2-150,H/2, 300, 50);
	c.font = '36px serif';
	c.fillStyle = 'black';
	c.fillText("UNPAUSE NOW",W/2-129,H/2+38);
}

function deadScreen(){
	c.fillStyle = 'rgb(74, 13, 13)';
	c.fillRect(0,0,W,H);
	c.fillStyle = 'black';
	c.font = '50px serif';
	c.fillStyle = 'rgb(219, 217, 217)';
	c.fillText("GAME OVER:(",W/2-173,H/2-40);
	c.font = '35px serif';
	c.fillText("Survived to day "+day, W/2-120, H/2+40);
	c.strokeStyle = 'rgb(219, 217, 217)';
	c.beginPath();
	c.rect(W/2-150,H/2+70,300,50);
	c.stroke();
	c.font = '30px serif';
	c.fillText('Back to main menu', W/2-116.5,H/2+105);
	c.strokeStyle = 'black';
}

function shopLayout() {
	drawStats();
	c.beginPath();
	c.fillStyle = 'rgb(207, 202, 202)';
	c.fillRect(0,90,W,H);
	c.fillStyle = 'rgb(128, 126, 126)';
	c.fillRect(W-350,25,200,40);
	c.fillStyle = 'rgb(222, 222, 222)';
	c.fillText("next day", W-295, 55);
	c.fillRect(W/6, 250, 2*W/3, H-250);
	let baseX = W/6+50;
	let baseY = 300;
	let baseW = W/6-100;
	let baseH = W/6-100;
	let step = W/6;
	// kafelki z upgrajdami w sklepie
	for(i=0;i<4;i++){
		c.strokeStyle = '#343434';
		c.rect(baseX+i*step, baseY, baseW, baseH);
		c.stroke();
		let upgradeImg = new Image();
		upgradeImg.src = upgradeImgs[i];
		c.drawImage(upgradeImg, baseX+i*step+30, baseY, baseW-60, baseH-60);
	}
	c.strokeStyle='black';
	c.fillStyle = '#343434';
	//napisy z upgradow ze sklepu
	c.font = '25px serif';
	c.fillText(upgradePrices.ammo+"$", baseX+80, baseY+baseH-50);
	c.fillText("Max Ammo +1", baseX+34, baseY+baseH-15);
	c.fillText(upgradePrices.maxHp+"$", baseX+step+80, baseY+baseH-50);
	c.fillText("Max HP +100", baseX+step+39.5, baseY+baseH-15);
	c.fillText(upgradePrices.restoreHp+"$", baseX+2*step+80, baseY+baseH-50);
	c.fillText("Heal 10% max Hp", baseX+2*step+17.5, baseY+baseH-15);
	c.fillText(upgradePrices.dmgBuff+"$", baseX+3*step+75, baseY+baseH-50);	
	c.fillText("Double DMG", baseX+3*step+41.5, baseY+baseH-15);
	c.fillRect(W/2-100,H-100,200,50);
	c.fillStyle = 'rgb(222, 222, 222)';
	c.font= '25px serif';
	c.fillText("Settings",W/2-40, H-67.5);
	currentGunInterface();
}

function currentGunInterface(){
	let x=W/6+50;
	let x2=3*W/6+50
	let y=275+W/6;
	let w=W/3-100;
	let h=W/6-100;
	c.rect(x,y,w,h);
	c.stroke();
	c.font='25px serif';
	c.fillStyle='black';
	let stats = player.gun.getStats();
	let type = stats.lvl ? ' lvl '+stats.lvl : '';
	c.fillText('Current gun: '+stats.name+ type,x+20,y+35);
	c.font='20px serif';


	c.fillText("Additional ammo: "+stats.additionalAmmo,x+20,y+70);
	if(stats.maxAmmo){
		c.fillText("Max ammo: "+stats.maxAmmo,x+20,y+90);
	}
	if(stats.dmg){
		c.fillText("Base dmg: "+stats.dmg,x+20,y+110);
	}
	if(stats.reloadTime){
		c.fillText("Reload Time: "+stats.reloadTime,x+20,y+130);
	}
	if(stats.spread){
		c.fillText("Pellet spread: "+stats.spread,x+20,y+150);
	}
	if(stats.pelletCount){
		c.fillText("Pellet count: "+stats.pelletCount,x+20,y+170);
	}
	if(stats.burst){
		c.fillText("Number of shots in burst: "+stats.burst,x+20,y+150);
	}
	if(stats.recoil){
		c.fillText("Recoil: "+stats.recoil,x+20,y+170);
	}


	currentGunSprite.src = stats.sprite;
	let width = (w-200)/3;
	let height = 150;
	let bufforX = 22.75;
	let bufforY = 35;
	c.rect(x+355,y+bufforY,height,height);
	c.drawImage(currentGunSprite,x+355,y+bufforY,height,height);
	c.stroke();
	for(i=0;i<3;i++){
		c.rect(x2+i*height+(i+1)*bufforX,y+bufforY,height,height);
		c.stroke();
	}
	let lvl = stats.lvl==3 ? 'max upgrade' : "next lvl "+(stats.lvl+1);

	c.drawImage(shotgunSprite,x2+1*bufforX, y+bufforY,150,150);
	c.drawImage(arSprite,x2+2*bufforX+height, y+bufforY,150,150);
	c.drawImage(sniperSprite,x2+3*bufforX+2*height, y+bufforY,150,150);

	c.rect(x2,y,w,h);
	c.stroke();
}

function upgradeGun(type=0){
	switch(type){
		case 1: 
			if(gunUpgrades.shotgun<=3)	{
				// if(gunUpgrades.shotgun===3) maxedOut.shotgun=true;
				shotgunSprite.src=gunSprites.shotgun[gunUpgrades.shotgun==3 ? 2 : gunUpgrades.shotgun]; 	
				player.upgradeGun(type,gunUpgrades.shotgun);
			} 
			gunUpgrades.shotgun<3 ? gunUpgrades.shotgun++ : 0; 
			break;
		case 2: 	
			if(gunUpgrades.ar<=3)	{
				// if(gunUpgrades.ar===3) maxedOut.ar=true;
				arSprite.src=gunSprites.ar[gunUpgrades.ar==3 ? 2 : gunUpgrades.ar];	
				player.upgradeGun(type,gunUpgrades.ar);
			} 
			gunUpgrades.ar<3 ? gunUpgrades.ar++ : 0; 
			break;
		case 3:
			if(gunUpgrades.sniper<=3)	{
				// if(gunUpgrades.sniper===3) maxedOut.sniper=true;
				sniperSprite.src=gunSprites.sniper[gunUpgrades.sniper==3 ? 2 : gunUpgrades.sniper];	 
				player.upgradeGun(type,gunUpgrades.sniper);
			}
			gunUpgrades.sniper<3 ? gunUpgrades.sniper++ : 0; 
			break;
	}
}

function gunUpgradeInterface(){
	shopLayout();
	let stats = sampleGun.getStats();
	let x = W/2-350;
	let y = H/2-175;
	let w = 700;
	let h = 350;
	let width = 200;
	c.strokeStyle='black'
	c.rect(x,y,700,350);
	c.stroke();
	c.strokeStyle='rgb(207, 202, 202)';
	c.fillStyle = 'rgb(207, 202, 202)';
	c.fillRect(x,y,w,h);


	c.fillStyle = 'black';
	c.font = '30px serif';
	c.fillText('Upgrade to: '+stats.name+' lvl '+ stats.lvl,x+20,y+45);
	c.font = '25px serif';
	if(stats.maxAmmo){
		c.fillText("Max ammo: "+stats.maxAmmo,x+20,y+90);
	}
	if(stats.dmg){
		c.fillText("Base dmg: "+stats.dmg,x+20,y+120);
	}
	if(stats.reloadTime){
		c.fillText("Reload Time: "+stats.reloadTime,x+20,y+150);
	}
	if(stats.spread){
		c.fillText("Pellet spread: "+stats.spread,x+20,y+180);
	}
	if(stats.pelletCount){
		c.fillText("Pellet count: "+stats.pelletCount,x+20,y+210);
	}
	if(stats.burst){
		c.fillText("Number of shots in burst: "+stats.burst,x+20,y+180);
	}
	if(stats.recoil){
		c.fillText("Recoil: "+stats.recoil,x+20,y+210);
	}

	c.drawImage(sampleGunImg,x+w-250,y+50,width,width);

	c.font = '25px serif';

	c.fillStyle = 'rgb(65, 116, 158)';
	c.fillRect(x+w-225, y+h-75,200,50);
	c.fillStyle='black';
	c.fillText(stats.price+'$',x+w-157.5, y+h-42,200,50);
}

function compareValues(key, order = 'desc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}