function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/home">
        FoodPanda
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            {window.localStorage.getItem("User") === null ? (
              <a className="nav-link" href="/home">
                Home <span className="sr-only">(current)</span>
              </a>
            ) : (
              <a className="nav-link" href="/restraunts">
                Restaurant <span className="sr-only">(current)</span>
              </a>
            )}
          </li>
          <li className="nav-item">
            {window.localStorage.getItem("User") === null ? (
              <a className="nav-link" href="/login">
                LogIn
              </a>
            ) : (
              <a className="nav-link" href="/getOrders">
                Orders
              </a>
            )}
          </li>

          <li className="nav-item">
            {window.localStorage.getItem("User") === null ? (
              <a className="nav-link" href="/register">
                Register
              </a>
            ) : null}
          </li>
        </ul>
        <span className="navbar-text">
          {window.localStorage.getItem("Customer") !== null ? (
            <strong>
              {JSON.parse(window.localStorage.getItem("Customer")).first_name +
                " " +
                JSON.parse(window.localStorage.getItem("Customer")).last_name +
                "  "}
            </strong>
          ) : null}
        </span>
        <span className="navbar-text">
          {window.localStorage.getItem("User") !== null ? (
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {
                window.localStorage.clear();
                window.location = "/login";
              }}
            >
              Logout
            </button>
          ) : null}
        </span>
        <span className="navbar-text">
          {window.localStorage.getItem("User") !== null ? (
            <a href="/order_cart">
              <img
                src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/shopping_cart.png"
                alt="Cart"
                width={"40px"}
                height={"40px"}
              />
            </a>
          ) : null}
        </span>
      </div>
    </nav>
  );
}

export default Nav;
