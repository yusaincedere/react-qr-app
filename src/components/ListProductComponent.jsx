import React, { Component } from "react";
import ProductService from "../services/ProductService";
import QrCodeComponent from "./QrCodeComponent";
import RowComponent from "./RowComponent";
import QRCode from "qrcode";
import QrScannerComponent from "./QrScannerComponent";

class ListProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      havePermissions: false,
      display: "none",
      qrCode:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAACCxJREFUeF7t3dtuKzkMRNHJ/3/0GWDeujPwQoFU2zmpvFItUcVNUpYv+frz58+ff/pXBZYU+CpQS0p2mv8UKFAFYVWBArUqZycrUGVgVYECtSpnJytQZWBVgQK1KmcnK1BlYFWBArUqZycrUGVgVYECtSpnJytQZWBVgQK1KmcnK1BlYFWBArUqZycbA/X19fWoitOPb939TefTfjVf+rzGb4sv/7VegQo/X6gAKyDp8xqvAKd2+a/5ClSBujBSoJQyN3tb3mvBPg6oqUP37aYAaLxayNP+p/4+7V+Yr/OPAEuQ1KECdf3OyKfpq3iun6HenUEKQCvUFQnpJYC+FYDpt162HWqFaoV6+SpBFeEO0L3CCdjUroz76etv70/zPV6hClR28TsFWgCk82u+AgWFUsE/rUIKgHR/mq9AFaiLAkqIXw/U9EwWC4j3MqcVQQE/faSI9Tj9Ku/0hjX/NKAS9PT6Ber23pgEn1YUzV+grgof16MVavZrRqeBboV6c4Wa3tQLEFXUtEXK3wJVoF4yJUDSdwqmCZD6w4T521qeMp6ChJ9ATddLA6jxBerheyABpIqg5wvUVaEf/2kDZagCrucFVGqXPwI8fV7+qQLq+cdvylOHUkEFhAKg56f+P32IT/0tUOGhv0C9RqxAFai0CK2+6tTi62coLTi1pze9ysCfZp/qp+dV0fV8gbpdE3w6sAro1F6gfhgQU2CnwOj5AlWgxEhkfztQkbcHBqdnoNSFtKKk1x6pP58+fnyGevcGC9S7I3Bdv0AhHq1QGbAFqkBlxGD0GKjTLSd960JvpaSHznQ+6ZGesbR+SkO6/3T+AqWM+2FfQhAABeqmkARRRut5VRBVzFaoVOGbohJQAVZGKYBTALS+/D99aNf68j/VL53vm/7TT2wqoCmvAlQbVgBSf7Q/+SO7gNTzU2Cmeheo8CcQC1SG9PhQLsHTijDNmFao7GthU71boVqhLgx8HFDrDg1fpmcF+vvotKKertA6I23rP9Vv3PK2N5S2LI1PBSpQqWLX8QXqpl+BKlAzBQrUqn7jCpWeIdSi0gqh+aZnELV02dNoaT7Ztd70ec7/9MWmAChQ19/k1MXnVK/0+QKFlqaMndoVgGmFT4HQflJ/334P1Qr1OmQKuOwCYvo855+2PDkogKZnHGW4BEgzPF1P80s/+b/tT7reeoWSIAXq9Vsh0i8NsPQW4Ol6BerwNYEqrirKNOAFanhoVoCUce8OYCsUIqQMUYCnGT6dP/VfQGo+XQts70fraT/y5/jFphyQXRtUwNL50/mm/inA8l8JqAooe7p+gQp/HkgBTFtwgWrLuyjQCnUF4niFkuBpRv+0CpG2jG09tlua9lOghi0vBVwBKVA3BaYZ8bcdilOAClSBis5UKWDTBJsmeOzv9nt5ciA9U00zNm1JCoDs8jfdv9aTfdsfxXd8hppmkByUIOnzCqgCJLv81frp80/7I70LVNiynw6g1pM9BVTAyF6gCpQYiezHgdJNsFpAmoHavVq0/NWZLPU3Ha/9PV2Rvq13+lCuABWo158hTwEqUPhq+HYGt0Jlv32QAt2Wd1NMFbUt7zVix4HaDkCcMcMfxlcL0f70fNry0/3Lv/UOcPoM9fSG0gCmgqYtM/VH4wtU2FKUsamgAkb2NMDyf3u9VA+1dPmv9dry0BILlBC62teBEuHTDFWGpS1W4zM589FpC5V+6Xy5xw8fygtUFqIUgAJ101eCqMW0QmU/pvF0BW7Lw4uGrN7ko1uhworz6RVJGSz/ZU8rbjr+9PppihyvUNsbnma0BFJLTe0pIOn4bX2lj+wFanhPdjqgml/2FFABI3uBKlBiJLI/DlTk3f8Mnl5LpBmd+pvOrxaerq+WrPmkr54vUMP/rDBtKQVq+CpPhMuuDFKFkF3ry57OX6AK1EumCpRSXin5Znua4drup8+nFjsNh/TR/OMzlBY4bf90ALb9K1CHidoO2KfPV6AKVKRA2nLSBJAz6frfAH/6I8DakOza8LsPxfJfdt0jyZ7Or/GpfXyG2s4QbaBAXb8Gleov/aS/7AUK/0FUAm7bVYFklz8F6qaQBGnLe42U9BOQsq9XqG2HBYhKfuqP1tOrrNPraf27Xf6k+y1Q4Xt1qcDpeAEhAPR8gQLyClgr1PUz5gWqQF0UaIUKfztAPVivYmRXhqriqaUo4NP5pY/s0ie1a71vem1fbMphOajnZS9Qr++ppJ8SRvE7/ipPZ5wpAJp/KuC04ihA8l8B3NZP/sqfArX8g2dTABUw2dMESv3V+r8OKAnytH09oLj5n1Yg6VOgpNBhe4G6CSxB0jPCtGTrTHGYj3h66ZdOKL1boYbXEqcFTAM+vZbQegXqptDTFSoNQDo+BUD713xKoO2K+OvvoVQh1DIL1Gukf/2hPAUkHa+Kooqh9ZQASiBVNPnfCoUXFQqQApwGqECFr/JSwqcZtR3wbf81n4BMAdSZTOvJ38crVOpQgXr9rzMK1JAoCSgA1cKG7vFxVczUP+kxtXNDGHD8UD528OHfEZ/6mwJeoMJD7XaAdCbYDtBpQDS/9qszkCrWdnzWK9S2gwJELWVbcK0nf6WPAJA9BVT+pPYCtdxSC5RSWIewh78oqRaQBnSa8crgVF75I/uPr1AStPbfpcC45f0uubpbKVCgpFDtkQIFKpKrg6VAgZJCtUcKFKhIrg6WAgVKCtUeKVCgIrk6WAoUKClUe6RAgYrk6mApUKCkUO2RAgUqkquDpUCBkkK1RwoUqEiuDpYCBUoK1R4pUKAiuTpYCvwLNElu+bRlvhsAAAAASUVORK5CYII=",
      url: "http://localhost:3000/products",
      products: [],
    };
    this.checkPermissions = this.checkPermissions.bind(this);
  }

  changeUrl = (product) => {
    this.createQrCode();
    this.setState({
      url: "http://localhost:3000/products/" + product.id,
    });
  };

  componentDidMount() {
    ProductService.getProducts().then((response) => {
      this.setState({ products: response.data });
    });
  }

  renderResultRows(products) {
    return products.map((product) => (
      <RowComponent
        key={product.id}
        product={product}
        onClick={this.changeUrl}
      />
    ));
  }

  createQrCode() {
    QRCode.toDataURL(this.state.url).then((data) => {
      this.state.qrCode = data;
    });
  }

  showScanComponent() {
    this.checkPermissions();
    console.log(this.state.havePermissions);

    this.state.display = "block";
    this.setState({
      display: this.state.display,
    });
  }

  checkPermissions() {
    const permissions = navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    permissions
      .then((stream) => {
        this.setState({
          havePermissions: !this.state.havePermissions,
        });
      })
      .catch((err) => {
        this.setState({
          havePermissions: false,
        });
        console.log(`${err.name} : ${err.message}`);
      });
  }
  render() {
    return (
      <React.Fragment>
        <h2 className="text-center">Product List</h2>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>{this.renderResultRows(this.state.products)}</tbody>
          </table>
        </div>
        <h2 className="text-center">Qr Code</h2>
        <div className="col  text-center">
          <QrCodeComponent text={this.state.url} qrCode={this.state.qrCode} />
          <div className="row justify-content-md-center">
            <div className="col col-lg-2">
              <button
                className="btn btn-primary btn-sm m-2"
                onClick={this.showScanComponent.bind(this)}
              >
                Scan
              </button>
            </div>
          </div>
          <QrScannerComponent
            key={this.state.display}
            display={this.state.display}
            permission={this.state.havePermissions}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ListProductComponent;
