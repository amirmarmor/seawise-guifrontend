import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {
  selectCurrent,
  selectConfig,
  selectUpdated,
  setConfigAsync,
  selectRealtime,
  configUpdated, selectDevices, updateDeviceAsync
} from "../features/device/deviceSlice"
import {Alert, Card, CardGroup, Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap"
import Instructions from "../components/Configuration/instructions"
import ConfigForm from "../components/Configuration/configForm"

function Configuration() {
  const current = useSelector(selectCurrent)
  const dispatch = useDispatch()

  function handleSubmit(e, current) {
    console.log(current)
    current.loop = parseInt(current.loop)
    e.preventDefault()
    dispatch(updateDeviceAsync(current))
  }

  function renderDeviceDetails() {
    if (current !== undefined) {
      return <Card>
        <ListGroup>
          <ListGroupItem>
            OWNER: {current.owner}
          </ListGroupItem>
          <ListGroupItem>
            DEVICE ID - {current.sn} (ip: {current.ip})
          </ListGroupItem>
          <ListGroupItem>
            CAMERAS CONNECTED: {current.channels}
          </ListGroupItem>
        </ListGroup>
      </Card>
    }
  }

  function renderConfiguration() {
    if (!current) {
      return <Alert variant={"danger"}>
        Please select device first!
      </Alert>
    } else {
      return <ConfigForm
        current={current}
        handleSubmit={handleSubmit}
      />
    }
  }
//
  return (
    <Container fluid>
      <Row>
        <Col md="8">
          <Row>
            {renderDeviceDetails()}
          </Row>
          <Row>
            {renderConfiguration()}
          </Row>
          <Row>
            {/*{updated ? <Alert*/}
            {/*  variant={'success'}*/}
            {/*  onClose={() => dispatch(configUpdated(false))}*/}
            {/*  dismissible={true}*/}
            {/*  style={{padding: "15px", color: "green"}}*/}
            {/*>*/}
            {/*  Configuration Successfully updated*/}
            {/*</Alert> : ''*/}
            {/*}*/}
          </Row>
        </Col>
        <Col md="4">
          <Instructions/>
        </Col>
      </Row>
    </Container>
  )
}

export default Configuration
