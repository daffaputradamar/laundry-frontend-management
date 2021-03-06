import { ObjectID } from "bson"
import React, { Component, Fragment } from "react"
import { Route, RouteComponentProps } from "react-router-dom"
import { Button, Divider, Dropdown, Header, Label } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import Form from "../../components/DataTable/Form"
import ErrorMessage from "../../components/ErrorMessage"
import { DetailService } from "../../services/DetailService"
import { MemberService } from "../../services/MemberService"
import { ProcessService } from "../../services/ProcessService"
import { ServiceService } from "../../services/ServiceService"
import { StatusService } from "../../services/StatusService"
import { TransactionService } from "../../services/TransactionService"

interface IState {
  details: IDetail[]
  services: IService[]
  processs: IProcess[]
  members: IMember[]
  statuss: IStatus[]
  member: string
  status: string
  loading: boolean
  error?: Error
  isFormOpen: boolean
}

const fields: IField[] = [
  {
    name: "service",
    label: "Paket Laundry",
    type: "option",
    validations: ["required"],
    optionData: {
      data: [],
      textKey: "serviceName",
      valueKey: "_id",
    },
  },
  {
    name: "process",
    label: "Proses Laundry",
    type: "option",
    validations: ["required"],
    optionData: {
      data: [],
      textKey: "process_name",
      valueKey: "_id",
    },
  },
  {
    name: "qty",
    label: "Jumlah",
    validations: ["required", "numeric"],
  },
]

const memberFields: IField[] = [
  {
    name: "member_name",
    label: "Nama Member",
    validations: ["required"],
  },
  {
    name: "phone",
    label: "Telepon",
    validations: ["required", "numeric"],
  },
  {
    name: "address",
    label: "Alamat",
    validations: ["required"],
  },
]

export default class TransactionNew extends Component<
  RouteComponentProps,
  IState
> {
  [x: string]: any;
  public state: IState = {
    details: [],
    services: [],
    processs: [],
    members: [],
    statuss: [],
    member: "",
    status: "",
    loading: false,
    isFormOpen: false,
  }

  public detailService = new DetailService()
  public transactionService = new TransactionService()
  public serviceService = new ServiceService()
  public processService = new ProcessService()
  public memberService = new MemberService()
  public statusService = new StatusService()

  public componentDidMount() {
    this.getService()
    this.getProcess()
    this.getMember()
    this.getStatus()
  }

  public getService() {
    this.serviceService.get().then((services) => this.setState({ services }))
  }
  public getProcess() {
    this.processService.get().then((processs) => this.setState({ processs }))
  }

  public getMember() {
    this.memberService.get().then((members) => this.setState({ members }))
  }

  public createMember(input: IMember) {
    this.memberService
      .create(input)
      .then(() => this.getMember())
      .catch((error) => this.setState({ error }))
  }

  public getStatus() {
    this.statusService.get().then((statuss) => this.setState({ statuss }))
  }

  public createDetail(input: IDetail) {
    input._id = new ObjectID().toHexString()
    const { details } = this.state
    details.push(input)
    this.setState({ details })
  }

  public updateDetail(input: IDetail, id: string) {
    const details = this.state.details.map((detail) =>
      detail._id === id ? input : detail,
    )
    this.setState({ details })
  }

  public deleteDetail(id: string) {
    const details = this.state.details.filter((detail) => detail._id !== id)
    this.setState({ details })
  }

  public changeMember(member: string) {
    this.setState({ member })
  }

  public changeStatus(status: string) {
    this.setState({ status })
  }

  public submit() {
    const inputTransaction = {
      member: this.state.member,
      status: this.state.status,
      // recepient: "",
    } as ITransaction

    this.setState({ loading: true })
    this.transactionService.create(inputTransaction).then((trans) => {
      this.state.details.forEach((item, index) => {
        item.transaction = trans._id
        this.detailService.create(item).then(() => {
          if (index === this.state.details.length - 1) {
            this.setState({ loading: false })
            this.props.history.push("/transaction")
          }
        })
      })
    })
  }

  public getOptions(data: any[], textKey: string, valueKey: string) {
    return data.map((item) => ({
      text: item[textKey],
      value: item[valueKey],
    }))
  }

  public setOptionsData() {
    fields[0].optionData!.data = this.state.services
    fields[1].optionData!.data = this.state.processs
  }

  public render() {
    this.setOptionsData()
    return (
      <Fragment>
        <Header content="Transaksi Baru" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <Label size="large" content="Member" />
        <Dropdown
          placeholder={"Pilih Members"}
          search
          selection
          options={this.getOptions(this.state.members, "member_name", "_id")}
          value={this.state.member}
          onChange={(event, { value }) => this.changeMember(value as string)}
          noResultsMessage={
            <Button onClick={() => this.setState({ isFormOpen: true })}>
              Tambah Member
            </Button>}
        />
        &nbsp; &nbsp;
        <Label size="large" content="Status" />
        <Dropdown
          placeholder={"Pilih Status Bayar"}
          search
          selection
          options={this.getOptions(this.state.statuss, "status_name", "_id")}
          value={this.state.status}
          onChange={(event, { value }) => this.changeStatus(value as string)}
        />
        <Divider />
        <Header content="Detail Transaksi" />
        <DataTable<IDetail>
          data={this.state.details}
          loading={this.state.loading}
          fields={fields}
          onCreate={(input) => this.createDetail(input)}
          onUpdate={(input) => this.updateDetail(input, input._id)}
          onDelete={(input) => this.deleteDetail(input._id)}
        />
        <Button color="blue" onClick={() => this.submit()}>
          Simpan
        </Button>
        <Form
          initialInput={{}}
          fields={memberFields}
          open={this.state.isFormOpen}
          onClose={() => this.setState({ isFormOpen: false })}
          onCreate={(input) => this.createMember(input)}
        />
      </Fragment>
    )
  }
}
