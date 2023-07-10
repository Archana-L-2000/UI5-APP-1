sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox",
	'sap/ui/core/Fragment',
	'sap/ui/core/IconPool'
], function(Controller, History, MessageBox, Fragment, IconPool) {
	"use strict";
	var user;
	return Controller.extend("ARCH_PM_UI5ARCH_PM_UI5.controller.view2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view2
		 */
		onInit: function() {
			// 	set mock model
			// 	var b = [];
			// 	var c = {};
			// 	//Fiori Theme font family and URI
			// 	var t = {
			// 		fontFamily: "SAP-icons-TNT",
			// 		fontURI: sap.ui.require.toUrl("sap/tnt/themes/base/fonts/")
			// 	};
			// 	//Registering to the icon pool
			// 	IconPool.registerFont(t);
			// 	b.push(IconPool.fontLoaded("SAP-icons-TNT"));
			// 	c["SAP-icons-TNT"] = t;
			// 	//SAP Business Suite Theme font family and URI
			// 	var B = {
			// 		fontFamily: "BusinessSuiteInAppSymbols",
			// 		fontURI: sap.ui.require.toUrl("sap/ushell/themes/base/fonts/")
			// 	};
			// 	//Registering to the icon pool
			// 	IconPool.registerFont(B);
			// 	b.push(IconPool.fontLoaded("BusinessSuiteInAppSymbols"));
			// 	c["BusinessSuiteInAppSymbols"] = B;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("view2").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function(oEvent) {
			var oModel = oEvent.getParameter("arguments").user;
			user = oModel;
			// var odataModel = new sap.ui.model.json.JSONModel();
			//         var data = oModel.user;

			//var oRes = oData.user;
			// OR var oModel = sap.ui.getCore().getModel("viewCartData");
		},
	
		onlogout: function() {
			var oBusy = new sap.m.BusyDialog({
				// showCancelButton: true,
				canButtonText: true,
				customIconRotationSpeed: 0,

				customIcon: "Images/load-rings.gif",
				customIconHeight: "100px",
				customIconWidth: "100px",
				text: "Logging you Out" + " "+user,
				title: "Getting signin page"
			});
			// $.ajax({
			// 	url:"",
			// 	type:"GET"
			// 	beforeSend(){
			// 		oBusy.open();
			// 	},
			// 	success:function(){

			// 			oBusy.close();
			// 	},
			// 	error:function(){
			// 		oBusy.close();	
			// 	}
			// });

			oBusy.open();
			window.setTimeout(function() {
				oBusy.close();

			}, 3000);

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("view1",{
				user : undefined 
			
			});
		},
		onsubmit: function() {

			// var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_ARCH_SRV/";
			var zpm_notify;
			var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_MAINTENANCE_AL_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
			//ZNOTIFYSet?$filter=PlantId eq '0001'
			oModel.read("ZNOTIFYSet?$filter=PlantId eq " + "'" + user + "'", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, response) {
					sap.m.MessageToast.show("SUCCESS");
					zpm_notify = oData.results;
					//window.localStorage.setItem("name",uname);
				},
				error: function(oData, response) {
					sap.m.MessageToast.show("No Data Found");
					return;
				}
			});

			var odataModel = new sap.ui.model.json.JSONModel();
			odataModel.setData({
				"results": zpm_notify
			});
			//sap.ui.getCore().byId('container').setModel(odataModel);
			this.byId("container").setModel(odataModel);
			// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// oRouter.navTo("view3");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("view3",{
						user : user
					});
		},

		OnBack: function() {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getOwnerComponent().getRouter().navTo("view1");
			}

		},
		workorder: function() {
			var zpm_workOrder;
			var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_MAINTENANCE_AL_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

			oModel.read("ZPM_WORKORDERSet", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, response) {
					sap.m.MessageToast.show("WORKORDER SUCCESS");
					zpm_workOrder = oData.results;
					//window.localStorage.setItem("name",uname);
				},
				error: function(oData, response) {
					sap.m.MessageToast.show("No Data Found");
					return;
				}
			});

			var odataModel = new sap.ui.model.json.JSONModel();
			odataModel.setData({
				"workorder": zpm_workOrder
			});
			//sap.ui.getCore().byId('container').setModel(odataModel);
			// this.byId("workorder").setModel(odataModel);
		},
		onpress: function() {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("view3");
		},
		onwork: function() {
			// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// oRouter.navTo("view4");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("view4",{
						user : user
					});
		}

		// 	onInit : function () {
		// 	this.getOwnerComponent().getRouter().getRoute("orderDetails").attachPatternMatched(this._onRouteMatched, this);
		// },
		// _onRouteMatched: function(oEvent) {
		// 	this._orderId = oEvent.getParameter("arguments").orderId;
		// 	this.getView().bindElement("/orders/" + this._orderId);
		// },
		// onSelectionChange: function(oEvent) {
		// 	var sProductId = oEvent.getSource().getBindingContext().getProperty("productId");
		// 	this.getOwnerComponent().getRouter()
		// 		.navTo("productDetails",
		// 			{orderId:this._orderId, productId: sProductId});
		// },
		// onNavBack : function() {
		// 	var sPreviousHash = History.getInstance().getPreviousHash();

		// 	//The history contains a previous entry
		// 	if (sPreviousHash !== undefined) {
		// 		history.go(-1);
		// 	} else {
		// 		// There is no history!
		// 		// Naviate to master page
		// 		this.getOwnerComponent().getRouter().navTo("master", {}, true);
		// 	}
		// }

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view2
		 */
		//	onExit: function() {
		//
		//	}

	});

});