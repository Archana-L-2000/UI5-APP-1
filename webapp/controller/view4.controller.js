sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
	
], function(Controller, History) {
	"use strict";
	var user, oid,zpm_workdetails;
	return Controller.extend("ARCH_PM_UI5ARCH_PM_UI5.controller.view4", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view4
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view4
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view4
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view4
		 */
		//	onExit: function() {
		//
		//	}
		onInit: function() {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("view4").attachMatched(this.onWork, this);

		},

		onWork: function(oEvent) {
			var oModel = oEvent.getParameter("arguments").user;
			user = oModel;

			var zpm_workord;

			var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_MAINTENANCE_AL_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

			oModel.read("ZWORKORDLISTSet?$filter=Plant eq " + "'" + user + "'", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, response) {
					sap.m.MessageToast.show("SUCCESS");
					zpm_workord = oData.results;
						for (var i = 0; i < zpm_workord.length; i++) {
						

if (zpm_workord[i]["Orderid"] === '' ) {
zpm_workord[i]["Orderid"] = 'NA';
}
if (zpm_workord[i]["ControlKey"] === '' ) {
zpm_workord[i]["ControlKey"] = 'NA';
}
if (zpm_workord[i]["Funcloc"] === '' ) {
zpm_workord[i]["Funcloc"] = 'NA';
}
if (zpm_workord[i]["WorkCntr"] === '' ) {
zpm_workord[i]["WorkCntr"] = 'NA';
}
if (zpm_workord[i]["EarlSchedFinishDate"] === '' ) {
zpm_workord[i]["EarlSchedFinishDate"] = 'NA';
}
if (zpm_workord[i]["Description"] === '' ) {
zpm_workord[i]["Description"] = 'NA';
}
							if (zpm_workord[i]["ActualStartTime"] === '' ) {
zpm_workord[i]["ActualStartTime"] = 'NA';
}}
						
 


					//window.localStorage.setItem("name",uname);
				},
				error: function(oData, response) {
					sap.m.MessageToast.show("No Data Found");
					return;
				}
			});

			var odataModel = new sap.ui.model.json.JSONModel();
			odataModel.setData({
				"results": zpm_workord

			});
			//var work = zpm_workord.Orderid;
			//sap.ui.getCore().byId('container').setModel(odataModel);
			this.byId("Table").setModel(odataModel);
			var oSorter = new sap.ui.model.Sorter("EarlSchedFinishDate", true);

 this.byId("Table").getBinding('items').sort(oSorter);	
			
		},
		// workorder: function(){
		// 	var zpm_workorder;
		// 	var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_ARCH_SRV/";
		// 	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

		// oModel.read("ZPM_WORKORDERSet" , {
		// 		context: null,
		// 		urlParameters: null,
		// 		async: false,
		// 		success: function(oData, response) {
		// 			sap.m.MessageToast.show("WORKORDER SUCCESS");
		// 			zpm_workorder = oData.results;
		// 			//window.localStorage.setItem("name",uname);
		// 		},
		// 		error: function(oData, response) {
		// 			sap.m.MessageToast.show("No Data Found");
		// 			return;
		// 		}
		// 	});

		// 	var odModel = new sap.ui.model.json.JSONModel();
		// 	odModel.setData({
		// 		"workorder": zpm_workorder
		// 	});
		// 		//sap.ui.getCore().byId('container').setModel(odataModel);
		// this.byId("workorder").setModel(odModel);
		// },

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
		
			onSearch:function(){
	if(this.byId("dateId").getValue() == ""){
		sap.m.MessageToast.show("Enter From Date");
	}
	else if(this.byId("dateGt").getValue() == ""){
			sap.m.MessageToast.show("Enter To Date");
	}
	else{
			var vall = this.byId("dateId").getDateValue();
			var vall1 = this.byId("dateGt").getDateValue();
			var oTable = this.getView().byId("Table");
var binding = oTable.getBinding("items");
var filter = new sap.ui.model.Filter("EarlSchedFinishDate",sap.ui.model.FilterOperator.BT,vall,vall1);
var aTableFilters = [];
aTableFilters.push(filter);
binding.filter(aTableFilters);
//alert(vall);
window.console.log(binding.filter(aTableFilters)); 
}
		},
		
		onReset:function(){
		var oTable = this.getView().byId("Table");
var binding = oTable.getBinding("items");
binding.filter([]);
 this.byId("dateId").setValue('');
this.byId("dateGt").setValue('');
},
		onworkDetails: function(oEvent) {
			
			var oTable = this.getView().byId("Table");
			// var selectedItem = oTable.getSelectedItem();
			// var oCells = selectedItem.getCells();
			// var keys = [];
			// var values = [];
			// for (var i = 0; i < oCells.length; i++) {
			// 	// key = field name in model
			// 	keys.push(oCells[i].getBindingPath("text"));
			// 	// value = field value in model
			// 	values.push(oCells[i].getText());
			// }
var selectedRowdata = oTable.getSelectedContexts()[0].getObject();
 oid = selectedRowdata.Orderid;
 
 
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
		 //sap.ui.getCore().byId("details").setModel(this.getView().getModel());
		//	var oView = this.getView();
	//	create dialog via fragment factory
	
	
	//	var oTable1 = this.getView().byId("details");
		// var oTemplate = new sap.m.ColumnListItem({
		// 		cells: [new sap.m.Text({
		// 			text: "{Orderid}"
		// 		}), new sap.m.Text({
		// 			text: "{OrderType}"
		// 		}),
		// 		new sap.m.Text({
		// 			text: "{Planplant}"
		// 		}),
		// 		new sap.m.Text({
		// 			text: "{BusArea}"
		// 		}),
		// 		new sap.m.Text({
		// 			text: "{MnWkCtr}"
		// 		}),
		// 		new sap.m.Text({
		// 			text: "{Plant}"
		// 		}),
		// 		new sap.m.Text({
		// 			text: "{FunctLoc}"
		// 		})
		// 		]
		// 	});
			
			// oTable1.setModel(oModel);
			// oTable1.bindAggregation("items", {
			// 	path: "/order_details"
			// 	// template: oTemplate
			// });
			
				// var oView = this.getView();
			//var showDialog=this.getview().byId("details_dialog");
			// if(!this.showDialog){
			// this.showDialog = sap.ui.xmlfragment("ARCH_PM_UI5ARCH_PM_UI5.fragments.fragment",this);
			// 	 sap.ui.getCore().byId("details").setModel(this.getView().getModel());
			// }
			// //	this.byId('dialogID').setModel(odataModel1);
			// // oView.addDependent(this.showDialog);
			// this.showDialog.open();
			
			
			if (!this._oDialog) {  
    this._oDialog = sap.ui.xmlfragment("ARCH_PM_UI5ARCH_PM_UI5.fragments.fragment", this);    
    this._oDialog.setModel(this.getView().getModel()); 
     
    // this._oDialog.attachAfterClose(function() {
    //     delete this._oDialog;
    //     this._oDialog = null;
    // }.bind(this));
} 
this._oDialog.open();		
			// 	if(!this.showDialog){
			// this.showDialog = sap.ui.xmlfragment("ARCH_PM_UI5ARCH_PM_UI5.fragments.fragment",this);
			// 	 sap.ui.getCore().byId("details").setModel(this.getView().getModel());
			// }
			// //	this.byId('dialogID').setModel(odataModel1);
			//  oView.addDependent(this.showDialog);
			// this.showDialog.open();
		// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		// 			oRouter.navTo("view6",{
		// 				oid : oid
		// 			});	
			
		// 	var showDialog;
		// if(!this.showDialog){
		// this.showDialog = sap.ui.xmlfragment("ARCH_PM_UI5ARCH_PM_UI5.fragments.fragment",this);
		// }
		// this.showDialog.open();
			//this.showDialog = sap.ui.xmlfragment("ARCH_PM_UI5ARCH_PM_UI5.fragments.fragment",this);
			// this.showDialog.setModel(odataModel1);
		 //this.getView().byId('DetailDialog').setModel(odataModel1); 
		//	var oCurrent = oEvent.oSource.getSelectedItem().getBindingContext().getObject();
			
			
   //      var oDialog = oView.byId("DetailDialog");
   //      // create dialog lazily
   //      if (!oDialog) {
   //         // create dialog via fragment factory
   //         oDialog = sap.ui.xmlfragment("ARCH_PM_UI5ARCH_PM_UI5.fragments.fragment",this);
   //        
			
		// }
		 //oDialog.open();
		},
		// workorderDetails:function(){
		// 	// var oView = this.getView();
		// 	//var showDialog=this.getview().byId("details_dialog");
		// 	if(!this.showDialog){
		// 	this.showDialog = sap.ui.xmlfragment("ARCH_PM_UI5ARCH_PM_UI5.fragments.fragment",this);
		// 		 sap.ui.getCore().byId("details").setModel(this.getView().getModel());
		// 	}
		// 	//	this.byId('dialogID').setModel(odataModel1);
		// 	// oView.addDependent(this.showDialog);
		// 	this.showDialog.open();
		// },
		handleShowDialogClose:function(){
				//this.showDialog.destroy();
			this._oDialog.close();
				this._oDialog.destroy();
		this._oDialog= undefined;
			// this._oDialog = null;
		},
		onCloseDialog:function(){
				// this.showDialog.destroy();
			this._oDialog.close();
		this._oDialog.destroy();
		this._oDialog= undefined;
			// this._oDialog = null;
		},
		 onMoreDet: function() {
      //this._oDialog = null;
      this._oDialog.close();
		this._oDialog.destroy();
		this._oDialog= undefined;
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("view6",{
						oid : oid
					});	
    },
		onRowShiftAction: function(oEvent) {
			// var oSource = oEvent.getSource();
			// // oRow = oSource.getParent();
			// if (oSource.getSrc() == "sap-icon://expand") {
			//oSource.setSrc("sap-icon://collapse");
			//	oSource.getCells()[5].setVisible(false);
			this.getCells[5].setVisible(true);
			// } else {
			// 	oSource.setSrc("sap-icon://expand");
			// 	oSource.getCells()[5].setVisible(false);
			// 	//this.byId("workorder").getCells().setVisible(false);
			// }
		}

	});

});