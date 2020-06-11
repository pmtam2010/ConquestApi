import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const ApiForm = () => {
    const [requestDetail, setRequestDetail] = useState("");
    const [requestorName, setRequestorName] = useState("");
    const [organisationUnitID, setOrganisationUnitID] = useState(0);
    const [requestId, setRequestId] = useState("");
    const [documentId, setDocumentId] = useState("");
    const [address, setAddress] = useState("https://homepages.cae.wisc.edu/~ece533/images/cat.png");
    const [contentType, setContentType] = useState("image/png");
    const [imgUpload, setImgUpload] = useState('');
    const [isHidden, setIsHidden] = useState(true);
    const [settings] = useState(require('../settings.json'));
    
    const validateForm = () => {
        return requestDetail.length > 0 && requestorName.length > 0 && organisationUnitID > 0;
    }
    
    const handleSubmit = event => {
        event.preventDefault();
        axios({
            method: 'post',
            url: settings[0].DeveloperDemoEndpoint + '/api/requests/create_request',
            headers: {'Authorization': 'Bearer '+ settings[0].JwtToken},
            data: {
                ChangeSet: {
                    Changes: [
                      "RequestDetail",
                      "RequestorName",
                      "OrganisationUnitID"
                    ],
                    Updated: {
                      RequestDetail: requestDetail,
                      RequestorName: requestorName,
                      OrganisationUnitID: organisationUnitID
                    }
                  }
            }
          })
          .then((response) => {       
            setRequestId(response.data);
            setIsHidden(false);
          }, (error) => {
            console.log(error);
        });        
    }

    const handleAttach = event => {        
        var timeStamp = (new Date()).toISOString();
        axios({
            method: 'post',
            url: settings[0].DeveloperDemoEndpoint + '/api/documents/add_document',
            headers: {
                'Authorization': 'Bearer '+ settings[0].JwtToken,
                'Content-Type': 'application/json'
            },                
            data: {
                ContentType: contentType,
                CreateTime: timeStamp,
                hashes: imgUpload,
                DocumentDescription: "Attached image " + requestId,
                Address: address,
                ObjectKey: {
                    int32Value: requestId,
                    objectType: "ObjectType_Request",
                    timestampValue: timeStamp
                }                    
            }
        })
        .then((response) => {       
            setDocumentId(response.data);
        }, (error) => {
            console.log(error);
        });    
}

    const onChangeHandler = event => {
        var file = event.target.files[0];
        setContentType(file.type);
        setAddress("file://conquest_documents/Request/" + requestId + "/" + file.name);

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImgUpload(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Upload Error: ', error);
        }
        //setAddress("https://homepages.cae.wisc.edu/~ece533/images/boat.png");
    }

    return(
        <div className="auth-outer">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <Form.Group controlId="apis" bsSize="large">
                            <Form.Label>Create A New Request</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="requestDetail">
                            <Form.Label>Request Detail</Form.Label>
                            <Form.Control
                                id="txtRequestDetail"
                                style={{width:"40%"}}
                                autoFocus
                                type="text"
                                value={requestDetail}
                                onChange={e => setRequestDetail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="requestorName">
                            <Form.Label>Request Name</Form.Label>
                            <Form.Control
                                id="txtRequestName"
                                style={{width:"40%"}}
                                type="text"
                                value={requestorName}
                                onChange={e => setRequestorName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="requestorName">
                            <Form.Label>Organization Unit ID</Form.Label>
                            <Form.Control
                                id="txtOrgUnitId"
                                style={{width:"20%"}}
                                type="text"
                                value={organisationUnitID}
                                onChange={e => setOrganisationUnitID(e.target.value)}
                            />
                        </Form.Group>
                        <Button id="btnCreate" style={{width:"20%"}} block bsSize="large" disabled={!validateForm()} type="submit">
                                Create
                        </Button>
                        <Form.Label id="hdRequestId" hidden={isHidden} style={{color: "green"}} >New Request ID is : {requestId}</Form.Label>
                    </div>
                    <div className="col">
                        <Form.Group controlId="requestorName">
                                <Form.Label>Request ID</Form.Label>
                                <Form.Control
                                    id="txtRequestId"
                                    style={{width:"30%"}}
                                    type="text"
                                    value={requestId}
                                    onChange={e => setRequestId(e.target.value)}
                                />
                        </Form.Group>

                        <Form.Group>
                            <input type="file" name="file" onChange={onChangeHandler}/>                            
                        </Form.Group>
                        <Form.Group>                            
                            <Button id="btnAttachImage" style={{width:"30%"}} block bsSize="large" type="button" onClick={handleAttach}>
                                Attach Image
                            </Button>
                            <Form.Label id="hdDocumentId" style={{color: "green"}} >{documentId}</Form.Label>
                        </Form.Group>
                    </div>                                        
                </div>
            </form>

        </div>
)}
export default ApiForm;