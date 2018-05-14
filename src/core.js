var Dust = {

	StageList: [],
	Configuration: {},
	Resource: [],
	Init: function()
	{

		//Add the canvas that Pixi automatically created for you to the HTML document
		document.body.appendChild(app.view);

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

	Enemy: function(count , name , settings)
	{
		let numberOfBlobs = count,
		spacing = 48,
		xOffset = 150,
		speed = 2,
		direction = 1;

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
			blob.vy = speed * direction;

			//Reverse the direction for the next blob
			direction *= -1;

			if(settings.length > 1) {
				$.extend({},blobs,settings);
			}
			//Push the blob into the `blobs` array
			blobs.push(blob);

			//Add the blob to the `gameScene`
			gameScene.addChild(blob);

		}

		return blobs;
	},

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

	StageShift: function(Condition)
	{
		console.log(Condition , this.StageList);
	}
}
