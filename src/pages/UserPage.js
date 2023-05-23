import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import {Container, Typography } from '@mui/material';

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";



import { useDispatch, useSelector } from "react-redux";
//import { getsDemandesExamens } from "../../../reduxFiles/actions/radiologie/consultationRadiologieActions"
import { useNavigate } from 'react-router-dom';

//import { useHistory } from "react-router-dom";
import { getsResultatsDemandesExamens } from "../Redux/actions/imagerie"

const UserPage = () => {
  const [first1, setFirst1] = useState(0);
  const [rows1, setRows1] = useState(10);
  //eslint-disable-next-line
  const [currentPage, setCurrentPage] = useState(1);

  const data = useSelector((state) => state.imgeriedata.resultatsDemandesExamens);

  console.log('data  data  data :', data)
  //eslint-disable-next-line
  const dispatch = useDispatch();
  const [filters1, setFilters1] = useState(null);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");

  //const history = useHistory()
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getsResultatsDemandesExamens());
    initFilters1();
  }, [dispatch]);

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.create_at = new Date(d.create_at);
      return d;
    });
  };

/** 
  const lienPatientParse = (paths, rowData) => {
    let path = `${paths}${btoa(rowData.id)}`
      navigate(path);
    //history.push(path)
  }
*/
  const lienPatientParse = (paths, groupId) => {
    let path = `${paths}${btoa(groupId)}`;
    console.log('path path path:',path)
    navigate(path);

    // Rest of your code
  }
  
  

  // Template de pagination du tableau

  const onCustomPage1 = (event) => {
    setFirst1(event.first);
    setRows1(event.rows);
    setCurrentPage(event.page + 1);
  };

  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1["global"].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      reference: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      create_at: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      validation: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
    });
    setGlobalFilterValue1("");
  };

  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-end">
        {/* <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Annuler le filtre"
          className="p-button-outlined"
          onClick={clearFilter1}
        /> */}
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="Rechercher un patient"
          />
        </span>
      </div>
    );
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <div className="d-flex">
        <Button
          icon="pi pi-align-justify"
          className="p-button-sm p-button-primary"
          aria-label="Voir details d'examens"
          title="Voir details d'examens"
          label="Voir details d'examens"
          style={{ height: "2rem" }}
          onClick={() => lienPatientParse("/dashboard/blog/", rowData.group_id)}
        />


      </div>
    );
  };

  const header1 = renderHeader1();

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Listes des demandes de mammographie

      </Typography>

      <div className="datatable-filter-demo">
      <div className="card">
        <DataTable
          value={getCustomers(data)}
          paginator
          rows={rows1}
          first={first1}
          onPage={onCustomPage1}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
          rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
          globalFilter={globalFilterValue1}
          filters={filters1}
          header={header1}
          emptyMessage="No data found"
          className="p-datatable-customers"
        >
          <Column field="group_id" header="Group ID" sortable />
          <Column
            body={verifiedBodyTemplate}
            style={{ textAlign: "right" }}
          />
        </DataTable>
      </div>
    </div>





  </Container>

  );
};

export default UserPage;


