# SauceDemo Test Plan

## Application Overview

SauceDemo is a demo e-commerce application simulating an online store for testing purposes. It includes user authentication, product browsing, shopping cart functionality, and checkout process. The application features a responsive design with navigation menu, product sorting, and social media links.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful Login

**File:** `tests/auth/login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page displays username and password fields
    - expect: Login button is present
  2. Attempt login with invalid credentials
    - expect: Page remains on login with error message
  3. Login with valid credentials (standard_user/secret_sauce)
    - expect: Redirected to inventory page
    - expect: Menu button and products are visible

#### 1.2. Invalid Login Attempts

**File:** `tests/auth/login.spec.ts`

**Steps:**
  1. Enter invalid username and password, click Login
    - expect: Error message 'Epic sadface: Username and password do not match any user in this service' appears
  2. Login with locked_out_user
    - expect: Error message for locked out user
  3. Login with problem_user
    - expect: Login succeeds despite problem user

#### 1.3. Logout Functionality

**File:** `tests/auth/logout.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: User is logged in
  2. Click Open Menu button
    - expect: Menu opens with Logout option
  3. Click Logout link
    - expect: Redirected to login page

### 2. Product Browsing

**Seed:** `tests/seed.spec.ts`

#### 2.1. View Product Inventory

**File:** `tests/inventory/browse.spec.ts`

**Steps:**
  1. Login and navigate to inventory
    - expect: Inventory page displays 6 products with images, titles, descriptions, prices
  2. Verify product details (names, prices, descriptions)
    - expect: All product information is correctly displayed

#### 2.2. Product Sorting

**File:** `tests/inventory/sort.spec.ts`

**Steps:**
  1. Select 'Name (A to Z)' from sort dropdown
    - expect: Products sorted alphabetically A-Z
  2. Select 'Name (Z to A)' from sort dropdown
    - expect: Products sorted alphabetically Z-A
  3. Select 'Price (low to high)' from sort dropdown
    - expect: Products sorted by price low to high
  4. Select 'Price (high to low)' from sort dropdown
    - expect: Products sorted by price high to low

#### 2.3. Product Details View

**File:** `tests/inventory/details.spec.ts`

**Steps:**
  1. Click on product title link
    - expect: Product details page opens with larger image, full description
  2. Click 'Back to products' button
    - expect: Back to products button returns to inventory

### 3. Shopping Cart

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add and Remove Items

**File:** `tests/cart/add-remove.spec.ts`

**Steps:**
  1. Click 'Add to cart' for a product
    - expect: 'Add to cart' button changes to 'Remove'
  2. Verify cart icon badge appears
    - expect: Cart badge shows '1'
  3. Click 'Remove' button
    - expect: Button changes back to 'Add to cart'
  4. Verify cart badge is removed
    - expect: Cart badge disappears

#### 3.2. View Cart Contents

**File:** `tests/cart/view-cart.spec.ts`

**Steps:**
  1. Add item to cart and navigate to cart
    - expect: Cart page displays added items with quantity, description, price
  2. Click 'Continue Shopping' button
    - expect: 'Continue Shopping' returns to inventory
  3. Add item, go to cart, click Remove
    - expect: 'Remove' removes item from cart

#### 3.3. Multiple Items in Cart

**File:** `tests/cart/multiple-items.spec.ts`

**Steps:**
  1. Add multiple items to cart
    - expect: Cart badge shows correct count
  2. Navigate to cart and verify items
    - expect: All items listed in cart

#### 3.4. Cart Persistence

**File:** `tests/cart/persistence.spec.ts`

**Steps:**
  1. Add items, navigate between pages, return to cart
    - expect: Items remain in cart after navigation

### 4. Checkout Process

**Seed:** `tests/seed.spec.ts`

#### 4.1. Checkout Information

**File:** `tests/checkout/info.spec.ts`

**Steps:**
  1. Add item to cart, go to cart, click Checkout
    - expect: Checkout step one displays first name, last name, zip code fields
  2. Click Continue without filling fields
    - expect: Error messages for missing required fields
  3. Fill all fields and click Continue
    - expect: Proceeds to checkout overview

#### 4.2. Checkout Overview

**File:** `tests/checkout/overview.spec.ts`

**Steps:**
  1. Complete checkout info step
    - expect: Displays item details, payment info, shipping info, price summary
  2. Verify price calculations
    - expect: Correct tax and total calculations
  3. Click Cancel button
    - expect: Returns to cart

#### 4.3. Order Completion

**File:** `tests/checkout/complete.spec.ts`

**Steps:**
  1. Click Finish on overview
    - expect: Order complete page with success message
  2. Navigate to cart after completion
    - expect: Cart is empty after completion
  3. Click 'Back Home' button
    - expect: 'Back Home' returns to inventory

### 5. Navigation and Menu

**Seed:** `tests/seed.spec.ts`

#### 5.1. Menu Navigation

**File:** `tests/menu/navigation.spec.ts`

**Steps:**
  1. Click Open Menu button
    - expect: Menu opens with All Items, About, Logout, Reset App State
  2. Click Close Menu button
    - expect: Menu closes
  3. Click About link
    - expect: Navigates to Sauce Labs website
  4. Click Reset App State
    - expect: App state resets (cart empty, etc.)

#### 5.2. Social Media Links

**File:** `tests/menu/social-links.spec.ts`

**Steps:**
  1. Click Twitter, Facebook, LinkedIn links
    - expect: Links open in new tabs/windows

### 6. Error Handling and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 6.1. Form Validation

**File:** `tests/error/validation.spec.ts`

**Steps:**
  1. Submit forms with missing or invalid data
    - expect: Appropriate error messages

#### 6.2. Boundary Conditions

**File:** `tests/error/boundary.spec.ts`

**Steps:**
  1. Test with edge case inputs
    - expect: Handles large quantities or prices gracefully

#### 6.3. Network Issues

**File:** `tests/error/network.spec.ts`

**Steps:**
  1. Simulate network interruptions during checkout
    - expect: Graceful handling of network failures
