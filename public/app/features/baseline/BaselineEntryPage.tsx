import React, {useMemo} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useMount } from 'react-use';
import { hot } from 'react-hot-loader';
import { PageToolbar, PageHeader, useStyles2, Icon, Modal, Button } from '@grafana/ui';
import { BaselineDTO, StoreState } from 'app/types';
import {
  initBaselineEntryPage,
  submitBaselineEntry,
  updateBaselineEntry,
  openEditModal,
  closeEditModal,
  archiveBaseline,
  closeSaveModal,
  openSaveModal,
  openUploadModal,
  closeUploadModal,
  uploadDocument
} from './state/actions';
import BaselineEntryForm from './BaselineEntryForm';
import EditBaselineEntryForm from './EditBaselineEntryForm';
import { getLoginStyles } from 'app/core/components/Login/LoginLayout';
import { Branding } from 'app/core/components/Branding/Branding';
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';
import {useDropzone} from 'react-dropzone';
export interface OwnProps {
  onDismiss: () => void;
}

function mapStateToProps(state: StoreState) {
  const baselineEntryState = state.baseline;
  const {
    isUpdating,
    isModalOpen,
    isModalSaveOpen,
    isUploadModalOpen,
    editBaselineEntryId,
    baselineEntries,
    baselineEntriesAreLoading,
    archivedId,
  } = baselineEntryState;
  return {
    isUpdating,
    isModalSaveOpen,
    isUploadModalOpen,
    isModalOpen,
    editBaselineEntryId,
    baselineEntries,
    baselineEntriesAreLoading,
    archivedId,
  };
}

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function s3BeforeUpload(file:FormData) {
  const formData = new FormData();

    formData.append('filePath', file.name);
    formData.append('contentType', file.type);
    formData.append('fileSize', file.size);
    uploadDocument(formData,file)
}

function StyledDropzone(props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDropAccepted : files => s3BeforeUpload(files),
    accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  
  ));



  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.cvs and *.xlsx  will be accepted)</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </div>
  
  );
}




const mapDispatchToProps = {
  initBaselineEntryPage,
  submitBaselineEntry,
  updateBaselineEntry,
  openEditModal,
  openUploadModal,
  closeEditModal,
  archiveBaseline,
  openSaveModal,
  closeSaveModal,
  closeUploadModal,
  uploadDocument
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type Props = OwnProps & ConnectedProps<typeof connector>;

export function BaselineEntryPage({
  isUpdating,
  isModalOpen,
  archivedId,
  isModalSaveOpen,
  isUploadModalOpen,
  editBaselineEntryId,
  baselineEntries,
  baselineEntriesAreLoading,
  updateBaselineEntry,
  initBaselineEntryPage,
  submitBaselineEntry,
  openEditModal,
  closeEditModal,
  openSaveModal,
  closeSaveModal,
  openUploadModal,
  archiveBaseline,
  closeUploadModal,
  uploadDocument
}: Props) {
  useMount(() => initBaselineEntryPage());

  const loginStyles = useStyles2(getLoginStyles);

  const columns = [
    {
      name: 'No',
      selector: (row: { id: number }) => row.id,
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: (row: { startDate: string }) => format(new Date(row.startDate), 'yyyy-MM-dd'),
      sortable: true,
      minWidth: '300px',
    },
    {
      name: 'End Date',
      selector: (row: { endDate: string }) => format(new Date(row.endDate), 'yyyy-MM-dd'),
      minWidth: '300px',
      sortable: true,
    },
    {
      name: 'Invoice Date',
      selector: (row: { invoiceDate: string }) => format(new Date(row.invoiceDate), 'yyyy-MM-dd'),
      minWidth: '300px',
      sortable: true,
    },
    {
      name: 'No. of Days',
      selector: (row: { noOfDays: number }) => row.noOfDays,
      minWidth: '300px',
    },
    {
      name: 'Kilowatt-hour',
      selector: (row: { kwh: number }) => new Intl.NumberFormat().format(row.kwh),
      minWidth: '300px',
    },
    {
      name: 'KWh (Normalized)	',
      selector: (row: { kwhNormalized: number }) => new Intl.NumberFormat().format(row.kwhNormalized),
      minWidth: '300px',
    },
    {
      name: 'Min. kW',
      selector: (row: { minKw: number }) => row.minKw,
      minWidth: '300px',
    },
    {
      name: 'Max. kW',
      selector: (row: { maxKw: number }) => row.maxKw,
      minWidth: '300px',
    },
    {
      name: 'Avg. kW',
      selector: (row: { avgKw: number }) => row.avgKw,
      minWidth: '300px',
    },
    {
      name: 'Avg. kVA',
      selector: (row: { avgKva: number }) => row.avgKva,
      minWidth: '300px',
    },
    {
      name: 'PF',
      selector: (row: { pf: number }) => row.pf,
      minWidth: '300px',
    },
    {
      name: 'Min. PF',
      selector: (row: { minPf: number }) => row.minPf,
      minWidth: '300px',
    },
    {
      name: 'Max. PF',
      selector: (row: { maxPf: number }) => row.maxPf,
      minWidth: '300px',
    },
    {
      name: 'Rate',
      selector: (row: { rate: number }) => row.rate,
      minWidth: '300px',
    },
    {
      name: 'Energy Rate',
      selector: (row: { energyRate: number }) => row.energyRate,
      minWidth: '300px',
    },
    {
      name: 'Fuel Rate',
      selector: (row: { fuelRate: number }) => row.fuelRate,
      minWidth: '300px',
    },
    {
      name: 'KVA Rate',
      selector: (row: { kvaRate: number }) => row.kvaRate,
      minWidth: '300px',
    },
    {
      name: 'Fuel & IPP Rate',
      selector: (row: {  ippRate: number }) => new Intl.NumberFormat().format(row.ippRate),
      minWidth: '300px',
    },
    {
      name: 'Fuel Charge',
      selector: (row: { fuelCharge: number }) => row.fuelCharge,
      minWidth: '300px',
    },
    {
      name: 'IPP Var. Rate',
      selector: (row: { ippVariableRate: number }) => row.ippVariableRate,
      minWidth: '300px',
    },
    {
      name: 'IPP Fixed Rate',
      selector: (row: { ippFixedRate: number }) => row.ippFixedRate,
      minWidth: '300px',
    },

    {
      name: 'IIP Variable Charge',
      selector: (row: { ippVariableCharge: number }) => row.ippVariableCharge,
      minWidth: '300px',
    },
    {
      name: 'IPP Fixed Charge',
      selector: (row: { ippFixedCharge: number }) => row.ippFixedCharge,
      minWidth: '300px',
    },
    {
      name: 'Energy Charge',
      selector: (row: { energyCharge: number }) => row.energyCharge,
      minWidth: '300px',
    },
    {
      name: 'Kva Charge',
      selector: (row: { kvaCharge: number }) => new Intl.NumberFormat().format(row.kvaCharge),
      minWidth: '300px',
    },
    {
      name: 'Fuel Charge',
      selector: (row: { fuelCharge: number }) => new Intl.NumberFormat().format(row.fuelCharge),
      minWidth: '300px',
    },
    {
      name: 'Current Charges',
      selector: (row: { currentCharges: number }) => new Intl.NumberFormat().format(row.currentCharges),
      minWidth: '300px',
    },
    {
      name: 'Sales Tax',
      selector: (row: { salesTax: number }) => new Intl.NumberFormat().format(row.salesTax),
      minWidth: '300px',
    },
    {
      name: 'Actions',
      cell: (row: { id: number }) => (
        <>
          <Icon
            name="pen"
            title="Edit Baseline"
            onClick={() => {
              openEditModal(row.id);
            }}
          />
          <Icon
            className="archive-link"
            name="folder-upload"
            title="Archive Baseline"
            onClick={() => {
              openSaveModal(row.id);
            }}
          />
        </>
      ),
    },
  ];

  const conditionalRowStyles = [
    {
      when: (row: { id: number }) => row.id % 2 === 0,
      style: {
        backgroundColor: '#00000029',
        color: 'black',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  ];

  return (
    <div className="baseline-entry">
      <Modal title="Archive Baseline" icon="save" onDismiss={closeSaveModal} isOpen={isModalSaveOpen}>
        <Button
          variant="primary"
          aria-label="Baseline entry submit button"
          onClick={() => {
            archiveBaseline(archivedId);
          }}
        >
          Save
        </Button>
        <Button
          variant="primary"
          style={{ float: 'right' }}
          aria-label="Baseline entry submit button"
          onClick={() => {
            closeSaveModal();
          }}
        >
          cancel
        </Button>
      </Modal>

      <Modal title="Upload Baseline" icon="save" onDismiss={closeUploadModal} isOpen={isUploadModalOpen}>
      <StyledDropzone />
      </Modal>

      <PageHeader title={`HiPro Energy Baseline`} className="no-margin" pageIcon="graph-bar">
        <Branding.LoginLogo className={loginStyles.pageHeaderLogo} />
      </PageHeader>

      <PageToolbar title={`Baseline Entry`} className="no-margin" />
      <div className="sub-title">Possible microcopy providing high level explanation of the chart.  <div className="baseline-field-group">
        <div className="gf-form-button-row">
          <Icon
            className="Upload-link"
            name="upload"
            title="Upload Baseline"
            size="xxxl"
            onClick={() => {
              openUploadModal();
            }}
          />
        </div>
      </div>
      </div>

      <BaselineEntryForm addBaselineEntry={submitBaselineEntry} isSavingBaselineEntry={isUpdating} />
      <hr className="spacious"></hr>
      <div
        className={
          isUpdating || baselineEntriesAreLoading
            ? 'baseline-no-scroll baseline-entry-table-container'
            : 'baseline-entry-table-container'
        }
      >
        <DataTable
          fixedHeader
          fixedHeaderScrollHeight="500px"
          pagination
          responsive
          subHeaderWrap
          columns={columns}
          data={baselineEntries}
          conditionalRowStyles={conditionalRowStyles}
        />
      </div>
      <div>{renderLoadingBaselineEntries(baselineEntriesAreLoading, isUpdating)}</div>
      {renderEditBaselineEntryModal(
        baselineEntriesAreLoading,
        isUpdating,
        isModalOpen,
        editBaselineEntryId,
        baselineEntries,
        closeEditModal,
        updateBaselineEntry
      )}
    </div>
  );
}

const renderLoadingBaselineEntries = (isLoading: boolean, isUpdating: boolean) => {
  let el;

  if (isLoading === true || isUpdating === true) {
    el = (
      <div className="baseline-data-loading-container">
        <div className="baseline-data-loading-msg">Loading...</div>
      </div>
    );
  } else {
    el = null;
  }
  return el;
};

const renderEditBaselineEntryModal = (
  isLoading: boolean,
  isUpdating: boolean,
  isModalOpen: boolean,
  editBaselineEntryId: number,
  baselineEntries: BaselineDTO[],
  closeEditModal: any,
  updateBaselineEntry: any
) => {
  let el;

  if (isLoading === true || baselineEntries.length <= 0 || editBaselineEntryId <= 0) {
    el = null;
  } else {
    el = (
      <Modal title="Edit Baseline Entry" icon="save" onDismiss={closeEditModal} isOpen={isModalOpen}>
        <div>
          <EditBaselineEntryForm
            existingBaseline={
              (baselineEntries.find((p) => {
                return p.id?.toString() === editBaselineEntryId.toString();
              }) ?? {}) as BaselineDTO
            }
            updateBaselineEntry={updateBaselineEntry}
            isSavingBaselineEntry={isUpdating}
          />
        </div>
      </Modal>
    );
  }
  return el;
};

export default hot(module)(connector(BaselineEntryPage));
