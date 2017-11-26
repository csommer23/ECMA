export function debounce(fn, milissegundos) {

    let time = 0;
    return () => {

        clearTimeout(time);

        time = setTimeout(() => fn(), milissegundos);
    }

}