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
			"click .find-dungeon": "random",
			"click .list-dungeons": "list",
		},

		initialize: function(){
			var el = $('#select-template')
				, html = el.html()
				;

			this.low = '';
			this.high = '';
			this.target = '';

			this.resultsEl = $('#result');
			this.listTemplate = _.template( $('#list-results').html() );

			this.template = _.template( html );
			this.render();

			this.lowEl = $('#low-value', '#input');
			this.highEl = $('#high-value', '#input');
			this.targetEl = $('#target-value', '#input');

			this.scopeEl = $('#scope_filter');
		},

		render: function(){
			var data = {}
				, scope
				, scopeTypes
				;

			data.low = this.low;
			data.target = this.target;
			data.high = this.high;


			scopeTypes = ['Any', 'Solo', 'Small Group', 'Group', 'Raid'];

			_.each(scopeTypes, function(type){
				scope += '<option value="'+type+'">'+type+'</option>';
			});
			scope = '<select name="scope_filter" id="scope_filter">'+scope+'</select>';

			data.scopeDropdown = scope;


			$(this.el).html(this.template(data));
			this.renderList([]);
			return this;
		},
		
		parseInput: function(){
			var target = this.targetEl.val() | 0
				, high = this.highEl.val() | 0
				, low = this.lowEl.val() | 0
				;

			if(target && target > 0){
				this.targetEl.val( target );
				this.highEl.val( '' );
				this.lowEl.val( '' );
				return {target: target};
			}

			if( !high || !low || high <= 0 || low <= 0){
				this.targetEl.val( '' );
				this.highEl.val( '' );
				this.lowEl.val( '' );
				return false;
			}

			this.targetEl.val( '' );
			this.highEl.val( high );
			this.lowEl.val( low );
			return {high: high, low: low};
		},

		getApplicableList: function( input ){
			var scope
				, list = []
				;

			if(input.target){
				list = searchByTarget(input.target);
			}else if(input.high && input.low){
				list = searchByRange(input.high, input.low);
			}

			scope = this.scopeEl.val();

			if( scope  && scope !== 'Any'){
				list = _.filter(list, function(val, key){
					console.log(val.Scope);
					console.log(scope);
					return val.Scope.toLowerCase() === scope.toLowerCase();
				});
			}

			return list;
		},

		renderList: function(list){
			this.resultsEl.empty();

			_.each(list, function(val, key){
				var data = {};

				_.each(val, function(v, k){
					var newKey;

					newKey = k.toLowerCase().replace(/ /g, '');
					data[newKey] = v;
				});

				this.resultsEl.append( this.listTemplate(data) );
			}, this);
		},

		random: function(){
			var list
				, data
				, index
				, value
				;
				
			data = this.parseInput();
			list = this.getApplicableList( data );


			index = Math.floor( Math.random() * list.length );
			value = list[index];

			this.renderList([value]);
		},

		list: function(){
			var list
				, data
				;
				
			data = this.parseInput();
			list = this.getApplicableList( data );

			this.renderList( list );
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


	function searchByTarget(target){
		var list = _.filter(dungeonList, function(d){
			return target >= d.Low && target <= d.High;
		});

		return list;
	}

	function searchByRange(high, low){
		var list = _.filter(dungeonList, function(d){
			return low >= d.Low && high <= d.High;
		});

		return list;
	}

}());
