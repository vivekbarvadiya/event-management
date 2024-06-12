const sendTokenForVenders = (vender, statusCode, res) => {

    const token = vender.getVenderToken();

    const options = {
        httpOnly: true
    }

    res.cookie("venderToken", token, options)

    res.status(statusCode).json({
        success: true,
        vender,
        token
    })

}

module.exports = sendTokenForVenders;