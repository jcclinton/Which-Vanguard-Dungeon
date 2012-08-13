(function(){
	var myModel
		, collection
		, inputView
		;



	Backbone.sync = $.noop;


	myModel = Backbone.Model.extend({});

	collection = new (Backbone.Collection.extend({
		model: myModel,

		url: '',

		createView: function(model){
			model.view = new inputView({model: model});
		}
	}))();


	inputView = Backbone.View.extend({
		el: $('#input'),

		events: {
			"click .find-dungeon": "choose"
		},

		initialize: function(){
			var el = $('#select-template')
				, html = el.html()
				;

			this.template = _.template( html );
			this.render();
		},

		render: function(){
			var data = {}
				;

			data.low = 1;
			/*
			var data
				, object = this.model.get('object')
				, template
				;

			template = _.template($('#'+viewType+'-object-template').html())

			data = {
				id: this.model.get('id')
			};

			data.pageType = pageType;

			if(bookName){
				data.bookName = bookName;
			}

			data.object = indent( JSON.stringify(object) );

			data.dbType = this.model.get('dbType');
*/

			$(this.el).html(this.template(data));
			return this;

			function indent(str){
				if(!str) return;

				str = str.replace(/{/g, '<div style="margin-left: 20px;">');
				str = str.replace(/}/g, '</div>');
				str = str.replace(/\[/g, '<div style="margin-left: 20px;">');
				str = str.replace(/\]/g, '</div>');
				str = str.replace(/,/g, '<br/>');
				return str;
			}
		},

		choose: function(){
		}

	});


	(function(){
		var model
			, config = {}
			;

			model = new myModel(config);
			collection.createView(model);
			collection.add(model);
	}());

}());
