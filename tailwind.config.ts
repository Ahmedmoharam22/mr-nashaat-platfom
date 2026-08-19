export default {
  theme: {
    extend: {
      fontFamily: {
        amin: ["var(--font-amin)", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          light: "var(--color-primary-light)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          light: "var(--color-accent-light)",
        },
        surface: {
          DEFAULT: "var(--color-bg)",
          elevated: "var(--color-bg-elevated)",
        },
        border: "var(--color-border)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",
      },
    },
  },
};