(function(){
	var myModel
		, collection
		, inputView
		;


	Backbone.sync = $.noop;


	myModel = Backbone.Model.extend({
		initialize: function(){
		}
	});

	collection = new (Backbone.Collection.extend({
		model: myModel,

		url: '',

		createView: function(model){

			model.view = new inputView({model: model});

			$('#cms-list').append(model.view.render().el);
		},
	}))();


	inputView = Backbone.View.extend({
		tagName: "div",
		className: 'view-display',

		events: {
			"click .find-dungeon": "choose"
		},

		initialize: function(){
		},

		render: function(){
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

			$(this.el).html(template(data));
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

}());
