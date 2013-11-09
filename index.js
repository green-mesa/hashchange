var each = require('each'),
	indexOf = require('indexof');

var getFragment = function( url ){

	var url = url || window.location.href;
    return url.replace( /^[^#]*#?(.*)$/, '$1' );

}

var detectIE6to8 = function(){
	var rv = -1; // Return value assumes failure.
	  if (navigator.appName == 'Microsoft Internet Explorer')
	  {
	    var ua = navigator.userAgent;
	    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	    if (re.exec(ua) != null)
	      rv = parseFloat( RegExp.$1 );
	  }

	  if(rv===6 || rv ===7){

	  	return true;

	  } else {

	  	return false;

	  }
}

var HashChange = function(){

	var self = this;

	this.onChangeCallbacks = [];

	if(detectIE6to8()){

		this.setupFallback();

	}else{

		window.onhashchange = function(){

			self.hashChanged();

		}

	}

	return this;

};

HashChange.prototype = {

	update : function( callback ){

		if(callback){

			this.onChangeCallbacks.push( callback );
			return this;

		} else {

			this.hashChanged();

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

	hashChanged : function(){

		if(this.onChangeCallbacks.length){

			each(this.onChangeCallbacks, function( callback ){

				callback( getFragment() );

				return true;

			});

		}

		return this;

	},

	setupFallback : function(){

		var self = this;

		window.onload = function(){

			var tickerId = -1;
			var delay = 100;

			var iframe = document.createElement('iframe');
			iframe.setAttribute('src', 'javascript:0');
			iframe.style.display = "none";

			document.getElementsByTagName('body')[0].appendChild(iframe);

			iframe = iframe.contentWindow;

			var setHistory = function( hash, historyHash ){

				if( hash !== historyHash ){

					var doc = iframe.document;
					doc.open();
					doc.close();
					doc.location.hash = '#' + hash;

				}

			};

			var getHistory = function(){

				return getFragment( iframe.document.location.href );

			};

			var old = getFragment();

			setHistory( old );

			var ticker = function(){

				var curr = getFragment(),
					historyHash = getHistory( old );

				if(curr !== old){

					setHistory( old = curr, historyHash )
					self.hashChanged();

				}else if( historyHash !== old ){

					window.location.href = window.location.href.replace( /#.*/, '') + '#' + historyHash;

				}

				tickerId = setTimeout(ticker, delay);

			};

			setTimeout(ticker, delay)


			return this;

		}

	}

}

hashChange = new HashChange();

module.exports = hashChange;
