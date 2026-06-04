sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (
    Controller,
    Fragment,
    JSONModel,
    MessageToast,
    MessageBox
) {

    "use strict";

    return Controller.extend(
        "basicorg.controller.AdminView",
        {

            onInit: function () {

                console.log(
                    "AdminView Initialized"
                );

                var oModel =
                    this.getOwnerComponent()
                        .getModel("org");

                this.getView()
                    .setModel(
                        oModel,
                        "admin"
                    );

            },

            onEmployeeSelect: function (
                oEvent
            ) {

                var oEmployee =
                    oEvent.getParameter(
                        "listItem"
                    )
                    .getBindingContext(
                        "admin"
                    )
                    .getObject();

                console.log(
                    "Selected Employee",
                    oEmployee
                );

                this.getView()
                    .getModel("admin")
                    .setProperty(
                        "/selectedEmployee",
                        JSON.parse(
                            JSON.stringify(
                                oEmployee
                            )
                        )
                    );
            },

            onOpenAddDialog:
            async function () {

                console.log(
                    "Open Add Dialog"
                );

                if (
                    !this._oAddDialog
                ) {

                    this._oAddDialog =
                        await Fragment.load({

                            name:
                            "basicorg.fragments.AddEmployee",

                            controller:
                            this

                        });

                    this.getView()
                        .addDependent(
                            this._oAddDialog
                        );
                }

                this._oAddDialog.open();
            },

            onCloseAddDialog:
            function () {

                this._oAddDialog.close();
            },

            onAddSubmit:
            function () {

                var oModel =
                    this.getView()
                        .getModel("admin");

                var aEmployees =
                    oModel.getProperty(
                        "/employees"
                    );

                var oNewEmployee = {

                    id:
                    Date.now()
                        .toString(),

                    name:
                    sap.ui.getCore()
                        .byId(
                            "addName"
                        )
                        .getValue(),

                    title:
                    sap.ui.getCore()
                        .byId(
                            "addTitle"
                        )
                        .getValue(),

                    department:
                    sap.ui.getCore()
                        .byId(
                            "addDepartment"
                        )
                        .getValue(),

                    email:
                    sap.ui.getCore()
                        .byId(
                            "addEmail"
                        )
                        .getValue(),

                    phone:
                    sap.ui.getCore()
                        .byId(
                            "addPhone"
                        )
                        .getValue(),

                    managerId: "",

                    active: true

                };

                console.log(
                    "Adding Employee",
                    oNewEmployee
                );

                aEmployees.push(
                    oNewEmployee
                );

                oModel.refresh(true);

                this._oAddDialog.close();

                MessageToast.show(
                    "Employee Added"
                );
            },

            onOpenEditDialog:
            async function () {

                var oSelected =
                    this.getView()
                        .getModel("admin")
                        .getProperty(
                            "/selectedEmployee"
                        );

                if (!oSelected) {

                    MessageToast.show(
                        "Select Employee First"
                    );

                    return;
                }

                if (
                    !this._oEditDialog
                ) {

                    this._oEditDialog =
                        await Fragment.load({

                            name:
                            "basicorg.fragments.EditEmployee",

                            controller:
                            this

                        });

                    this.getView()
                        .addDependent(
                            this._oEditDialog
                        );
                }

                this.getView()
                    .setModel(

                        new JSONModel(
                            JSON.parse(
                                JSON.stringify(
                                    oSelected
                                )
                            )
                        ),

                        "edit"
                    );

                this._oEditDialog.open();
            },

            onCloseEditDialog:
            function () {

                this._oEditDialog.close();
            },

            onEditSubmit:
            function () {

                var oEdit =
                    this.getView()
                        .getModel("edit")
                        .getData();

                var oModel =
                    this.getView()
                        .getModel("admin");

                var aEmployees =
                    oModel.getProperty(
                        "/employees"
                    );

                var iIndex =
                    aEmployees.findIndex(
                        function (e) {

                            return (
                                e.id ===
                                oEdit.id
                            );

                        }
                    );

                if (
                    iIndex >= 0
                ) {

                    aEmployees[
                        iIndex
                    ] = oEdit;

                    console.log(
                        "Updated Employee",
                        oEdit
                    );

                    oModel.refresh(
                        true
                    );
                }

                this._oEditDialog.close();

                MessageToast.show(
                    "Employee Updated"
                );
            },

            onDeleteEmployee:
            function () {

                var oSelected =
                    this.getView()
                        .getModel("admin")
                        .getProperty(
                            "/selectedEmployee"
                        );

                if (!oSelected) {

                    MessageToast.show(
                        "Select Employee First"
                    );

                    return;
                }

                MessageBox.confirm(

                    "Delete Employee?",

                    {

                        onClose:
                        function (
                            sAction
                        ) {

                            if (
                                sAction ===
                                "OK"
                            ) {

                                var oModel =
                                    this.getView()
                                        .getModel(
                                            "admin"
                                        );

                                var aEmployees =
                                    oModel.getProperty(
                                        "/employees"
                                    );

                                aEmployees =
                                    aEmployees.filter(

                                        function (
                                            e
                                        ) {

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

                                console.log(
                                    "Deleted Employee",
                                    oSelected
                                );

                                MessageToast.show(
                                    "Employee Deleted"
                                );
                            }

                        }.bind(
                            this
                        )

                    }

                );
            }

        }

    );

});