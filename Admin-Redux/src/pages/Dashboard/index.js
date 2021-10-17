import React, { Component } from "react"
import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input
} from "reactstrap"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

//import Charts
import StackedColumnChart from "./StackedColumnChart"


//import action
import { getChartsData } from "../../store/actions"

// Pages Components
import WelcomeComp from "./WelcomeComp"
import MonthlyEarning from "./MonthlyEarning"
import SocialSource from "./SocialSource"
import ActivityComp from "./ActivityComp"
import TopCities from "./TopCities"
import LatestTranaction from "./LatestTranaction"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"
import classNames from "classnames";

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reports: [
        { title: "Sell tk & Unit", iconClass: "bx-copy-alt", description: "1,235" },
        {
          title: "Top Selling Area",
          iconClass: "bx-archive-in",
          description: "Gulshan",
        },
        {
          title: "Top Selling Store",
          iconClass: "bx-purchase-tag-alt",
          description: "XYZ",
        },
        {
          title: "Sell Off your product",
          iconClass: "bx-purchase-tag-alt",
          description: "XYZ",
        },
      ],
      email: [
        { title: "Week", linkto: "#", isActive: false },
        { title: "Month", linkto: "#", isActive: false },
        { title: "Year", linkto: "#", isActive: true },
      ],
      modal: false,
      subscribemodal: false,
      chartSeries: [],
      periodType: "yearly"
    }


  }

  componentDidMount() {
    const { onGetChartsData } = this.props
    setTimeout(() => this.setState({ subscribemodal: true }), 2000);
    onGetChartsData("yearly");
  }


  

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ ...this.state, chartSeries: this.props.chartsData })
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>FieldX</title>
          </MetaTags>
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title={this.props.t("Dashboards")}
              breadcrumbItem={this.props.t("Dashboard")}
            />
            <Row>
                  {/* <Col xl="4">
                    
                    <MonthlyEarning />
                  </Col> */}
              <Col xl="12">
                <Row>
                  {/* Reports Render */}
                  {this.state.reports.map((report, key) => (
                    <Col md="3" key={"_col_" + key}>
                      <Card className="mini-stats-wid">
                        <CardBody>
                          <div className="d-flex">
                            <div className="flex-grow-1">
                              <p className="text-muted fw-medium">
                                {report.title}
                              </p>
                              <h4 className="mb-0">{report.description}</h4>
                            </div>
                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                              <span className="avatar-title">
                                <i
                                  className={
                                    "bx " + report.iconClass + " font-size-24"
                                  }
                                />
                              </span>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <Card>
                  <CardBody>
                    <div className="d-sm-flex flex-wrap">
                      <CardTitle className="card-title mb-4 h4">
                        Revenue
                      </CardTitle>
                      <div className="ms-auto">
                        <ul className="nav nav-pills">
                          <li className="nav-item">
                            <Link
                              to="#"
                              className={classNames(
                                { "active": this.state.periodType === "weekly" },
                                "nav-link"
                              )}
                              onClick={() => {
                                this.setState({ ...this.state, periodType: "weekly" });
                                this.props.onGetChartsData("weekly")
                              }}
                              id="one_month"
                            >
                              Week
                            </Link>{" "}
                          </li>
                          <li className="nav-item">
                            <Link
                              to="#"
                              className={classNames(
                                { "active": this.state.periodType === "monthly" },
                                "nav-link"
                              )}
                              onClick={() => {
                                this.setState({ ...this.state, periodType: "monthly" });
                                this.props.onGetChartsData("monthly")
                              }}
                              id="one_month"
                            >
                              Month
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              to="#"
                              className={classNames(
                                { "active": this.state.periodType === "yearly" },
                                "nav-link"
                              )}
                              onClick={() => {
                                this.setState({ ...this.state, periodType: "yearly" });
                                this.props.onGetChartsData("yearly")
                              }}
                              id="one_month"
                            >
                              Year
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="clearfix" />
                    <StackedColumnChart chartSeries={this.state.chartSeries} />
                  </CardBody>
                </Card>
              </Col>
            </Row>

         
          </Container>
        </div>

       
      </React.Fragment >
    )
  }
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func
}

const mapStateToProps = ({ Dashboard }) => ({
  chartsData: Dashboard.chartsData,
})

const mapDispatchToProps = dispatch => ({
  onGetChartsData: (periodType) => dispatch(getChartsData(periodType)),
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(withTranslation()(Dashboard))

