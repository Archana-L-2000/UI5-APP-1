sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/Fragment"

], function(Controller, History,Fragment) {
	"use strict";
var user,notino,zpm_noti_details;
	return Controller.extend("ARCH_PM_UI5ARCH_PM_UI5.controller.view3", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view3
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view3
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view3
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ARCH_PM_UI5ARCH_PM_UI5.view.view3
		 */
		//	onExit: function() {
		//
		//	}
		onInit : function(oEvent){
		
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("view3").attachMatched(this.onNotify, this);
		// if(this.byId('funcloc').getText == ' '){
		// 	this.byId('funcloc').setText('NA');
		// }
			
			},
		
		onNotify:function(oEvent){
			var oModel = oEvent.getParameter("arguments").user;
			user = oModel;

            var zpm_notify;
            
				var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_MAINTENANCE_AL_SRV/";
				var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

			oModel.read("ZNOTIFYSet?$filter=PlantId eq "+"'"+user+"'", {
					context: null,
					urlParameters: null,
					async: false,
					success: function(oData, response) {
						sap.m.MessageToast.show("SUCCESS");
						zpm_notify = oData.results;
						for (var i = 0; i < zpm_notify.length; i++) {
if (zpm_notify[i]["Funcloc"] === '' ) {
zpm_notify[i]["Funcloc"] = 'NA';
}
if (zpm_notify[i]["Priority"] === '' ) {
zpm_notify[i]["Priority"] = 'NA';
}
if (zpm_notify[i]["Notificat"] === '' ) {
zpm_notify[i]["Notificat"] = 'NA';
}
if (zpm_notify[i]["NotifType"] === '' ) {
zpm_notify[i]["NotifType"] = 'NA';
}
if (zpm_notify[i]["Equipment"] === '' ) {
zpm_notify[i]["Equipment"] = 'NA';
}
if (zpm_notify[i]["Notifdate"] === '' ) {
zpm_notify[i]["Notifdate"] = 'NA';
}
if (zpm_notify[i]["Descript"] === '' ) {
zpm_notify[i]["Descript"] = 'NA';
}
 

}
// 	for (var i = 0; i < zpm_notify.length; i++) {
// 							for(var j = 0;j<zpm_notify[i].length;j++){
// if (zpm_notify[i]['"'+i[j]+'"'] === '') {
// zpm_notify[i]['"'+i[j]+'"'] = 'NA';
// }
// }}
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
			this.byId("Table").setModel(odataModel);
			
			
				var oSorter = new sap.ui.model.Sorter("Notifdate", true);

 this.byId("Table").getBinding('items').sort(oSorter);
		},
		onNotiDet:function(){
			var oTable = this.getView().byId("Table");
			var selectedRowdata = oTable.getSelectedContexts()[0].getObject();
 notino = selectedRowdata.Notificat;
 //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
	// 				oRouter.navTo("view5",{
	// 					notino : notino
	// 				});
	var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_MAINTENANCE_AL_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
//ZNOTIF_DETAILSSet('10000108')
			oModel.read("ZNOTIF_DETAILSSet('" + notino + "')", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, response) {
					sap.m.MessageToast.show("SUCCESS");
					zpm_noti_details = oData;
					//window.localStorage.setItem("name",uname);
				},
				error: function(oData, response) {
					sap.m.MessageToast.show("No Data Found");
					return;
				}
			});

			var odataModel1 = new sap.ui.model.json.JSONModel();
			odataModel1.setData({
				"noti_details": zpm_noti_details

			});
		this.getView().setModel(odataModel1);
		
		if (!this._oDialog) {  
    this._oDialog = sap.ui.xmlfragment("ARCH_PM_UI5ARCH_PM_UI5.fragments.notifragment", this);    
    this._oDialog.setModel(this.getView().getModel()); 
     
    // this._oDialog.attachAfterClose(function() {
    //     delete this._oDialog;
    //     this._oDialog = null;
    // }.bind(this));
} 
this._oDialog.open();		
		},
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
					oRouter.navTo("view5",{
						notino : notino
					});	
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
var filter = new sap.ui.model.Filter("Notifdate",sap.ui.model.FilterOperator.BT,vall,vall1);
var aTableFilters = [];
aTableFilters.push(filter);
binding.filter(aTableFilters);

//alert(vall);
window.console.log(binding.filter(aTableFilters)); 
}
		},
			workorder: function(){
				var zpm_workorder;
				var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_ARCH_SRV/";
				var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

			oModel.read("ZPM_WORKORDERSet" , {
					context: null,
					urlParameters: null,
					async: false,
					success: function(oData, response) {
						sap.m.MessageToast.show("WORKORDER SUCCESS");
						zpm_workorder = oData.results;
						//window.localStorage.setItem("name",uname);
					},
					error: function(oData, response) {
						sap.m.MessageToast.show("No Data Found");
						return;
					}
				});

				var odModel = new sap.ui.model.json.JSONModel();
				odModel.setData({
					"workorder": zpm_workorder
				});
					//sap.ui.getCore().byId('container').setModel(odataModel);
			this.byId("workorder").setModel(odModel);
			},
			
			onpress: function() {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("view4");
			},
			
			onReset:function(){
		var oTable = this.getView().byId("Table");
var binding = oTable.getBinding("items");
binding.filter([]);
 this.byId("dateId").setValue('');
			 this.byId("dateGt").setValue('');
},
			OnBack: function(){
			var oHistory, sPreviousHash ;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			
			if(sPreviousHash !== undefined){
				window.history.go(-1);
			}
			else{
				this.getOwnerComponent().getRouter().navTo("view1");
			}
			
		
		},
		
	onFragment:function(){
		var oView = this.getView();
		if(!this.byId('dialogID')){
			Fragment.load({
				name:"ARCH_PM_UI5ARCH_PM_UI5.fragments.fragment",
				controller:this,
				id:oView.getId()
			}).then(function(oDialog){
				oDialog.open();
			});
		}else{
			this.byId('dialogID').open();
		}
	}
	});
	

});