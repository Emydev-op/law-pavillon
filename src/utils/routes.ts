export const routePath = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/signup",
    FORGOT_PASSWORD: "/forgot-password",
    VERIFY_PASSWORD: "/verify-password",
    RESET_PASSWORD: "/reset-password",
  },
  MAIN: {
    OVERVIEW: "/overview",
    USERS: { INDEX: "/users", USER_DETAILS: (id: string) => `/users/${id}` },
    SETTINGS: { INDEX: "/settings" },
  },
} as const;
