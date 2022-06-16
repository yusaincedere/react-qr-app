import React, { Component } from "react";

class HeaderComponent extends Component {
  state = {};
  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <span className="text-white"> Products</span>
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;
