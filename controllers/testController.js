const adminDashboard = (req, res) => {
    res.json({
        message: "Welcome Admin",
        user: req.user
    });
};

const userDashboard = (req, res) => {
    res.json({
        message: "Welcome User",
        user: req.user
    });
};

module.exports = {
    adminDashboard,
    userDashboard
};