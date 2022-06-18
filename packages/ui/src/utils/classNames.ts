export const cx = (...classNames: any[]): string => {
    let classes = [];
    for (const currentClass of classNames) {
        if (!currentClass) continue;

        if (typeof currentClass === 'string') {
            classes.push(currentClass);
            continue;
        }

        if (Array.isArray(currentClass)) {
            classes.push(cx(...currentClass));
            continue;
        }

        if (typeof currentClass === 'object') {
            // Ensure it does not loop through whole prototype chain
            for (const key in currentClass)
                if (currentClass.hasOwnProperty(key) && Boolean(currentClass[key])) {
                    classes.push(key);
                }
        }
    }

    return classes.join(' ');
};
