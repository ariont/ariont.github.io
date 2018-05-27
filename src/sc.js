"use strict";

var DrawWarContract = function () {
   LocalContractStorage.defineMapProperty(this, "pointsData");
};

DrawWarContract.prototype = {
    init: function () {
    },

    savePoint: function ( x, y, c) {
        var points = this.pointsData.get("pointsData");
        if (points =="" || points== null) {
          points = []
        }
        points.push({"x":x,"y":y,"color":c})
        this.pointsData.set("pointsData", points);
    },

    getPoints: function () {
      var points = this.pointsData.get("pointsData");
      if (points ==""  || points== null) {
        points = []
      }
    return   points;
    }
};

module.exports = DrawWarContract;
