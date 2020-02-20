const sendEmail = require('./email.send');
const templates = require('./email.template');

exports.collectEmail = (req) => {
    sendEmail(req.body.to, templates.mailToBorrower.confirm(req.body));
}