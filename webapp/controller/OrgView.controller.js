sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "basicorg/util/GraphBuilder"
], function (
    Controller,
    JSONModel,
    GraphBuilder
) {

    "use strict";

    return Controller.extend(
        "basicorg.controller.OrgView",
        {

            onInit: function () {

                var oModel =
                    this.getOwnerComponent()
                        .getModel("org");

                if (
                    oModel.getProperty("/employees")
                ) {

                    this._buildGraph();

                } else {

                    oModel.attachRequestCompleted(
                        this._buildGraph.bind(this)
                    );

                }

            },

            _buildGraph: function () {

                var oModel =
                    this.getOwnerComponent()
                        .getModel("org");

                var aEmployees =
                    oModel.getProperty(
                        "/employees"
                    );

                if (!aEmployees) {
                    return;
                }

                var oGraphData =
                    GraphBuilder.build(
                        aEmployees
                    );

                var oGraphModel =
                    new JSONModel(
                        oGraphData
                    );

                this.getView()
                    .setModel(
                        oGraphModel
                    );

            }

        }
    );

});