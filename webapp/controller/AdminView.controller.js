sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (
    Controller,
    JSONModel,
    MessageToast
) {

    "use strict";

    return Controller.extend(
        "basicorg.controller.AdminView",
        {

            onInit: function () {

                var oModel = new JSONModel();

                oModel.loadData(
                    sap.ui.require.toUrl(
                        "basicorg/model/orgData.json"
                    )
                );

                this.getView().setModel(
                    oModel,
                    "admin"
                );
            },

            onEmployeeSelect: function (oEvent) {

                var oContext =
                    oEvent.getParameter("listItem")
                    .getBindingContext("admin");

                var oEmployee =
                    JSON.parse(
                        JSON.stringify(
                            oContext.getObject()
                        )
                    );

                this.getView()
                    .getModel("admin")
                    .setProperty(
                        "/selectedEmployee",
                        oEmployee
                    );
            },

            onSaveEmployee: function () {

                var oModel =
                    this.getView()
                        .getModel("admin");

                var oSelected =
                    oModel.getProperty(
                        "/selectedEmployee"
                    );

                var aEmployees =
                    oModel.getProperty(
                        "/employees"
                    );

                var iIndex =
                    aEmployees.findIndex(
                        function (e) {
                            return e.id === oSelected.id;
                        }
                    );

                if (iIndex >= 0) {

                    aEmployees[iIndex] =
                        oSelected;

                    oModel.refresh(true);

                    MessageToast.show(
                        "Employee Updated"
                    );
                }
            },

            onAddEmployee: function () {

                var oModel =
                    this.getView()
                        .getModel("admin");

                var aEmployees =
                    oModel.getProperty(
                        "/employees"
                    );

                aEmployees.push({

                    id:
                        Date.now().toString(),

                    name:
                        "New Employee",

                    title: "",

                    department: "",

                    email: "",

                    phone: "",

                    managerId: ""

                });

                oModel.refresh(true);

                MessageToast.show(
                    "Employee Added"
                );
            },

            onDeleteEmployee: function () {

                var oModel =
                    this.getView()
                        .getModel("admin");

                var oSelected =
                    oModel.getProperty(
                        "/selectedEmployee"
                    );

                if (!oSelected) {
                    return;
                }

                var aEmployees =
                    oModel.getProperty(
                        "/employees"
                    );

                aEmployees =
                    aEmployees.filter(
                        function (e) {

                            return (
                                e.id !==
                                oSelected.id
                            );

                        }
                    );

                oModel.setProperty(
                    "/employees",
                    aEmployees
                );

                MessageToast.show(
                    "Employee Deleted"
                );
            }

        }
    );
});