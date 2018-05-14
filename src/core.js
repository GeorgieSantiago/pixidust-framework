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
	Player: function(spritename , position = {0,0})
	{
		var player = new Sprite(id[spritename]);
		player.x = 68;
		player.y = gameScene.height / 2 - explorer.height / 2;
		player.vx = 0;
		player.vy = 0;
		gameScene.addChild(player);
		return player;
	},

	/*
	 *	@param String spritename, Object position, Array options
	 *	@return PIXI.Sprite object
	 * */
	Objects: function(spritename,position={x: 0, y:; 0},options=[])
	{
		var object = new Sprite(id[spritename]);
		object.position.set(position.x , position.y)
		if(options.length > 0)
		{
			console.log(options);
		}
		
		return object;
	},

	Controller: function()
	{
		return false;
	},

	Enemy: function()
	{
		return false;
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
