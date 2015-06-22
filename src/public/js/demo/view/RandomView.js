define(["jquery", "underscore", "backbone", "marionette", "ux"], function ($,_, Backbone, Marionette, ux) {

	ux.view["demo:RandomView"] = function(options) {
		var DEBUG = options.debug || ux.DEBUG;

/**
 	Periodically chooses and then renders a random sub-view
**/
		var config = {
			isTemplating: true, isActionable: true, isNested: true,
			isNavigator: false, isSelectable: false, isHoverPanel: false, isPopOver: false, isActionMenu: false,
			className: "random_view",
			initialize: function(options) {
				_.defaults(options, { model: false })
				ux.initialize(this, options)

			},

			render: function() {
				var self = this
				var refreshTimer = this.options.refreshTimer || 5000
                var keys = _.keys(this._views)
                var picked = parseInt((Math.random()*keys.length))
                var meta = { model: this.model, collection: this.collection }
                var newView = keys[picked]
if (DEBUG) console.log("Random View: %s", keys[picked])

				setTimeout(function() {
				    self.render()
				}, refreshTimer<1000?1000:refreshTimer )

                if (newView == this.currentView) return;
                var view = this.getNestedView(newView, meta)
                if (!view) return

                this.currentView = newView
                view.$el = this.$el
                view.render()
                return view;
			}
		}

		return Backbone.Marionette.ItemView.extend(config);
	}

 	return ux;
})
