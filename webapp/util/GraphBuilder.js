sap.ui.define([], function () {

    "use strict";

    return {

        build: function (aEmployees) {

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

            return {

                nodes: aNodes,

                lines: aLines

            };

        }

    };

});