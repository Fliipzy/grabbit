const ratelimit = require('express-rate-limit')

const limiters = {
    login: ratelimit({
        windowMs: 1000 * 60 * 10, //10 minutes
        max: 20,
        message: 'Too many login attempts made from this IP address, try again later.'
    }),
    signup: ratelimit({
        windowMs: 1000 * 60 * 60, //1 hour
        max: 5,
        message: 'Too many accounts made from this IP address, try again later.'
    })
}

module.exports = limiters
