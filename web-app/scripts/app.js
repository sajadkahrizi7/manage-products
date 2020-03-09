let products = getSaveProducts()

const filters = {
    searchItem: '',
    availableProducts: false,
    sortBy: 'byEdited'
}

renderProducts(products, filters)

document.querySelector('#search-products').addEventListener('input', (e) => {
    filters.searchItem = e.target.value
    renderProducts(products, filters)
})

document.querySelector('#add-product-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const id = uuidv4()
    const timestamp = moment().valueOf()
    products.push({
        id: id,
        title: e.target.elements.productTitle.value,
        price: e.target.elements.productPrice.value,
        exist: true,
        created: timestamp,
        updated: timestamp
    })
    saveProducts(products)
    renderProducts(products, filters)
    e.target.elements.productTitle.value = ''
    e.target.elements.productPrice.value = ''
})

document.querySelector('#available-products').addEventListener('change', (e) => {
    filters.availableProducts = e.target.checked
    renderProducts(products, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'products') {
        products = JSON.parse(e.newValue)
        renderProducts(products, filters)
    }
})

document.querySelector('#sort').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderProducts(products, filters)
})