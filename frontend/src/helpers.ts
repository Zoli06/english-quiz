const parseJwt = (token: string) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

const helpers = {
    verifyToken: async (token: string) => {
        if (!token) {
            return false;
        }
        try {
            const parsedToken = parseJwt(token);
            if (
                parseJwt(localStorage.getItem(parsedToken)!)?.exp * 1000 <
                Date.now()
            ) {
                localStorage.removeItem(parsedToken);
                return false;
            }
        } catch {
            return false;
        }
        return true;
    },
};

export default helpers;
