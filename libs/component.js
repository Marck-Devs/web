( function ( w ) {
    function extend( model, object ) {
        var out = model;
        for ( const key in object ) {
            if ( out.hasOwnProperty( key ) ) {
                const ob = object[ key ];
                out[ key ] = ob;
            }
        }
        return out;
    }
    const extensions = [".html", ".js", ".css"];
    function incrutsHTML(tag, html) {
        var label = document.querySelectorAll(tag);
        var doc = document.createDocumentFragment();
        var div = document.createElement("div");
        div.innerHTML = html;
        doc.append(div);
        if(doc.querySelector("div head")){
            console.log("Insertando Header");
            
            document.querySelector("head").appendChild(doc.querySelector("div head"));
            doc.removeChild(doc.querySelector("head"))
        }
        var scr = doc.querySelectorAll("script");
        if(scr){
            
            for(var i = 0; i < scr.length; i++){
                var script = document.createElement("script");
                script.innerText = "// <![CDATA[" + scr[i].text + "//]]";
                document.body.append(script);
               
            }
        }
        var body = doc.querySelector("div body");
        if(!body || body == undefined)
            body = doc;
        for (let i = 0; i < label.length; i++) {
            const tg = label[i];
            document.body.insertBefore(body,tg);
            document.body.removeChild(tg);
        }
    }
    /* 
     * Lee el archivo de configuracion donde se colocaran los componentes con su descripcion:
     * {
     *  config: {
     *      "baseUrl": "", => url de la carpeta donde se encuentran los archivos de los componentes
     *      "folderMode": true|false => si los componentes contienen archivos de javascript y estilos separados, estan separados en carpetas independientes:
     *      - componentsFolder
     *      |- component1
     *          |- component1.html
     *          |- comopent1.css
     *          |- component1.js
     * }
     *  components: [
     *      {
     *          name: "",
     *          tag: "",
     *          desc: ""
     *      } 
     * ]
     * } 
     */
    function Loader( config ) {
        this.__default = {
            configFile: "/components.json",
            baseUrl: "/",
            folderMode: false
        };
        this.components = [];
        this.config = extend( this.__default, config );
        var self = this;
        this.loadPromise = fetch( this.config.configFile )
            .then( function ( res ) {
                return res.json()
            } )
            .then( function ( data ) {
                self.data = data;
                self.components = data.components;
                if(data.config)
                    self.config = extend(self.config, data.config)
            } );
    }
    Loader.prototype = {
        init: function(){
            var self = this;
            this.loadPromise.then(function(){
                for(var i = 0; i < self.components.length; i++){
                    var cp = self.components[i];
                    var file = self.config.baseUrl + cp.name;
                    if(!self.config.folderMode){
                        fetch(file + extensions[0]).then(function(data){return data.text()}).then(function(data){
                            incrutsHTML(cp.tag, data);
                        });
                    }else{
                        file = file + "/" + cp.name;
                        fetch(file + extensions[0]).then(function(data){return data.text()}).then(function(data){
                            incrutsHTML(cp.tag, data);
                        });
                        var script = document.createElement("script");
                        script.src =  file + extensions[1];
                        script.async = true;
                        var link = document.createElement("link");
                        link.rel="stylesheet";
                        link.href = file + extensions[2];
                        document.head.append(link);
                        document.body.append(script);
                    }
                }
            })
        }
    }
    w.cpLoader = function(config){
        return new Loader(config).init();
    }
} )( window )