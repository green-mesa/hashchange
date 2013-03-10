# hashchange

  Fires user defined callbacks when the hash for the page changes, including when 'back' and 'forward' on browser history are used. This also works for IE6 and IE7.

  IE6/7 Fallback stuff based loosely on code from ["jQuery BBQ"](https://github.com/cowboy/jquery-bbq/) by Ben Alman.
  
  Unlike jQuery BBQ, no jQuery is required and no parsing is done of the hashes just yet.

## Installation

    $ component install charlottegore/hashchange

## API

### .update( `callback` )

  Adds a function to be called when the hash changes.

    require('hashchange').update(function( hashFragment ) { 
      console.log('hash is now ' + hashFragment )
    })
    
### .update()

  Fires all hashchange callbacks immediately.
  
### .unbind(`callback`)

  Unbinds the callback so that it is no longer called.

## License

  MIT
