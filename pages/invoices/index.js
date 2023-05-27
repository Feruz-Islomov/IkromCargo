import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

export default function Invoices() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invs, setInvs] = useState([]);
  const [invtable, setInvTable] = useState([]);
  const [inv, setInv] = useState({
    invcode: "",
    recadress: "",
    recbirth: "",
    recname: "",
    recpassport: "",
    recphone: "",
    tadress: "",
    uadress: "",
    totalPrice: "",
    date: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { username, password };
    // try {
    const response = await axios.post("/api/auth/isadmin", credentials);
    const user = response.data;
    if (user.invoices !== undefined) {
      setInvs(user.invoices);
      document.getElementById("inp").classList.add("d-none");
      document.getElementById("template").classList.remove("d-none");
    } else {
      console.log(user.message);
    }
    // Handle successful response
    // } catch (error) {
    //   if (error.response && error.response.status === 404) {
    //     // Handle 404 error
    //     console.log("404 page");
    //   } else {
    //     // Handle other errors
    //     console.log("other errors");
    //   }
    // }
  };
  const showInvoice = (item) => {
    // console.log(item);
    setInv(item.invoice);
    setInvTable(item.tabledata);
  };
  const hideClass = () => {
    document.getElementById("printbtn").classList.add("d-none");
    document.getElementById("ul").classList.add("d-none");
    window.print();
    setTimeout(function () {
      document.getElementById("printbtn").classList.remove("d-none");
      document.getElementById("ul").classList.remove("d-none");
    }, 1);
  };
  const deleteInvoice = async (item) => {
    const response = await axios.post("/api/auth/delete", item);

    console.log(response);
    setInvs(response.data.invoices);
    alert(response.data.message);
  };
  return (
    <div className="container">
      <div id="printbtn" className="mt-3">
        <Link href={"/"}>
          <button className="btn btn-secondary ">Home</button>
        </Link>
        <button className="btn btn-danger mx-3" onClick={hideClass}>
          print
        </button>
      </div>
      <div id="inp" className="row justify-content-center mt-3">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div id="template" className="mt-2 d-none">
        <div className="invoice ">
          <div className="row">
            <div className="col-5  text-center">{inv.tadress}</div>
            <div className="col-2"></div>
            <div className="col-5 text-center">{inv.uadress}</div>
          </div>
          <div className="row text-center">
            <div>
              <h5>--- INVOICE#: {inv.invcode} ---</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-4">Receiver fullname:</div>
            <div className="col-8">{inv.recname}</div>
          </div>
          <div className="row">
            <div className="col-4">Receiver adress:</div>
            <div className="col-8">{inv.recadress}</div>
          </div>
          <div className="row">
            <div className="col-4">Receiver passport:</div>
            <div className="col-8">{inv.recpassport}</div>
          </div>
          <div className="row">
            <div className="col-4">Receiver birthdate:</div>
            <div className="col-8">{inv.recbirth}</div>
          </div>
          <div className="row">
            <div className="col-4">Receiver phone number:</div>
            <div className="col-8">{inv.recphone}</div>
          </div>
          <div className="row text-center">
            <div>load details</div>
          </div>
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
              {invtable
                ? invtable
                    .slice(0, Math.ceil(invtable.length / 2))
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
              {invtable
                ? invtable
                    .slice(Math.ceil(invtable.length / 2))
                    .map((item, n) => {
                      n += Math.ceil(invtable.length / 2);
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
          Jami: {inv.totalPrice} so'm <br />
          Sana: {inv.date}
        </div>
      </div>
      <div id="ul" className="mt-3">
        {invs
          ? invs.map((item, n) => {
              return (
                <ul key={n} className="list-group ">
                  <li
                    onClick={() => showInvoice(item)}
                    className="list-group-item list-group-item-info cursor mb-1 d-flex justify-content-between align-items-center"
                  >
                    <>
                      {n + 1}. {item.invoice.recname} {item.invoice.tadress}{" "}
                      {item.invoice.date}
                    </>
                    <i
                      className="fas fa-trash text-danger"
                      onClick={() => deleteInvoice(item)}
                    ></i>
                  </li>
                </ul>
              );
            })
          : null}
      </div>
    </div>
  );
}
