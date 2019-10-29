import React from "react";

import DatePicker from "react-datepicker";

import { serviceUser } from "../../config";

import "react-datepicker/dist/react-datepicker.css";

import {
  Grid,
  Segment,
  Header,
  Button,
  Container,
  Form,
  // Input,
  Table
} from "semantic-ui-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

export default class Dreports extends React.Component {
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

      datein: new Date(),
      dateout: new Date()
    };

    this.changedateIn = this.changedateIn.bind(this);
    this.changedateOut = this.changedateOut.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changedateIn(date) {
    this.setState({ datein: date });
  }
  changedateOut(date) {
    this.setState({ dateout: date });
  }

  handleSubmit(event) {
    event.preventDefault();

    Promise.all([
      axios.get(
        `${serviceUser}/api/v1/dreport/outcome?dateIn=${this.state.datein}&dateOut=${this.state.dateout}`
      ),
      axios.get(
        `${serviceUser}/api/v1/dreport/salary?dateIn=${this.state.datein}&dateOut=${this.state.dateout}`
      ),
      axios.get(
        `${serviceUser}/api/v1/dreport/item?dateIn=${this.state.datein}&dateOut=${this.state.dateout}`
      ),
      axios.get(
        `${serviceUser}/api/v1/dreport/pemasukan?dateIn=${this.state.datein}&dateOut=${this.state.dateout}`
      ),
      axios.get(
        `${serviceUser}/api/v1/dreport/pengeluaran?dateIn=${this.state.datein}&dateOut=${this.state.dateout}`
      )
    ])
      .then(([res1, res2, res3, res4, res5]) =>
        Promise.all([res1.data, res2.data, res3.data, res4.data, res5.data])
      )
      .then(([data1, data2, data3, data4, data5]) =>
        this.setState({
          outcome2: data1,
          salary: data2,
          item: data3,
          pemasukan: data4,
          pengeluaran: data5
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
    console.log("mreport: ", this.state.mreport);

    return (
      <div>
        {/* <br /> */}
        {/* <br /> */}
        <Container text>
          <Header as="h2" textAlign="center">
            Laporan
          </Header>
          <p>
            <Form>
              <Form.Field>
                <label>Tanggal Awal</label>

                <DatePicker
                  selected={this.state.datein}
                  onChange={this.changedateIn}
                />
              </Form.Field>
              <Form.Field>
                <label>Tanggal Akhir</label>

                <DatePicker
                  selected={this.state.dateout}
                  onChange={this.changedateOut}
                />
              </Form.Field>

              <Button type="submit" value="Submit" onClick={this.handleSubmit}>
                Cari
              </Button>
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
                                  <Table.HeaderCell />
                                </Table.Row>
                              </Table.Header>

                              <Table.Body>
                                {this.state.pemasukan.map(dt => (
                                  <Table.Row>
                                    <Table.Cell>
                                      {dt.dayOfMonth}-{dt.month}-{dt.year}
                                    </Table.Cell>

                                    <Table.Cell>
                                      Rp{" "}
                                      {new Intl.NumberFormat([
                                        "ban",
                                        "id"
                                      ]).format(dt.totalPay)}
                                    </Table.Cell>
                                    <Table.Cell />
                                    <Table.Cell />
                                  </Table.Row>
                                ))}

                                <Table.Row>
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell>Penggajian</Table.Cell>
                                  <Table.Cell />
                                </Table.Row>

                                {this.state.salary.map(dt => (
                                  <Table.Row>
                                    <Table.Cell />
                                    <Table.Cell />
                                    <Table.Cell />
                                    <Table.Cell>
                                      {dt.dayOfMonth}-{dt.month}-{dt.year}
                                    </Table.Cell>

                                    <Table.Cell>{dt.user.name}</Table.Cell>
                                    <Table.Cell>
                                      Rp{" "}
                                      {new Intl.NumberFormat([
                                        "ban",
                                        "id"
                                      ]).format(dt.paySalary)}
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
                                    <Table.Cell>
                                      {dt.dayOfMonth}-{dt.month}-{dt.year}
                                    </Table.Cell>

                                    <Table.Cell>{dt.user.item_name}</Table.Cell>
                                    <Table.Cell>
                                      Rp{" "}
                                      {new Intl.NumberFormat([
                                        "ban",
                                        "id"
                                      ]).format(dt.totalBuy)}
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
                                    <Table.Cell>
                                      {dt.dayOfMont}-{dt.month}-{dt.year}
                                    </Table.Cell>

                                    <Table.Cell>
                                      {dt.outcomein.outcomein_name}
                                    </Table.Cell>
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
                                  <Table.Cell>
                                    laba: {this.state.pengeluaran.laba}
                                  </Table.Cell>
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell />
                                  <Table.Cell />
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
