import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useMount } from 'react-use';
import { hot } from 'react-hot-loader';
import { PageToolbar, PageHeader, useStyles2, Icon, Modal, Button } from '@grafana/ui';
import { ProductionVolumeDTO, StoreState } from 'app/types';
import {
  initProductionEntryPage,
  submitProductionEntry,
  updateProductionEntry,
  openEditModal,
  closeEditModal,
  archiveProduction,
  closeSaveModal,
  openSaveModal,
} from './state/actions';
import ProductionEntryForm from './ProductionEntryForm';
import EditBaselineEntryForm from './EditProductionEntryForm';
import { getLoginStyles } from 'app/core/components/Login/LoginLayout';
import { Branding } from 'app/core/components/Branding/Branding';
import { format } from 'date-fns';
export interface OwnProps {
  onDismiss: () => void;
}

function mapStateToProps(state: StoreState) {
  const productionEntryState = state.Production;
  const {
    isUpdating,
    isModalOpen,
    isModalSaveOpen,
    editProductionEntryId,
    productionEntries,
    productionEntriesAreLoading,
    archivedId,
  } = productionEntryState;
  return {
    isUpdating,
    isModalOpen,
    isModalSaveOpen,
    editProductionEntryId,
    productionEntries,
    productionEntriesAreLoading,
    archivedId,
  };
}

const mapDispatchToProps = {
  initProductionEntryPage,
  submitProductionEntry,
  updateProductionEntry,
  openEditModal,
  closeEditModal,
  archiveProduction,
  openSaveModal,
  closeSaveModal,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type Props = OwnProps & ConnectedProps<typeof connector>;

export function ProductionEntryPage({
  isUpdating,
  isModalOpen,
  isModalSaveOpen,
  archivedId,
  editProductionEntryId,
  productionEntries,
  productionEntriesAreLoading,
  updateProductionEntry,
  initProductionEntryPage,
  submitProductionEntry,
  openEditModal,
  openSaveModal,
  closeSaveModal,
  closeEditModal,
  archiveProduction,
}: Props) {
  useMount(() => initProductionEntryPage());

  const loginStyles = useStyles2(getLoginStyles);

  return (
    <div className="baseline-entry">
      <Modal title="Archive Production" icon="save" onDismiss={closeSaveModal} isOpen={isModalSaveOpen}>
        <Button
          variant="primary"
          aria-label="Baseline entry submit button"
          onClick={() => {
            archiveProduction(archivedId);
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
              <th>Date</th>
              <th>Warehouse staff</th>
              <th>Store Employees / Staff</th>
              <th>Staff - Total</th>
              <th>HiPro store & office staff</th>
              <th>No. of staff – Office - Sales</th>
              <th> No. of staff – Office - Accounts</th>
              <th>No. of staff – Office - Group Purchasing</th>
              <th>No. of staff – Office - Store Purchasing</th>
              <th>No. of staff – Store - Customer Service</th>
              <th>No of Staff - Store - Cashiers </th>
              <th>No of Staff - Store - Pharmacy </th>
              <th>No of Staff - Store - Sales Floor</th>
              <th>No of Staff - Store - Receival</th>
              <th>No of Staff - Store - Warehouse</th>
              <th>No. of customers - Total</th>
              <th>No. of customers - Store</th>
              <th>No. of customers - Warehouse</th>
              <th>No. of transactions – Total</th>
              <th>No. of transactions Item/Department – A</th>
              <th>No. of transactions Item/Department – B</th>
              <th>No. of transactions Item/Department – C</th>
              <th> No. of transactions Item/Department – D</th>
              <th>No. of transactions Item/Department - E</th>
              <th>Truck deliveries - Total</th>
              <th>Truck deliveries – Type A</th>
              <th>Truck deliveries – Type B</th>
              <th>Truck deliveries – Type C</th>
              <th>Truck deliveries – Type D</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productionEntries.map((p: ProductionVolumeDTO) => {
              return renderBaselineRecord(p, openEditModal, openSaveModal);
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

const renderBaselineRecord = (ProductionVolumeEntry: ProductionVolumeDTO, openEditModal: any, openSaveModal: any) => {
  return (
    <tr key={ProductionVolumeEntry.id}>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.id}>
          {ProductionVolumeEntry.id}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.day}>
          {format(Number(ProductionVolumeEntry.day) * 1000, 'yyyy-MM-dd')}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.wareHouseStaff}>
          {ProductionVolumeEntry.wareHouseStaff}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.storeEmployees}>
          {ProductionVolumeEntry.storeEmployees}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.staffTotal}>
          {ProductionVolumeEntry.staffTotal}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={'HiPro Store & Office Staff'}>
          N/A
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffOfficeSales}>
          {ProductionVolumeEntry.noOfStaffOfficeSales}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffOfficeAccounts}>
          {ProductionVolumeEntry.noOfStaffOfficeAccounts}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffOfficeGroupPurchasing}>
          {ProductionVolumeEntry.noOfStaffOfficeGroupPurchasing}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffOfficeStorePurchasing}>
          {ProductionVolumeEntry.noOfStaffOfficeStorePurchasing}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffStoreCustomerService}>
          {ProductionVolumeEntry.noOfStaffStoreCustomerService}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffStoreCashiers}>
          {ProductionVolumeEntry.noOfStaffStoreCashiers}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffStorePharmacy}>
          {ProductionVolumeEntry.noOfStaffStorePharmacy}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffStoreSalesFloor}>
          {ProductionVolumeEntry.noOfStaffStoreSalesFloor}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffStoreReceival}>
          {ProductionVolumeEntry.noOfStaffStoreReceival}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfStaffStoreWarehouse}>
          {ProductionVolumeEntry.noOfStaffStoreWarehouse}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfCustomersTotal}>
          {ProductionVolumeEntry.noOfCustomersTotal}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfCustomersStore}>
          {ProductionVolumeEntry.noOfCustomersStore}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={'No. of Customers - Warehouse'}>
          N/A
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfTransactionsTotal}>
          {ProductionVolumeEntry.noOfTransactionsTotal}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfTransactionsItemDepartmentA}>
          {ProductionVolumeEntry.noOfTransactionsItemDepartmentA}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfTransactionsItemDepartmentB}>
          {ProductionVolumeEntry.noOfTransactionsItemDepartmentB}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfTransactionsItemDepartmentC}>
          {ProductionVolumeEntry.noOfTransactionsItemDepartmentC}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfTransactionsItemDepartmentD}>
          {ProductionVolumeEntry.noOfTransactionsItemDepartmentD}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.noOfTransactionsItemDepartmentE}>
          {ProductionVolumeEntry.noOfTransactionsItemDepartmentE}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.truckDeliveriesTotal}>
          {ProductionVolumeEntry.truckDeliveriesTotal}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.truckDeliveriesTypeA}>
          {ProductionVolumeEntry.truckDeliveriesTypeB}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.truckDeliveriesTypeB}>
          {ProductionVolumeEntry.truckDeliveriesTypeB}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.truckDeliveriesTypeC}>
          {ProductionVolumeEntry.truckDeliveriesTypeC}
        </a>
      </td>
      <td className="link-td max-width-10">
        <a className="ellipsis" title={ProductionVolumeEntry.truckDeliveriesTypeD}>
          {ProductionVolumeEntry.truckDeliveriesTypeD}
        </a>
      </td>
      <td className="link-td">
        <Icon
          name="pen"
          title="Edit Production"
          onClick={() => {
            openEditModal(ProductionVolumeEntry.id);
          }}
        />
        <Icon
          className="archive-link"
          name="folder-upload"
          title="Archive Production"
          onClick={() => {
            openSaveModal(ProductionVolumeEntry.id);
          }}
        />
      </td>
    </tr>
  );
};

export default hot(module)(connector(ProductionEntryPage));
