sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ARCH_PM_UI5ARCH_PM_UI5/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("ARCH_PM_UI5ARCH_PM_UI5.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
// 		 init : function() {

// // call the init function of the parent

// UIComponent.prototype.init.apply(this, arguments);



// },
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.getRouter().initialize();
			
			//Model for getting values from a view to other views
		//	this.setModel(new sap.ui.model.json.JSONModel() , "TempDataModel");
		
			
		}
	});
});