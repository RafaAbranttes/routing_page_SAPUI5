sap.ui.define([
  "project1/controller/Base"],
   (Controller, controller) => {
  "use strict";

  return Controller.extend("project1.controller.View1", {
    onInit() {},

    onObjectListItemPress: function (oEvent) {
      var oItem, oCtx;
      oItem = oEvent.getSource();
      oCtx = oItem.getBindingContext().getPro;
      this.getRouter().navTo("RouteEmployeeDetail", {
        EmployeeID: oCtx.getProperty("EmployeeID"),
      });
    },
  });
});
