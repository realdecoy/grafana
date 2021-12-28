import React from 'react';
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
} from './state/actions';
import BaselineEntryForm from './BaselineEntryForm';
import EditBaselineEntryForm from './EditBaselineEntryForm';
import { getLoginStyles } from 'app/core/components/Login/LoginLayout';
import { Branding } from 'app/core/components/Branding/Branding';
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';

export interface OwnProps {
  onDismiss: () => void;
}

function mapStateToProps(state: StoreState) {
  const baselineEntryState = state.baseline;
  const {
    isUpdating,
    isModalOpen,
    isModalSaveOpen,
    editBaselineEntryId,
    baselineEntries,
    baselineEntriesAreLoading,
    archivedId,
  } = baselineEntryState;
  return {
    isUpdating,
    isModalSaveOpen,
    isModalOpen,
    editBaselineEntryId,
    baselineEntries,
    baselineEntriesAreLoading,
    archivedId,
  };
}

const mapDispatchToProps = {
  initBaselineEntryPage,
  submitBaselineEntry,
  updateBaselineEntry,
  openEditModal,
  closeEditModal,
  archiveBaseline,
  openSaveModal,
  closeSaveModal,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type Props = OwnProps & ConnectedProps<typeof connector>;

export function BaselineEntryPage({
  isUpdating,
  isModalOpen,
  archivedId,
  isModalSaveOpen,
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
  archiveBaseline,
}: Props) {
  useMount(() => initBaselineEntryPage());

  const loginStyles = useStyles2(getLoginStyles);

  const columns = [
    {
      name: 'No',
      selector: (row: { id: String }) => row.id,
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: (row: { startDate: String }) => row.startDate,
      sortable: true,
    },
    {
      name: 'End Date',
      selector: (row: { endDate: String }) => row.endDate,
      minWidth: '300px',
    },
    {
      name: 'Invoice Date',
      selector: (row: { invoiceDate: String }) => row.invoiceDate,
      minWidth: '300px',
    },
    {
      name: 'No. of Days',
      selector: (row: { noOfDays: String }) => row.noOfDays,
      minWidth: '300px',
    },
    {
      name: 'Kilowatt-hour',
      selector: (row: { kwh: String }) => row.kwh,
      minWidth: '300px',
    },
    {
      name: 'KWh (Normalized)	',
      selector: (row: { kwhNormalized: String }) => row.kwhNormalized,
      minWidth: '300px',
    },
    {
      name: 'Min. kW',
      selector: (row: { minKw: String }) => row.minKw,
      minWidth: '300px',
    },
    {
      name: 'Max. kW',
      selector: (row: { maxKw: String }) => row.maxKw,
      minWidth: '300px',
    },
    {
      name: 'Avg. kW',
      selector: (row: { avgKw: String }) => row.avgKw,
      minWidth: '300px',
    },
    {
      name: 'Avg. kVA',
      selector: (row: { avgKva: String }) => row.avgKva,
      minWidth: '300px',
    },
    {
      name: 'PF',
      selector: (row: { pf: String }) => row.pf,
      minWidth: '300px',
    },
    {
      name: 'Min. PF',
      selector: (row: { minPf: String }) => row.minPf,
      minWidth: '300px',
    },
    {
      name: 'Max. PF',
      selector: (row: { maxPf: String }) => row.maxPf,
      minWidth: '300px',
    },
    {
      name: 'Rate',
      selector: (row: { rate: String }) => row.rate,
      minWidth: '300px',
    },
    {
      name: 'Energy Rate',
      selector: (row: { energyRate: String }) => row.energyRate,
      minWidth: '300px',
    },
    {
      name: 'Fuel Rate',
      selector: (row: { fuelRate: String }) => row.fuelRate,
      minWidth: '300px',
    },
    {
      name: 'KVA Rate',
      selector: (row: { ippRate: String }) => row.ippRate,
      minWidth: '300px',
    },
    {
      name: 'Fuel & IPP Rate',
      selector: (row: { kvaRate: String }) => row.kvaRate,
      minWidth: '300px',
    },
    {
      name: 'Fuel Charge',
      selector: (row: { ippVariableRate: String }) => row.ippVariableRate,
      minWidth: '300px',
    },
    {
      name: 'IPP Var. Rate',
      selector: (row: { ippFixedRate: String }) => row.ippFixedRate,
      minWidth: '300px',
    },
    {
      name: 'IPP Var. Rate',
      selector: (row: { ippFixedRate: String }) => row.ippFixedRate,
      minWidth: '300px',
    },

    {
      name: 'IPP Var. Rate',
      selector: (row: { ippVariableCharge: String }) => row.ippVariableCharge,
      minWidth: '300px',
    },
    {
      name: 'IPP Fixed Charge',
      selector: (row: { ippFixedCharge: String }) => row.ippFixedCharge,
      minWidth: '300px',
    },
    {
      name: 'Energy Charge',
      selector: (row: { energyCharge: String }) => row.energyCharge,
      minWidth: '300px',
    },
    {
      name: 'Kva Charge',
      selector: (row: { kvaCharge: String }) => row.kvaCharge,
      minWidth:'300px',
    },
    {
      name: 'Fuel Charge',
      selector: (row: { fuelCharge: String }) => row.fuelCharge,
      minWidth:'300px',
    },
    {
      name: 'Current Charges',
      selector: (row: { currentCharges: String }) => row.currentCharges,
      minWidth:'300px',
    },
    {
      name: 'Sales Tax',
      selector: (row: { salesTax: String }) => row.salesTax,
      minWidth:'300px',
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
      )

    }
  ];


  const conditionalRowStyles = [
    {
      when: (row: { id: number; }) => row.id % 2 == 0,
      style: {
        backgroundColor: 'lightslategray',
        color: 'white',
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

      <PageHeader title={`HiPro Energy Baseline`} className="no-margin" pageIcon="graph-bar">
        <Branding.LoginLogo className={loginStyles.pageHeaderLogo} />
      </PageHeader>

      <PageToolbar title={`Baseline Entry`} className="no-margin" />
      <div className="sub-title">Possible microcopy providing high level explanation of the chart.</div>
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
      <div>
        {renderLoadingBaselineEntries(baselineEntriesAreLoading, isUpdating)}
      </div>
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

const renderBaselineRecord = (baselineEntry: BaselineDTO, openEditModal: any, openSaveModal: any) => {
  return (
    <tr key={baselineEntry.id}>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.id}>
          {baselineEntry.id}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.startDate}>
          {baselineEntry.startDate}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.endDate}>
          {baselineEntry.endDate}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.invoiceDate}>
          {baselineEntry.invoiceDate}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.noOfDays}>
          {baselineEntry.noOfDays}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.kwh}>
          {baselineEntry.kwh}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.kwhNormalized}>
          {baselineEntry.kwhNormalized}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.minKw}>
          {baselineEntry.minKw}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.maxKw}>
          {baselineEntry.maxKw}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.avgKw}>
          {baselineEntry.avgKw}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.avgKva}>
          {baselineEntry.avgKva}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.pf}>
          {baselineEntry.pf}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.minPf}>
          {baselineEntry.minPf}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.maxPf}>
          {baselineEntry.maxPf}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.rate}>
          {baselineEntry.rate}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.energyRate}>
          {baselineEntry.energyRate}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.fuelRate}>
          {baselineEntry.fuelRate}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.kvaRate}>
          {baselineEntry.kvaRate}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.kvaCharge}>
          {baselineEntry.kvaCharge}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.ippRate}>
          {baselineEntry.ippRate}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.ippCharge}>
          {baselineEntry.ippCharge}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.fuelCharge}>
          {baselineEntry.fuelCharge}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.ippVariableRate}>
          {baselineEntry.ippVariableRate}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.ippFixedRate}>
          {baselineEntry.ippFixedRate}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.ippVariableCharge}>
          {baselineEntry.ippVariableCharge}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.ippFixedCharge}>
          {baselineEntry.ippFixedCharge}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.energyCharge}>
          {baselineEntry.energyCharge}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.currentCharges}>
          {baselineEntry.currentCharges}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.salesTax}>
          {baselineEntry.salesTax}
        </a>
      </td>
      <td className="link-td">
        <Icon
          name="pen"
          title="Edit Baseline"
          onClick={() => {
            openEditModal(baselineEntry.id);
          }}
        />
        <Icon
          className="archive-link"
          name="folder-upload"
          title="Archive Baseline"
          onClick={() => {
            openSaveModal();
          }}
        />
      </td>
    </tr>
  );
};

export default hot(module)(connector(BaselineEntryPage));
