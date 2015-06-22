if (top != self) { top.location.replace(self.location.href); }

// setup the require.js configuration
// define the paths for common 3rd party libraries
// meta4 specific

require.config({
    baseUrl: "js/",
    waitSeconds: 10,
    paths: {
        jquery: "vendor/jquery/jquery-1.11.2.min",
        underscore: "vendor/underscore/underscore",
        jquery_ui: "vendor/jquery/jquery-ui-1.11.4.custom/jquery-ui.min",
        jquery_cookie: "vendor/jquery-cookie/jquery.cookie",
        Handlebars: "vendor/handlebars/handlebars.min",
        bootstrap: "vendor/bootstrap/bootstrap",
        x_marionette: "vendor/marionette/backbone.marionette.min",
        marionette: "vendor/marionette/marionette230",

        backbone: "vendor/backbone/backbone",
//        deep_model: "vendor/deep-model",
//        backbone_forms: "vendor/backbone-forms/backbone-forms",
        backbone_documentmodel: "vendor/backbone-documentmodel/backbone-documentmodel",
        backbone_statemachine: "vendor/backbone-statemachine/backbone.statemachine",
        backbone_filtered: "vendor/backbone-filtered/backbone-filtered-collection",
        visualsearch: "vendor/visualsearch/visualsearch",

        localStorage: "vendor/backbone.localStorage",
        backgrid: "vendor/backgrid/backgrid",
        select2: "vendor/select2/select2.full",
        cordova: "vendor/cordova",
        "backgrid-select-all": "vendor/backgrid-select-all",
        "backgrid-select2-cell": "vendor/backgrid-select2-cell",

        full_calendar: "vendor/fullcalendar/fullcalendar.min",
        masonry: "vendor/masonry/masonry.min",
        jmpress: "vendor/jmpress/jmpress.custom",
        html_editor: "vendor/summernote/dist/summernote",
        jquery_orgchart: "vendor/jquery-orgchart/jquery.orgchart",
        md5: "vendor/md5/md5",
        bootstrap_tour: "vendor/bootstrap-tour/bootstrap-tour",
        jquery_terminal: "vendor/jquery.terminal/js/jquery.terminal-min",

// Meta4
        core: "meta4beta/core",
        fact: "meta4beta/fact",
        ux: "meta4beta/ux",
        ux_mixin: "meta4beta/ux.mixin",
        ux_dialog: "meta4beta/ux.dialog",
        iq: "meta4beta/iq",
        asq: "meta4beta/asq",
        meta4app: "meta4beta/meta4app",
        splash: "meta4beta/splash",
        mobility: "meta4beta/mobility",

// QB
        colorbrewer: "vendor/dc/colorbrewer",
        crossfilter: "vendor/dc/crossfilter",
        moment: "vendor/moment/moment",

        dc: "vendor/dc/dc",
        d3: "vendor/dc/d3",

        qb: "meta4qb/qb",
        qbd: "meta4qb/qbd",
        qbs: "meta4qb/qbs"

    },
    wrapShim: true,
    shim : {
      underscore : {
        exports : '_'
      },
      "select2": {
        deps : ['jquery'],
      },
      "crossfilter": {
        deps : ['bootstrap'],
        exports : 'crossfilter'
      },
      "colorbrewer": {
        deps : ['bootstrap'],
        exports : 'colorbrewer'
      },
      "d3": {
        deps : ['underscore'],
        exports : 'd3'
      },
      "dc": {
        deps : [ 'd3', 'colorbrewer', 'crossfilter'],
        exports : 'dc'
      },
      QueryEngine : {
        deps : ['backbone'],
        exports : 'QueryEngine'
      },
      Handlebars : {
        exports : 'Handlebars'
      },
      visualsearch: {
        deps : ['jquery', 'backbone'],
        exports : 'visualsearch'
      },
      bootstrap: {
        deps : ['jquery', 'underscore'],
        exports : 'bootstrap'
      },
      marionette : {
        deps : ['jquery', 'underscore', 'backbone'],
        exports : 'Marionette'
      },
      backbone_forms: {
        deps : ['jquery', 'underscore', 'backbone'], exports : 'BackboneForms'
      },
      bootstrap_tour: {
        deps : ['jquery', 'bootstrap'], exports : 'bootstrap_tour'
      },
      full_calendar: {
        deps : ['jquery'], exports : 'full_calendar'
      },
      jmpress: {
        deps : ['jquery'], exports : 'jmpress'
      },
      jquery_cookie: {
        deps : ['jquery'], exports : 'jquery_cookie'
      },
      html_editor: {
        deps : ['jquery'], exports : 'html_editor'
      },
      jquery_orgchart: {
        deps: ['jquery'], exports: "jquery_orgchart"
      },
      backgrid: {
        deps: ['jquery', 'underscore', 'backbone'], exports: 'backgrid'
      },
      backbone_filtered: {
        deps: ['jquery', 'underscore', 'backbone'], exports: 'backbone_filtered'
      },
      "backgrid-select-all": {
        deps: ['backgrid'], exports: "backgrid-select-all"
      },
      "backgrid-select2-cell": {
        deps: ['backgrid'], exports: "backgrid-select2-cell"
      },
      "jquery_terminal": {
        deps: ['jquery'], exports: "jquery_terminal"
      }

    }
});
require(['splash'], function(splash) {

    // Configuration for Meta4 web API
    var options = { autoBoot: true, DEBUG: true,
        id: "meta4beta",
        url: "UX",
        parse: function(r) { return r; }
    }

console.log("[meta4beta]: app: %s options: %o", options.id, options)
    splash.open({ url: "splash.html", waitForClick: true})

    // Load and start the meta4 code
    // handle global/fatal errors
    try {
        require(['meta4app'], function (meta4beta) {
console.log("Starting meta4beta: %o", options)
            try {
                meta4beta.start( options )

                meta4beta.on("ux:boot", function(ux, options) {

                    // display a Home View
                    if (options.home) {
                        var home = ux.Home(options.home)
console.log("home: %s %o %o", options.id, options.home,home)
			if (!home) throw "Missing home view: "+options.home

                        home.triggerMethod("show")
                        splash.close();
                    } else {
                        alert("Application is Homeless.")
                    }
                })
            } catch(e) {
                var yorn = confirm(e+"\n\nApplication failed to boot. Try again?")
                yorn && (window.location = window.location.href)
            }
        });
    } catch(e) {
        var yorn = confirm(e+"\n\nApplication failed to download . Try again?")
        yorn && (window.location = window.location.href)
    }
})
