sap.ui.define([
	"project1.controller.Base",
    "project1.controller.NotFound"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("project1.controller.NotFound", {
		/**
		 * @override
		 */
		onInit: function() {
			Controller.prototype.onInit.apply(this, arguments);
			
			
		}

	});
});