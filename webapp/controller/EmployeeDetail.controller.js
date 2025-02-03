sap.ui.define([
	"project1/controller/Base.controller",
    "project1/controller/EmployeeDetail.controller",
], function(
	Controller
) {
	"use strict";

	return Controller.extend("project1.controller.EmployeeDetail", {
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("RouteEmployeeDetail").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent) {
			var oArgs, oView;

			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();

			oView.bindElement({
				path: "/Employees(" + oArgs.EmployeeID + ")",
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function (oEvent2) {
						oView.setBusy(true);
					},
					dataReceived: function (oEvent3) {
						oView.setBusy(false);
					}
				} 
			});
		},

		_onBindingChange: function (oEvent) {
			if(!this.getView().getBindingContext()){
				this.getRouter().getTargets().display("TargetNotFound");
			}
		}

	});
});