const titleElement = document.querySelector('#product-title')
const priceElement = document.querySelector('#product-price')
const removeElement = document.querySelector('#remove-product')
const dateElement = document.querySelector('#last-edit')

const productId = location.hash.substring(1)
let products = getSaveProducts()
let product = products.find(item => item.id ===  productId)

if (product === undefined) {
    location.assign('/index.html')
}

titleElement.value = product.title
priceElement.value = product.price
dateElement.textContent = lastEditMessage(product.updated)

titleElement.addEventListener('input', (e) => {
    product.title = e.target.value
    product.updated = moment().valueOf()
    dateElement.textContent = lastEditMessage(product.updated)
    saveProducts(products)
})

priceElement.addEventListener('input', (e) => {
    product.price = e.target.value
    product.updated = moment().valueOf()
    dateElement.textContent = lastEditMessage(product.updated)
    saveProducts(products)
})

removeElement.addEventListener('click', (e) => {
    removeProduct(product.id)
    saveProducts(products)
    location.assign('./index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'products') {
        products = JSON.parse(e.newValue)
        product = products.find(item => item.id ===  productId)
        
        if (product === undefined) {
            location.assign('/index.html')
        }
        
        titleElement.value = product.title
        priceElement.value = product.price
        dateElement.textContent = lastEditMessage(product.updated)
    }
})