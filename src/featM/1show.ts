
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()

        console.log(1);

    }
    if (e.key === '.') {
        e.preventDefault()
        console.log(2);

    }
})
