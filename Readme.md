# hashchange

  Fires user defined callbacks when the hash for the page changes, including when 'back' and 'forward' on browser history are used. This also works for IE6 and IE7.

  No jQuery required.

## Installation

Browserify

    $ npm install --save hashchange

Component

    $ component install green-mesa/hashchange

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

### .updateHash()

  Manually set the hash fragment to something

## License

  MIT
