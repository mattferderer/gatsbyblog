// const deepmerge = require('deepmerge');

const defaultPolicy = {
    "form-action": [
        "syndication.twitter.com",
     ],
    "font-src": [
        "fonts.gstatic.com",
        "'self'",
     ],
    "script-src": [
        "www.google-analytics.com",
        "ssl.google-analytics.com",
        "'sha256-07IlXpzTZ6R7aACQ5oRKmy8mu6HJ5zhxYR4cfnZHnME='",
        "'sha256-ml5NCCyvZVRMT9yuDNxgrqBCvXENW2FfNXw6uaG5t5M='",
        "'sha256-2+ExXDwjGk9C28Qn4PI5W7Ga2DIiAZDGLpNDsG4ljI8='",
        "'self'",
     ],
    "img-src": [
        "stats.g.doubleclick.net",
        "www.google-analytics.com",
        "ssl.google-analytics.com",
        "'self'",
     ],
    "style-src": [
        "fonts.googleapis.com",
        "'sha256-pmQVgiMVejhZ15re6r5Yh22QXGU4AlBwsAVwTDL6aHU='",
        "'self'",
     ],
    "worker-src": [
        "'self'",
     ],
    "connect-src": [
     "fonts.gstatic.com",
     "'self'",
     ],
    "child-src": [
        "'self'",
     ],  
 }
 
 function reportToString(csp) {
     return Object.keys(csp)
     .map(type => `${type} ${csp[type].join(" ")};`)
     .join(" ")
 }
 
 let cspPolicy = reportToString(defaultPolicy)
 let cspReport = reportToString(defaultPolicy)
 
 module.exports = {
     policy: cspPolicy,
     report: cspReport
 }