sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessageBox',

	"sap/m/Bar",
	"sap/m/Button",
	"sap/m/Text",
	'ARCH_PM_UI5ARCH_PM_UI5/libs/sweetalert2.all.min'

], function(Controller, MessageBox, Dialog, MessageView, Button, Text, Bar, arlert) {
	"use strict";
	// eslint-disable no-console, no-alert 
	/*global Swal:true*/
	var zpm_login,user1;

	return Controller.extend("ARCH_PM_UI5ARCH_PM_UI5.controller.View1", {

		onInit: function() {
			// this.getView.byId('SimpleFormToolbar').setModel(odataModel);
			// this.getView.byId('idProductsTable').setModel(odataModel);

			// 	var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_ARCH_SRV/";
			// 	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

			// 	// ap.usi.getCore().setModel(oModel);
			var user = this.byId('name').getValue();
			var pass = this.byId('pass').getValue();
			// // oModel.attachMetadataLoaded(function () {
			// //     var oMetaData = oModel.getServiceMetadata();
			// //     console.log(oMetaData);
			// //     }); 
			// oModel.read("ZPM_LOGINSet(Uname='')", {
			// 	context: null,
			// 	urlParameters: null,
			// 	async: false,
			// 	success: function(oData, response) {

			// 		zpm_login = oData.results;
			// 		//window.localStorage.setItem("name",uname);
			// 	},
			// 	error: function(oData, response) {
			// 		sap.m.MessageToast.show("No Data Found");
			// 		return;
			// }
			// });

			// 	oModel.read("ZPM_LOGINSet", {
			// 	context: null,
			// 	urlParameters: null,
			// 	async: false,
			// 	success: function(oData, response) {

			// 		zpm_login = oData.results;
			// 		//window.localStorage.setItem("name",uname);
			// 	},
			// 	error: function(oData, response) {
			// 		sap.m.MessageToast.show("No Data Found");
			// 		return;
			// }
			// });

			// var odataModel = new sap.ui.model.json.JSONModel();
			// odataModel.setData({
			// 	"results" : zpm_login
			// });

			//oninit	
			// onInit : function(){
			// 	var oModel = sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPM_ODATA_ARCH_SRV");
			// 	this.getView().setModel(oModel,"login");

			// 	var oData = this.getView().getModel('login');
			// 	oData.read('/ZPM_LOGINSet("0000001001")',{
			// 		success: function(response){
			// 			var odatares = response.results;
			// 			console.log(odatares);
			// 		},
			// 		error:function(oError){

			// 		}
			// 	});

			// 			var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_ARCH_SRV/";
			// 			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

			// 			// ap.usi.getCore().setModel(oModel);

			// 		// oModel.attachMetadataLoaded(function () {
			// 		//     var oMetaData = oModel.getServiceMetadata();
			// 		//     console.log(oMetaData);
			// 		//     }); 
			// 	oModel.read("ZPM_LOGINSet(user)", {
			// 			context: null,
			// 			urlParameters: null,
			// 			async: false,
			// 			success: function(oData, response) {
			// sap.m.MessageToast.show("Login Successful!");
			// 				zpm_login = oData;
			// 				//window.localStorage.setItem("name",uname);
			// 			},
			// 			error: function(oData, response) {
			// 				sap.m.MessageToast.show("No Data Found");
			// 				return;
			// 		}
			// 		});

			// 		var odataModel = new sap.ui.model.json.JSONModel();
			// 		odataModel.setData({
			// 			"results" : zpm_login
			// 		});
	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("view1").attachMatched(this._onRouteMatched, this);
		},
	_onRouteMatched: function(oEvent) {
			var oModel = oEvent.getParameter("arguments").user;
			user1 = oModel;
			// var odataModel = new sap.ui.model.json.JSONModel();
			//         var data = oModel.user;

			//var oRes = oData.user;
			// OR var oModel = sap.ui.getCore().getModel("viewCartData");
		},
		onsubmit: function(oEvent) {
		var  user = this.byId('name').getValue();
			var pass = this.byId('pass').getValue();
			// 			var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_ARCH_SRV/";
			// var user = this.getView().byId('name').getValue();
			// var pass = this.getView().byId('pass').getValue();
			// var fname = sap.ui.getCore().byId(this.createId("name")).getValue();

			// this.getView().getModel("TempDataModel").setProperty("/",{ "FirstName":fname} );
			var sUrl = "/sap/opu/odata/sap/ZPM_ODATA_MAINTENANCE_AL_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

			// ap.usi.getCore().setModel(oModel);

			// oModel.attachMetadataLoaded(function () {
			//     var oMetaData = oModel.getServiceMetadata();
			//     console.log(oMetaData);
			//     }); 
			//ZLOGINSet(WfUname='0001',WfPasswd='1111')
			oModel.read("ZLOGINSet" + "(" + "WfUname=" + "'" + user + "'" + "," + "WfPasswd=" + "'" + pass + "'" + ")", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, response) {

					zpm_login = oData;
					//window.localStorage.setItem("name",uname);
				},
				error: function(oData, response) {
					Swal.fire({
						icon: 'error',
						title: 'Invalid Credentials',
						text: 'User Not Found'
							//footer: '<a href="">Why do I have this issue?</a>'
					});
					return;
				}
			});

			var odataModel = new sap.ui.model.json.JSONModel();
			odataModel.setData({
				"results": zpm_login
			});

			if (user === "") {
				//MessageBox.error("Enter Your username");
				Swal.fire({
					icon: 'warning',
					title: 'Enter your Credentials',
					text: 'USERNAME REQUIRED!!'
						//footer: '<a href="">Why do I have this issue?</a>'
				});
				return;
			} else if (pass === "") {
				//MessageBox.error("Enter your Password");
				Swal.fire({
					icon: 'warning',
					title: 'Enter your Credentials',
					text: 'PASSWORD REQUIRED!!'
						//footer: '<a href="">Why do I have this issue?</a>'
				});
				return;
			} else {
				if (zpm_login.WfResult == 'SUCCESS') {
					// MessageBox.success("LOGIN SUCCESSFUL!!");
					// status = 1;
					// sap.m.MessageToast.show("SUCCESS");
					Swal.fire(
						'Successfully Logged In',
						'You can Access your Dashboard Now🥳!!!',
						'success'
					);
					var oBusy = new sap.m.BusyDialog({
						showCancelButton: true,
						canButtonText: true,
						customIconRotationSpeed: 0,

						customIcon: "Images/loader.gif",
						customIconHeight: "150px",
						customIconWidth: "150px",
						text: "Logging you In",
						title: "Getting  Your DASHBOARD"
					});

					oBusy.open();
					window.setTimeout(function() {
						oBusy.close();

					}, 5000);

					// 	onShoppingCartPressed: function(oEvent) {
					// var userData = {
					// 	"user": user
					// };

					// var oModel = new sap.ui.model.json.JSONModel(userData);
					// this.getOwnerComponent().setModel(oModel, "userData");
					//     // OR sap.ui.getCore().setModel(oModel, "viewCartData");

					//     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					//     oRouter.navTo("viewCarts");
					// }
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("view2",{
						user : user
					});

				} else {
					// MessageBox.error("Enter Correct Username or Password");
					Swal.fire({
						icon: 'error',
						title: 'Invalid Credentials',
						text: 'Check yourPassword'
							//footer: '<a href="">Why do I have this issue?</a>'
					});
				}
			}

		},

		OnNext: function() {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("view2");
			}
			// function fnError(oError){
			// 	console.log("Error",oError);
			// }

	});

	// }

});

// });