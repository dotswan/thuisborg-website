export function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

export function isTextTag(element) {
    return !!!element.tagName;
}

export function addObserver(el, callback, tr = 0, unObserve = false) {
    if (window["IntersectionObserver"]) {
        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            threshold: tr
        });
        observer.observe(el);
    } else {
        return false;
    }

    function handleIntersect(entries, observer) {
        entries.forEach(entry => {
            if (tr === 0) {
                if (entry.isIntersecting) {
                    if (unObserve)
                        observer.unobserve(el);
                    callback();
                }
            } else {
                if (entry.isIntersecting && entry.intersectionRatio >= tr) {
                    if (unObserve)
                        observer.unobserve(el);
                    callback();
                }
            }
        });
    }
}