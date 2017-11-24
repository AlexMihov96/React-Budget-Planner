export class FormValidation {
    isValidLogin(email, password) {
        if (!email && password.length >= 4) {
            console.log("Form error")
            return false
        }

        return true
    }

    isValidRegister(name, email, password, confirmPassword) {
        let isPasswordValid = this.passwordValidation(password, confirmPassword)

        if (name && email && isPasswordValid) {
            return true
        }
        return false
    }

    passwordValidation(password, confirmPassword) {
        if (password.length >= 4 && confirmPassword.length >= 4) {
            if (password === confirmPassword) {
                return true
            }
            return false
        }
        return false
    }
}