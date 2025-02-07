export const validatePassword = (password) => {
    if (password.length < 8) {
        return "❌ Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
        return "❌ Password must contain at least one uppercase letter (A-Z).";
    }
    if (!/[a-z]/.test(password)) {
        return "❌ Password must contain at least one lowercase letter (a-z).";
    }
    if (!/\d/.test(password)) {
        return "❌ Password must contain at least one number (0-9).";
    }
    if (!/[@$!%*?&]/.test(password)) {
        return "❌ Password must contain at least one special character (@$!%*?&).";
    }
    return "✅ Password is strong!";
}