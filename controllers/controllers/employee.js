import Employee from "../models/employee.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//acount
export function saveUser(req, res) {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const employee = new Employee({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashPassword
    });

    employee.save()
        .then(() => {
            res.json({
                message: "User Saved successfully"
            });
        })
        .catch(() => {
            res.json({
                message: "User not saved"
            });
        });
}

export function loginEmployee(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {
        if (user == null) {
            res.status(404).json({
                message: "Email not found"
            });
        } else {
            const isPasswordCorrect = bcrypt.compareSync(password, employee.password);
            if (isPasswordCorrect) {
                const employeeData = {
                    email: employee.email,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    role: employee.role,
                    phone: employee.phone,
                    isdDisabled: user.isdDisabled,
                    isEmailVerified: user.isEmailVerified
                };

                const token = jwt.sign(userData, "random356");

                res.json({
                    message: "Login successful",
                    token: token
                });
             } else {
                res.status(403).json({
                    message: "Invalid password"
                });
            }
        }
    });
}
