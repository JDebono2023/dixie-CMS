# 2023 EyeLook Media - eCommerce CMS

- CMS to control products, categories and basic store functions
- includes the updated Order Manager Module
- all data comes through the Ecwid eCommerce api: https://api-docs.ecwid.com/reference/overview

### Products:

- turn products off and on
- displayed alphabetically
- items listed in ACTIVE store categories only

### Categories:

- turn categories off and on
- displayed alphabetically

### Store Control:

- control turning store off and only
- add and delete blackout dates

### Order Manager:

- receive, process and print eCommerce orders

### Store Set Up:

- modular
- status.js: individual files control status (store status - open and close)
- shipping.js: controls the blackout dates for the existing shipping options available and active in the store
- categoriesProducts.js: controls the products displayed by active category
- getters: provides access to products, categories, and a filtered version of categories displaying active only
- alphabetical organization is done in the view

### Components:

- openclose.vue: store open and close function. Contains a confirmation modal
- Popup.vue: modal used to add the blackout dates to the Store Control view
