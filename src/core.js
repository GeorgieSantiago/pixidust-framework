var Dust = {

   StageList: [],
   Configuration: {},

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
      //TODO change hte add method param to the Array past
      console.log(resources);
      loader
        .add("images/treasureHunter.json")
        .load(setup);
    },

    Player: function()
    {
      return false;
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
      return false;
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
