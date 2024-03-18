sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MLibrary, JSONModel) {
        "use strict";
        var urlObject = MLibrary.URLHelper

        return Controller.extend("consultaprodutos.controller.main", {
            onInit : function () {
                let produto = {}
                let productModel = new JSONModel(produto)
                let view = this.getView()
                view.setModel(productModel, "modeloProduto")
            },

            onClickImage: function(oEvent){
                urlObject.redirect(oEvent.getSource().getSrc(), true);

            },

            onPressBuscar: function(){
            //  alert("Funcionou")
            let input
            input = this.byId("inpBusca").getValue();
            // alert(input)

            let parameters = {
                url : "https://world.openfoodfacts.org/api/v2/product/" + input,
                method : "GET",
                async : true,
                crossDomain : true
            }

            $.ajax(parameters).done(function(response){
                
                let oProdutoModel = this.getView().getModel("modeloProduto")
                //Limpando a tela
                oProdutoModel.setData({})
                oProdutoModel.refresh()
                oProdutoModel.setData(response)
                oProdutoModel.refresh

            }.bind(this)
            ) //encerra caso sucesso
            .fail(function (){
                debugger
            }.bind(this)) //encerra caso erro

            



            }
        });
    });
