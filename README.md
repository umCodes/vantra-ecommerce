# Vantra E-commerce App

**Vantra** is a fully functional e-commerce web application built using **React**, **Tailwind CSS**, **Firebase**, and a lightweight, standalone **Node.js + Express** API. All product and branding content is entirely AI-generated.

---

[Live Demo](https://vantra-fashion.netlify.app/)

## Features

- **Frontend**  
  Built with React and styled using Tailwind CSS. `clsx` is used lightly in a few components for conditional class handling.

- **Backend**  
  Firebase powers the backend for services like authentication and state persistence.

- **Products API**  
  Product data is served from a separate lightweight REST API built using Node.js and Express.  
  The API serves a static JSON file containing all product data.

- **AI-Generated Content**  
  - 20 unique products  
  - Each product includes:
    - AI-generated image  
    - Title, price, and description  
    - Color options and brand name  
  - The store name (**Vantra**), its logo, and associated sub-brands are all AI-generated.

---

## Tech Stack

- React  
- Tailwind CSS  
- `clsx` (minimal usage)  
- Firebase  
- Node.js + Express (standalone API)

---

## Project Structure

```
├── client         # React frontend
│   ├── src
│   └── ...
├── README.md
```

> **Note:** The Products API is hosted in a separate project and serves a simple JSON response using Express.

---

## Getting Started

### Prerequisites

- Firebase account (for auth & backend services)

---

### Installation

1. **Clone this repo:**

```bash
git clone https://github.com/umcodes/vantra-ecommerce.git
cd vantra-ecommerce
```

2. **Install frontend dependencies:**

```bash
cd client
npm install
```

3. **Set up environment variables:**  
Create a `.env` file inside the `client` directory using the provided `.env.sample` as a reference.  
Make sure to include all required Firebase keys and other sensitive configuration.

4. **Run the frontend:**

```bash
npm run dev
```
