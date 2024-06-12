exports.sendResponse = (statusCode, message, data,res) => {

    const msg = message || "Operation successfull";
    const code = statusCode || 200;

    res.status(code).json({
        success: true,
        msg,
        data
    })
}