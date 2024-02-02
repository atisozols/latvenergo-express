const logger = (req, res, next) => {
    const messageIn = {
        type: "messageIn",
        body: req.body,
        method: req.method,
        path: req.url,
        dateTime: new Date().toISOString()
    };
    console.log(messageIn)

    // responseSent karodzins, lai nebūtu log duplikātu
    let responseSent = false

    const originalSend = res.send

    res.send = function(data) {
        if (!responseSent) {
            responseSent = true

            const messageOut = {
                type: "messageOut",
                body: data,
                dateTime: new Date().toISOString(),
                fault: ''
            }

            if (res.statusCode !== 200) {
                messageOut.fault = data.message || 'Unknown error'
            }

            console.log(messageOut)
        }
        
        return originalSend.call(this, data)
    };

    next()
};

module.exports = logger

