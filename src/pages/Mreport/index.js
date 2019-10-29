import React from "react";
import { Link } from "react-router-dom";

import { serviceUser } from "../../config";

import {
  Grid,
  Segment,
  Header,
  Button,
  Container,
  Form,
  Input,
  Table
} from "semantic-ui-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

export default class Mreports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outcome2: [],
      salary: [],
      item: [],
      pemasukan: [],
      totaloutcome: [],
      totalitem: [],
      totalsalary: [],
      pengeluaran: [],
      method: "5"
    };

    this.changeValue = this.changeValue.bind(this);
    this.changeMethod = this.changeMethod.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeValue(event) {
    this.setState({ value: event.target.value });
  }

  changeMethod(event) {
    this.setState({ method: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    Promise.all([
      axios.get(
        `${serviceUser}/api/v1/mreportItem/outcome2?m=${this.state.method}&y=${this.state.value}`
      ),
      axios.get(
        `${serviceUser}/api/v1/mreportItem/salary?m=${this.state.method}&y=${this.state.value}`
      ),
      axios.get(
        `${serviceUser}/api/v1/mreportItem/item?m=${this.state.method}&y=${this.state.value}`
      ),
      axios.get(
        `${serviceUser}/api/v1/mreportItem/pemasukan?m=${this.state.method}&y=${this.state.value}`
      ),
      axios.get(
        `${serviceUser}/api/v1/mreport/outcome?m=${this.state.method}&y=${this.state.value}`
      ),
      axios.get(
        `${serviceUser}/api/v1/mreport/item?m=${this.state.method}&y=${this.state.value}`
      ),
      axios.get(
        `${serviceUser}/api/v1/mreport/salary?m=${this.state.method}&y=${this.state.value}`
      ),
      axios.get(
        `${serviceUser}/api/v1/mreport/pengeluaran?m=${this.state.method}&y=${this.state.value}`
      )
    ])
      .then(([res1, res2, res3, res4, res5, res6, res7, res8]) =>
        Promise.all([
          res1.data,
          res2.data,
          res3.data,
          res4.data,
          res5.data,
          res6.data,
          res7.data,
          res8.data
        ])
      )
      .then(([data1, data2, data3, data4, data5, data6, data7, data8]) =>
        this.setState({
          outcome2: data1,
          salary: data2,
          item: data3,
          pemasukan: data4,
          totaloutcome: data5,
          totalitem: data6,
          totalsalary: data7,
          pengeluaran: data8
        })
      );
  }

  printDocument() {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  }

  render() {
    console.log("salary: ", this.state.salary);
    console.log("item: ", this.state.item);
    console.log("outcome: ", this.state.outcome);
    console.log("pemasukan: ", this.state.pemasukan);
    console.log("laba: ", this.state.pengeluaran.laba);

    return (
      <div>
        <br />
        <br />
        <Container text>
          <p>
            <Link to={`/laporan_harian`}>
              <Button content="Laporan Harian" color="orange" />
            </Link>

            <Link to={`/laporan`}>
              <Button content="Laporan Bulanan" color="violet" />
            </Link>
          </p>
          <Header as="h2" textAlign="center">
            Laporan Bulanan
          </Header>

          <p>
            <Form>
              <Input
                type="text"
                placeholder="Tahun.."
                action
                value={this.state.value}
                onChange={this.changeValue}
              >
                <input />

                <select onChange={this.changeMethod}>
                  <option value="1" selected={this.state.method === "1"}>
                    Januari
                  </option>
                  <option value="2" selected={this.state.method === "2"}>
                    Februari
                  </option>
                  <option value="3" selected={this.state.method === "3"}>
                    Maret
                  </option>
                  <option value="4" selected={this.state.method === "4"}>
                    April
                  </option>
                  <option value="5" selected={this.state.method === "5"}>
                    Mei
                  </option>
                  <option value="6" selected={this.state.method === "6"}>
                    Juni
                  </option>
                  <option value="7" selected={this.state.method === "7"}>
                    Juli
                  </option>
                  <option value="8" selected={this.state.method === "8"}>
                    Agustus
                  </option>
                  <option value="9" selected={this.state.method === "9"}>
                    September
                  </option>
                  <option value="10" selected={this.state.method === "10"}>
                    Oktober
                  </option>
                  <option value="11" selected={this.state.method === "11"}>
                    November
                  </option>
                  <option value="12" selected={this.state.method === "12"}>
                    Desember
                  </option>
                </select>
                <Button
                  type="submit"
                  value="Submit"
                  onClick={this.handleSubmit}
                >
                  Search
                </Button>
              </Input>
            </Form>
          </p>
          <p>
            <div>
              <p>
                <div className="mb5">
                  <Button onClick={this.printDocument}>Print</Button>
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
                          <Header textAlign="center">Laporan Bulanan</Header>

                          <Table celled>
                            {this.state.totalitem.map(dt => (
                              <Table.Row>
                                <Table.Cell> Bulan : {dt.month} </Table.Cell>
                                <Table.Cell>{"              "}</Table.Cell>
                                <Table.Cell>{"              "}</Table.Cell>
                                <Table.Cell>{"              "}</Table.Cell>
                                <Table.Cell> Tahun :{dt.year}</Table.Cell>
                              </Table.Row>
                            ))}
                          </Table>
                          <p>
                            <Table celled>
                              <Table.Header>
                                <Table.Row>
                                  <Table.HeaderCell>Pemasukan</Table.HeaderCell>
                                  <Table.HeaderCell />

                                  <Table.HeaderCell />
                                  <Table.HeaderCell>
                                    Pengeluaran
                                  </Table.HeaderCell>
                                  <Table.HeaderCell />
                                </Table.Row>
                              </Table.Header>

                              <Table.Body>
                                <Table.Row>
                                  <Table.Cell>Transaksi</Table.Cell>
                                  <Table.Cell>
                                    Rp{" "}
                                    {new Intl.NumberFormat([
                                      "ban",
                                      "id"
                                    ]).format(this.state.pemasukan.pemasukan)}
                                  </Table.Cell>
                                  <Table.Cell />
                                  <Table.Cell>Penggajian</Table.Cell>
                                  <Table.Cell />
                                </Table.Row>

                                {this.state.salary.map(dt => (
                                  <Table.Row>
                                    <Table.Cell />
                                    <Table.Cell />
                                    <Table.Cell />
                                    <Table.Cell>{dt.user}</Table.Cell>
                                    <Table.Cell>
                                      Rp{" "}
                                      {new Intl.NumberFormat([
                                        "ban",
                                        "id"
                                      ]).format(dt.paysalary)}
                                    </Table.Cell>
                                  </Table.Row>
                                ))}

                                {this.state.totalsalary.map(dt => (
                                  <Table.Row>
                                    <Table.Cell />
                                    <Table.Cell />
                                    <Table.Cell />
                                    <Table.Cell>Total</Table.Cell>
                                    <Table.Cell>
                                      Rp{" "}
                                      {new Intl.NumberFormat([
                                        "ban",
                                        "id"
                                      ]).format(dt.paysalary)}
                                    </Table.Cell>
                                  </Table.Row>
                                ))}

                                <Table.Row>
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell />
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell>Pembelian Barang</Table.Cell>
                                  <Table.Cell />
                                </Table.Row>
                                {this.state.item.map(dt => (
                                  <Table.Row>
                                    <Table.Cell />
                                    <Table.Cell />
                                    <Table.Cell />
                                    <Table.Cell>{dt.item}</Table.Cell>
                                    <Table.Cell>
                                      Rp{" "}
                                      {new Intl.NumberFormat([
                                        "ban",
                                        "id"
                                      ]).format(dt.bayar_barang)}
                                    </Table.Cell>
                                  </Table.Row>
                                ))}

                                {this.state.totalitem.map(dt => (
                                  <Table.Row>
                                    <Table.Cell />
                                    <Table.Cell />
                                    <Table.Cell />
                                    <Table.Cell>Total</Table.Cell>
                                    <Table.Cell>
                                      Rp{" "}
                                      {new Intl.NumberFormat([
                                        "ban",
                                        "id"
                                      ]).format(dt.bayar_barang)}
                                    </Table.Cell>
                                  </Table.Row>
                                ))}

                                <Table.Row>
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell />
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell>Pembayaran lain-lain</Table.Cell>
                                  <Table.Cell />
                                </Table.Row>
                                {this.state.outcome2.map(dt => (
                                  <Table.Row>
                                    <Table.Cell />
                                    <Table.Cell />
                                    <Table.Cell />
                                    <Table.Cell>{dt.outcomein}</Table.Cell>
                                    <Table.Cell>
                                      Rp{" "}
                                      {new Intl.NumberFormat([
                                        "ban",
                                        "id"
                                      ]).format(dt.paybill)}
                                    </Table.Cell>
                                  </Table.Row>
                                ))}

                                {this.state.totaloutcome.map(dt => (
                                  <Table.Row>
                                    <Table.Cell />
                                    <Table.Cell />
                                    <Table.Cell />
                                    <Table.Cell>Total</Table.Cell>
                                    <Table.Cell>
                                      Rp{" "}
                                      {new Intl.NumberFormat([
                                        "ban",
                                        "id"
                                      ]).format(dt.paybill)}
                                    </Table.Cell>
                                  </Table.Row>
                                ))}

                                <Table.Row>
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell />
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell>Total</Table.Cell>
                                  <Table.Cell>
                                    Rp{" "}
                                    {new Intl.NumberFormat([
                                      "ban",
                                      "id"
                                    ]).format(this.state.pemasukan.pemasukan)}
                                  </Table.Cell>
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell>
                                    Rp{" "}
                                    {new Intl.NumberFormat([
                                      "ban",
                                      "id"
                                    ]).format(this.state.pengeluaran.keluar)}
                                  </Table.Cell>
                                </Table.Row>
                                <Table.Row active>
                                  <Table.Cell>Laba</Table.Cell>
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell>
                                    Rp{" "}
                                    {new Intl.NumberFormat([
                                      "ban",
                                      "id"
                                    ]).format(this.state.pengeluaran.laba)}
                                  </Table.Cell>
                                </Table.Row>
                              </Table.Body>
                            </Table>
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
              </p>
            </div>
          </p>
        </Container>
      </div>
    );
  }
}
