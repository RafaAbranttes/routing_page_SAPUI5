sap.ui.define(["project1/controller/Base.controller"], (Controller) => {
  "use strict";

  return Controller.extend("project1.controller.View1", {
    onInit() {},

    onObjectListItemPress: function (oEvent) {
      var oItem, oCtx;
      oItem = oEvent.getSource();
      oCtx = oItem.getBindingContext();
      this.getRouter().navTo("RouteEmployeeDetail", {
        EmployeeID: oCtx.getProperty("EmployeeID"),
      });
    },
    onNewButtonPress: function (oEvent) {
      this.getRouter().navTo("RouteEmployeeDetail", {
        EmployeeID: "New",
      });
    }
  });
});
