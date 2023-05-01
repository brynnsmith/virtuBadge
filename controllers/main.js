//const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");

module.exports = {
    createBadge: async (req, res) => {
        try {
            //const result = await cloudinary.uploader(req.file.path);
            await User.create({
                //image: result.secure_url,
                //cloudinaryId: result.public_id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                jobTitle: req.body.jobTitle,
                company: req.body.company,
                linkedIn: req.body.linkedIn,
            });
            console.log("User has been created");
            res.redirect("/socialBadge")
        } catch (err) {
            console.log(err);
        }
    }, 
    getBadge: async (req, res) => {
        try {
            await res.render("socialBadge.ejs")
        } catch (err) {
            console.log(err);
        }
 }}