Milestone = {
	loader: PIXI.loader,
	path: "/examples/images/",
	packages: [],
	count: 0,
	autoload: function(resource) {
		if(typeof resource == "Array") {
			for(var n = 0;n < resource.length;n++) {
				console.log("["+(n + 1)+"]:Asset loaded: ",this.loader.add(this.path + resource[n]));
				this.packages.push(resource[n]);
				this.count++;
			}
		} else {
			console.log("Single asset loaded: ",this.loader.add(this.path + resource));
			this.packages[0] = resource;
			this.count++;
		}
		this.loader.load(setup);
		console.log(this.packages);
		return this.packages;
	},


}
