import React from "react";

const BreadCrumb = () => {
  // const history = useHistory();
  // let activeLink = history.location.pathname;

  return (
    <section className="breadcrumbs_wrapper banner_bg">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Home</li>
            <li className="breadcrumb-item active" aria-current="page">
              activeLink
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default BreadCrumb;
