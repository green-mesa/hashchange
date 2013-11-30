var each = require('each'),
	indexOf = require('indexof');

var getFragment = function( url ){

	var url = url || window.location.href;
	return url.replace( /^[^#]*#?(.*)$/, '$1' );

};

var HashChange = function(){

	var self = this;

	this.onChangeCallbacks = [];

	window.addEventListener("hashchange", function(e){
		
		self.hashChanged( getFragment(e.newURL) );

	}, false);

	return this;

};

HashChange.prototype = {

	update : function( callback ){

		if(callback){

			this.onChangeCallbacks.push( callback );
			return this;

		} else {

			this.hashChanged( getFragment() );

		}

	},

	unbind : function( callback ){

		var i = indexOf( this.onChangeCallbacks , callback);

		if(i !== -1){

			this.onChangeCallbacks.splice(i - 1, 1);

		}

		return this;

	},
	
	updateHash : function( hash ){
 
			this.currentHash = hash;
 
			window.location.href = window.location.href.replace( /#.*/, '') + '#' + hash;
 
		},

	hashChanged : function( frag ){

		if(this.onChangeCallbacks.length){

			each(this.onChangeCallbacks, function( callback ){

				callback( frag );

				return true;

			});

		}

		return this;

	},


}

hashChange = new HashChange();

module.exports = hashChange;
