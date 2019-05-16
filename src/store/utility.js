export const updateObject = (oldObject, update) => {
    return {
        ...oldObject,
        ...update
    }
}