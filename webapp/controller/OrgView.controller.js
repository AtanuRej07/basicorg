
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("basicorg.controller.OrgView", {

        onInit: function () {

            var oEmployeeModel = new JSONModel();

            oEmployeeModel.loadData(
                sap.ui.require.toUrl("basicorg/model/orgData.json")
            );

            oEmployeeModel.attachRequestCompleted(function () {

                var aEmployees =
                    oEmployeeModel.getProperty("/employees");

                var aNodes = [];
                var aLines = [];

                aEmployees.forEach(function (emp) {

                    aNodes.push({
                        id: emp.id,
                        name: emp.name,
                        designation: emp.title,
                        department: emp.department
                    });

                    if (emp.managerId) {

                        aLines.push({
                            from: emp.managerId,
                            to: emp.id
                        });

                    }

                });

                var oGraphModel = new JSONModel({
                    nodes: aNodes,
                    lines: aLines
                });

                this.getView().setModel(oGraphModel);

            }.bind(this));

        }

    });

});