sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "project1/controller/Base.controller"
], function(
	Controller,
	History,
    UIComponent,
    BaseController
) {
	"use strict";

	return Controller.extend("project1.controller.Base", {
        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },

        onNavBack: function () {
            var oHistory, sPreviousHash;

            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();

            if(sPreviousHash !== undefined){
                window.history.go(-1);
            } else {
                this.getRouter().navTo("RouteView1", {}, {},true);
            }
        }
	});
});