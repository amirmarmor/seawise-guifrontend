import React from "react"
import {Container} from "react-bootstrap"
import {useSelector} from "react-redux"
import {
  selectConfig, selectCurrent
} from "../features/device/deviceSlice"
import Recording from '../components/Channels/recording'

function Channels() {
  const current = useSelector(selectCurrent)

  function getRules() {
    // if(config !== undefined){
      // return JSON.parse(config.rules)
    // }
    return []
  }

  return (
    <Container fluid>
    {current !== undefined ? <Recording current={current}/> : ""}
    </Container>
  )
}

export default Channels
