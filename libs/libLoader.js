(function(w){
    // propiedad donde se guardaran las librerias: libs
    // archivo de configuracion: libs.conf :
    /*
        {
            config:{
                baseUrl: "" => url of the libs folder
            },
            libs: [
                {
                    "name": "",
                    "url": "", => url absoluta
                    "desc": ""
                },
                {...}
            ]
        }
    */
    /**
     * Carga las librerias, de forma básica, en el documento
     */
    function Loader() {
        var self = this;
        var defaultFolder = "/libs/";
        this.data = fetch("/libs.conf").then(function(req){
            return req.json();
        }).then(function(data){
            self.data = data;
            if(data.config && data.config.baseUrl && data.config.baseUrl != "")
                defaultFolder = data.config.baseUrl;
            var tmpDoc = document.createDocumentFragment();
            for (let i = 0; i < data.libs.length; i++) {
                const lib = data.libs[i];
                var script = document.createElement("script");
                script.src = defaultFolder + lib.url;
                script.async = lib.async;
                tmpDoc.append(script);
            }
            document.body.append(tmpDoc);
        }).catch(function(e){
            console.error("Error en al recuperar el archivo de librerias", e);
        })
    }
    w.libs = new Loader();
}(window))