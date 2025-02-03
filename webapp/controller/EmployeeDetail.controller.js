sap.ui.define(
  [
    "project1/controller/Base.controller",
    "project1/controller/EmployeeDetail.controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
  ],
  function (
    BaseController,
    EmployeeDetailController,
    MessageBox,
    MessageToast
  ) {
    "use strict";

    return BaseController.extend("project1.controller.EmployeeDetail", {
      onInit: function () {
        var oRouter = this.getRouter();
        oRouter
          .getRoute("RouteEmployeeDetail")
          .attachMatched(this._onRouteMatched, this);
      },

      _onRouteMatched: function (oEvent) {
        var oArgs, oView;

        oArgs = oEvent.getParameter("arguments");
        oView = this.getView();

        oView.bindElement({
          path: "/Employees(" + oArgs.EmployeeID + ")",
          events: {
            change: this._onBindingChange.bind(this),
            dataRequested: function (oEvent2) {
              oView.setBusy(true);
            },
            dataReceived: function (oEvent3) {
              oView.setBusy(false);
            },
          },
        });
      },

      _onBindingChange: function (oEvent) {
        if (!this.getView().getBindingContext()) {
          this.getRouter().getTargets().display("TargetNotFound");
        }
      },
      onButtonPress: function (oEvent) {
        var oModel = this.getView().getModel();

        oModel.submitChanges({
          sucess: this._handleSuccessSave.bind(this),
          error: this._handleSaveError.bind(this),
        });
      },

      _handleSuccessSave: function (oRes, oData) {
        var oModel = this.getView().getModel();
        if (oRes.__batchResponses) {
          if (oRes._batchResponses[0].response) {
            var status = parseInt(
              oRes.__batchResponses[0].response.statusCode,
              10
            );

            if (status >= 400) {
              var oResponseBody = JSON.parse(
                oRes.__batchResponses[0].response.body
              );
              MessageBox.alert(
                "Erro ao salvar. Erro: " + oResponseBody.error.message.value
              );
              oModel.resetChanges();
              oModel.refresh();
            } else {
              MessageToast.show("Salvo com sucesso!");
              this.onNavBack();
            }
          } else if (oRes.__batchResponses[0].__changeResponses) {
            var aChangeRes = oRes.__batchResponses[0].__changeResponses;

            var statuscode = parseInt(aChangeRes[0].statusCode, 10);

            if (statuscode >= 400) {
              MessageBox.alert("Erro ao salvar");
              oModel.resetChanges();
              oModel.refresh();
            } else {
              MessageToast.show("Salvo com sucesso!");
              this.onNavBack();
            }
          }
        } else {
          MessageToast.show("Salvo com sucesso!");
        }
      },
      _handleSaveError: function (oError) {
        if (oError) {
          if (oError.responseText) {
            var oErrorMessage = JSON.parse(oError.responseText);
            MessageBox.alert(oErrorMessage.error.message.value);
          }
        }
      },
    });
  }
);
