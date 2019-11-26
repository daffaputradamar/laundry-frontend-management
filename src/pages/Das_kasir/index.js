import React from "react";

import axios from "axios";

import { serviceUser, serviceTransact, serviceItem } from "../../config";

import { Header, Container, Table, Grid, Segment } from "semantic-ui-react";

export default class Daskasir extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pemasukan: [],
      layanan: [],
      proses: [],
      trans: [],
      item: []
    };
  }

  componentDidMount() {
    Promise.all([
      axios.get(`${serviceUser}/api/v1/dashboard/pemasukan/`),
      axios.get(`${serviceUser}/api/v1/dashboard/layanan/`),
      axios.get(`${serviceUser}/api/v1/dashboard/proses/`),
      axios.get(`${serviceTransact}/api/v1/transaction/`),
      axios.get(`${serviceItem}/api/v1/item/show_item/`)
    ])
      .then(([res1, res2, res3, res4, res5]) =>
        Promise.all([res1.data, res2.data, res3.data, res4.data, res5.data])
      )
      .then(([data1, data2, data3, data4, data5]) =>
        this.setState({
          pemasukan: data1,
          layanan: data2,
          proses: data3,
          trans: data4,
          item: data5
        })
      );
  }

  render() {
    console.log("layanan: ", this.state.layanan);
    console.log("proses: ", this.state.proses);
    console.log("pemasukan: ", this.state.pemasukan);

    return (
      <div>
        <Container>
          <Header>Dasboard Kasir</Header>

          <Grid columns={2} divided>
            <Grid.Row stretched>
              <Grid.Column>
                <Segment>
                  <Table singleLine color="red">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell textAlign="left">
                          <h3>Layanan</h3>
                        </Table.HeaderCell>
                        <Table.HeaderCell />
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {this.state.layanan.map(dt => (
                        <Table.Row>
                          <Table.Cell>{dt.service}</Table.Cell>
                          <Table.Cell>{dt.mount} paket</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Table singleLine color="yellow">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell textAlign="left">
                          <h3>Barang</h3>
                        </Table.HeaderCell>
                        <Table.HeaderCell />
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {this.state.item.map(dt => (
                        <Table.Row>
                          <Table.Cell>{dt.item_name}</Table.Cell>

                          <Table.Cell>
                            {dt.stock} {dt.unit}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Segment>
                <Segment>
                  <Table singleLine color="teal">
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
                  <Table singleLine color="olive">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell textAlign="left">
                          <h3>Proses</h3>
                        </Table.HeaderCell>
                        <Table.HeaderCell />
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {this.state.proses.map(dt => (
                        <Table.Row>
                          <Table.Cell>{dt.kode}</Table.Cell>

                          <Table.Cell>{dt.mount} paket</Table.Cell>
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
