import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                ...defaultTheme.colors,
                white: "var(--text-white)",
                orange: {
                    DEFAULT: "#ff766e", // This is the base color
                    100: "#ffe5e3",
                    200: "#ffbdb9",
                    300: "#ff948f",
                    400: "#FB923C",
                    500: "#ff534d", // This can be your light-orange
                    600: "#ff3d36",
                    700: "#e6342e",
                    800: "#bf2c26",
                    900: "#991e1b",
                  },
                "light-orange": "#ff8d6f",
                login: "rgb(240, 245, 249)",
                dark: "#0f2137",
                background: "#f8fafc",
                "background-purple": "#515070",
                primary: "#ff5f6d",
                secondary: "#dedcff",
                accent: "#ffc371",
                dusk: "#515070",
                green: {
                    DEFAULT: "#3fdbb1",
                    100: "#e1faf4",
                    200: "#b5f2df",
                    300: "#87e8ca",
                    400: "#58ddb5",
                    500: "#3fdbb1",
                    600: "#30b591",
                    700: "#249073",
                    800: "#196b56",
                    900: "#0f463a",
                  },
                link: "#3183ff",
                facebook: "#627aad",
                twitter: "#55acee",
                "quote-text": "#36526C",
            },
            backgroundImage: {
                "gradient-red-org":
                    "linear-gradient(58.04deg, rgb(255, 95, 109) -22.86%, rgb(255, 195, 113) 134.18%)",
                "gradient-org-red":
                    "linear-gradient(145.65deg, rgb(255, 195, 113) 6.55%, rgb(255, 95, 109) 132.26%)",
                "light-grey":
                    "linear-gradient(rgba(246, 247, 249, 0) 0%, rgb(243, 247, 251) 36.35%);",
                "btn-gradient":
                    "linear-gradient(173.72deg, rgb(255, 195, 113) -338.12%, rgb(255, 95, 109) 190.2%)",
                "procard-gradient":
                    "linear-gradient(145.76deg, rgb(255, 195, 113) -94.95%, rgb(255, 95, 109) 132.3%)",
                "mobile-gradient":
                    "linear-gradient(131.39deg, rgb(255, 95, 109) -9.09%, rgb(255, 195, 113) 129.67%)",
            },

            boxShadow: {
                "newsfeed-card": "rgba(100, 135, 167, 0.08) 0px 3px 4px",
                "counter-card": "0 4px 6px rgba(132,159,184,0.15)",
                 "cardShadow": '0 2px 20px hsla(0, 0%, 53%, .3)',
            },
            keyframes: {
                bounceCustom: {
                    "0,100%": {
                        transform: "scale(.3)",
                    },
                    "50%": {
                        transform: "scale(2.5)",
                    },
                },
                bubbleBounce: {
                    "100%": {
                        transform: "scale(.8)",
                    },
                    "0%": {
                        transform: "scale(.8)",
                    },
                    "50%": {
                        transform: "scale(1.3)",
                    },
                },
                shake: {
                    "16%": { transform: "skew(-14deg)" },
                    "33%": { transform: "skew(12deg)" },
                    "49%": { transform: "skew(-8deg)" },
                    "66%": { transform: "skew(6deg)" },
                    "83%": { transform: "skew(-4deg)" },
                    "100%": { transform: "skew(0deg)" },
                },
            },
            animation: {
                shake: "shake 0.5s ease-in-out",
                bounceCustom: "bounceCustom 10s infinite",
                bubble: "bubbleBounce 8s ease-in-out infinite ",
            },


        },
    },

    screens: {
        ...defaultTheme.screens,
        "m-landscape": {
            raw: "(max-width: 736px) and (orientation: landscape)",
        },
        mobile: { max: "767px" }, // Custom screen for max-width: 767px
        tab: { min: "768px", max: "979px" }, // Custom screen for tablet devices
        "md-landscape": { min: "960px", max: "1400px" }, // Custom screen for tablet landscape orientation
    },

    plugins: [forms],
};
