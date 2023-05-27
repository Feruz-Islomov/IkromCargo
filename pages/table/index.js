// import Head from "next/head";
// import Image from "next/image";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
// import styles from "../styles/Home.module.css";
import axios from "axios";
import data from "../../jsd.js";
import { useEffect, useState } from "react";
import Link from "next/link.js";
import { useRouter } from "next/router.js";

function Home({ posts }) {
  const [product, setProduct] = useState("");
  const [probj, setProbj] = useState({});
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [tabledata, setTabledata] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [turkish, setTurkish] = useState("");
  const [uzbek, setUzbek] = useState("");
  const [invcode, setInvcode] = useState("");
  const [recname, setRecname] = useState("");
  const [recadress, setRecadress] = useState("");
  const [recpassport, setRecpassport] = useState("");
  const [recbirth, setRecbirth] = useState("");
  const [recphone, setRecphone] = useState("");
  const [invoicedata, setInvoicedata] = useState({});

  const date = new Date().toLocaleDateString();

  const router = useRouter();

  useEffect(() => {
    if (tabledata.length > 0) {
      const t = tabledata.reduce((a, c) => a + c.price * c.quantity, 0);
      setTotalPrice(t);
    }
  }, [tabledata]);

  function chooseProduct(post) {
    setProbj(post);
    setProduct(post.name);
  }
  function addInvInfo() {
    if (
      turkish.length == 0 ||
      uzbek.length == 0 ||
      invcode.length == 0 ||
      recname.length == 0 ||
      recadress.length == 0 ||
      recpassport.length == 0 ||
      recbirth.length == 0 ||
      recphone.length == 0
    ) {
      alert("ma'lumotni to'liq kiriting");
    } else {
      setInvoicedata({
        tadress: turkish,
        uadress: uzbek,
        invcode: invcode,
        recname: recname,
        recadress: recadress,
        recpassport: recpassport,
        recbirth: recbirth,
        recphone: recphone,
      });
    }
  }
  function additem() {
    if (
      product.length == 0 ||
      quantity == 0 ||
      price.length == 0 ||
      probj == {}
    ) {
      alert("ma'lumotni to'liq kiriting");
    } else {
      setTabledata([
        ...tabledata,
        {
          id: probj.id,
          name: probj.name,
          code: probj.code,
          quantity: quantity,
          price: price,
        },
      ]);
      setProduct("");
      setQuantity("");
      setPrice("");
      setProbj({});
    }
  }
  function removeItem(item) {
    const exist = tabledata.find((x) => x.id === item.id);
    if (exist) {
      setTabledata(tabledata.filter((x) => x.id !== item.id));
    }
  }
  function hideClass() {
    document.getElementById("b").classList.add("d-none");
    document.getElementById("c").classList.add("d-none");
    document.getElementById("d").classList.add("d-none");
    window.print();
    setTimeout(function () {
      document.getElementById("b").classList.remove("d-none");
      document.getElementById("c").classList.remove("d-none");
      document.getElementById("d").classList.remove("d-none");
    }, 1);
  }
  const handleLogOut = async () => {
    const user = await axios.post("/api/auth/logout");
    router.push("/login");
    console.log(user);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { invoice: invoicedata, tabledata: tabledata };
    const response = await axios.post("/api/invoice", formData);
    alert(response.data.message);
    setUzbek("");
    setInvcode("");
    setRecname("");
    setRecadress("");
    setRecpassport("");
    setRecbirth("");
    setRecphone("");
    setTotalPrice(0);
    setInvoicedata({});
    setTabledata([]);
  };

  return (
    <>
      <nav
        id="d"
        className="navbar navbar-expand navbar-dark bg-dark"
        aria-label="Second navbar example"
      >
        <div className="container-fluid">
          <Link href={"/"}>
            <div className="navbar-brand cursor">Ikrom Cargo</div>
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarsExample02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <div className="nav-link cursor" onClick={handleLogOut}>
                Logout
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container py-2">
        <div>
          <div id="c">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="turkish..."
                aria-label="t-adress"
                value={turkish}
                aria-describedby="basic-addon1"
                onChange={(e) => setTurkish(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="uzbek..."
                aria-label="u-adress"
                value={uzbek}
                aria-describedby="basic-addon1"
                onChange={(e) => setUzbek(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="code..."
                aria-label="in-code"
                value={invcode}
                aria-describedby="basic-addon1"
                onChange={(e) => setInvcode(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="rec-name..."
                aria-label="r-name"
                value={recname}
                aria-describedby="basic-addon1"
                onChange={(e) => setRecname(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="rec-adress..."
                aria-label="r-adress"
                value={recadress}
                aria-describedby="basic-addon1"
                onChange={(e) => setRecadress(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="rec-passport..."
                aria-label="passport"
                value={recpassport}
                aria-describedby="basic-addon1"
                onChange={(e) => setRecpassport(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="rec-birthdate..."
                aria-label="birth"
                value={recbirth}
                aria-describedby="basic-addon1"
                onChange={(e) => setRecbirth(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="rec-phone..."
                aria-label="r-phone"
                value={recphone}
                aria-describedby="basic-addon1"
                onChange={(e) => setRecphone(e.target.value)}
              />
              <button
                className="form-control btn btn-primary"
                onClick={addInvInfo}
              >
                add
              </button>
              <button
                className="form-control btn btn-danger"
                onClick={handleSubmit}
              >
                send
              </button>
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="name..."
                aria-label="Product"
                value={product}
                aria-describedby="basic-addon1"
                onChange={(e) => setProduct(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="quantity..."
                aria-label="Quantity"
                value={quantity}
                aria-describedby="basic-addon1"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <input
                type="price"
                className="form-control"
                placeholder="price..."
                aria-label="Price"
                value={price}
                aria-describedby="basic-addon1"
                onChange={(e) => setPrice(e.target.value)}
              />
              <button
                className="form-control btn btn-primary"
                onClick={additem}
              >
                add
              </button>
              <button id="b" className="btn btn-danger" onClick={hideClass}>
                print
              </button>
            </div>
          </div>
          {product
            ? posts
                .filter(
                  (post) =>
                    post.name.toLowerCase().includes(product) ||
                    post.lotin.toLowerCase().includes(product)
                )
                .map((post) => {
                  return (
                    <div key={post.id} onClick={() => chooseProduct(post)}>
                      {post.id} {post.name}
                    </div>
                  );
                })
            : null}
        </div>

        <div className="invoice ">
          <div className="row">
            <div className="col-5  text-center">{turkish}</div>
            <div className="col-2"></div>
            <div className="col-5 text-center">{uzbek}</div>
          </div>
          <div className="row text-center">
            <div>
              <h5>--- INVOICE#: {invcode} ---</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-4">Receiver fullname:</div>
            <div className="col-8">{recname}</div>
          </div>
          <div className="row">
            <div className="col-4">Receiver adress:</div>
            <div className="col-8">{recadress}</div>
          </div>
          <div className="row">
            <div className="col-4">Receiver passport:</div>
            <div className="col-8">{recpassport}</div>
          </div>
          <div className="row">
            <div className="col-4">Receiver birthdate:</div>
            <div className="col-8">{recbirth}</div>
          </div>
          <div className="row">
            <div className="col-4">Receiver phone number:</div>
            <div className="col-8">{recphone}</div>
          </div>
          <div className="row text-center">
            <div>load details</div>
          </div>
          {/* <table className="invoice">
            <thead className="text-center">
              <tr>
                <td> Registon Samarkand </td>
                <td rowSpan="2"> --- INVOICE #3 ---</td>
                <td>Registon Samarkand</td>
              </tr>
              <tr>
                <td> </td>
                <td> </td>
              </tr>
              <tr>
                <td>Receiver</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td>Receiver's adress</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td>Receiver's passport</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td>Receiver's birthdate</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td>Receiver's phone number</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="3">load details</td>
              </tr>
            </thead>
          </table> */}
        </div>
        <div className="row">
          <table className="col align-self-start">
            <thead>
              <tr>
                <th>#</th>
                <th>name</th>
                <th>code</th>
                <th>quantity</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {tabledata
                ? tabledata
                    .slice(0, Math.ceil(tabledata.length / 2))
                    .map((item, n) => {
                      return (
                        <tr key={n}>
                          <td>{n + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.code}</td>
                          <td>{item.quantity}</td>
                          <td
                            id="d"
                            className="cursor"
                            onClick={() => removeItem(item)}
                          >
                            {item.price}
                          </td>
                        </tr>
                      );
                    })
                : null}
            </tbody>
          </table>
          <table className="col align-self-start">
            <thead>
              <tr>
                <th>#</th>
                <th>name</th>
                <th>code</th>
                <th>quantity</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {tabledata
                ? tabledata
                    .slice(Math.ceil(tabledata.length / 2))
                    .map((item, n) => {
                      n += Math.ceil(tabledata.length / 2);
                      return (
                        <tr key={n}>
                          <td>{n + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.code}</td>
                          <td>{item.quantity}</td>
                          <td
                            id="d"
                            className="cursor"
                            onClick={() => removeItem(item)}
                          >
                            {item.price}
                          </td>
                        </tr>
                      );
                    })
                : null}
            </tbody>
          </table>
        </div>
        <div>
          Jami: {totalPrice} so'm <br />
          Sana: {date}
        </div>
      </div>
    </>
  );
}
export default Home;

export async function getServerSideProps() {
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  // const posts = await res.json();
  // console.log(data);

  return {
    props: {
      posts: data,
    },
  };
}
