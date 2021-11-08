import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useMount } from 'react-use';
import { hot } from 'react-hot-loader';
import { PageToolbar, PageHeader, useStyles2, Icon, Modal } from '@grafana/ui';
import { BaselineDTO, StoreState } from 'app/types';
import {
  initBaselineEntryPage,
  submitBaselineEntry,
  updateBaselineEntry,
  openEditModal,
  closeEditModal,
  archiveBaseline,
} from './state/actions';
import BaselineEntryForm from './BaselineEntryForm';
import EditBaselineEntryForm from './EditBaselineEntryForm';
import { getLoginStyles } from 'app/core/components/Login/LoginLayout';
import { Branding } from 'app/core/components/Branding/Branding';

export interface OwnProps {
  onDismiss: () => void;
}

function mapStateToProps(state: StoreState) {
  const baselineEntryState = state.baseline;
  const {
    isUpdating,
    isModalOpen,
    editBaselineEntryId,
    baselineEntries,
    baselineEntriesAreLoading,
  } = baselineEntryState;
  return {
    isUpdating,
    isModalOpen,
    editBaselineEntryId,
    baselineEntries,
    baselineEntriesAreLoading,
  };
}

const mapDispatchToProps = {
  initBaselineEntryPage,
  submitBaselineEntry,
  updateBaselineEntry,
  openEditModal,
  closeEditModal,
  archiveBaseline,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type Props = OwnProps & ConnectedProps<typeof connector>;

export function BaselineEntryPage({
  isUpdating,
  isModalOpen,
  editBaselineEntryId,
  baselineEntries,
  baselineEntriesAreLoading,
  updateBaselineEntry,
  initBaselineEntryPage,
  submitBaselineEntry,
  openEditModal,
  closeEditModal,
  archiveBaseline,
}: Props) {
  useMount(() => initBaselineEntryPage());

  const loginStyles = useStyles2(getLoginStyles);

  return (
    <div className="baseline-entry">
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
        <table className="baseline-entry-table filter-table form-inline filter-table--hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>
                Start Date&nbsp;
                {/* <Tooltip placement="top" content="Start Date">
                  <Icon name="shield" />
                </Tooltip> */}
              </th>
              <th>End Date</th>
              <th>Invoice Date</th>
              <th>No. of Days</th>
              <th>Kilowatt-hour</th>
              <th>Min. kW</th>
              <th>Max. kW</th>
              <th>Avg. kW</th>
              <th>Avg. kVA</th>
              <th>PF</th>
              <th>Min. PF</th>
              <th>Max. PF</th>
              <th>Rate</th>
              <th>Energy Rate</th>
              <th>Fuel Rate</th>
              <th>KVA Rate</th>
              <th>KVA Charge</th>
              <th>Fuel & IPP Rate</th>
              <th>Fuel & IPP Charge</th>
              <th>Fuel Charge</th>
              <th>IPP Var. Rate</th>
              <th>IPP Fixed Rate</th>
              <th>IPP Var. Charge</th>
              <th>IPP Fixed Charge</th>
              <th>Energy Charge</th>
              <th>Current Charges</th>
              <th>Sales Tax</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {baselineEntries.map((p: BaselineDTO) => {
              return renderBaselineRecord(p, openEditModal, archiveBaseline);
            })}
          </tbody>
        </table>
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

const renderBaselineRecord = (baselineEntry: BaselineDTO, openEditModal: any, archiveBaseline: any) => {
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
            archiveBaseline(baselineEntry.id);
          }}
        />
      </td>
    </tr>
  );
};

export default hot(module)(connector(BaselineEntryPage));
