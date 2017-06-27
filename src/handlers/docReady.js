/**
 *
 * Solution source: https://github.com/jfriend00/docReady/
 * The public function name defaults to "window.docReady"
 */
(() => {
  'use strict'

  let readyList = []
  let readyFired = false
  let readyEventHandlersInstalled = false

  // This is the one public interface
  // docReady(fn, context);
  // the context argument is optional - if present, it will be passed as an argument to the callback
  window['docReady'] = (callback, context) => {
    if (typeof callback !== 'function') {
      throw new TypeError('callback for docReady(fn) must be a function')
    }
    // If ready has already fired, then just schedule the callback
    // to fire asynchronously, but right away
    if (readyFired) {
      setImmediate(() => { callback(context) })
      return
    }

    // Add the function and context to the list
    readyList.push({fn: callback, ctx: context})

    // If document already ready to go, schedule the ready function to run
    // IE only safe when readyState is "complete", others safe when readyState is "interactive"
    if (document.readyState === 'complete' || (!document.attachEvent && document.readyState === 'interactive')) {
      setImmediate(ready)
    } else if (!readyEventHandlersInstalled) {
      // Otherwise if we don't have event handlers installed, install them
      if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', ready, false) // first choice is DOMContentLoaded event
        window.addEventListener('load', ready, false) // backup is window load event
      } else {
        // Must be IE
        document.attachEvent('onreadystatechange', readyStateChange)
        window.attachEvent('onload', ready)
      }
      readyEventHandlersInstalled = true
    }
  }

  function readyStateChange () {
    if (document.readyState === 'complete') {
      ready()
    }
  }

  // Call this when the document is ready this function protects itself against being called more than once
  function ready () {
    if (!readyFired) {
      // This must be set to true before we start calling callbacks
      readyFired = true
      readyList.forEach((item) => {
        // If a callback here happens to add new ready handlers,
        // the docReady() function will see that it already fired
        // and will schedule the callback to run right after
        // this event loop finishes so all handlers will still execute
        // in order and no new ones will be added to the readyList
        // while we are processing the list
        item.fn.call(window, item.ctx)
      })
      // Allow any closures held by these functions to free
      readyList = []
    }
  }
})()
// Modify this previous line to pass in your own method name
// and object for the method to be attached to
