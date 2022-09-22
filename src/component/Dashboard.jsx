import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { json, Link, useNavigate } from 'react-router-dom';
import Modal from './Modal.jsx';
import Step from './Step.jsx';
import { UserContext } from '../App.js';
import Navbar from './Navbar.jsx';

const appStatusLabel = {
  1: 'Not Applied',
  2: 'Applied',
  3: 'Phone Screening', 
  4: 'Technical Interview',
  5: 'Interviewing',
  6: 'Offer Received',
  7: 'Offer Accepted',
  8: 'Offer Rejected',
  9: 'Application Rejected',
  10: 'Not Interested'
}

const Dashboard = () => {
  let navigate = useNavigate();
  const [tracker, setTracker] = useState([]);
  const [showModal, setShowModal] = useState({ action: null, id: null,jobId:null }); // none / edit /add
  const [updateState, setUpdateState] = useState(true);

  const context = useContext(UserContext);
  // console.log('context user', context.user.id.name);

  const fetchApplications = async () => {
    const resp = await fetch(`https://mock-5-masai.herokuapp.com/Jobs`, {
      method: "GET",
      headers: { "content-type": "application/JSON" },
    });
    const data = await resp.json();
    let filterData=data.filter((el)=>el.user===context.user.id.name)
    setTracker(filterData);
    setUpdateState(false);
  };

  // get the users data from the DB
  useEffect(() => {
    if (updateState) fetchApplications();
  }, [updateState]);

  //Delete application from the DB
  const removeApplications = (id) => {
    fetch(`https://mock-5-masai.herokuapp.com/Jobs/${id}`, {
      method: "DELETE",

      headers: {
        "content-type": "application/JSON",
      },
    }).then((res) => {
      setUpdateState(true);

    });
  };

  

  //this is the header
  //Modify is for Edit, Delete, Add step functionality
  const renderHeader = () => {
    let headerElement = [
      // "id",
      'Company',
      'Title',
      'Location',
      'Found by',
      'Applied via',
      'Date applied',
      'Notes',
      'Status',
      'Modify',
    ];

    //now we will map over these values and output as th
    return headerElement.map((key, index) => {
      if (
        key === 'Found by' ||
        key === 'Applied via' ||
        key === 'Date applied' ||
        key === 'Notes'
      ) {
        return (
          <th key={index} className="low-priority-col">
            {key}
          </th>
        );
      } else return <th key={index}>{key}</th>;
    });
  };

  const changeRoute = (data) => {
    const id = data.id;
    let path = `/application/${id}/step`;

    navigate(path);
    console.log(data)
    localStorage.setItem("job",JSON.stringify(data))
  };

  const renderBody = () => {
    return (
      tracker &&
      tracker.map(
        (
          {
            id,
            job_title,
            company,
            found_by,
            how_applied,
            date_applied,
            location,
            notes,
            app_status,
            operation,
          },
          index
        ) => {
          return (
            <tr key={id}>
              <td id="hide-ID-col">{id}</td>
              <td>{company}</td>
              <td>{job_title}</td>
              <td>{location}</td>
              <td className="low-priority-col">{found_by}</td>
              <td className="low-priority-col">{how_applied}</td>
              <td className="low-priority-col" id="date-column">
                {new Date(date_applied).toLocaleDateString('en-US')}
              </td>

              <td className="low-priority-col" id="notes-column">
                {notes}
              </td>
              <td>{appStatusLabel[app_status]}</td>
              <td className="operation">
                <button
                  className="deleteButton"
                  onClick={() => setShowModal({ action: 'edit', id: index ,jobId:id })}
                >
                  Edit
                </button>
                <button
                  className="button"
                  onClick={() => removeApplications(id)}
                >
                  Delete
                </button>

                <Link
                  to={{
                    pathname: `/application/${id}/step`,
                    state: { application : tracker[index] },
                  }}
                >
                  <button
                    src="step"
                    className="editStep"
                    onClick={()=>changeRoute(tracker[index])} id={id}
                  >
                    View progress
                  </button>
                </Link>
              </td>
            </tr>
          );
        }
      )
    );
  };

  return (
    <>
      <Navbar name={context.user.id.name} sign={"Sign Out"} path1={""} path2={"/"} />
      <h2 id="title">Applications Dashboard</h2>
      <div className="tableContainer">
        {context.user.id ? (
          <div>
            <table id="tracker">
              <thead>
                <tr>{renderHeader()}</tr>
              </thead>
              <tbody>{renderBody()}</tbody>
            </table>
            <button
              onClick={() => {
                context.saveUser(null);
                navigate("/");
              }}
            >
              Sign out
            </button>

            <button
              onClick={() =>
                setShowModal({ action: "add", id: null, jobId: null })
              }
            >
              Add new application
            </button>
          </div>
        ) : (
          <p>
            Login first <Link to="/">here</Link>
          </p>
        )}
      </div>

      {showModal.action ? (
        <Modal
          setShowModal={setShowModal}
          showModal={showModal}
          setUpdateState={setUpdateState}
          action={showModal.action}
          currentApp={showModal.action === "edit" ? tracker[showModal.id] : {}}
        />
      ) : (
        <p></p>
      )}
    </>
  );
};
export default Dashboard;
