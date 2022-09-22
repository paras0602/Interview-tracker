import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalStep from './ModalStep.jsx';
import Navbar from './Navbar.jsx';

const Steps = () => {
  const navigate = useNavigate();
  const state  = JSON.parse(localStorage.getItem("job"))
  const [stepTracker, setStepTracker] = useState([]);

  const [showModalStep, setShowModalStep] = useState({
    action: null,
    id: null,
    stepId:null
  }); 

  
  

  const [updateState, setUpdateState] = useState(true);



  const fetchStep = async () => {
    const resp = await fetch(`https://mock-5-masai.herokuapp.com/Steps`, {
      method: "GET",
      headers: { "content-type": "application/JSON" },
    });
    const data = await resp.json();
     let filterData=data.filter((el)=>el.appId===state.id)
    setStepTracker(filterData);
    setUpdateState(false);
  };

  useEffect(() => {
    if (updateState) fetchStep();
  }, [updateState]);

  const removeStep = (id) => {
    fetch(`https://mock-5-masai.herokuapp.com/Steps/${id}`, {
      method: "DELETE",

      headers: {
        "content-type": "application/JSON",
      },
    }).then((res) => {
      setUpdateState(true);
    });
  };

  
  const renderHeader = () => {
    let headerElement = [
      'Date',
      'Progress',
      'Contact Name',
      'Contact Role',
      'Contact Method',
      'Notes',
      'Modify',
    ];

  
    return headerElement.map((key, index) => {
      return <th key={index}>{key}</th>;
    });
  };

  const renderBody = () => {
    return (
      stepTracker &&
      stepTracker.map(
        (
          {
            id,
            app_id,
            date,
            step_type,
            contact_name,
            contact_role,
            contact,
            notes,
          },
          index
        ) => {
          return (
            <tr key={id}>
              <td>{new Date(date).toLocaleDateString('en-US')}</td>
              <td>{step_type}</td>
              <td>{contact_name}</td>
              <td>{contact_role}</td>
              <td>{contact}</td>
              <td>{notes}</td>
              <td className="operation">
                <button
                  className="deleteButton"
                  onClick={() =>
                    setShowModalStep({ action: 'edit', id: index,stepId:id })
                  }
                >
                  Edit
                </button>
                <button
                  className="button"
                  onClick={() => removeStep(id, app_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        }
      )
    );
  };

  return (
    <>
      <Navbar
        name={state.user}
        sign={"Sign Out"}
        path1={""}
        path2={"/"}
      />
      <h1 id="title">Application Progress</h1>
      <p>
        {state.job_title} at {state.company} in {state.location}
      </p>
      <div className="tableContainer">
        <table id="stepTracker">
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      </div>

      {showModalStep.action ? (
        <ModalStep
          setShowModalStep={setShowModalStep}
          showModalStep={showModalStep}
          action={showModalStep.action}
          currentStep={
            showModalStep.action === "edit" ? stepTracker[showModalStep.id] : {}
          }
          appId={state.id}
          setUpdateState={setUpdateState}
        />
      ) : (
        <button onClick={() => setShowModalStep({ action: "add", id: 2 })}>
          Add new step
        </button>
      )}
      <button onClick={() => navigate("/dashboard")}>Back</button>
    </>
  );
};
export default Steps;
