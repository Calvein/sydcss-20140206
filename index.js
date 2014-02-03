var hljs = require('highlight.js')
var sizzle = require('sizzle')
var async = require('async')
var xhr = require('xhr')

require('domready')(function() {
  async.map(sizzle('[data-code]'), function(code, next) {
    console.log(code)
    xhr({
        uri: code.getAttribute('data-code')
      , timeout: 10000
    }, function(err, res, body) {
      if (err) return next(err)
      code.innerHTML = hljs.highlight('javascript', body).value
      next()
    })
  }, function() {
    ready()
    sizzle('.highlightable').map(function(code) {
      code.innerHTML = hljs.highlight('javascript', code.innerHTML).value
    })

    sizzle('iframe[data-src]').map(function(iframe) {
      var slide = iframe.getAttribute('data-slide')

      Reveal.addEventListener('slidechanged', function(event) {
        if (iframe.__loaded__) return
        if (event.currentSlide.id !== slide) return
        iframe.src = iframe.getAttribute('data-src')
        iframe.__loaded__ = true
      })
    })
  })
})

function ready() {
  // Full list of configuration options available here:
  // https://github.com/hakimel/reveal.js#configuration
  Reveal.initialize({
      controls: true,
      progress: true,
      history: true,
      center: true,

      theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
      transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none

      // Optional libraries used to extend on reveal.js
      dependencies: [
          { src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } },
          { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
      ]
  });
}
