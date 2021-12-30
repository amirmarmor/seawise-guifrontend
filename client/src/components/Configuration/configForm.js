import React, {useEffect, useState} from "react"
import {Button, Card, Col, Form, Row} from "react-bootstrap"
import RuleRow from "./rules"

function ConfigForm(props) {
  const [current, setCurrent] = useState()

  useEffect(() => {
    setCurrent(props.current)
  }, [props.current])

  function addRule() {
    let rules = []
    if(current.rules){
      console.log("**********")
      rules = JSON.parse(current.rules)
    }
    let rule = {
      id: rules.length + 1,
      recurring: 'Hour',
      start: 0,
      duration: 0
    }
    rules.push(rule)
    let rulesString = JSON.stringify(rules)
    setCurrent({
      ...current,
      rules: rulesString
    })
  }

  function removeRule(e, ind) {
    let rules = JSON.parse(current.rules)
    rules.splice(ind, 1)
    let rulesString = JSON.stringify(rules)
    setCurrent({
      ...current,
      rules: rulesString
    })
  }

  function handleRuleChange(e, i) {
    console.log(i, current.rules[i])
    let newRules = current.rules.map((rule, ind) => {
      if(ind === i){
        rule = {
          ...rule,
          [e.target.name]: e.target.value
        }
      }
      return rule
    })
    console.log(current.rules, newRules)
    setCurrent({
      ...current,
      rules: newRules
    })
  }

  function handleChange(e) {
    let value = e.target.value
    if (e.target.name === "cleanup") {
      value = e.target.checked.toString()
    }

    setCurrent({
      ...current,
      [e.target.name]: value
    })
  }

  function renderRules() {
    if (current.rules) {
      return current.rules.map((rule, i) =>
        <RuleRow
          rule={rule}
          handleRuleChange={handleRuleChange}
          removeRule={removeRule}
          id={i}
          key={`rule-row-${i}`}
        />
      )
    }
    return ""
  }

  function renderForm() {
    if(current === undefined) {
      return
    }
    return <Form onSubmit={(e) => props.handleSubmit(e, current)}>
      <Row>
        <Col className="px-1" md="4">
          <Form.Group>
            <label>Loop Interval</label>
            <Form.Control
              value={current.loop}
              placeholder="Loop interval"
              type="text"
              name={"loop"}
              onChange={e => handleChange(e)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Card.Header>Rules</Card.Header>
      </Row>
      {renderRules()}
      <Button
        className={"btn-fill pull-right"}
        style={{marginRight: "10px"}}
        onClick={addRule}
      > + </Button>
      <Button
        className="btn-fill pull-right"
        type="submit"
        variant="info"
      >
        Update Configuration
      </Button>
      <div className="clearfix"/>
    </Form>
  }


  return (
    <Card>
      <Card.Header>
        <Card.Title as="h4">Edit Configuration</Card.Title>
      </Card.Header>
      <Card.Body>
        {renderForm()}
      </Card.Body>
    </Card>
  )
}

export default ConfigForm
