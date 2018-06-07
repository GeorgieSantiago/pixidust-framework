var Dust = {

	StageList: [],
	Configuration: {},
	Resource: [],
	WorldObjects: {},
	Init: function(config={})
	{

	},
	/*
	 * @param Array resources
	 * @return Void
	 */
	Autoload: function(resources)
	{
		if(resources.length >= 1)
		{
			for(var n = 0;n < resources.length;n++)
			{
				loader.add("images/"+resources[n])
					this.Resource.push("images/" + resources[n]);
			}
		} else {
			console.error("Please add resources to the Autoloader");
		}
		loader.load(setup);
	},

	/*
	 *	@param String resource[index]
	 *	@return PIXI.Sprite player
	 * */
	Player: function(spritename , position = {x: 0, y: 0})
	{
		var player = new Sprite(id[spritename]);
		player.x = 68;
		player.y = gameScene.height / 2 - player.height / 2;
		player.vx = 0;
		player.vy = 0;
		gameScene.addChild(player);
		return player;
	},

	Controller: function()
	{
		//Capture the keyboard arrow keys
	  let left = keyboard(37),
	      up = keyboard(38),
	      right = keyboard(39),
	      down = keyboard(40);

	  //Left arrow key `press` method
	  left.press = function() {

	    //Change the explorer's velocity when the key is pressed
	    explorer.vx = -5;
	    explorer.vy = 0;
	  };

	  //Left arrow key `release` method
	  left.release = function() {

	    //If the left arrow has been released, and the right arrow isn't down,
	    //and the explorer isn't moving vertically:
	    //Stop the explorer
	    if (!right.isDown && explorer.vy === 0) {
	      explorer.vx = 0;
	    }
	  };

	  //Up
	  up.press = function() {
	    explorer.vy = -5;
	    explorer.vx = 0;
	  };
	  up.release = function() {
	    if (!down.isDown && explorer.vx === 0) {
	      explorer.vy = 0;
	    }
	  };

	  //Right
	  right.press = function() {
	    explorer.vx = 5;
	    explorer.vy = 0;
	  };
	  right.release = function() {
	    if (!left.isDown && explorer.vy === 0) {
	      explorer.vx = 0;
	    }
	  };

	  //Down
	  down.press = function() {
	    explorer.vy = 5;
	    explorer.vx = 0;
	  };
	  down.release = function() {
	    if (!up.isDown && explorer.vx === 0) {
	      explorer.vy = 0;
	    }
	  };

	  //Set the game state
	  state = play;

	  //Start the game loop
	  app.ticker.add(delta => gameLoop(delta));
	},
	
	HealthBar: function()
	{
				var healthBar = new Container();
				healthBar.position.set(app.stage.width - 170, 4)
					gameScene.addChild(healthBar);

				let innerBar = new Graphics();
				innerBar.beginFill(0x000000);
				innerBar.drawRect(0, 0, 128, 8);
				innerBar.endFill();
				healthBar.addChild(innerBar);

				let outerBar = new Graphics();
				outerBar.beginFill(0xFF3300);
				outerBar.drawRect(0, 0, 128, 8);
				outerBar.endFill();
				healthBar.addChild(outerBar);

				healthBar.outer = outerBar;

				return healthBar;

	},

	/*
	 *	@param String spritename, Object position, Array options
	 *	@return PIXI.Sprite object
	 * */
	Objects: function(spritename,position={x: 0, y: 0},options={})
	{
		var object = new Sprite(id[spritename]);
		object.position.set(position.x , position.y)
			if(options.length > 0)
			{
				object = $.extend({}, object,options);
			}

		gameScene.addChild(object);

		return object;
	},

	Controller: function()
	{
		return false;
	},

	Enemy: function(count , name , settings={})
	{
		settings.custom = settings.custom || {};
		let numberOfBlobs = count,
		spacing = settings.spacing || 48,
		xOffset = settings.xOffset || 150,
		speed = settings.speed || 2,
		directionY = settings.directionY || 1,
		directionX = settings.directionX || 1;

		//An array to store all the blob monsters
		blobs = [];

		//Make as many blobs as there are `numberOfBlobs`
		for (let i = 0; i < numberOfBlobs; i++) {

			//Make a blob
			let blob = new Sprite(id[name]);

			//Space each blob horizontally according to the `spacing` value.
			//`xOffset` determines the point from the left of the screen
			//at which the first blob should be added
			let x = spacing * i + xOffset;

			//Give the blob a random y position
			let y = randomInt(0, app.stage.height - blob.height);

			//Set the blob's position
			blob.x = x;
			blob.y = y;

			//Set the blob's vertical velocity. `direction` will be either `1` or
			//`-1`. `1` means the enemy will move down and `-1` means the blob will
			//move up. Multiplying `direction` by `speed` determines the blob's
			//vertical direction
			blob.vy = speed * directionY;
			if(directionX)
			{
				blob.vx = speed * directionX;
			}

			//Reverse the direction for the next blob
			directionY *= -1;
			directionX *= -1;

			if(settings.length > 1) {
				$.extend({},blobs,settings.custom);
			}
			//Push the blob into the `blobs` array
			blobs.push(blob);

			//Add the blob to the `gameScene`
			gameScene.addChild(blob);

		}

		if(settings.custom.build == true && blobs.length == 1)
		{
			//TODO ohhhh this is the custom monster builder area :D
			console.log("More to do here");
		} else {
			return blobs;
		}
	},

	//TODO Create a custom monster controller here and return that
	/*
	 * @param PIXI.Sprite => Dust.Enemy
	 * @return PIXI.Sprite => Dust.Enemy => Dust.CustomEnemy
	 * @description
	 * */

	World: function()
	{
		var gameScene = new Container();
		app.stage.addChild(gameScene);
		return gameScene;
	},

	Collision: function()
	{
		return false;
	},

	Component: function()
	{
		return false;
	},

	CollisionHandler: function()
	{

	},

	GameOver: function(settings={})
	{
		gameOverScene = new Container();
		app.stage.addChild(gameOverScene);
		gameOverScene.visible = false;

		return gameOverScene
	},

	StageShift: function(Condition)
	{
		console.log(Condition , this.StageList);
	}
}
