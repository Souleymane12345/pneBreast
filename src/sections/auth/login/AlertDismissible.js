import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'

function AlertDismissible(props) {
  const [show, setShow] = useState(true)

  if (show) {
    return (
        <div className="form3-row fadeSuperInUp3" style={{padding:10}}>
            <Alert variant="danger" onClose={() => setShow(props.show)} dismissible>
                <p>
                    {props.error}
                </p>
            </Alert>
        </div>
    )
  }
}

export default AlertDismissible