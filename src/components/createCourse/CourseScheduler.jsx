import * as React from "react";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import moment from "moment";
import "../Login/LoginStyle.css";
import Pagetop from "../Homepage/Pagetop.jsx";
import axios from "../axios/axios";
import Navbar from "../Dashboard/Sidebar";
import { Checkbox } from "@mui/material";
import { ArrowRight } from "@material-ui/icons";

date_create: moment().format("DD-MM-YYYY hh:mm:ss");

export default class UserSchedule extends React.PureComponent {

  constructor(props) {
    super(props);
    var today = new Date();
    this.state = {
      //load data into the scheduler
      data: [],
      //Add current date
      currentDate: today,

      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }

  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  commitChanges({ added, changed, deleted }) {
    if (added) {
      axios()
        .post("api/trainer/addCourse", {
          title: this.state.addedAppointment.title,
          startDate: this.state.addedAppointment.startDate,
          endDate: this.state.addedAppointment.endDate,
          rRule: this.state.addedAppointment.rRule,
          allDay: this.state.addedAppointment.allDay,
        })
        .then((response) => {
          if (response.status == 201) {
            this.setState((state) => {
              let { data } = state;
              data = [...data, { id: response.data.id, ...added }];
              return { data };
            });
          }
        })
        .catch((error) => {
          if (!error.response) return;
        });
    }
    if (changed) {
      console.log(changed)
      this.setState((state) => {
        let { data } = state;
        data = data.map((appointment) =>
          changed[appointment.id]
            ?  { ...appointment, ...changed[appointment.id] }
            : appointment
        );

        return { data };
      });
    }
    if (deleted !== undefined) {

      axios()
      .delete("api/trainer/removeCourse/"+deleted)
      .then((response) => {
        if (response.status == 200) {
          this.setState((state) => {
            let { data } = state;
            data = data.filter((appointment) => appointment.id !== deleted);
            return { data };
          });
        }
      })
      .catch((error) => {
        if (!error.response) return;
      });
    
    }
  }
  componentDidMount() {
    axios()
      .get("api/getCourses")
      .then((response) => {
        let Rdata = response.data
        let o={}
        let arr =[]
        for (let i=0;i<Rdata.length;i++){
          o={}
          o.id=Rdata[i].id
          o.title=Rdata[i].title?Rdata[i].title:""
          o.startDate=new Date(Rdata[i].startDate)
          o.endDate=new Date(Rdata[i].endDate)
          o.exDate=Rdata[i].exDate
          o.rRule=Rdata[i].rRule
          o.allDay=Rdata[i].allDay?true:false
          arr.push(o)
        }
        console.log(arr)
        this.setState({
          data: arr,
        });
      })
      .catch((error) => {
        if (!error.response) return;
      });
  }

  render() {
    const {
      currentDate,
      data,
      addedAppointment,
      appointmentChanges,
      editingAppointment,
    } = this.state;

    return (
      <React.Fragment>
        <Pagetop></Pagetop>
        <Paper className="Login">
          <Scheduler data={data} height={660}>
            <ViewState currentDate={currentDate} />
            <EditingState
              onCommitChanges={this.commitChanges}
              addedAppointment={addedAppointment}
              onAddedAppointmentChange={this.changeAddedAppointment}
              appointmentChanges={appointmentChanges}
              onAppointmentChangesChange={this.changeAppointmentChanges}
              editingAppointment={editingAppointment}
              onEditingAppointmentChange={this.changeEditingAppointment}
            />
            <WeekView startDayHour={8} endDayHour={19} />
            <AllDayPanel />
            <EditRecurrenceMenu />
            <ConfirmationDialog visible='false' />
            <Appointments />
            <AppointmentTooltip showCloseButton showOpenButton showDeleteButton />
            <AppointmentForm
             readOnly={true}
            />
          
          </Scheduler>
        </Paper>
      </React.Fragment>
    );
  }
}
