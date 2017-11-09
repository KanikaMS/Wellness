var jwt = require('jsonwebtoken');
var secret = 'meanstack';


module.exports = function(router){

    router.use(function(req, res, next) {
    var token = req.body.token || req.body.query || req.headers['x-access-token'];
    if (token) {

        jwt.vertify(token, secret, function(err, decoded) {
            if (err) {
                
                    res.json({ success: false, message: 'token invalid'});

                } else {
                    req.decoded = decoded;
                    next();
                }
            
            });


         } else {
                res.json({ success: false, message: 'No token provided'});

            }
        });



    router.post('/me', function(req, res) {
        res.json({success: true, message: req.decoded});
    });


 return router;
    
 };
