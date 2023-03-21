const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");

module.exports = {
    createBadge: async (req, res) => {
        try {
            const result = await cloudinary.uploader(req.file.path);

            await User.create({
                image: result.secure_url,
                cloudinaryId: result.public_id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                jobTitle: req.body.jobTitle,
                company: req.body.company
            });
            console.log("User has been created");
            res.redirect("/socialBadge")
        } catch (err) {
            console.log(err);
        }
    },
    getProfile: async (req, res) => {
        try {
          const user = await User.find({ user: req.user.id });
          res.render("/profile.ejs", { user: req.user });
        } catch (err) {
          console.log(err);
        }
      },
    updateUser: async (req, res) => {
        try {
            const result = await cloudinary.uploader(req.file.path);
            await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { firstName: req.body.firstName, lastName: req.body.lastName, jobTitle: req.body.jobTitle, company: req.body.company, image: result.secure_url, cloudinaryId: result.public_id }},
            );
            console.log("Updated profile");
            res.redirect("/socialBadge");
        } catch (err) {
            console.log(err);
        }
    },
}