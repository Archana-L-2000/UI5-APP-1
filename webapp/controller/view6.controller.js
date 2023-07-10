sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"ARCH_PM_UI5ARCH_PM_UI5/libs/sweetalert2.all.min"
], function(Controller,History) {
	"use strict";
var oid;
var zpm_workdetails,zpm_work_oper,zpm_work_partnr,zpm_work_comp ;

 
	/*global Swal:true*/
	return Controller.extend("ARCH_PM_UI5ARCH_PM_UI5.controller.view6", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view6
		 */
			onInit: function() {
		 var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("view6").attachMatched(this.onWorkOrdDet, this);
			},

onWorkOrdDet:function(oEvent){
		var oModel = oEvent.getParameter("arguments").oid;
			oid = oModel;
			
			 var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_MAINTENANCE_AL_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
//ZWORKORDERDETSet('4000004')
			oModel.read("ZWORKORDERDETSet('" + oid + "')", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, response) {
					sap.m.MessageToast.show("SUCCESS");
					zpm_workdetails = oData;
					//window.localStorage.setItem("name",uname);
				},
				error: function(oData, response) {
					sap.m.MessageToast.show("No Data Found");
					return;
				}
			});

			var odataModel1 = new sap.ui.model.json.JSONModel();
			odataModel1.setData({
				"order_details": zpm_workdetails

			});
			this.getView().setModel(odataModel1);
			
			this.getView().byId("SimpleFormToolbar").setModel(odataModel1);
			var oText = this.getView().byId("SimpleFormToolbar");
			oText.bindElement({
				path: "/order_details"
			});
},
//ZWORKORDDET_OPERSet('4000005')
 onWorkOper:function(){
 	 var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_MAINTENANCE_AL_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
//ZWORKORDERDETSet('4000004')
			oModel.read("ZWORKORDDET_OPERSet('" + oid + "')", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, response) {
					sap.m.MessageToast.show("SUCCESS");
					zpm_work_oper = oData;
					
					//window.localStorage.setItem("name",uname);
				},
				error: function(oData, response) {
					sap.m.MessageToast.show("No Data Found");
					return;
				}
			});

			var odataModel1 = new sap.ui.model.json.JSONModel();
			odataModel1.setData({
				"order_details": zpm_work_oper

			});
			
		
	this.getView().byId("Table").setModel(odataModel1);		
		this.getView().byId('Table').setVisible(true);

			// this.getView().byId("SimpleFormToolbar").setModel(odataModel1);
			var oText = this.getView().byId("Table");
			oText.bindElement({
				path: "/order_details"
			});
 },
 onWorkComp:function(){
 	 var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_MAINTENANCE_AL_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
//ZWORKORDDET_COMPSet('4000004')
			oModel.read("ZWORKORDDET_COMPSet('" + oid + "')", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, response) {
					sap.m.MessageToast.show("SUCCESS");
					zpm_work_comp = oData;
					
				},
				error: function(oData, response) {
					sap.m.MessageToast.show("No Data Found");
					return;
				}
			});

			var odataModel1 = new sap.ui.model.json.JSONModel();
			odataModel1.setData({
				"order_details": zpm_work_comp

			});
			this.getView().byId('CompTable').setModel(odataModel1);
			this.getView().byId('CompTable').setVisible(true);
		if(zpm_work_comp.OrderId == "nodata"){
			Swal.fire({
						icon: 'warning',
						title: 'NO DATA FOUND',
						text: 'NO DATA!!!'
							//footer: '<a href="">Why do I have this issue?</a>'
					});
		}	
			
		
 },
 //ZWORKORDDET_PARTNRSet('4000004')
 onWorkPatnr:function(){
 	 var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_MAINTENANCE_AL_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

			oModel.read("ZWORKORDDET_PARTNRSet('" + oid + "')", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, response) {
					sap.m.MessageToast.show("SUCCESS");
					zpm_work_partnr = oData;
					//window.localStorage.setItem("name",uname);
				},
				error: function(oData, response) {
					sap.m.MessageToast.show("No Data Found");
					return;
				}
			});

			var odataModel1 = new sap.ui.model.json.JSONModel();
			odataModel1.setData({
				"order_details": zpm_work_partnr

			});
			this.getView().byId('PartnrTable').setModel(odataModel1);
				this.getView().byId('PartnrTable').setVisible(true);
		if(zpm_work_partnr.OrderId == "No Data"){
			Swal.fire({
						icon: 'warning',
						title: 'NO DATA FOUND',
						text: 'NO DATA!!!'
							//footer: '<a href="">Why do I have this issue?</a>'
					});
		}
			
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
		
// jQuery(function() { 
//   var oTable = new sap.ui.table.Table({
//     visible: false,
//     selectionMode : sap.ui.table.SelectionMode.None
//   });

//   oTable.addColumn(new sap.ui.table.Column({
//     label: new sap.ui.commons.Label({text: "Actual"}), 
//     width: '100px',
//     template: new sap.ui.commons.TextField({
//       value:"{actual}",
//       textAlign: sap.ui.core.TextAlign.Right,
//     })
//   }));


//   oTable.addColumn(new sap.ui.table.Column({
//     label: new sap.ui.commons.Label({text: "Lower"}),
//     width: '100px',
//     template: new sap.ui.commons.TextView({
//       text:"{ll}", 
//       textAlign: sap.ui.core.TextAlign.Right})
//   }));

//   oTable.addColumn(new sap.ui.table.Column({
//     label: new sap.ui.commons.Label({text: "Upper"}), 
//     width: '100px',
//     template: new sap.ui.commons.TextView({
//       text: "{ul}",
//       textAlign: sap.ui.core.TextAlign.Right
//     })
//   }));

//   // create some local data
//   var aData = [
//     {actual: 2, ll: 1, ul: 10, test: true},
//     {actual: 2, ll: -1, ul: 100, test: true},
//   ];

//     var btn = new sap.ui.commons.Button({
//     text: 'Show/hide', 
//     press: function(e) {
//         oTable.setVisible(oTable.getVisible() === false);  
//     }
//     });
//     btn.placeAt('content');
    
    
//     var oModel = new sap.ui.model.json.JSONModel();
//     oModel.setData({modelData: aData});
//     oTable.setModel(oModel);
//     oTable.bindRows("/modelData");
//     oTable.placeAt("content");		

    
//  });

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view6
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view6
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view6
		 */
		//	onExit: function() {
		//
		//	}

	});

});