import "./App.css";
import React, { Fragment } from "react";
import BaseRoutes from "./Routing/routes";
import { Provider } from "react-redux";
import store from "./Redux/Store/Store";

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <BaseRoutes />
      </Provider>
    </Fragment>
  );
}

export default App;

// import React, { useRef, useState } from "react";
// import AdvancedPdfUpload from "react-advanced-pdf-upload";

// export default function App() {
//   const finalizeButtonRef = useRef(null);
//   const [finalizeButtonLoading, setFinalizeButtonLoading] = useState(false);
//   const [finalizeButtonDisabled, setFinalizeButtonDisabled] = useState(false);

//   return (
//     <>
//       <AdvancedPdfUpload
//         components={{
//           dropzonePlaceholder: (
//             <p>Drag and drop PDF files here or click to select files.</p>
//           ),
//           loading: <p>Loading...</p>,
//           pageNumber: ({ n }) => <i>{n}</i>,
//         }}
//         finalizeButton={{
//           ref: finalizeButtonRef,
//           setLoading: setFinalizeButtonLoading,
//           setDisabled: setFinalizeButtonDisabled,
//         }}
//         loadPreviews={async (data) => {
//           const res = await fetch("http://localhost:3001/render-pdf", {
//             method: "POST",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//           }).catch((e) => console.error(e));

//           if (res && res.status >= 200 && res.status < 299) {
//             return await res.json();
//           } else {
//             console.error(res);
//           }
//         }}
//         buildPdf={async (data) => {
//           const res = await fetch("http://localhost:3001/build-pdf", {
//             method: "POST",
//             headers: {
//               Accept: "application/pdf",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//           }).catch((e) => console.error(e));

//           if (res && res.status >= 200 && res.status < 299) {
//             // do something with the finalized PDF file, e.g. let the user download it
//             // the proposed new filename can be found in `data.name`
//             return "reset";
//           } else {
//             console.error(res);
//             return "resetLoading";
//           }
//         }}
//       />
//       <button
//         ref={finalizeButtonRef}
//         disabled={finalizeButtonLoading || finalizeButtonDisabled}
//         style={{ marginTop: "0.5rem" }}
//       >
//         {finalizeButtonLoading ? "Loading..." : "Finalize"}
//       </button>
//     </>
//   );
// }
