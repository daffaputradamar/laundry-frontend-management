import React, { useState, useEffect } from "react";

import { serviceUser, serviceTransact } from "../../config";

import ReactDOM from "react-dom";
import axios from "axios";
import {
  Grid,
  Segment,
  Table,
  Container,
  Header,
  List
} from "semantic-ui-react";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// resp.data = menampilkan data transaksi
// resp.repos = menampilkan data detail transaksi

function App() {
  const [resp, setGitData] = useState({ data: [], repos: [] });

  useEffect(() => {
    let username;

    if (JSON.parse(localStorage.getItem("transaction"))) {
      username = JSON.parse(localStorage.getItem("transaction")).invoice;
    } else {
      username = JSON.parse(localStorage.getItem("transaction"));
    }

    const fetchData = async () => {
      const respGlobal = await axios(
        `${serviceTransact}/api/v1/transaction/transaksi?i=${username}`
      );

      const respRepos = await axios(
        `${serviceTransact}/api/v1/transaction/bayar?i=${username}`
      );

      setGitData({
        data: respGlobal.data,
        repos: respRepos.data
      });
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="mb5">
        <button onClick={printDocument}>Print</button>
      </div>
      <div
        id="divToPrint"
        className="mt4"
        {...{
          backgroundColor: "#f5f5f5",
          width: "210mm",
          minHeight: "297mm",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <div>
          <Segment>
            <Grid columns={2} relaxed="very">
              <Grid.Column>
                <p>
                  <Container text>
                    <Header as="h4" textAlign="center">
                      <List>
                        <List.Item>
                          <List.Header>QLaundry</List.Header>Your Laundry
                          Solution!
                        </List.Item>
                        <List.Item>Singosari</List.Item>
                      </List>
                    </Header>
                    <Header as="h2" textAlign="center">
                      Struk Laundry
                    </Header>

                    <p>
                      <Table celled>
                        <Table.Body>
                          <Table.Cell>
                            {resp.data.map(dt => (
                              <List>
                                <List.Item>
                                  <List.Header>Invoice</List.Header>
                                  {dt.invoice}
                                </List.Item>
                                <List.Item>
                                  <List.Header>Nama Pelanggan</List.Header>
                                  {dt.member}
                                </List.Item>
                                <List.Item>
                                  <List.Header>Alamat</List.Header>
                                  {dt.address}
                                </List.Item>
                                <List.Item>
                                  <List.Header>Telepon</List.Header>
                                  {dt.phone}
                                </List.Item>
                              </List>
                            ))}
                          </Table.Cell>
                          <Table.Cell />
                          <Table.Cell />
                          <Table.Cell />
                          <Table.Cell>
                            {resp.data.map(dt => (
                              <List>
                                <List.Item>
                                  <List.Header>Tanggal Masuk</List.Header>
                                  {dt.day1}-{dt.month1}-{dt.year1} {dt.hour1}
                                  {":"}
                                  {dt.minute1}
                                </List.Item>
                                <List.Item>
                                  <List.Header>
                                    Perkiraan Pengambilan
                                  </List.Header>
                                  {dt.day2}-{dt.month2}-{dt.year2}
                                </List.Item>
                                <List.Item>
                                  <List.Header>Kasir</List.Header>
                                  {dt.user}
                                </List.Item>
                                <List.Item>
                                  <List.Header>Status bayar</List.Header>
                                  {dt.status}
                                </List.Item>
                              </List>
                            ))}
                          </Table.Cell>
                        </Table.Body>

                        <h2>Detail</h2>

                        {/* <Table.Body>
                          {resp.repos.map((rp, index) => (
                            <Table.Row key={rp._id}>
                              <Table.Cell>{index + 1}</Table.Cell>
                              <Table.Cell>{rp.service.serviceName}</Table.Cell>
                              <Table.Cell>
                                {rp.qty} {rp.service.unit}
                              </Table.Cell>
                              <Table.Cell>
                                Rp{" "}
                                {new Intl.NumberFormat(["ban", "id"]).format(
                                  rp.service.tarif
                                )}
                              </Table.Cell>
                              <Table.Cell>
                                Rp{" "}
                                {new Intl.NumberFormat(["ban", "id"]).format(
                                  resp.repos.reduce(
                                    (sum, idx) =>
                                      (sum = idx.qty * idx.service.tarif),
                                    0
                                  )
                                )}
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body> */}

                        {/* jfsdjfklsdfklsd */}
                        <Table.Body>
                          {resp.repos.map((rp, index) => (
                            <Table.Row key={rp._id}>
                              <Table.Cell>{index + 1}</Table.Cell>
                              <Table.Cell>{rp.service}</Table.Cell>
                              <Table.Cell>
                                {rp.qty} {rp.unit}
                              </Table.Cell>
                              <Table.Cell>
                                Rp{" "}
                                {new Intl.NumberFormat(["ban", "id"]).format(
                                  rp.tarif
                                )}
                              </Table.Cell>
                              <Table.Cell>
                                Rp{" "}
                                {new Intl.NumberFormat(["ban", "id"]).format(
                                  rp.price
                                )}
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                        {/* jfsdjfklsdfklsd */}

                        <Table.Body>
                          {resp.data.map(dt => (
                            <Table.Row key={dt._id}>
                              <Table.Cell />
                              <Table.Cell />
                              <Table.Cell />
                              <Table.Cell>Total</Table.Cell>
                              <Table.Cell>
                                Rp{" "}
                                {new Intl.NumberFormat(["ban", "id"]).format(
                                  dt.total
                                )}
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>

                        <Table.Body>
                          {resp.data.map(dt => (
                            <Table.Row key={dt._id}>
                              <Table.Cell />
                              <Table.Cell />
                              <Table.Cell />
                              <Table.Cell>Diskon</Table.Cell>
                              <Table.Cell>{dt.discount} %</Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>

                        <Table.Body>
                          {resp.data.map(dt => (
                            <Table.Row key={dt._id}>
                              <Table.Cell />
                              <Table.Cell />
                              <Table.Cell />
                              <Table.Cell active>Grand Total</Table.Cell>
                              <Table.Cell active>
                                Rp{" "}
                                {new Intl.NumberFormat(["ban", "id"]).format(
                                  dt.grandTotal
                                )}
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table>
                    </p>
                    <Header as="h5" textAlign="center">
                      <List>
                        <List.Item>
                          <List.Header>
                            Jangan lupa cek proses laundry-mu ya!
                          </List.Header>
                        </List.Item>
                        <List.Item>
                          Masukkan kode invoice pada kolom pencarian, kemudian
                          klik cari.
                        </List.Item>
                      </List>
                    </Header>
                  </Container>
                </p>
              </Grid.Column>

              <Grid.Column>
                <p />
                <p />
                <p />
                <p />
              </Grid.Column>
            </Grid>
          </Segment>
        </div>
      </div>
    </div>
  );
}

function printDocument() {
  const input = document.getElementById("divToPrint");
  html2canvas(input).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "JPEG", 0, 0);
    // pdf.output('dataurlnewwindow');
    pdf.save("Struk.pdf");
  });
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
