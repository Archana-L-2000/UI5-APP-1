sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"ARCH_PM_UI5ARCH_PM_UI5/libs/sweetalert2.all.min"
], function(Controller,History,arlert) {
	"use strict";
var notino,zpm_notidetails;
	/*global Swal:true*/
var dateType = new sap.ui.model.type.Date({
  source: {pattern: "yyyy-MM-dd"}, pattern: "dd.MM.yyyy"
  });
	return Controller.extend("ARCH_PM_UI5ARCH_PM_UI5.controller.view5", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view5
		 */
			
			onInit : function(oEvent){
		
		    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("view5").attachMatched(this.onNotiDet, this);
			//oRouter.getRoute("view5").attachMatched(this.onNotiCause, this);
			},
			
			onNotiDet:function(oEvent){
				var oModel = oEvent.getParameter("arguments").notino;
			notino = oModel;
			var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_MAINTENANCE_AL_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

//ZNOTIF_DETAILSSet('10000051')
			oModel.read("ZNOTIF_DETAILSSet('" + notino + "')", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, response) {
					sap.m.MessageToast.show("SUCCESS");
					zpm_notidetails = oData;
					//window.localStorage.setItem("name",uname);
				},
				error: function(oData, response) {
					sap.m.MessageToast.show("No Data Found");
					return;
				}
			});


			var odataModel1 = new sap.ui.model.json.JSONModel();
			odataModel1.setData({
				"noti_details": zpm_notidetails

			});
			this.getView().byId("SimpleFormToolbar").setModel(odataModel1);
			var oText = this.getView().byId("SimpleFormToolbar");
			oText.bindElement({
				path: "/noti_details"
			});
			//this.byId('name').setText(zpm_notidetails.NotifNo);
			},
			
			onNotiCause:function(oEvent){
				//var oModel = oEvent.getParameter("arguments").notino;
			//notino = oModel;
			var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_MAINTENANCE_AL_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

//ZNOTIF_DETAILSSet('10000051')
			oModel.read("ZNOTIFY_CAUSESet('" + notino + "')", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, response) {
					sap.m.MessageToast.show("SUCCESS");
					zpm_notidetails = oData;
					//window.localStorage.setItem("name",uname);
				},
				error: function(oData, response) {
					sap.m.MessageToast.show("No Data Found");
					return;
				}
			});

if(zpm_notidetails.NotifNo == "No data"){
			Swal.fire({
						icon: 'warning',
						title: 'NO DATA FOUND',
						text: 'NO DATA!!!'
							//footer: '<a href="">Why do I have this issue?</a>'
					});
		}
			var odataModel1 = new sap.ui.model.json.JSONModel();
			odataModel1.setData({
				"noti_details": zpm_notidetails

			});
			this.getView().byId("noti-cause").setModel(odataModel1);
			this.getView().byId("noti-cause").setVisible(true);
			// var oText = this.getView().byId("SimpleFormToolbar");
			// oText.bindElement({
			// 	path: "/noti_details"
			// });
			},
			//ZNOTIFYITEM001Set('000010000031')
			onNotiItem:function(){
				var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_MAINTENANCE_AL_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

//ZNOTIF_DETAILSSet('10000051')
			oModel.read("ZNOTIFYITEM001Set('" + notino + "')", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, response) {
					sap.m.MessageToast.show("SUCCESS");
					zpm_notidetails = oData;
					//window.localStorage.setItem("name",uname);
				},
				error: function(oData, response) {
					sap.m.MessageToast.show("No Data Found");
					return;
				}
			});

if(zpm_notidetails.NotifNo == "No Data"){
			Swal.fire({
						icon: 'warning',
						title: 'NO DATA FOUND',
						text: 'NO DATA!!!'
							//footer: '<a href="">Why do I have this issue?</a>'
					});
		}
			var odataModel1 = new sap.ui.model.json.JSONModel();
			odataModel1.setData({
				"noti_details": zpm_notidetails

			});
			this.getView().byId("noti-item").setModel(odataModel1);
				this.getView().byId("noti-item").setVisible(true);
			// var oText = this.getView().byId("SimpleFormToolbar");
			// oText.bindElement({
			// 	path: "/noti_details"
			// });
			},
			//ZNOTIFY_PARTNRSet('10000031')
			onNotiPartner:function()
			{
					var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_MAINTENANCE_AL_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);


			oModel.read("ZNOTIFY_PARTNRSet('" + notino + "')", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, response) {
					sap.m.MessageToast.show("SUCCESS");
					zpm_notidetails = oData;
					//window.localStorage.setItem("name",uname);
				},
				error: function(oData, response) {
					sap.m.MessageToast.show("No Data Found");
					return;
				}
			});


			var odataModel1 = new sap.ui.model.json.JSONModel();
			odataModel1.setData({
				"noti_details": zpm_notidetails

			});
			this.getView().byId("noti-partnr").setModel(odataModel1);
			this.getView().byId("noti-partnr").setVisible(true);
			// var oText = this.getView().byId("SimpleFormToolbar");
			// oText.bindElement({
			// 	path: "/noti_details"
			// });
		if(zpm_notidetails.ObjectNo == "No Data"){
			Swal.fire({
						icon: 'warning',
						title: 'NO DATA FOUND',
						text: 'NO DATA!!!'
							//footer: '<a href="">Why do I have this issue?</a>'
					});
		}
			},
			
			onNotiTask:function(){
				var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_MAINTENANCE_AL_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

//ZNOTIFY_TASKSet('10000031')
			oModel.read("ZNOTIFY_TASKSet('" + notino + "')", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, response) {
					sap.m.MessageToast.show("SUCCESS");
					zpm_notidetails = oData;
					//window.localStorage.setItem("name",uname);
				},
				error: function(oData, response) {
					sap.m.MessageToast.show("No Data Found");
					return;
				}
			});
if(zpm_notidetails.NotifNo == "No Data"){
			Swal.fire({
						icon: 'warning',
						title: 'NO DATA FOUND',
						text: 'NO DATA!!!'
							//footer: '<a href="">Why do I have this issue?</a>'
					});
		}

			var odataModel1 = new sap.ui.model.json.JSONModel();
			odataModel1.setData({
				"noti_details": zpm_notidetails

			});
			this.getView().byId("noti-task").setModel(odataModel1);
			this.getView().byId("noti-task").setVisible(true);
			// var oText = this.getView().byId("SimpleFormToolbar");
			// oText.bindElement({
			// 	path: "/noti_details"
			// });	
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

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view5
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view5
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view5
		 */
		//	onExit: function() {
		//
		//	}
		
		

	});

});