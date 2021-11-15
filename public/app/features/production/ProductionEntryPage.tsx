import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useMount } from 'react-use';
import { hot } from 'react-hot-loader';
import { PageToolbar, PageHeader, useStyles2, Icon, Modal } from '@grafana/ui';
import { ProductionVolumeDTO, StoreState } from 'app/types';
import {
  initProductionEntryPage,
  submitProductionEntry,
  updateProductionEntry,
  openEditModal,
  closeEditModal,
  archiveProduction,
} from './state/actions';
import ProductionEntryForm from './ProductionEntryForm';
import EditBaselineEntryForm from './EditProductionEntryForm';
import { getLoginStyles } from 'app/core/components/Login/LoginLayout';
import { Branding } from 'app/core/components/Branding/Branding';

export interface OwnProps {
  onDismiss: () => void;
}

function mapStateToProps(state: StoreState) {
  const productionEntryState = state.Production;
  const {
    isUpdating,
    isModalOpen,
    editProductionEntryId,
    productionEntries,
    productionEntriesAreLoading,
  } = productionEntryState;
  return {
    isUpdating,
    isModalOpen,
    editProductionEntryId,
    productionEntries,
    productionEntriesAreLoading,
  };
}

const mapDispatchToProps = {
  initProductionEntryPage,
  submitProductionEntry,
  updateProductionEntry,
  openEditModal,
  closeEditModal,
  archiveProduction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type Props = OwnProps & ConnectedProps<typeof connector>;

export function ProductionEntryPage({
  isUpdating,
  isModalOpen,
  editProductionEntryId,
  productionEntries,
  productionEntriesAreLoading,
  updateProductionEntry,
  initProductionEntryPage,
  submitProductionEntry,
  openEditModal,
  closeEditModal,
  archiveProduction,
}: Props) {
  useMount(() => initProductionEntryPage());

  const loginStyles = useStyles2(getLoginStyles);

  return (
    <div className="baseline-entry">
      <PageHeader title={`HiPro Energy Production`} className="no-margin" pageIcon="graph-bar">
        <Branding.LoginLogo className={loginStyles.pageHeaderLogo} />
      </PageHeader>
      <PageToolbar title={`Production Entry`} className="no-margin" />
      <div className="sub-title">Possible microcopy providing high level explanation of the chart.</div>
      <ProductionEntryForm addBaselineEntry={submitProductionEntry} isSavingBaselineEntry={isUpdating} />
      <hr className="spacious"></hr>
      <div
        className={
          isUpdating || productionEntriesAreLoading
            ? 'baseline-no-scroll baseline-entry-table-container'
            : 'baseline-entry-table-container'
        }
      >
        <table className="baseline-entry-table filter-table form-inline filter-table--hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>
                Date
              </th>
              <th>Warehouse staff</th>
              <th>Staff - Total  </th>
              <th>HiPro store & office staff </th>
              <th>No. of staff – Office - Sales  </th>
              <th> No. of staff – Office - Accounts</th>
              <th>No. of staff – Office - Group Purchasing  </th>
              <th>No. of staff – Office - Store Purchasing   </th>
              <th>No. of staff – Store - Customer Service  </th>
              <th>No of Staff - Store - Cashiers </th>
              <th>No of Staff - Store - Pharmacy </th>
              <th>No of Staff - Store - Sales Floor</th>
              <th>
                No of Staff - Store - Receival</th>
              <th>No of Staff - Store - Warehouse</th>
              <th>
                No. of customers - Total
              </th>
              <th>No. of customers - Store</th>
              <th>No. of customers - Warehouse</th>
              <th>
                No. of transactions – Total
              </th>
              <th>No. of transactions Item/Department – A</th>
              <th>No. of transactions Item/Department – B</th>
              <th>No. of transactions Item/Department – C</th>
              <th>

                No. of transactions Item/Department – D</th>
              <th>No. of transactions Item/Department - E</th>
              <th>Truck deliveries – Type A</th>
              <th>Truck deliveries – Type B</th>
              <th>Truck deliveries – Type C</th>
              <th>Truck deliveries – Type D</th>
            </tr>
          </thead>
          <tbody>
            {productionEntries.map((p: ProductionVolumeDTO) => {
              return renderBaselineRecord(p, openEditModal, archiveProduction);
            })}
          </tbody>
        </table>
        {renderLoadingBaselineEntries(productionEntriesAreLoading, isUpdating)}
      </div>
      {renderEditBaselineEntryModal(
        productionEntriesAreLoading,
        isUpdating,
        isModalOpen,
        editProductionEntryId,
        productionEntries,
        closeEditModal,
        updateProductionEntry
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
  productionEntries: ProductionVolumeDTO[],
  closeEditModal: any,
  updateBaselineEntry: any
) => {
  let el;

  if (isLoading === true || productionEntries.length <= 0 || editBaselineEntryId <= 0) {
    el = null;
  } else {
    el = (
      <Modal title="Edit Baseline Entry" icon="save" onDismiss={closeEditModal} isOpen={isModalOpen}>
        <div>
          <EditBaselineEntryForm
            existingBaseline={
              (productionEntries.find((p) => {
                return p.id?.toString() === editBaselineEntryId.toString();
              }) ?? {}) as ProductionVolumeDTO
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

const renderBaselineRecord = (baselineEntry: ProductionVolumeDTO, openEditModal: any, archiveBaseline: any) => {
  console.log(baselineEntry)
  return (
    <tr key={baselineEntry.id}>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.id}>
          {baselineEntry.id}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.day}>
          {baselineEntry.day}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.wareHouseStaff}>
          {baselineEntry.wareHouseStaff}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.staffTotal}>
          {baselineEntry.staffTotal}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.noOfStaffOfficeAccounts}>
          {baselineEntry.noOfStaffOfficeAccounts}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.noOfStaffOfficeGroupPurchasing}>
          {baselineEntry.noOfStaffOfficeGroupPurchasing}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.noOfStaffOfficeStorePurchasing}>
          {baselineEntry.noOfStaffOfficeStorePurchasing}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.noOfStaffStoreCustomerService}>
          {baselineEntry.noOfStaffStoreCustomerService}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.noOfStaffStoreCashiers}>
          {baselineEntry.noOfStaffStoreCashiers}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.noOfStaffStorePharmacy}>
          {baselineEntry.noOfStaffStorePharmacy}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.noOfStaffStoreSalesFloor}>
          {baselineEntry.noOfStaffStoreSalesFloor}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.noOfStaffStoreReceival}>
          {baselineEntry.noOfStaffStoreReceival}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.wareHouseHiProStore}>
          {baselineEntry.wareHouseHiProStore}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.noOfCustomersTotal}>
          {baselineEntry.noOfCustomersTotal}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.noOfCustomersStore}>
          {baselineEntry.noOfCustomersStore}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.noOftransactionstotal}>
          {baselineEntry.noOftransactionstotal}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.nooftransactionsitemdepartmenta}>
          {baselineEntry.nooftransactionsitemdepartmenta}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.nooftransactionsitemdepartmentb}>
          {baselineEntry.nooftransactionsitemdepartmentb}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.nooftransactionsitemdepartmentc}>
          {baselineEntry.nooftransactionsitemdepartmentc}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.nooftransactionsitemdepartmentd}>
          {baselineEntry.nooftransactionsitemdepartmentd}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.nooftransactionsitemdepartmente}>
          {baselineEntry.nooftransactionsitemdepartmente}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.truckDeliveriesTotal}>
          {baselineEntry.truckDeliveriesTotal}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.truckDeliveriesTypea}>
          {baselineEntry.truckDeliveriesTypea}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.truckDeliveriesTypeb}>
          {baselineEntry.truckDeliveriesTypeb}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.truckDeliveriesTypec}>
          {baselineEntry.truckDeliveriesTypec}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={baselineEntry.truckDeliveriesTyped}>
          {baselineEntry.truckDeliveriesTyped}
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

export default hot(module)(connector(ProductionEntryPage));
