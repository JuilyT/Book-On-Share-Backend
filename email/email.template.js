exports.mailToBorrower = {
    confirm: emailData => ({
        subject: 'You have borrowed book !',
        html: `<p>You have borrowed one book titled : <b>${emailData.book.title}</b> by <b>${emailData.book.author}<b> from ${emailData.book.owner.name} on ${new Date(emailData.book.assignDate).toLocaleDateString()}</p>`
    })
}
exports.mailToOwner = {
    confirm: emailData => ({
        subject: `Book - ${emailData.book.title} has been borrowed !`,      
        html: `<p>Book - <b>${emailData.book.title}</b> has been borrowed by ${emailData.book.borrower.name} on ${new Date(emailData.book.assignDate).toLocaleDateString()}</p>`
    })
}