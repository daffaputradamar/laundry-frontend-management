import React, { Component, Fragment } from "react";
import { Header } from "semantic-ui-react";
import DataTable from "../../components/DataTable";
import ErrorMessage from "../../components/ErrorMessage";
import { DetailService } from "../../services/DetailService";
import { ProcessService } from "../../services/ProcessService";
import { ServiceService } from "../../services/ServiceService";
import { TransactionService } from "../../services/TransactionService";

interface IState {
  details: IDetail[];
  transaction: ITransaction[];
  services: IService[];
  processs: IProcess[];
  loading: boolean;
  error?: Error;
}

const fields: IField[] = [
  {
    name: "transaction",
    label: "Invoice",
    type: "option",
    validations: ["required"],
    hideForm: true,
    optionData: {
      data: [],
      textKey: "invoice",
      valueKey: "_id"
    }
  },
  {
    name: "service",
    label: "Paket Laundry",
    type: "option",
    validations: ["required"],
    optionData: {
      data: [],
      textKey: "serviceName",
      valueKey: "_id"
    }
  },

  {
    name: "process",
    label: "Proses Laundry",
    type: "option",
    validations: ["required"],
    optionData: {
      data: [],
      textKey: "process_name",
      valueKey: "_id"
    }
  },
  {
    name: "qty",
    label: "Jumlah",
    validations: ["required", "numeric"]
  }
];

// export default class Idetails extends Component<{}, IState> {
export default class Detail extends Component<{}, IState> {
  [x: string]: any;
  public state: IState = {
    details: [],
    transaction: [],
    services: [],
    processs: [],
    loading: false
  };

  public detailService = new DetailService();
  public transactionService = new TransactionService();
  public serviceService = new ServiceService();
  public processService = new ProcessService();

  public componentDidMount() {
    this.getDetail();
    this.getTransaction();
    this.getMember();
    this.getProcess();
  }

  public getMember() {
    this.serviceService.get().then(services => this.setState({ services }));
  }
  public getProcess() {
    this.processService.get().then(processs => this.setState({ processs }));
  }

  public getTransaction() {
    this.transactionService
      .get()
      .then(transaction => this.setState({ transaction }));
  }

  public getDetail() {
    this.setState({ loading: true });
    this.detailService
      .get()
      .then(details => this.setState({ details }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  public createDetail(input: IDetail) {
    this.setState({ loading: true });
    this.detailService
      .create(input)
      .then(() => this.getDetail())
      .catch(error => this.setState({ error, loading: false }));
  }

  public updateDetail(input: IDetail, id: string) {
    this.setState({ loading: true });
    this.detailService
      .update(input, id)
      .then(() => this.getDetail())
      .catch(error => this.setState({ error, loading: false }));
  }

  public deleteDetail(id: string) {
    this.setState({ loading: true });
    this.detailService
      .delete(id)
      .then(() => this.getDetail())
      .catch(error => this.setState({ error, loading: false }));
  }

  public setOptionsData() {
    fields[0].optionData!.data = this.state.transaction;
    fields[1].optionData!.data = this.state.services;
    fields[2].optionData!.data = this.state.processs;
  }

  public render() {
    this.setOptionsData();
    return (
      <Fragment>
        <Header
          content="Detail Transaksi"
          subheader="Klik Tabel untuk melakukan perubahan data"
        />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <DataTable<IDetail>
          data={this.state.details}
          loading={this.state.loading}
          fields={fields}
          onCreate={input => this.createDetail(input)}
          onUpdate={input => this.updateDetail(input, input._id)}
          onDelete={input => this.deleteDetail(input._id)}
        />
      </Fragment>
    );
  }
}
