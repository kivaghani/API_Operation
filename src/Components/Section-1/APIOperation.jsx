import React from "react";
import Accordion from "react-bootstrap/Accordion";
import APINameMasterForm from "./APINameMasterForm";
import Exportsystem from "./Exportsystem";
import Priceconfiguration from "./Priceconfiguration";

const APIOperation = () => {
  return (
    <div className="mt-5 p-2 mx-2">
      <div className="title text-2xl flex justify-center mb-10">
        <div className="animation">
          <span class="text">Api Operation</span>
          <span class="hover-text">ApiOperation</span>
        </div>
      </div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>API Name Master</Accordion.Header>
          <Accordion.Body>
            <APINameMasterForm />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Export Sync Data</Accordion.Header>
          <Accordion.Body>
            <Exportsystem />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Price Configuration</Accordion.Header>
          <Accordion.Body>
            <Priceconfiguration />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default APIOperation;
