const Header = () => {
  return (
    <header className="p-3 text-bg-dark h">
      <div className="container header-container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <div
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 input-search"
            style={{ display: "flex", gap: "10px" }}
            role="search"
          >
            <input
              type="search"
              className="form-control form-control-dark text-bg-dark"
              placeholder="Search..."
              aria-label="Search"
            />

            <div className="text-end">
              <button type="button" className="btn btn-outline-light me-2">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
