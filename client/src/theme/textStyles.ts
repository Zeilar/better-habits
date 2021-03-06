const style = {
    h1: {
        fontSize: ["2rem", "2.5rem"],
        fontWeight: 600,
    },
    h2: {
        fontSize: ["1.75rem", "2rem"],
        fontWeight: 600,
    },
    h3: {
        fontSize: ["1.5rem", "1.75rem"],
        fontWeight: 600,
    },
    h4: {
        fontSize: ["1.25rem", "1.5rem"],
        fontWeight: 500,
    },
    h5: {
        fontSize: ["1rem", "1.25rem"],
        fontWeight: 500,
    },
    h6: {
        fontSize: "1rem",
        fontWeight: 400,
    },
    p: {
        fontSize: "1rem",
    },
    small: {
        fontSize: "0.75rem",
        textTransform: "uppercase",
    },
};

export const textStyles = {
    ...style,
    pageTitle: {
        ...style.h3,
        color: "cyan.main",
    },
};
