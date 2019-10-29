import React from "react";

import axios from "axios";

import { serviceUser, serviceTransact } from "../../config";

import { Header, Container, Table, Grid, Segment } from "semantic-ui-react";

export default class Dasadmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pemasukan: [],
      salary: [],
      outcome: [],
      trans: [],
      item: []
    };
  }

  componentDidMount() {
    Promise.all([
      axios.get(`${serviceUser}/api/v1/dashboard/pemasukan/`),
      axios.get(`${serviceUser}/api/v1/mreportItem/salary?m=5&y=2019`),
      axios.get(`${serviceUser}/api/v1/mreportItem/outcome?m=5&y=2019`),
      axios.get(`${serviceTransact}/api/v1/transaction/`),
      axios.get(`${serviceUser}/api/v1/mreportItem/item?m=5&y=2019`)
    ])
      .then(([res1, res2, res3, res4, res5]) =>
        Promise.all([res1.data, res2.data, res3.data, res4.data, res5.data])
      )
      .then(([data1, data2, data3, data4, data5]) =>
        this.setState({
          pemasukan: data1,
          salary: data2,
          outcome: data3,
          trans: data4,
          item: data5
        })
      );
  }

  render() {
    console.log("salary: ", this.state.salary);
    console.log("outcome: ", this.state.outcome);
    console.log("pemasukan: ", this.state.pemasukan);

    return (
      <div>
        <Container>
          <Header>Dasboard Admin</Header>

          <Grid columns={2} divided>
            <Grid.Row stretched>
              <Grid.Column>
                <Segment>
                  <Table singleLine color="red" inverted>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell textAlign="left">
                          <h3>Pengeluaran Lain-lain</h3>
                        </Table.HeaderCell>
                        <Table.HeaderCell />
                        <Table.HeaderCell />
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {this.state.outcome.map(dt => (
                        <Table.Row>
                          <Table.Cell>{dt.outcomein}</Table.Cell>
                          <Table.Cell>
                            {dt.month}/{dt.year}
                          </Table.Cell>
                          <Table.Cell>
                            Rp{" "}
                            {new Intl.NumberFormat(["ban", "id"]).format(
                              dt.paybill
                            )}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                  <p />
                  <Table singleLine color="orange" inverted>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell textAlign="left">
                          <h3>Transaksi</h3>
                        </Table.HeaderCell>
                        <Table.HeaderCell />
                        <Table.HeaderCell />
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          {this.state.trans.length} transaksi
                        </Table.Cell>
                        <Table.Cell>berhasil telah dilakukan</Table.Cell>
                        <Table.Cell />
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Table singleLine color="yellow" inverted>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell textAlign="left">
                          <h3>Barang</h3>
                        </Table.HeaderCell>
                        <Table.HeaderCell />
                        <Table.HeaderCell />
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {this.state.item.map(dt => (
                        <Table.Row>
                          <Table.Cell>{dt.item}</Table.Cell>
                          <Table.Cell>
                            {dt.month}/{dt.year}
                          </Table.Cell>
                          <Table.Cell>
                            Rp{" "}
                            {new Intl.NumberFormat(["ban", "id"]).format(
                              dt.bayar_barang
                            )}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Segment>
                <Segment>
                  <Table singleLine color="teal" inverted>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>
                          <h3>Pemasukan</h3>
                        </Table.HeaderCell>
                        <Table.HeaderCell />
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {this.state.pemasukan.map(dt => (
                        <Table.Row>
                          <Table.Cell>{dt.status}</Table.Cell>

                          <Table.Cell>
                            Rp{" "}
                            {new Intl.NumberFormat(["ban", "id"]).format(
                              dt.total
                            )}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Segment>
                <Segment>
                  <Table singleLine color="olive" inverted>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell textAlign="left">
                          <h3>Penggajian</h3>
                        </Table.HeaderCell>
                        <Table.HeaderCell />
                        <Table.HeaderCell />
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {this.state.salary.map(dt => (
                        <Table.Row>
                          <Table.Cell>{dt.user}</Table.Cell>
                          <Table.Cell>
                            {dt.month}/{dt.year}
                          </Table.Cell>
                          <Table.Cell>
                            Rp{" "}
                            {new Intl.NumberFormat(["ban", "id"]).format(
                              dt.paysalary
                            )}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}
