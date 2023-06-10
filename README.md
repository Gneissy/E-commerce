<div align="center">

  # <strong><em>Let me sell you something</em></strong>
</div>

This is an e-commerce web application built using the MERN stack. It provides a platform for users to browse, purchase, and manage products in an online store.


<br>

# Technologies
- Frontend
    - React.js
    - Redux & Redux Toolkit
    - Styled Components
- Backend
    - MongoDB & Mongoose
    - Node.js
    - Express.js
    - Dotenv
    - Cors
- Additional
    - Axios
    - bcrypt
    - JWT
    - Stripe
    - Firebase

<br>

# Features
<li>User authentication and authorization.</li>
<li>Easy navigation and exploration of available products.</li>
<li>Efficient search and filter options for finding specific products.</li>
<li>Users can add products to their cart, view the cart contents, and proceed to checkout.</li>
<li>Users can adjust quantities, increase or decrease amounts, or remove items from their cart.</li>
<li>Payment integration via Stripe.</li>
<li>Simple interface for administrators to manage products.</li>
<li>Responsive design.</li>

<br>

# See Live
This app is live on: https://letmesellyousomething.netlify.app/

<br>

# Running the app on local machine

<h2><strong>1. Install dependencies</strong></h2>
<pre class="notranslate">
  <code>
    $ git clone https://github.com/Gneissy/let-me-sell-you-something.git
    $ cd let-me-sell-you-something
    $ npm install
    $ cd frontend
    $ npm install
  </code>
</pre>

<br>

<h2><strong>2. Environment variables</strong></h2>
You will need 4 environment variables for <strong><em>"./.env"</em></strong>:
<br>
<br>
<li><strong>MONGOSERVER</strong>: This is database connection</li>
<li><strong>SALTROUNDS</strong>: This is the salt round amount for bCrypt (example: 10)</li>
<li><strong>JWT_SECRET</strong>: Your random JWT secret</li>
<li><strong>STRIPE_BACKEND_KEY</strong>: Your Stripe "Secret Key" given by Stripe</li>

<br>

You will need 1 environment variable for <strong><em>"./frontend/.env"</em></strong>:
<li><strong>REACT_APP_STRIPE</strong>: Your Stripe "Publishable Key" given by Stripe</li>

<br>

<h2><strong>3. Change backend server</strong></h2>
On top of <strong><em>./frontend/src/reqMethods.js</em></strong>, uncomment following line of code:
<pre class="notranslate">
  <code>
    const MAIN_API_URL = "http://localhost:3001/api"; // For local study
  </code>
</pre>

<br>

<h2><strong>4. Start the app</strong></h2>
<h5>In the first terminal:</h5>
<pre class="notranslate">
  <code>
    $ cd let-me-sell-you-something
    $ npm start
  </code>
</pre>

<h5>In the second terminal:</h5>
<pre class="notranslate">
  <code>
    $ cd let-me-sell-you-something/frontend
    $ npm start
  </code>
</pre>
