function Gun(type=0,lvl=0, additionalAmmo=0){
	this.x = W-390;
	this.y = H-300;
	this.type = type;
	switch(type){
		default:
		case 0:
			this.dmg=60;
			this.maxAmmo=7;
			this.reloadTime=110;
			this.name='Pistol';
			this.sprite = "imgs/guns/pistolSprite.png";
			this.shot = function(x,y,deathAnimation, visibleRay){
				if(!this.emptyMag()){
					for (i=0; i <enemies.length; i++){
						const x1 = enemies[i].x;
						const y1 = enemies[i].y;
						const x2 = enemies[i].x;
						const y2 = enemies[i].y+enemies[i].h;

						const x3 = this.x;
						const y3 = this.y;
						const x4 = x || this.x-1;
						const y4 = y || this.y;
						
						let mian = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
						if(mian == 0)
							return;
						let t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/mian;
						let u = -((x1-x2)*(y1-y3)-(y1-y2)*(x1-x3))/mian;
						if(t > 0 && t < 1 && u > 0){
							let dx = x1+t*(x2-x1);
							let dy  =y1 + t*(y2-y1);
							if(visibleRay===true){
								let r = new Ray(this.x, this.y, dx, dy, this.hitZone);
								rays.push(r);
							}
							enemies[i].takeDmg(this.dmg);
							if(!enemies[i].isAlive()){
								enemies[i].kill();
								player.getMoney(enemies[i].dropMoney());
								if(deathAnimation===true)
									soonDead.push(enemies[i]);
								enemies.splice(i,1);
							}
						this.ammo--;
						return;
						} 
					}
					this.ammo--;
				}
			}
		break;
		case 1:
			this.name = 'Shotgun';
			switch(lvl){
				default:
				case 1:
					this.sprite = "imgs/guns/shotgun1Sprite.png";
					this.lvl = 1;
					this.dmg=13;
					this.maxAmmo=3;
					this.reloadTime=100;
					this.pelletCount=5;
					this.spread = 70;
					this.price = 15000;
				break;
				case 2:
					this.sprite = "imgs/guns/shotgun2Sprite.png";
					this.lvl = 2;
					this.dmg=15;
					this.maxAmmo=5;
					this.reloadTime=130;
					this.pelletCount=7;
					this.spread = 100;
					this.price = 30000;
				break;
				case 3:
					this.sprite = "imgs/guns/shotgun3Sprite.png";
				 	this.lvl = 3;
					this.dmg=20;
					this.maxAmmo=2;
					this.reloadTime=60;
					this.pelletCount=10;
					this.spread = 120;
					this.price = 70000;
				break;
			}
			this.shot = function(x,y,deathAnimation, visibleRay){
				if(!this.emptyMag()){
					let spread = (1-x/this.x)*this.spread;
					for(j=0;j<this.pelletCount;j++){
						for (i=0; i <enemies.length; i++){
							const x1 = enemies[i].x;
							const y1 = enemies[i].y;
							const x2 = enemies[i].x;
							const y2 = enemies[i].y+enemies[i].h;

							const x3 = this.x;
							const y3 = this.y;
							const x4 = x;
							const y4 = y+Math.random()*spread-spread;
							
							let mian = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
							if(mian == 0)
								return;
							let t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/mian;
							let u = -((x1-x2)*(y1-y3)-(y1-y2)*(x1-x3))/mian;
							if(t > 0 && t < 1 && u > 0){
								let dx = x1+t*(x2-x1);
								let dy  =y1 + t*(y2-y1);
								if(visibleRay===true){
									let r = new Ray(this.x, this.y, dx, dy, this.hitZone);
									rays.push(r);
								}
								enemies[i].takeDmg(this.dmg);
								if(!enemies[i].isAlive()){
									enemies[i].kill();
									player.getMoney(enemies[i].dropMoney());
									if(deathAnimation===true)
										soonDead.push(enemies[i]);
									enemies.splice(i,1);
								}
							break;
							} 
						}
					}
					this.ammo--;
				}

			}
		break;
		case 2:
			this.name='Ar';
			switch(lvl){
				default:
				case 1:
					this.sprite = "imgs/guns/ar1sprite.png";
					this.lvl = 1;
					this.dmg=40;
					this.maxAmmo=10;
					this.reloadTime=40;
					this.burst=2;
					this.recoil=30;
					this.price = 17000;
				break;
				case 2:
					this.sprite = "imgs/guns/ar2sprite.png";
					this.lvl = 2;
					this.dmg=52;
					this.maxAmmo=15;
					this.reloadTime=50;
					this.burst=4;
					this.recoil=30;
					this.price = 45000;
				break;
				case 3:
					this.sprite = "imgs/guns/ar3sprite.png";
					this.lvl = 3;
					this.dmg=68;
					this.maxAmmo=22;
					this.reloadTime=45;
					this.burst=5;
					this.recoil=40;
					this.price = 65000;
				break;
			}
			this.shot = function(x,y,deathAnimation, visibleRay){
				for(j=0;j<this.burst;j++){
					if(!this.emptyMag()){
						for (i=0; i <enemies.length; i++){
							const x1 = enemies[i].x;
							const y1 = enemies[i].y;
							const x2 = enemies[i].x;
							const y2 = enemies[i].y+enemies[i].h;

							const x3 = this.x;
							const y3 = this.y;
							const x4 = x;
							const y4 = y+Math.random()*this.recoil-this.recoil;
							
							let mian = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
							if(mian == 0)
								return;
							let t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/mian;
							let u = -((x1-x2)*(y1-y3)-(y1-y2)*(x1-x3))/mian;
							if(t > 0 && t < 1 && u > 0){
								let dx = x1+t*(x2-x1);
								let dy  =y1 + t*(y2-y1);
								if(visibleRay===true){
									let r = new Ray(this.x, this.y, dx, dy, this.hitZone);
									rays.push(r);
								}
								enemies[i].takeDmg(this.dmg);
								if(!enemies[i].isAlive()){
									enemies[i].kill();
									player.getMoney(enemies[i].dropMoney());
									if(deathAnimation===true)
										soonDead.push(enemies[i]);
									enemies.splice(i,1);
								}
								break;
							} 
						}
					this.ammo--;
					}					
				}
			}
		break;
		case 3:
			this.name = 'Sniper rifle';
			switch(lvl){
				default:
				case 1:
					this.sprite = "imgs/guns/sniper1sprite.png";
					this.lvl = 1;
					this.dmg=110;
					this.maxAmmo=5;
					this.reloadTime=160;
					this.price = 30000;
				break;
				case 2:
					this.sprite = "imgs/guns/sniper2sprite.png";
					this.lvl = 2;
					this.dmg=140;
					this.maxAmmo=7;
					this.reloadTime=120;
					this.price = 45000;
				break;
				case 3:
					this.sprite = "imgs/guns/sniper3sprite.png";
					this.lvl = 3;
					this.dmg=200;
					this.maxAmmo=10;
					this.reloadTime=80;
					this.price = 50000;
				break;
			}
			this.shot = function(x,y,deathAnimation, visibleRay){
				if(!this.emptyMag()){
					for (i=0; i <enemies.length; i++){
						const x1 = enemies[i].x;
						const y1 = enemies[i].y;
						const x2 = enemies[i].x;
						const y2 = enemies[i].y+enemies[i].h;

						const x3 = this.x;
						const y3 = this.y;
						const x4 = x || this.x-1;
						const y4 = y || this.y;
						
						let mian = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
						if(mian == 0)
							return;
						let t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/mian;
						let u = -((x1-x2)*(y1-y3)-(y1-y2)*(x1-x3))/mian;
						if(t > 0 && t < 1 && u > 0){
							let dx = x1+t*(x2-x1);
							let dy  =y1 + t*(y2-y1);
							if(visibleRay===true){
								let r = new Ray(this.x, this.y, dx, dy, this.hitZone);
								rays.push(r);
							}
							enemies[i].takeDmg(this.dmg);
							if(!enemies[i].isAlive()){
								enemies[i].kill();
								player.getMoney(enemies[i].dropMoney());
								if(deathAnimation===true)
									soonDead.push(enemies[i]);
								enemies.splice(i,1);
							}
						this.ammo--;
						return;
						} 
					}
					this.ammo--;
				}
			}
		break;
	}
	this.additionalAmmo=additionalAmmo;
	this.maxAmmo +=this.additionalAmmo;
	this.ammo=this.maxAmmo;
	this.dmgBuff = false;
	this.hitZone = 3;
	this.reloadTimeout=0;

	this.increseMagSize = function(){
		this.additionalAmmo++;
		this.ammo = this.maxAmmo+this.additionalAmmo;
	}

	this.reload = function(x,y, showReload){
		this.reloadTimeout++;
		if(showReload===true){
			c.beginPath();
			c.lineWidth = 4;
			c.strokeStyle = 'white';
			c.arc(x,y,20,0,2*Math.PI,false);
			c.stroke()
			c.beginPath()
			c.strokeStyle = 'black';
			c.arc(x,y,20,0,2*Math.PI*(this.reloadTimeout/this.reloadTime),false);
			c.stroke();
			c.lineWidth=1;
		}
		if(this.reloadTimeout === this.reloadTime){
			this.ammo = this.maxAmmo+this.additionalAmmo;
			this.reloadTimeout=0;
		}
	}

	this.getStats = function(){
		return{
			type: this.type,
			price: this.price,
			sprite: this.sprite,
			name: this.name,
			lvl: this.lvl,
			maxAmmo: this.maxAmmo,
			additionalAmmo: this.additionalAmmo,
			dmg: this.dmg,
			reloadTime: this.reloadTime,
			spread: this.spread? this.spread: 0,
			pelletCount: this.pelletCount? this.pelletCount: 0,
			burst: this.burst? this.burst: 0,
			recoil: this.recoil? this.recoil: 0
		}
	}

	this.instantRefill = function(){
		this.ammo = this.maxAmmo+this.additionalAmmo;
		this.reloadTimeout=0;
	}

	this.emptyMag = function(){
		if(this.ammo<=0)
			return 1;
		return 0;
		
	}

	this.addAmmo = function(){
		return this.additionalAmmo;
	}

	this.doubleDamage = function(){
		if(this.dmgBuff===false){
			this.dmg *=2;
			this.dmgBuff=true;
		}
	}

	this.expireBuffs = function(){
		if(this.dmgBuff===true){
			this.dmg /=2;
			this.dmgBuff = false;
		}
	}
}

class Ray{

	constructor(x1, y1, x2, y2, hitZone){
		this.timeout=0;
		this.x1=x1;
		this.x2=x2;
		this.y1=y1;
		this.y2=y2;
		this.hitZone=hitZone;
	}

	show(){
		c.beginPath();
		c.moveTo(this.x1,this.y1);
		c.lineTo(this.x2,this.y2);
		c.stroke();
		c.arc(this.x2,this.y2, this.hitZone, 0, 2*Math.PI, false);
		c.fill();
	}

	disapeare(){
		this.timeout++;
		if(this.timeout === 10 ){
			return 1;
		}	else {
			this.show();
		}
	}

}
