sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("basicorg.controller.App", {

        onUserSitePress: function () {

            var oNavContainer = this.byId("mainContainer");

            oNavContainer.to(
                this.byId("orgPage")
            );
        },

        onAdminSitePress: function () {

            var oNavContainer = this.byId("mainContainer");

            oNavContainer.to(
                this.byId("adminPage")
            );
        }

    });

});