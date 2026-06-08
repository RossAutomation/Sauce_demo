# SauceDemo Test Plan

## Application Overview

SauceDemo is a demo e-commerce application simulating an online store for testing purposes. It includes user authentication, product browsing, shopping cart functionality, and checkout process. The application features a responsive design with navigation menu, product sorting, and social media links.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful Login

**File:** `tests/login.spec.ts`

**Steps:**

1. Navigate to https://www.saucedemo.com/
2. Login with valid credentials (standard_user/secret_sauce)


    - expect: Redirected to https://www.saucedemo.com/inventory.html

#### 1.2. Invalid Login Attempts

**File:** `tests/login.spec.ts`

**Steps:**

1. Enter invalid username and password, click Login


    - expect: Error message is visible

#### 1.3. Logout Functionality

**File:** `tests/logout.spec.ts`

**Steps:**

1. Login with valid credentials
2. Click Open Menu button
3. Click Logout link


    - expect: Redirected to https://www.saucedemo.com/

### 2. Product Browsing

**Seed:** `tests/seed.spec.ts`

#### 2.1. View Product Inventory

**File:** `tests/inventory/inventory.spec.ts`

**Steps:**

1. Login and navigate to inventory


    - expect: Inventory page displays exactly 6 products

#### 2.2. Product Details View

**File:** `tests/inventory/inventory.spec.ts`, `tests/product-details-view.spec.ts`

**Steps:**

1. Login and click on a product title link (item 4)


    - expect: URL matches /inventory-item.html/
    - expect: Product image and description are visible

2. Click 'Back to products' button


    - expect: URL returns to https://www.saucedemo.com/inventory.html

### 3. Checkout Process

**Seed:** `tests/seed.spec.ts`

#### 3.1. Checkout Information

**File:** `tests/checkout/checkout.spec.ts`

**Steps:**

1. Add item to cart, navigate to cart, click Checkout
2. Click Continue without filling any fields


    - expect: Error message is visible

#### 3.2. Checkout Overview

**File:** `tests/checkout/checkout.spec.ts`

**Steps:**

1. Add item to cart, navigate to cart, click Checkout
2. Fill checkout info (First Name, Last Name, Zip) and click Continue


    - expect: Order total is visible on overview page

3. Click Cancel


    - expect: Redirected to https://www.saucedemo.com/inventory.html

#### 3.3. Order Completion

**File:** `tests/checkout/checkout.spec.ts`

**Steps:**

1. Add item to cart, navigate to cart, click Checkout
2. Fill checkout info and click Continue
3. Click Finish on the overview page


    - expect: Order complete confirmation header is visible

### 4. Navigation and Menu

**Seed:** `tests/seed.spec.ts`

#### 4.1. Menu Navigation

**File:** `tests/menu/menu.spec.ts`

**Steps:**

1. Login and click Open Menu button
2. Click 'All Items' link


    - expect: Redirected to https://www.saucedemo.com/inventory.html

#### 4.2. Social Media Links

**File:** `tests/menu/menu.spec.ts`

**Steps:**

1. Login and click the Twitter/X footer link


    - expect: New tab opens to https://x.com/saucelabs

### 5. Error Handling and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 5.1. Form Validation

**File:** `tests/error/error.spec.ts`

**Steps:**

1. Submit login form with password only (no username)


    - expect: Error message contains 'Username is required'

2. Submit login form with username only (no password)


    - expect: Error message contains 'Password is required'

3. Login, add item to cart, proceed to checkout, click Continue without filling info


    - expect: Error message contains 'First Name is required'

#### 5.2. Boundary Conditions

**File:** `tests/error/error.spec.ts`

**Steps:**

1. Login and add all 6 products to cart


    - expect: Cart contains exactly 6 items

2. Proceed to checkout and fill info


    - expect: Order total displays $140.34

#### 5.3. Network Issues

**File:** `tests/error/error.spec.ts`

**Steps:**

1. Login, add item to cart, proceed through checkout to overview
2. Set network to offline and click Finish


    - expect: URL contains checkout-complete.html

3. Restore network connection
